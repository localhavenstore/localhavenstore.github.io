<!-- https://localhavenstore.github.io/guides/jellyfin-downgrade-no-such-column.html -->
guide jellyfin

# Jellyfin after a downgrade: "Healthy", but nobody can log in (no such column: p.Permission_Permissions_Guid)

You updated Jellyfin to 12, went back to 10.11 by changing the image tag - and now it starts, the health check says `Healthy`, but every login fails with a server error (HTTP 500). The log shows:

```
Microsoft.Data.Sqlite.SqliteException (0x80004005): SQLite Error 1: 'no such column: p.Permission_Permissions_Guid'.
```

## Why

Jellyfin 12 rewrites its database on the first start. Version 10.11 cannot read the new layout, and Jellyfin does not support a downgrade. Rolling back only the *image* leaves the *migrated data* in place - so the old version starts, but every query that touches users fails.

## Get logins back

1. **Fastest:** put the 12.x image back. The database was migrated by 12.x, so the version that migrated it can read it.
2. **Really go back to 10.11:** you need the data from *before* the update - restore your pre-update backup of `/config` together with the old image. In our test run this brought logins back on 10.11.11; anything created after the backup (for example a new user) is gone.

## Next time: snapshot first

The free [safe-update](https://github.com/localhavenstore/safe-update-recipes) tool takes a consistent snapshot right before a docker compose update and restores the data *and* the old image together. It also refuses a jump that skips a required step (Jellyfin wants 10.11.11 or newer before 12).

 [

FREE

### Jellyfin update verdicts

Each Jellyfin release tested on a throw-away machine: update, app check, restore drill.](https://localhavenstore.github.io/update-watch/jellyfin.html) [

FREE open source

### safe-update

Snapshot before, data + image back after - recipes for Jellyfin, Nextcloud, Immich and more.](https://github.com/localhavenstore/safe-update-recipes)

Error text from a real run on a throw-away test machine (Jellyfin 12.1 -> 10.11.11 image rollback, 6 Oct 2026). Not an official Jellyfin page; not affiliated with Jellyfin. Made with AI assistance.
