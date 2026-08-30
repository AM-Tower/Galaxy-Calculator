#!/usr/bin/env bash
# *****************************************************************************
# update.bc.sh
# Updates bignumber.js, the arbitrary precision library this project uses
# instead of floating point, then proves nothing broke before keeping it.
#
# It will not leave a broken library in place. If the Test Suite fails on the
# new file, the old one is put back and the script exits non zero.
#
#   ./update.bc.sh              fetch the latest, test it, keep it if it passes
#   ./update.bc.sh --dry-run    say what it would do, change nothing
#   ./update.bc.sh --force      reinstall even if the version is unchanged
#   ./update.bc.sh --version 11.1.5   pin a specific version
#   ./update.bc.sh --help
#
# Written for the Galaxy Calculator, Jeffrey Scott Flesher
# *****************************************************************************
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET="$HERE/bignumber.js"
BACKUP="$HERE/bignumber.js.bak"
TESTS="$HERE/run-tests.js"

WANT="latest"
DRY_RUN=0
FORCE=0

# ---------------------------------------------------------------- arguments
while [ $# -gt 0 ]; do
    case "$1" in
        --dry-run) DRY_RUN=1; shift ;;
        --force)   FORCE=1; shift ;;
        --version)
            if [ $# -lt 2 ]; then echo "update.bc.sh: --version needs a value" >&2; exit 2; fi
            WANT="$2"; shift 2 ;;
        --help|-h)
            sed -n '2,17p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'
            exit 0 ;;
        *) echo "update.bc.sh: unknown option $1, try --help" >&2; exit 2 ;;
    esac
done

say()  { printf '%s\n' "$*"; }
fail() { printf 'update.bc.sh: %s\n' "$*" >&2; exit 1; }

# ---------------------------------------------------------------- what we need
command -v curl >/dev/null 2>&1 || fail "curl is not installed"
command -v node >/dev/null 2>&1 || fail "node is not installed, it runs the Test Suite"
[ -f "$TESTS" ] || fail "cannot find run-tests.js next to this script"

# ---------------------------------------------------------------- where we are
version_of() {
    # Reads the version out of the banner at the top of the file
    [ -f "$1" ] || { printf 'none\n'; return; }
    local v
    v="$(grep -oE 'bignumber\.js v[0-9]+\.[0-9]+\.[0-9]+' "$1" 2>/dev/null | head -1 | sed 's/.*v//')"
    printf '%s\n' "${v:-unknown}"
}

CURRENT="$(version_of "$TARGET")"
say "Galaxy Calculator, bignumber.js updater"
say "  installed : $CURRENT"
say "  wanted    : $WANT"

# ---------------------------------------------------------------- fetch
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

NEW="$TMP/bignumber.js"
GOT_FROM=""

# dist/ is the layout from v10 on, the bare name is where v9 and older kept it
for base in "https://cdn.jsdelivr.net/npm/bignumber.js@${WANT}" \
            "https://unpkg.com/bignumber.js@${WANT}"; do
    for leaf in "dist/bignumber.js" "bignumber.js"; do
        if curl -fsSL --max-time 60 -o "$NEW" "$base/$leaf" 2>/dev/null; then
            if [ -s "$NEW" ]; then GOT_FROM="$base/$leaf"; break 2; fi
        fi
    done
done

[ -n "$GOT_FROM" ] || fail "could not download bignumber.js@${WANT} from any mirror"

# ---------------------------------------------------------------- sanity check
# A truncated or wrong file must never reach the project directory.
SIZE="$(wc -c < "$NEW" | tr -d ' ')"
[ "$SIZE" -gt 20000 ] || fail "downloaded file is only $SIZE bytes, that is not the library"
grep -q 'bignumber\.js v' "$NEW"   || fail "downloaded file has no bignumber.js banner"
grep -q 'BigNumber' "$NEW"         || fail "downloaded file does not mention BigNumber"
node --check "$NEW" 2>/dev/null    || fail "downloaded file is not valid JavaScript"

FETCHED="$(version_of "$NEW")"
say "  fetched   : $FETCHED  ($SIZE bytes)"
say "  source    : $GOT_FROM"

if [ "$FETCHED" = "$CURRENT" ] && [ "$FORCE" -eq 0 ]; then
    say ""
    say "Already on $CURRENT. Nothing to do, use --force to reinstall."
    exit 0
fi

if [ "$DRY_RUN" -eq 1 ]; then
    say ""
    say "Dry run. Would replace $CURRENT with $FETCHED, then run the Test Suite."
    exit 0
fi

# ---------------------------------------------------------------- install
if [ -f "$TARGET" ]; then
    cp -p "$TARGET" "$BACKUP"
    say "  backup    : $(basename "$BACKUP")"
fi
cp "$NEW" "$TARGET"

# ---------------------------------------------------------------- prove it
say ""
say "Running the Test Suite against $FETCHED"
say ""
if node "$TESTS"; then
    say ""
    say "PASSED. bignumber.js is now v$FETCHED, the old one is in $(basename "$BACKUP")."
    exit 0
fi

# ---------------------------------------------------------------- roll back
say ""
if [ -f "$BACKUP" ]; then
    cp -p "$BACKUP" "$TARGET"
    say "FAILED. The Test Suite did not pass on v$FETCHED, so v$CURRENT has been put back."
    say "Nothing in the project has changed. The rejected file is not kept."
else
    rm -f "$TARGET"
    say "FAILED. The Test Suite did not pass on v$FETCHED, and there was no backup to restore."
fi
exit 1
