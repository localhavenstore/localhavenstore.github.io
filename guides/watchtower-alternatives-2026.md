<!-- https://localhavenstore.github.io/guides/watchtower-alternatives-2026.html -->
guide docker updates

# Watchtower alternatives in 2026 - and which ones test an update before you install it

Watchtower, the classic auto-updater for Docker containers, is archived on GitHub (last commit 17 Dec 2025). Here is what the maintained tools do instead - and the one thing none of them does.

## The maintained options (checked 6 Oct 2026)

| tool | what it does about updates | rollback |
| [WUD (What's Up Docker)](https://github.com/getwud/wud)
MIT | watches images; 30+ notification triggers; can update containers automatically | no |
| [Diun](https://github.com/crazy-max/diun)
MIT | notifications when an image is updated - it does not update anything | no |
| [Tugtainer](https://github.com/Quenary/tugtainer)
MIT | check + update with a web UI (auto-update off by default); waits on healthchecks and rolls an unhealthy container back to the previous IMAGE | image only |
| [Komodo](https://komo.do)
GPL-3.0 | 'Poll for Updates' (indicator + alert) or 'Auto Update' (redeploy) - rolling tags like :latest only | no |
| [Dockge](https://github.com/louislam/dockge)
MIT | compose stack manager with an 'Update Docker Images' action (pull + recreate) | no |
| [Portainer](https://github.com/portainer/portainer)
Zlib | container/stack management; re-pull an image and redeploy a stack from the UI | no |

Sources: each project's README / docs, linked. Status from GitHub on 6 Oct 2026 (all pushed in the last months).

## The gap: "an update exists" is not "the update is safe"

All of these tell you a new image exists, and some install it. None of them tries the new version *with data like yours* before you do. That matters because some updates change your data on the first start: Jellyfin 12 rewrites its database, Nextcloud does not support a downgrade. After that, rolling back the image is not enough - in our test, Jellyfin 10.11 started and said "Healthy" on the migrated database, and nobody could log in ([the full story](https://localhavenstore.github.io/guides/jellyfin-downgrade-no-such-column.html)).

## Close the gap

1. **Before:** check whether the release was tested - [Update Watch](https://localhavenstore.github.io/update-watch/) runs each new release of Nextcloud, Immich, Jellyfin, n8n, Vaultwarden and Home Assistant on a throw-away machine with test data: update, app check, restore drill.
2. **Snapshot:** take a consistent data snapshot right before you update - the free [safe-update](https://github.com/localhavenstore/safe-update-recipes) tool.
3. **If it breaks:** restore data AND the old image together (safe-update restore) - not just the image.
4. **Then automate** the notification part with any tool above (WUD, Diun, Tugtainer, Komodo...).

supporter --early-access

## Get each verdict right after the test

Supporters get every Update Watch verdict by e-mail as soon as the test finishes, with the restore steps. EUR 3/month or EUR 29/year; early access: the first alerts within 30 days of joining, or a refund.[Become a supporter](https://localhavenstore.gumroad.com/l/update-watch)

Not affiliated with any project named. Feature summaries are short paraphrases of each project's own documentation on 6 Oct 2026 - check the links for details. Made with AI assistance.
