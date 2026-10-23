<!-- https://localhavenstore.github.io/update-watch/index.html -->
update-watch

# Is it safe to *update*?

Before you run `docker compose pull`: we already did - on a throw-away machine, with real images and test data (users, files). Each verdict is one tested scenario: snapshot, update, app check, restore drill.

[See the verdicts](#verdicts)[Supporter · EUR 3/month](https://localhavenstore.gumroad.com/l/update-watch)

****** test machine

$ update-watch --latest

n8n 2.43.7 -> 2.43.8 GREEN 21 Oct

n8n 2.43.6 -> 2.43.7 GREEN 21 Oct

Nextcloud 35.0.1 -> 35.0.2 GREEN 19 Oct

Home Assistant 2026.10.1 -> 2026.10.2 GREEN 17 Oct

n8n 2.43.5 -> 2.43.6 GREEN 15 Oct

Immich 3.3.1 -> 3.3.3 GREEN 15 Oct

# real runs on throw-away test machines

## Apps we watch

6 apps · 28 verdicts · last test 21 Oct 2026

[

4 verdicts

### Home Assistant

2026.10.1 → 2026.10.2

GREENtested 17 Oct 2026](https://localhavenstore.github.io/update-watch/homeassistant.html)[

4 verdicts

### Immich

3.3.1 → 3.3.3

GREENtested 15 Oct 2026](https://localhavenstore.github.io/update-watch/immich.html)[

3 verdicts

### Jellyfin

12.1 → 12.2

GREENtested 06 Oct 2026](https://localhavenstore.github.io/update-watch/jellyfin.html)[

3 verdicts

### Nextcloud

35.0.1 → 35.0.2

GREENtested 19 Oct 2026](https://localhavenstore.github.io/update-watch/nextcloud.html)[

2 verdicts

### Vaultwarden

1.37.3 → 1.37.4

GREENtested 06 Oct 2026](https://localhavenstore.github.io/update-watch/vaultwarden.html)[

12 verdicts

### n8n

2.43.7 → 2.43.8

GREENtested 21 Oct 2026](https://localhavenstore.github.io/update-watch/n8n.html)

## All verdicts

[n8n](https://localhavenstore.github.io/update-watch/n8n.html)

2.43.7 → 2.43.8

updated, app check passed, and the snapshot restored in a drill

Reported by users for this release (1) - not part of our test

- AI Agent workflows with the Google Gemini Chat Model fail now and then with fetch failed after about 3 minutes. The reporter saw it on older versions too - not hit in our test (n8n #41591, open)

Read by us on 2026-10-21 from the projects' issue trackers. Not verified by us.

GREEN
2026-10-21

[n8n](https://localhavenstore.github.io/update-watch/n8n.html)

2.43.6 → 2.43.7

updated, app check passed, and the snapshot restored in a drill

Reported by users for this release (3) - not part of our test

- In the Agent Builder the Instructions field drops every typed letter on 2.43.7. Typing in the raw Markdown mode still works - not hit in our test (n8n #41287, closed in 2.44.0)
- The Production Checklist pops up again on every reload of a published workflow, even after you close it - not hit in our test (n8n #41471, open)
- A Wait node set to respond when a form is submitted only answers the form after the nodes after it have finished - not hit in our test (n8n #41332, open)

Read by us on 2026-10-21 from the projects' issue trackers. Not verified by us.

GREEN
2026-10-21

[Nextcloud](https://localhavenstore.github.io/update-watch/nextcloud.html)

35.0.1 → 35.0.2

updated, app check passed, and the snapshot restored in a drill

Reported by users for this release (2) - not part of our test

- Some users still get a missing database table oc_federated_invites after updating to 35.0.2 - not hit in our test (server #65549, open)
- A warning is written to the log each time /index.php is opened since 35.0.2 - not hit in our test (server #65652, open)

Read by us on 2026-10-19 from the projects' issue trackers. Not verified by us.

GREEN
2026-10-19

[Home Assistant](https://localhavenstore.github.io/update-watch/homeassistant.html)

2026.10.1 → 2026.10.2

updated, app check passed, and the snapshot restored in a drill

Reported by users for this release (5) - not part of our test

- EDL21 smart meter readers stop delivering data after updating to 2026.10.2. Two users say going back to 2026.10.1 fixed it, one says it did not - not hit in our test (core #187079, open)
- Backups with local add-ons: when a backup location gets its own encryption, that part can be left out or stay locked, so a restore may fail or skip local add-ons - not hit in our test (core #187111, open)
- Z-Wave can reload and show all its devices as unavailable for about 20 to 30 seconds when a device is found without a device class, for example while adding devices - not hit in our test (core #187201, open)
- The HomeKit Bridge options screen can show Exclude although Include was saved, so it does not show the real entity filter - not hit in our test (frontend #55030, open)
- When adding a Matter device, changing both its name and Show as at once gives an Entity not found error and the Show as choice is lost - not hit in our test (frontend #55005, open)

Read by us on 2026-10-21 from the projects' issue trackers. Not verified by us.

GREEN
2026-10-17

[n8n](https://localhavenstore.github.io/update-watch/n8n.html)

2.43.5 → 2.43.6

updated, app check passed, and the snapshot restored in a drill

Reported by users for this release (2) - not part of our test

- Workflows whose trigger or Wait node has an ID longer than 36 characters (for example made through the API) may not publish and keep running the old version - not hit in our test (n8n #40606, open)
- With a proxy set, the built-in AI Assistant can ignore NO_PROXY, so its calls to a model server inside your network can fail. A contributor says proxy support is still pending - not hit in our test (n8n #41342, open)

Read by us on 2026-10-21 from the projects' issue trackers. Not verified by us.

GREEN
2026-10-15

[Immich](https://localhavenstore.github.io/update-watch/immich.html)

3.3.1 → 3.3.3

updated, app check passed, and the snapshot restored in a drill

Reported by users for this release (4) - not part of our test

- The People page and name search can be very slow on 3.3.3 with big libraries (one user: 20 to 30 seconds with about 94,000 people) - not hit in our test (immich #32463, closed in 3.3.4)
- Face detection on a photo that was cropped or rotated in Immich can put face boxes in the wrong place and remove existing faces and their people - not hit in our test (immich #32499, open)
- After a photo is rotated in Immich, its text can no longer be found with OCR search - not hit in our test (immich #32484, open)
- Some videos, for example MJPEG AVI from older cameras, do not play with real-time transcoding on, because a wrong frame rate is passed to ffmpeg - not hit in our test (immich #32471, open)

Read by us on 2026-10-21 from the projects' issue trackers. Not verified by us.

GREEN
2026-10-15

[n8n](https://localhavenstore.github.io/update-watch/n8n.html)

2.43.4 → 2.43.5

updated, app check passed, and the snapshot restored in a drill

Reported by users for this release (2) - not part of our test

- Simple production webhooks on 2.43.5 can switch between fast (about 50 to 70 ms) and slow (about 210 to 300 ms) answers. A contributor calls this a known problem - not hit in our test (n8n #41322, open)
- Workflows whose trigger or Wait node has an ID longer than 36 characters (for example made through the API) may not publish and keep running the old version - not hit in our test (n8n #40606, open)

Read by us on 2026-10-21 from the projects' issue trackers. Not verified by us.

GREEN
2026-10-14

[n8n](https://localhavenstore.github.io/update-watch/n8n.html)

2.42.7 → 2.43.4

updated, app check passed, and the snapshot restored in a drill

Reported by users for this release (2) - not part of our test

- IMAP email triggers can stay switched off after a short network outage, even after a restart, until each workflow is unpublished and published again - not hit in our test (n8n #41541, open)
- Workflows whose trigger or Wait node has an ID longer than 36 characters (for example made through the API) may not publish and keep running the old version - not hit in our test (n8n #40606, open)

Read by us on 2026-10-21 from the projects' issue trackers. Not verified by us.

GREEN
2026-10-14

[n8n](https://localhavenstore.github.io/update-watch/n8n.html)

2.42.6 → 2.42.7

updated, app check passed, and the snapshot restored in a drill

GREEN
2026-10-12

[Home Assistant](https://localhavenstore.github.io/update-watch/homeassistant.html)

2026.10.0 → 2026.10.1

updated, app check passed, and the snapshot restored in a drill

Reported by users for this release (8) - not part of our test

- LIFX bulbs going unavailable: the fix is merged for 2026.10.2 and is not in 2026.10.1 (core #185640)
- A very large known_devices.yaml (one report: 142,000 lines, 2.1 MB) can make the start hang after the update and cause a roll-back - moving the file away helped 6 users (core #185571, #186069, both open)
- Since 2026.10.0 mqtt.publish and mqtt.dump need an admin (release notes): another user's dashboard button - also one starting a script - publishes nothing. A helper button with an automation still does (tested by us)
- Built-in TP-Link (Kasa): older plugs and switches (HS103, KP115, HS220) time out at set-up on 2026.10.1, fine on 2026.10.0 (core #185859). Cause found. Fix (python-kasa #1792) in no release yet. Tapo Control: use 7.2.8
- Kiosk Mode (HACS): some options break on 2026.10.1 - fixed in Kiosk Mode v15.0.0, update it together with Home Assistant (kiosk-mode #620, closed)
- A hung DNS lookup can block one hostname until a restart - fixed in 2026.10.2 (core #185645, closed)
- Home dashboard: after a restart the welcome banner can come back, and dismissing it wiped one user's favourites and shortcuts - fix merged 19 Oct, after 2026.10.2 (frontend #54822, closed)
- HACS integrations: some stop loading or lose an action until updated (pins, cv.vol, hass argument, pkg_resources). Built-in: Tank Utility off, EDL21 breaks with bitstring 5.0.0 - fix set for 2026.10.3 (core #185883)

Read by us on 2026-10-22 from the projects' issue trackers. Not verified by us.

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
- The update can roll back when Core starts too slowly: a very large known_devices.yaml was the cause for several users, the first report named an MQTT select option (core #185571, #186069, open)
- Custom (HACS) integrations: some stop loading or lose an action until their authors update them (exact library pins, cv.vol, hass as first argument, pkg_resources). The built-in Tank Utility is switched off in 2026.10

Read by us on 2026-10-22 from the projects' issue trackers. Not verified by us.

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

A verdict is one tested scenario. Your setup may differ - read the release notes and keep backups. Made with AI assistance; tests run on our own machines. Not affiliated with the apps listed.

## For agents and scripts

The same verdicts as free JSON: [`/api/verdicts.json`](https://localhavenstore.github.io/api/verdicts.json), one app's newest test `/api/<app>/latest.json`, one exact step `/api/<app>/<from>-<to>.json` (404 = not tested). Each answer carries the scenario and the "your setup may differ" note. For AI coding agents there is a read-only skill, `ask-before-pull`, in the free [safe-homelab-ops skills](https://github.com/localhavenstore/safe-homelab-ops-skills).

supporter --early-access

## Get each verdict right after the test

Free verdicts appear 48 h after the test (launch week: right away). Supporters get every verdict by e-mail as soon as the test finishes, with the restore steps, and vote on the next app. Early access: the first alerts arrive within 30 days of joining, or you get a refund.

[Become a supporter · EUR 3/month](https://localhavenstore.gumroad.com/l/update-watch)or EUR 29/year
