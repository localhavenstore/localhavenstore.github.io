<!-- https://localhavenstore.github.io/guides/n8n-npm-to-docker.html -->
# How to move n8n from npm to Docker before 3.0 (keep your credentials)

n8n 3.0 no longer supports installs that run with `npm` or `npx` - n8n says to move to Docker **before** you upgrade ([n8n's v3.0 breaking changes](https://docs.n8n.io/changelog/v30-breaking-changes)). The move itself is short. What goes wrong is almost always the same few things: the **encryption key**, file permissions, and two n8n running at once. This page is the order that avoids them.

Written with AI assistance from our own test runs (real npm installs of n8n 2.41.5 on throwaway Ubuntu 24.04 machines, SQLite and Postgres). Not affiliated with n8n GmbH. If n8n's own migration guide is out, read it too.

## 1. See what your move involves (read-only)

Our free [n8n Move Check](https://github.com/localhavenstore/n8n-move-check) changes nothing and prints no secret. It tells you how n8n runs (systemd, pm2, by hand, npx), where the encryption key is, your database, folders outside `~/.n8n`, workflows that need host programs or files, community nodes, and n8n 3.0 blockers by workflow name.

```
sudo node move-check.js
```

No script? At least note three things: `n8n --version`, how n8n is started, and where the key is (next step).

## 2. Find and save the encryption key

Every credential in n8n is encrypted with one key. It is either in the environment variable `N8N_ENCRYPTION_KEY` or in the file `~/.n8n/config` (the `encryptionKey` line) of the user that runs n8n. The Docker n8n needs **exactly this key**. With a different key n8n starts, but every credential fails with "Credentials could not be decrypted" - and you re-enter all of them by hand.

Copy the key into your password manager now. Do not paste it into chats or tickets.

## 3. Copy the data - do not move it

```
sudo systemctl stop n8n        # or: pm2 stop n8n  - stop, do NOT uninstall yet
cp -a ~/.n8n ~/n8n-copy        # hidden files included; the original stays as your way back
```

Also copy what lives outside `~/.n8n`: `~/.n8n-files` (n8n 2.x default folder of the Read/Write Files node) and a binary-data folder if you set `N8N_BINARY_DATA_STORAGE_PATH`. On Postgres the data is in the database: take a `pg_dump` first, then point the Docker n8n at the same database with the same `DB_*` settings.

## 4. Start the SAME version in Docker

Move first, upgrade later. The official image runs as user id 1000, so the copied folder must belong to 1000:

```
docker volume create n8n_data
docker run --rm -v n8n_data:/data -v ~/n8n-copy:/src:ro alpine \
  sh -c 'cp -a /src/. /data/ && chown -R 1000:1000 /data'
docker run -d --name n8n --restart unless-stopped -p 127.0.0.1:5678:5678 \
  -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n:2.41.5   # your version from 'n8n --version'
```

If your key was in the environment (not in `~/.n8n/config`), add `-e N8N_ENCRYPTION_KEY=...` with the same value. Do not set a *different* one: if the file and the variable disagree, n8n refuses to start. Carry over your other settings too (time zone, `WEBHOOK_URL`, `NODES_EXCLUDE`, your own variables used with `$env`).

## 5. Check before you trust it

- Open a few credentials and use **Test** - "could not be decrypted" means the key is wrong (stop, fix, retry).
- The same workflows are **active**, and your webhooks answer again (production URLs).
- Workflows with **Execute Command**: the program must exist inside the container. Files read or written on the host: that folder must be mounted.
- Community nodes with native code are built for your old system - reinstall them in n8n.

Only when all of that works: disable the old service so a reboot does not start **two n8n** (both would run your schedules). Keep the old folder for a while - it is your rollback. Upgrade to 3.0 as a separate step.

## FAQ

### I already moved and all credentials say "could not be decrypted". Are they lost?

Not if you still have the old `~/.n8n/config` or the old `N8N_ENCRYPTION_KEY`: stop the container, put that key in (file or variable, not both different), start again. Without the old key they cannot be recovered.

### Can I just export workflows and credentials and import them?

Yes (`n8n export:workflow --all` / `export:credentials --all`), but credentials are exported encrypted with the old key (or decrypted in plain text with `--decrypted` - handle that file like a password). Copying the folder keeps everything else too: executions, users, settings.

### Does this work on Windows?

Docker on Windows means WSL2. The steps are the same inside WSL; keep the data on the WSL file system. We have not tested WSL2 ourselves.

### Do I have to move before 3.0 comes out?

Your npm install keeps working until you upgrade. But new versions and fixes come only as Docker images, so moving calmly now is easier than in a hurry later.

## Want the move done and checked for you?

[n8n 3.0 Move Kit](https://localhavenstore.gumroad.com/l/n8n-move-kit?utm_source=site&utm_campaign=npm-to-docker-guide) (EUR 15) does these steps with automatic checks: same version in Docker, data copied and verified, every credential decrypted inside the container as a test, active workflows and webhooks compared, automatic rollback if a check fails, and one command to go back later. For n8n run by systemd or pm2 on Linux; tested with SQLite and Postgres on Ubuntu 24.04 (not tested: WSL2, other distributions, remote Postgres).

Prefer a plan written for your setup? [n8n npm -> Docker migration plan](https://www.fiverr.com/localhaven/write-your-step-by-step-n8n-npm-to-docker-migration-plan-for-n8n-version-3) (our Fiverr service, from USD 35, files only - no access to your system).

LAUNCH40 40 % off at checkout until 13 Oct 23:59 (Athens)
