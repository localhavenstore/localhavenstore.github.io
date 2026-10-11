<!-- https://localhavenstore.github.io/guides/home-assistant-2026-10-config-flow-could-not-be-loaded-500.html -->
guide Home Assistant

# Home Assistant 2026.10: "Config flow could not be loaded: 500 Internal Server Error" - the cause and the fix

After the update to Home Assistant 2026.10 a custom integration will not set up or load, and the dialog only says:

```
Config flow could not be loaded: 500 Internal Server Error Server got itself in trouble
```

That message does not tell you why. In our test the reason was one line in the log: the integration demanded **one exact version of a Python library** that the new Home Assistant no longer ships. We reproduced it with the EcoFlow Cloud integration on a fresh test machine (11 Oct 2026) - what we saw, and the fix.

## What you see in the log

```
Unable to install package protobuf==6.32.0: error: No solution found when resolving dependencies
  cause: Because you require protobuf==6.32.0 and protobuf==7.36.0, we can conclude that your requirements are unsatisfiable.
```

Where to look: **Settings > System > Logs** and search for `Unable to install package`. With Home Assistant in Docker: `docker compose logs homeassistant | grep -m1 -A1 "Unable to install"`.

## What we measured

Setup: Home Assistant Container in Docker on a throw-away test machine, one test user, the EcoFlow Cloud custom integration copied into `custom_components`. Each time we opened the integration's set-up dialog (Settings > Devices & services > Add integration).

| Home Assistant | integration | result |
| Home Assistant 2026.9.4 | EcoFlow Cloud 1.7.1 | the set-up dialog opens |
| Home Assistant 2026.10.1 | EcoFlow Cloud 1.7.1 | **error 500** (the message above) |
| Home Assistant 2026.10.1 | EcoFlow Cloud 1.7.2 | the set-up dialog opens again |

## Why it breaks

Home Assistant 2026.10 ships `protobuf 7.36.0` (2026.9.4 shipped `6.32.0`). EcoFlow Cloud 1.7.1 asks for `protobuf==6.32.0` - exactly that version. Both cannot be installed together, so Home Assistant refuses to load the integration. Version 1.7.2 of the integration (8 Oct 2026) asks for `protobuf>=6.32.0,<8` and loads again. In our test nothing else was touched: it is a version pin.

## The fix

- **Already on 2026.10 and seeing the error:** update the integration (in HACS: EcoFlow Cloud to 1.7.2 or newer), then restart Home Assistant.
- **Not updated yet:** update the integration first, then Home Assistant.

## Check your other custom integrations before the next update

Every custom integration has a `manifest.json` with a `requirements` line. An entry with two equals signs demands one exact version - that is the kind that can stop loading after an update. This lists them:

```
grep -H '==' /config/custom_components/*/manifest.json
```

(In Docker the folder is the `config` folder you mounted.) A hit is not a problem by itself; it tells you which integrations to look at when a Home Assistant release changes that library.

## If you want it done for you

We test Home Assistant updates on throw-away machines before you click: the [free update verdicts](https://localhavenstore.github.io/update-watch/). And if your Home Assistant is broken after an update, there is a [written fix, tested on a copy, no call](https://www.upwork.com/services/product/2108995202804377773).

Tested by us on 11 Oct 2026: Home Assistant Container 2026.9.4 and 2026.10.1, EcoFlow Cloud 1.7.1 and 1.7.2, one throw-away test machine. We have no EcoFlow device and no EcoFlow account: we tested the integration loading and its set-up dialog, not a power station. Other integrations can show the same message for another library - the log line names it. Not an official Home Assistant page; not affiliated with Home Assistant, EcoFlow or the integration's author. Made with AI assistance.
