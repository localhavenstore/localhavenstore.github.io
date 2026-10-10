<!-- https://localhavenstore.github.io/guides/n8n-queue-mode-execution-crashed-worker-restart.html -->
guide n8n

# n8n queue mode: a running workflow ends as "crashed" when the worker restarts

You restarted or updated n8n, and a workflow that was running at that moment now shows **crashed** - and it never ran again. In queue mode that is how n8n behaves: a run that loses its worker is **not started again**. We tested it on n8n 2.42.6 (10 Oct 2026) and found two settings that let running workflows finish first.

## What you see in the worker log

```
Received SIGTERM. Shutting down...
Waiting for 1 active executions to finish... (execution IDs: 3)
...
Last session crashed
Found unfinished executions: 2, 3
This could be due to a crash of an active workflow or a restart of n8n
```

## What we measured

Setup: n8n 2.42.6 in queue mode (main + one worker + PostgreSQL + Redis, Docker Compose) on a throw-away server, and a workflow that waits 40 seconds between a webhook and its last step.

| what we did to the worker | the run ended as | note |
| Nothing (control run) | success |  |
| `docker kill` of the worker, 10 s into the run | **crashed**, not run again | The worker stayed down: `restart: unless-stopped` did not start it again. We started it by hand. |
| Normal `docker compose restart worker`, 5 s into the run (default settings) | **crashed**, not run again | The worker waited for the run, Docker stopped it after 10 seconds. The restart took 11 s. |
| The same restart with the two settings below | success | The restart waited for the run: it took 36 to 41 seconds in three tests. |
| `docker compose up -d --force-recreate worker` (what an update does) with longer waits | success | 37 s (tested with 90 s for Docker and 80 s for n8n). |

Why it is not run again: n8n sets the queue's `maxStalledCount` to `0` (`packages/cli/src/scaling/scaling.service.ts` at tag n8n@2.42.6), so a job whose worker disappeared is not handed out a second time. "Retry on Fail" does not help here either - it retries a failed node inside a run that is still alive.

## Fix 1: give running workflows time to finish

Two timers cut the wait short: Docker stops a container after **10 seconds** by default, and an n8n worker waits **30 seconds** for running executions by default (n8n's documentation). Raise both, and keep n8n's value a little below Docker's:

```
services:
  n8n:
    stop_grace_period: 2m
    environment:
      N8N_GRACEFUL_SHUTDOWN_TIMEOUT: "110"
  worker:
    stop_grace_period: 2m
    environment:
      N8N_GRACEFUL_SHUTDOWN_TIMEOUT: "110"
```

Then `docker compose up -d`. From now on a restart or update waits up to about 2 minutes for running workflows.

## Fix 2: plan for the runs that still get lost

- **Runs longer than the wait** and **killed workers** (power loss, out of memory, `docker kill`) still lose their run. Restart or update when no long run is active.
- **Make steps safe to run twice**: before a step creates something (an invoice, an e-mail, a record), let it check whether it already exists. Then you can simply start the workflow again.
- **Get told about crashed runs.** Do not rely on your error workflow for this (we did not test whether a crashed run triggers it) - also check for runs that never reported back (a heartbeat).
- After `docker kill`, start the worker again yourself: `docker compose up -d`.

## Ready-made

Our [Hardened n8n Host Kit](https://localhavenstore.gumroad.com/l/n8n-host-kit?utm_source=site&utm_medium=guide) (since 1.1.1) ships with both settings, and its test on a fresh server includes exactly this case: a 40-second run that is in progress during a worker restart must finish with success. The [n8n Reliability Pack](https://localhavenstore.gumroad.com/l/n8n-reliability-pack?utm_source=site&utm_medium=guide) has the heartbeat that reports runs which never finished, and a retry-safe intake pattern.

Tested by us on 10 Oct 2026 on throw-away servers, one worker, fictional data: all cases on n8n 2.42.6 (waits of 90 s / 80 s), the fix with 2 min / 110 s also on 2.42.3. Other versions and setups can behave differently - test yours. Not an official n8n page; not affiliated with n8n. Made with AI assistance.
