<!-- https://localhavenstore.github.io/tools/pi-update-check.html -->
# Is your Raspberry Pi still getting security updates?

Free check · 10 seconds · read-only · no root · nothing is sent anywhere

**Short version:** Raspberry Pi OS "bullseye" (Debian 11) stopped getting free security updates on **31 August 2026** ([Debian's announcement](https://www.debian.org/News/2026/20260831)). Many Pis that run Home Assistant, Pi-hole, a NAS or a media server were set up on bullseye - or even older "buster" - and still work fine. They just do not get fixes for new security holes any more. This check tells you in 10 seconds which release your Pi runs, until when it is supported, and whether its updates are actually being installed.

## Step 1 - run the check

1. Open a terminal on your Pi (or log in with SSH).
2. Click **Copy** below, paste it into the terminal, press **Enter**.
3. Read the last line: `VERDICT`.

```
bash <<'PI_CHECK'
#!/usr/bin/env bash
# pi-update-check.sh - is this Raspberry Pi (or any Debian-based machine) still getting security updates?
# READ-ONLY: changes nothing, needs no root, uses no network (it reads what apt already has). About 10 seconds.
# Support dates from wiki.debian.org/LTS (checked 2026-10-05). MIT licence. Made with AI assistance.
# Not affiliated with Raspberry Pi Ltd or the Debian project.
set -u
CHECK_VERSION=1.0.0
TODAY=$(date +%F)
eval "$(. /etc/os-release 2>/dev/null && declare -p PRETTY_NAME VERSION_CODENAME 2>/dev/null)" ; [[ -r /etc/os-release ]] || { echo "No /etc/os-release - cannot tell which system this is."; exit 2; }
CODE=${VERSION_CODENAME:-}
[[ -z $CODE && -r /etc/debian_version ]] && CODE=$(cut -d/ -f1 /etc/debian_version)
MODEL=$(tr -d '\0' 2>/dev/null < /proc/device-tree/model || echo "not a Raspberry Pi (or model unknown)")
ARCH=$(dpkg --print-architecture 2>/dev/null || uname -m)

# codename | regular security support until | LTS until | next step
case $CODE in
  stretch)  REG=2020-07-06; LTS=2022-06-30 ;;
  buster)   REG=2022-08-01; LTS=2024-06-30 ;;
  bullseye) REG=2024-08-14; LTS=2026-08-31 ;;
  bookworm) REG=2026-06-10; LTS=2028-06-30 ;;
  trixie)   REG=2028-08-09; LTS=2030-06-30 ;;
  *)        REG=""; LTS="" ;;
esac
days_to() { echo $(( ( $(date -d "$1" +%s) - $(date -d "$TODAY" +%s) ) / 86400 )); }

echo "== Raspberry Pi update check $CHECK_VERSION ($TODAY)"
echo "Device:  $MODEL"
echo "System:  ${PRETTY_NAME:-unknown} ($ARCH)"
if grep -rqs "raspbian.raspberrypi" /etc/apt/sources.list /etc/apt/sources.list.d/ 2>/dev/null; then
  echo "Repos:   Raspbian (32-bit) - it rebuilds Debian's security fixes; when Debian stops, so does it"
fi

VERDICT=OK
if [[ -z $LTS ]]; then
  echo "Support: unknown release '${CODE:-?}' - not in this script's table (Debian 9-13)."; VERDICT=UNKNOWN
elif (( $(days_to "$LTS") < 0 )); then
  echo "Support: ENDED on $LTS - no more free security updates for ${CODE}."; VERDICT=UNSUPPORTED
elif (( $(days_to "$REG") < 0 )); then
  echo "Support: long-term support (LTS) until $LTS ($(days_to "$LTS") days left); regular support ended $REG."
  (( $(days_to "$LTS") < 365 )) && VERDICT=PLAN
else
  echo "Support: fully supported (regular until $REG, LTS until $LTS)."
fi

# when did apt last fetch package lists? (newest list file; 'apt update' refreshes them)
NEWEST=$(find /var/lib/apt/lists -maxdepth 1 -name '*Release' -printf '%T@\n' 2>/dev/null | sort -n | tail -1)
if [[ -n $NEWEST ]]; then
  AGE=$(( ( $(date +%s) - ${NEWEST%.*} ) / 86400 ))
  echo "Last apt update: $AGE day(s) ago"
  (( AGE > 30 )) && { [[ $VERDICT == OK ]] && VERDICT=STALE; }
else
  echo "Last apt update: never (no package lists found)"; [[ $VERDICT == OK ]] && VERDICT=STALE
fi

# pending upgrades according to those lists (simulation only - installs nothing)
SIM=$(LC_ALL=C apt-get -s -o Debug::NoLocking=1 upgrade 2>/dev/null | grep '^Inst ')
N=$(grep -c . <<< "$SIM"); NSEC=$(grep -ci 'security' <<< "$SIM")
echo "Waiting upgrades: $N (from a security repo: $NSEC)"
(( NSEC > 0 )) && [[ $VERDICT == OK ]] && VERDICT=STALE
[[ -f /var/run/reboot-required ]] && echo "Reboot required: yes (an installed update needs it)"
echo "Kernel: $(uname -r), up $(( $(cut -d. -f1 /proc/uptime) / 86400 )) day(s)"

echo
case $VERDICT in
  OK)          echo "VERDICT: OK - supported and up to date." ;;
  STALE)       echo "VERDICT: SUPPORTED, BUT NOT UPDATED - run: sudo apt update && sudo apt full-upgrade" ;;
  PLAN)        echo "VERDICT: SUPPORTED FOR LESS THAN A YEAR - plan the move to a newer release before $LTS." ;;
  UNSUPPORTED) echo "VERDICT: NO LONGER SUPPORTED - security holes found from now on stay open."
               echo "Next step: a fresh card with the current Raspberry Pi OS, then move your setup over (back up first)."
               echo "(Raspberry Pi recommends a fresh install over upgrading in place across releases.)" ;;
  *)           echo "VERDICT: UNKNOWN - check your release's end-of-life date by hand." ;;
esac
PI_CHECK
```

Prefer a file? Download [pi-update-check.sh](https://localhavenstore.github.io/tools/pi-update-check.sh), read it, then run `bash pi-update-check.sh`. It works on any Debian-based system (Debian 9-13, Raspberry Pi OS 32 and 64-bit).

## Step 2 - what the verdict means
| Verdict | What to do |
| OK | Nothing. Supported and up to date. |
| SUPPORTED, BUT NOT UPDATED | Updates exist but are not installed: `sudo apt update && sudo apt full-upgrade`, then reboot if it says so. |
| SUPPORTED FOR LESS THAN A YEAR | Fine for now; plan the move to a newer release before the date shown. |
| NO LONGER SUPPORTED | Back up, then set up a fresh card with the current Raspberry Pi OS and move your setup over (see below). |

## Release dates (from Debian)
| Release | Free security updates until |
| buster (Debian 10) | ended 30 June 2024 |
| bullseye (Debian 11) | ended 31 August 2026 |
| bookworm (Debian 12) | 30 June 2028 (long-term support since June 2026) |
| trixie (Debian 13) | 30 June 2030 |

Source: [wiki.debian.org/LTS](https://wiki.debian.org/LTS), checked 5 October 2026. Paid extended support for some packages exists (Freexian ELTS) - mostly relevant for companies.

## Not supported any more - now what?

- **Don't panic:** the Pi keeps running. The risk grows over time, mostly for Pis reachable from the internet.
- **Back up first** (a copy of the SD card or at least your config folders).
- Raspberry Pi recommends a **fresh install** of the current Raspberry Pi OS rather than upgrading in place across releases. The work is moving your setup: installed packages, config files, Docker containers, cron jobs.
- Home Assistant OS users: you are not affected by this - HA OS updates itself (check Settings -> System -> Updates).

Written with AI assistance. Tested in Debian 11, 12 and 13 systems (containers) - not yet on every Pi model. Not affiliated with Raspberry Pi Ltd or the Debian project. MIT licence.

## Questions

Is Raspberry Pi OS bullseye still getting security updates?

No. Debian 11 'bullseye' stopped getting free security updates on 31 August 2026 (Debian LTS end). Bookworm is covered until 30 June 2028 and trixie until 30 June 2030 (wiki.debian.org/LTS, checked 5 Oct 2026).

Does the check change anything on my Pi?

No. It is read-only, needs no root and uses no network - it reads what apt already has. It takes about 10 seconds.

Does it work on machines that are not a Raspberry Pi?

Yes, on any Debian-based machine; it then says the model is not a Raspberry Pi.

My Pi still works fine - why does this matter?

An unsupported release keeps working, but it no longer gets fixes for new security holes.
