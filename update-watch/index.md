<!-- https://localhavenstore.github.io/update-watch/index.html -->
update-watch

# Is it safe to *update*?

Before you run `docker compose pull`: we already did - on a throw-away machine, with real images and test data (users, files). Each verdict is one tested scenario: snapshot, update, app check, restore drill.

[See the verdicts](#verdicts)[Supporter · EUR 3/month](https://localhavenstore.gumroad.com/l/update-watch)

****** test machine

$ update-watch --latest

Home Assistant 2026.10.0 -> 2026.10.1 GREEN 11 Oct

n8n 2.42.5 -> 2.42.6 GREEN 09 Oct

Immich 3.3.0 -> 3.3.1 GREEN 09 Oct

n8n 2.42.4 -> 2.42.5 GREEN 08 Oct

Immich 3.2.4 -> 3.3.0 GREEN 07 Oct

Home Assistant 2026.9.4 -> 2026.10.0 GREEN 07 Oct

# real runs on throw-away test machines

## Apps we watch

6 apps · 19 verdicts · last test 11 Oct 2026

[

3 verdicts

### Home Assistant

2026.10.0 → 2026.10.1

GREENtested 11 Oct 2026](https://localhavenstore.github.io/update-watch/homeassistant.html)[

3 verdicts

### Immich

3.3.0 → 3.3.1

GREENtested 09 Oct 2026](https://localhavenstore.github.io/update-watch/immich.html)[

3 verdicts

### Jellyfin

12.1 → 12.2

GREENtested 06 Oct 2026](https://localhavenstore.github.io/update-watch/jellyfin.html)[

2 verdicts

### Nextcloud

34.0.4 → 35.0.0

GREENtested 05 Oct 2026](https://localhavenstore.github.io/update-watch/nextcloud.html)[

2 verdicts

### Vaultwarden

1.37.3 → 1.37.4

GREENtested 06 Oct 2026](https://localhavenstore.github.io/update-watch/vaultwarden.html)[

6 verdicts

### n8n

2.42.5 → 2.42.6

GREENtested 09 Oct 2026](https://localhavenstore.github.io/update-watch/n8n.html)

## All verdicts

[Home Assistant](https://localhavenstore.github.io/update-watch/homeassistant.html)

2026.10.0 → 2026.10.1

updated, app check passed, and the snapshot restored in a drill

Reported by users for this release (8) - not part of our test

- LIFX bulbs going unavailable: the fix is merged for 2026.10.2 and is not in 2026.10.1 (core #185640)
- MQTT select entities can stop Home Assistant from starting (core #185571, open)
- Lutron Pico buttons fire a single press twice (core #185449, open)
- Tasmota energy sensors lose their state class (core #185407, open)
- A hung DNS lookup can block one hostname until a restart (core #185645, open)
- UniFi Protect: snapshots fail with HTTP 503 and cameras go unavailable - 1 report (core #185706)
- Home dashboard: the welcome banner came back and dismissing it wiped favourites - 1 report (frontend #54822)
- Custom (HACS) integrations that need protobuf below 7 or use cv.vol must be updated by their authors first

Read by us on 2026-10-11 from the projects' issue trackers; not verified by us.

GREEN
2026-10-11

[n8n](https://localhavenstore.github.io/update-watch/n8n.html)

2.42.5 → 2.42.6

updated, app check passed, and the snapshot restored in a drill

GREEN
2026-10-09

[Immich](https://localhavenstore.github.io/update-watch/immich.html)

3.3.0 → 3.3.1

updated, app check passed, and the snapshot restored in a drill

GREEN
2026-10-09

[n8n](https://localhavenstore.github.io/update-watch/n8n.html)

2.42.4 → 2.42.5

updated, app check passed, and the snapshot restored in a drill

GREEN
2026-10-08

[Immich](https://localhavenstore.github.io/update-watch/immich.html)

3.2.4 → 3.3.0

updated, app check passed, and the snapshot restored in a drill

GREEN
2026-10-07

[Home Assistant](https://localhavenstore.github.io/update-watch/homeassistant.html)

2026.9.4 → 2026.10.0

updated, app check passed, and the snapshot restored in a drill

Reported by users for this release (6) - not part of our test

- 2026.10 lists 22 backward-incompatible changes in its release notes (counted 7 Oct) - read them first
- UniFi Network did not load for several users (core #184838 and #184987, closed since)
- LIFX bulbs going unavailable: the fix is merged for 2026.10.2 (core #185640)
- A false shell template repair for command line sensors, a Hue light crash and the Bosch SHC child lock: fixed in 2026.10.1
- MQTT select entities can stop Home Assistant from starting (core #185571, open)
- Custom (HACS) integrations that need protobuf below 7 or use cv.vol must be updated by their authors first

Read by us on 2026-10-11 from the projects' issue trackers; not verified by us.

GREEN
2026-10-07

[n8n](https://localhavenstore.github.io/update-watch/n8n.html)

2.42.3 → 2.42.4

updated, app check passed, and the snapshot restored in a drill

GREEN
2026-10-07

[n8n](https://localhavenstore.github.io/update-watch/n8n.html)

2.41.7 → 2.42.3

updated, app check passed, and the snapshot restored in a drill

GREEN
2026-10-06

[Home Assistant](https://localhavenstore.github.io/update-watch/homeassistant.html)

2026.9.3 → 2026.9.4

updated, app check passed, and the snapshot restored in a drill

GREEN
2026-10-06

[Vaultwarden](https://localhavenstore.github.io/update-watch/vaultwarden.html)

1.37.3 → 1.37.4

updated, app check passed, and the snapshot restored in a drill

GREEN
2026-10-06

[Jellyfin](https://localhavenstore.github.io/update-watch/jellyfin.html)

12.1 → 12.2

updated, app check passed, and the snapshot restored in a drill

GREEN
2026-10-06

[n8n](https://localhavenstore.github.io/update-watch/n8n.html)

2.41.6 → 2.41.7

updated, app check passed, and the snapshot restored in a drill

GREEN
2026-10-06

[Vaultwarden](https://localhavenstore.github.io/update-watch/vaultwarden.html)

1.37.2 → 1.37.3

updated, app check passed, and the snapshot restored in a drill

GREEN
2026-10-06

[n8n](https://localhavenstore.github.io/update-watch/n8n.html)

2.41.7 → v3-rc-20261005

updated, app check passed, and the snapshot restored in a drill

GREEN
2026-10-06

[Jellyfin](https://localhavenstore.github.io/update-watch/jellyfin.html)

12.0 → 12.1

updated, app check passed, and the snapshot restored in a drill

GREEN
2026-10-05

[Jellyfin](https://localhavenstore.github.io/update-watch/jellyfin.html)

10.11.11 → 12.0

updated, app check passed, and the snapshot restored in a drill

GREEN
2026-10-05

[Nextcloud](https://localhavenstore.github.io/update-watch/nextcloud.html)

34.0.4 → 35.0.0

updated, app check passed, and the snapshot restored in a drill

GREEN
2026-10-05

[Immich](https://localhavenstore.github.io/update-watch/immich.html)

3.2.2 → 3.2.4

updated, app check passed, and the snapshot restored in a drill

GREEN
2026-10-05

[Nextcloud](https://localhavenstore.github.io/update-watch/nextcloud.html)

35.0.0 → 35.0.1

updated, app check passed, and the snapshot restored in a drill

GREEN
2026-10-05

GREEN update + app check + restore drill worked · YELLOW works with a step first · RED the update or the way back failed in our test.

## How a verdict is made

1. A new stable release appears (checked twice a day).
2. A fresh test machine starts the PREVIOUS version and fills it with test data.
3. A consistent snapshot is taken with the free [safe-update](https://github.com/localhavenstore/safe-update-recipes) tool.
4. The update runs; the app must come back healthy with the same data.
5. The snapshot is restored in a separate copy - proof you can go back.

A verdict is not a guarantee for your setup - read the release notes and keep backups. Made with AI assistance; tests run on our own machines. Not affiliated with the apps listed.

## For agents and scripts

The same verdicts as free JSON: [`/api/verdicts.json`](https://localhavenstore.github.io/api/verdicts.json), one app's newest test `/api/<app>/latest.json`, one exact step `/api/<app>/<from>-<to>.json` (404 = not tested). Each answer carries the scenario and the "not a guarantee" note. For AI coding agents there is a read-only skill, `ask-before-pull`, in the free [safe-homelab-ops skills](https://github.com/localhavenstore/safe-homelab-ops-skills).

supporter --early-access

## Get each verdict right after the test

Free verdicts appear 48 h after the test (launch week: right away). Supporters get every verdict by e-mail as soon as the test finishes, with the restore steps, and vote on the next app. Early access: the first alerts arrive within 30 days of joining, or you get a refund.

[Become a supporter · EUR 3/month](https://localhavenstore.gumroad.com/l/update-watch)or EUR 29/year
