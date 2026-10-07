<!-- https://localhavenstore.github.io/guides/n8n-railway-3-0-upgrade.html -->
guide n8n railway

# Upgrading n8n on Railway to 3.0 without breaking it

n8n 3.0 is scheduled for October 2026. Many n8n deployments on Railway run the `n8nio/n8n` image without a fixed version - so a redeploy can start 3.0 before you have checked your workflows. Here is the safe order.

## 1. Pin your current version now

In your Railway project, set the image of the n8n service *and every worker* to a fixed version instead of `latest`, for example `n8nio/n8n:2.42.3` (the stable release on 6 Oct 2026). Main and workers must always run the same version.

## 2. Back up two things

- The database: a Railway PostgreSQL backup (or `pg_dump`).
- The `N8N_ENCRYPTION_KEY` variable - copy it to your password manager. Without it no credential can be decrypted ([what that error looks like](https://localhavenstore.github.io/guides/n8n-credentials-could-not-be-decrypted.html)).

## 3. Fix what 3.0 changes (official breaking-changes page)

1. **Function / Function Item nodes are removed** - replace them with Code nodes ("Run Once for All Items" / "Run Once for Each Item").
2. **Code steps get 60 s instead of 300 s** (`N8N_RUNNERS_TASK_TIMEOUT`) - set it if a Code step runs longer.
3. **Unverified community packages are off by default** (`N8N_UNVERIFIED_PACKAGES_ENABLED` true -> false) - set it to `true` only if you need one.
4. **Removed settings:** delete `N8N_PRE_EXECUTE_ERROR_CREATES_EXECUTION`, `N8N_MIGRATE_FS_STORAGE_PATH`, `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` and `N8N_DB_PING_TIMEOUT` (use `DB_PING_TIMEOUT_MS`); `N8N_DEFAULT_BINARY_DATA_MODE=default` is gone - in queue mode use a store every instance can read, e.g. `database`.

Source: [n8n v3.0 breaking changes](https://docs.n8n.io/changelog/v30-breaking-changes/) (checked 6 Oct 2026).

## 4. Try 3.0 on a copy first

Restore the backup into a separate Railway project or environment, give it the same `N8N_ENCRYPTION_KEY`, set the 3.0 version there and open your important workflows. Only then upgrade the real one - main and workers together.

## 5. If it goes wrong

A new n8n version can migrate the database on its first start. Going back means the **backup and the old version together** - not just the old image tag.

## Starting fresh on Railway?

Our free Railway template runs n8n in queue mode, **pinned to a tested version**, with the 3.0 defaults already set, the owner account created from your variables (no open setup page) and a generated encryption key: [deploy n8n (queue mode) on Railway](https://railway.com/deploy/n8n-queue-mode-pinned-tested-30-ready-2e76907a-a71b-41a9-887a-5d2c11004b03?referralCode=j8As-k) (source and test result: [github.com/localhavenstore/railway-n8n](https://github.com/localhavenstore/railway-n8n)). The link carries our **referral code**: new Railway users get USD 20 of credit, we get a share of the usage.

 [

FREE

### n8n 3.0 check

Answer three questions and see what 3.0 means for your setup.](https://localhavenstore.github.io/tools/n8n-3-check.html) [

FREE

### n8n update verdicts

n8n releases tested on a throw-away machine, including the 3.0 release candidate.](https://localhavenstore.github.io/update-watch/n8n.html)

Still running n8n with npm or npx somewhere else? 3.0 drops that - the [n8n 3.0 Move Kit](https://localhavenstore.gumroad.com/l/n8n-move-kit) (EUR 15) moves it to Docker on the same version, checked. Not affiliated with n8n GmbH or Railway. Made with AI assistance.

LAUNCH40 40 % off at checkout until 13 Oct 23:59 (Athens)

Prefer a plan written for your setup? [n8n npm -> Docker migration plan](https://www.fiverr.com/localhaven/write-your-step-by-step-n8n-npm-to-docker-migration-plan-for-n8n-version-3) (our Fiverr service, from USD 35, files only - no access to your system).
