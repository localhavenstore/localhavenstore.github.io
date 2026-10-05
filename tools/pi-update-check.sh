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
