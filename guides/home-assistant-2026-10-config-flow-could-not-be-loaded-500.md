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

Also seen: the Ecovacs Mower custom integration 0.10.0 asked for `deebot-client==18.5.1` and showed this error on 2026.10 (reported by a user). Its version 0.11.0 of 11 Oct 2026 asks for `deebot-client>=18.6.0` - update it in HACS. We read both requirement lines in the project's files; we did not run 0.11.0 and we have no mower.

## Why it breaks

Home Assistant 2026.10 ships `protobuf 7.36.0` (2026.9.4 shipped `6.32.0`). EcoFlow Cloud 1.7.1 asks for `protobuf==6.32.0` - exactly that version. Both cannot be installed together, so Home Assistant refuses to load the integration. Version 1.7.2 of the integration (8 Oct 2026) asks for `protobuf>=6.32.0,<8` and loads again. In our test nothing else was touched: it is a version pin.

## The same message can have other causes - the log line tells you which

The dialog text is the same for every failure while an integration's form is being built. Search the log for the integration's name and compare the last line of the error:

| last line in the log | what it means | what helps |
| `Unable to install package <name>==<version> ... your requirements are unsatisfiable` | The integration demands one exact version of a library that 2026.10 no longer ships (this page). | Update the integration; tested by us with EcoFlow Cloud. |
| `AttributeError: module 'homeassistant.helpers.config_validation' has no attribute 'vol'` | The integration reaches for the `voluptuous` library through a Home Assistant helper (`cv.vol`) that 2026.10 no longer offers. | Needs a small change by the integration's author - there is no setting on your side. Tested by us on 11 Oct 2026 with Rental Control 3.7.0: the form opens on 2026.9.4, fails on 2026.10.1, and opened again after we imported the library directly in its schema file. |
| `Error occurred loading flow for integration <name>: No module named 'pkg_resources'` | A library the integration uses still imports `pkg_resources`. Home Assistant 2026.10 ships setuptools 84, which no longer contains it (2026.9.4 shipped 81). Home Assistant itself switched off its built-in Tank Utility integration in 2026.10 for this reason. | A newer version of the integration or of that library. Tested by us on 11 Oct 2026 with Vorwerk Kobold 2026.9.1 (it asks for `pybotvac==0.0.28`): the set-up form opens on 2026.9.4, does not open on 2026.10.1 (the request answered 404 here, so the dialog text can differ - the log line is what counts), and opens again with `pybotvac==0.0.29`, as two users report in that project's issues. In our code reading of the 3,240 HACS integrations none imports `pkg_resources` in its own code - the import sits in libraries, which we cannot count that way. |
| `AttributeError: property 'config_entry' of '...OptionsFlowHandler' object has no setter` | An older way of writing an integration's *options* dialog (Configure). **This one is not caused by 2026.10:** Home Assistant dropped the old form in 2025.12. | Needs a small change by the integration's author. Tested by us on 11 Oct 2026 with Redback Technologies 2026.9.1 and a stand-in entry (we have no Redback account): the options dialog fails with this line on 2026.9.4 *and* on 2026.10.1, and opens after that one line is deleted. More on this below. |

## 2026.10 also breaks some actions - and only at the moment they run

This one shows no dialog and nothing at start-up. An automation or a button calls an integration's action, and the log says:

```
AttributeError: 'HomeAssistant' object has no attribute 'hass'
```

Five helper functions for actions (`extract_entity_ids`, `async_extract_entities`, `async_extract_entity_ids`, `async_extract_config_entry_ids`, `verify_domain_control`) no longer accept `hass` as their first argument in 2026.10. Home Assistant 2026.9 still took the old form and only wrote a warning:

```
The deprecated argument hass was passed to async_extract_config_entry_ids from caffeine_tracker. It will be removed in HA Core 2026.10.
```

We tested it on 11 Oct 2026 with the Caffeine Tracker integration 0.2.2 on a throw-away machine: on 2026.9.4 its action works (with that warning), on 2026.10.1 the same action fails with the line above. After removing `hass` from that one call the action works on 2026.10.1 - and on 2026.9.4 too, so the change is safe for people who have not updated yet.

How many integrations are affected? We read the code of the 3,240 integrations in the HACS list, each at the version HACS installs (11 Oct 2026), and looked for such a call that is not behind a version check. **6 have one** (26 could not be read). These were found by reading code - we did not run them:

| integration (repository) | version read | where |
| `astrandb/miele` | v2026.2.0 | `services.py:101 async_extract_config_entry_ids` |
| `klejejs/ha-thermia-heat-pump-integration` | 5.4.0 | `services.py:35 async_extract_entity_ids` |
| `Nosdave/ha-lg-ac-infrared` | v0.2.5 | `__init__.py:180 async_extract_entity_ids` |
| `nyffchanium/argoclima-integration` | v1.1.4 | `service.py:84 verify_domain_control` |
| `swingerman/ha-dual-smart-thermostat` | v0.13.2 | `climate.py:504 extract_entity_ids` |
| `zhbjsh/homeassistant-ssh` | v1.3.1 | `__init__.py:310 async_extract_config_entry_ids` |

If you use one of them: the action that calls this line fails on 2026.10 until the author changes it; everything else in the integration can work normally. Look for a newer version first.

## The options dialog that has been failing since 2025.12

If the 500 message appears when you press **Configure** on an integration that is already set up, and the log ends with `has no setter`, the cause is older than this update. The same line in the code breaks the options dialog on every Home Assistant since 2025.12 - in our test on 2026.9.4 and on 2026.10.1 alike. The integration itself keeps running; only its options cannot be opened. In the same code reading we found that line, without a version check, in **185 of the 3,240** HACS integrations. One of them was run by us (above); the others are a pattern found in code, so treat the number as "about this many".

## The fix (for the pinned-library case)

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

Tested by us on 11 Oct 2026: Home Assistant Container 2026.9.4 and 2026.10.1, EcoFlow Cloud 1.7.1 and 1.7.2, Rental Control 3.7.0, Caffeine Tracker 0.2.2, Vorwerk Kobold 2026.9.1 and the options dialog of Redback Technologies 2026.9.1, on throw-away test machines. We have no EcoFlow device and no EcoFlow account: we tested the integration loading and its set-up dialog, not a power station. Other integrations can show the same message for another library - the log line names it. Not an official Home Assistant page; not affiliated with Home Assistant, EcoFlow or the integration's author. Made with AI assistance.
