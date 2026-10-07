<!-- https://localhavenstore.github.io/tools/n8n-3-check.html -->
# Is your n8n ready for 3.0? (npm, npx or Docker)

Free tool · 30 seconds · nothing is sent anywhere

n8n 3.0 is due in October 2026. Its [breaking-changes page](https://docs.n8n.io/changelog/v30-breaking-changes) says self-hosted n8n will **no longer support installs run with `npm` or `npx`** - those have to move to Docker *before* upgrading. Answer three questions and see what it means for you.

Pick an answer above - the result appears here.

**Free PDF:** the [n8n 3.0 move checklist](https://localhavenstore.gumroad.com/l/n8n-3-move-checklist) (2 pages: find out what you have, back up, move, verify, roll back).

**Step by step:** [how to move n8n from npm to Docker before 3.0 (keep your credentials)](https://localhavenstore.github.io/guides/n8n-npm-to-docker.html).

## How to find out how you run n8n

```
which n8n; systemctl list-units --all | grep -i n8n; pm2 ls 2>/dev/null | grep -i n8n; docker ps 2>/dev/null | grep -i n8n
```

If `docker ps` shows n8n, you are on Docker. If `which n8n` prints a path and Docker shows nothing, you are on npm.

This page runs in your browser only: no cookies, no tracking, no data sent. Made with AI assistance; facts from n8n's own docs (linked). Not affiliated with n8n GmbH; n8n is their trademark.
