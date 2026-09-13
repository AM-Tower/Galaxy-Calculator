#!/usr/bin/env bash
# *****************************************************************************
# backup.sh
# Timestamped source backup for the Galaxy Calculator, the same idea as the
# DocVoxVid deploy.sh --backup switch: rsync the source tree into a dated
# folder, keeping the directory structure, taking only the file types that
# make up the project and skipping the heavy folders.
#
# This is not a substitute for git. It is the other half of it: git tracks the
# deployable site, this takes everything, including the working notes .gitignore
# keeps out of the repo (FIXME.md, ISSUES.md, TODO.md, .claude/settings.local).
#
# A run also commits to the local repository, the same way the DocVoxVid
# git_check does: the copy is taken first, then whatever changed is committed,
# and the commit is pushed to GitHub only when --github asks for it.
#
# Backups land beside the project, one folder per run:
#
#   ../Backups/GalaxyCalculator/2026-09-13_1500/
#   cd /data/Nextcloud/workspace/GalaxyCalculator3/GalaxyCalculator
#   clear; chmod +x backup.sh && bash -n backup.sh  && shellcheck backup.sh && ./backup.sh --backup
#   ./backup.sh --backup        back up, then commit locally
#   ./backup.sh --backup --github   back up, commit, push to GitHub
#   ./backup.sh --github        commit and push, no backup
#   ./backup.sh --dry-run       say what would be copied and committed
#   ./backup.sh --no-commit     back up only, leave git alone
#   ./backup.sh --message="..." commit with your own message
#   ./backup.sh --path=DIR      back up somewhere else
#   ./backup.sh --list          show the backups already taken
#   ./backup.sh --help
#
# Written for the Galaxy Calculator, Jeffrey Scott Flesher
# *****************************************************************************
set -euo pipefail

SCRIPT_VERSION_BACKUP="0.0.1"
SCRIPT_DATE_BACKUP="[2026-09-13 @ 1500]"

# ------------------------------------------------------------------- colors
# Only when stdout is a terminal, so a redirected log stays readable.
if [ -t 1 ]; then
    NC='\033[0m'        # Normal Color
    LIME='\033[1;32m'   # Pass
    YELLOW='\033[1;33m' # Caution, Warning
    RED='\033[0;31m'    # Error
    CYAN='\033[0;36m'   # Info
    BLUE='\033[0;34m'   # Header
else
    NC='' LIME='' YELLOW='' RED='' CYAN='' BLUE=''
fi

# -------------------------------------------------------------------- paths
# The project root is where this script lives, so the backup is the same no
# matter which directory it is called from.
PATH_ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
APP_NAME="$(basename -- "${PATH_ROOT}")"
PATH_BACKUP="${PATH_BACKUP:-$(dirname -- "${PATH_ROOT}")/Backups/${APP_NAME}}"

# ----------------------------------------------------------------- switches
SWITCH_BACKUP=0
SWITCH_DRY_RUN=0
SWITCH_LIST=0
SWITCH_GITHUB=0
SWITCH_NO_COMMIT=0
SWITCH_HELP=0

# Commit message. Empty means one is made from the date, the way the DocVoxVid
# auto check-in does it.
COMMIT_MESSAGE=""

# ----------------------------------------------------------------- contents
# Folders never copied. orbit.calculator is the reference copy of the live
# site pulled down for comparison and holds a 539 MB video; Backups is where
# this script writes, so it must not copy itself.
EXCLUDE_FOLDERS=(
    ".git"
    "Backups"
    "0-Archive"
    "Archive"
    "orbit.calculator"
    "node_modules"
    "build"
    "dist"
)

# Folders copied whole, whatever is in them. These are the settings folders
# that carry files with no extension of their own.
INCLUDE_FOLDERS=(
    ".claude"
    ".vscode"
)

# Files taken by name, for the ones at the root that carry no extension of
# their own and would be missed by INCLUDE_EXTS.
INCLUDE_FILES=(
    ".gitignore"
    ".gitattributes"
    ".editorconfig"
    "LICENSE"
)

# File types that make up the project. Everything else is left behind.
INCLUDE_EXTS=(
    "html"
    "css"
    "js"
    "json"
    "md"
    "sh"
    "txt"
    "ico"
    "png"
    "svg"
    "jpg"
    "webp"
)

# *****************************************************************************
# Report one line: log_msg <Info|Pass|Warning|Error> <message>
# *****************************************************************************
log_msg()
{
    local level="${1}"
    local msg="${2}"
    local color icon
    case "${level,,}" in
        pass)    color="${LIME}";   icon="✔" ;;
        warning) color="${YELLOW}"; icon="⚠" ;;
        error)   color="${RED}";    icon="✖" ;;
        *)       color="${CYAN}";   icon="ℹ" ;;
    esac
    printf "%b %s [%s] %s%b\n" "${color}" "${icon}" "$(date '+%H:%M:%S')" "${msg}" "${NC}"
    return 0
}

show_header()
{
    printf "%b*****************************************************************************%b\n" "${BLUE}" "${NC}"
    printf "%b %s backup %s %s %b\n" "${BLUE}" "${APP_NAME}" "${SCRIPT_VERSION_BACKUP}" "${SCRIPT_DATE_BACKUP}" "${NC}"
    printf "%b*****************************************************************************%b\n" "${BLUE}" "${NC}"
    return 0
}

show_footer()
{
    printf "%b*****************************************************************************%b\n" "${BLUE}" "${NC}"
    return 0
}

# *****************************************************************************
# Show usage. Switches given on the command line are highlighted, the way the
# DocVoxVid help does it, so it is clear what the run was asked to do.
# *****************************************************************************
usage()
{
    printf "\n%b Galaxy Calculator backup %b\n" "${CYAN}" "${NC}"
    printf "%b Usage: ./backup.sh [--backup] [--github] [--dry-run] [--no-commit] [--message=M] [--path=DIR] [--list] %b\n" "${CYAN}" "${NC}"
    printf "%b Options: %b\n" "${CYAN}" "${NC}"
    if (( SWITCH_BACKUP == 1 )); then
        printf "%b --backup %b    Run project backup: |%b%s%b|%b\n" "${LIME}" "${CYAN}" "${LIME}" "${PATH_BACKUP}" "${CYAN}" "${NC}"
    else
        printf "%b --backup     Run project backup: |%s|%b\n" "${CYAN}" "${PATH_BACKUP}" "${NC}"
    fi
    if (( SWITCH_DRY_RUN == 1 )); then
        printf "%b --dry-run %b   List what would be copied, write nothing%b\n" "${LIME}" "${CYAN}" "${NC}"
    else
        printf "%b --dry-run    List what would be copied, write nothing%b\n" "${CYAN}" "${NC}"
    fi
    if (( SWITCH_GITHUB == 1 )); then
        printf "%b --github %b    Push the commit to GitHub: |%b%s%b|%b\n" "${LIME}" "${CYAN}" "${LIME}" "$(git_remote_url)" "${CYAN}" "${NC}"
    else
        printf "%b --github     Push the commit to GitHub, off by default%b\n" "${CYAN}" "${NC}"
    fi
    if (( SWITCH_NO_COMMIT == 1 )); then
        printf "%b --no-commit %b Back up only, leave git alone%b\n" "${LIME}" "${CYAN}" "${NC}"
    else
        printf "%b --no-commit  Back up only, leave git alone%b\n" "${CYAN}" "${NC}"
    fi
    printf "%b --message=M  Commit message, defaults to the date%b\n" "${CYAN}" "${NC}"
    printf "%b --path=DIR   Back up to DIR instead of the default%b\n" "${CYAN}" "${NC}"
    if (( SWITCH_LIST == 1 )); then
        printf "%b --list %b      Show the backups already taken%b\n" "${LIME}" "${CYAN}" "${NC}"
    else
        printf "%b --list       Show the backups already taken%b\n" "${CYAN}" "${NC}"
    fi
    printf "%b --help       Show this help message%b\n" "${CYAN}" "${NC}"
    printf "\n%b Kept: %s %s%b\n" "${CYAN}" "${INCLUDE_EXTS[*]}" "${INCLUDE_FILES[*]}" "${NC}"
    printf "%b Skipped: %s%b\n\n" "${CYAN}" "${EXCLUDE_FOLDERS[*]}" "${NC}"
    return 0
}

parse_args()
{
    local arg
    for arg in "$@"; do
        case "${arg}" in
            --backup)    SWITCH_BACKUP=1 ;;
            --dry-run)   SWITCH_DRY_RUN=1 ;;
            --list)      SWITCH_LIST=1 ;;
            --github)    SWITCH_GITHUB=1 ;;
            --no-commit) SWITCH_NO_COMMIT=1 ;;
            --message=*) COMMIT_MESSAGE="${arg#*=}" ;;
            --path=*)    PATH_BACKUP="${arg#*=}" ;;
            --help|-h)   SWITCH_HELP=1 ;;
            *)
                log_msg "Error" "Unknown option: ${arg}"
                usage
                exit 1
                ;;
        esac
    done
    return 0
}

# *****************************************************************************
# List the backups already taken, newest last, with the size of each.
# *****************************************************************************
list_backups()
{
    if [[ ! -d "${PATH_BACKUP}" ]]; then
        log_msg "Warning" "No backups yet: ${PATH_BACKUP}"
        return 0
    fi
    local found=0 dir
    for dir in "${PATH_BACKUP}"/*/; do
        [[ -d "${dir}" ]] || continue
        found=1
        printf "%b %s  %s%b\n" "${CYAN}" "$(du -sh -- "${dir}" | cut -f1)" "$(basename -- "${dir}")" "${NC}"
    done
    if (( found == 0 )); then log_msg "Warning" "No backups yet: ${PATH_BACKUP}"; fi
    return 0
}

# *****************************************************************************
# Run git inside the project, whatever directory the script was called from.
# *****************************************************************************
git_run()
{
    git -C "${PATH_ROOT}" "$@"
}

# Report the push URL, or a dash when there is no origin, for the help text.
git_remote_url()
{
    git_run remote get-url origin 2>/dev/null || printf -- "-"
}

# *****************************************************************************
# Commit whatever changed to the local repository, and push it to GitHub only
# when --github says so. A local commit is the default on every run: the backup
# is the copy off to the side, this is the history.
#
# Staging is git add -A, so .gitignore decides what is tracked. The working
# notes the backup exists to carry are ignored files and stay out of the repo.
# *****************************************************************************
git_check()
{
    show_header
    if (( SWITCH_NO_COMMIT == 1 )); then
        log_msg "Info" "Commit skipped (--no-commit)"
        show_footer
        return 0
    fi
    if ! command -v git >/dev/null 2>&1; then log_msg "Error" "git is not installed"; show_footer; return 1; fi
    if ! git_run rev-parse --is-inside-work-tree >/dev/null 2>&1; then
        log_msg "Warning" "Not a git repository, nothing to commit: ${PATH_ROOT}"
        show_footer
        return 0
    fi

    local branch
    branch="$(git_run rev-parse --abbrev-ref HEAD)"
    if [[ "${branch}" == "HEAD" ]]; then
        log_msg "Error" "Detached HEAD, check out a branch before committing"
        show_footer
        return 1
    fi
    log_msg "Info" "Local git check-in on branch: ${branch}"

    # -------------------------------------------------------------- dry run
    # Reported from git status, before anything is staged: a dry run has to
    # leave the index exactly as it found it.
    if (( SWITCH_DRY_RUN == 1 )); then
        local pending
        pending="$(git_run status --porcelain)"
        if [[ -z "${pending}" ]]; then
            log_msg "Info" "Dry run: nothing to commit"
        else
            log_msg "Info" "Dry run: $(printf "%s\n" "${pending}" | wc -l) file(s) would be committed"
            printf "%s\n" "${pending}"
        fi
        if (( SWITCH_GITHUB == 1 )); then log_msg "Info" "Dry run: would push ${branch} to $(git_remote_url)"; fi
        show_footer
        return 0
    fi

    # ---------------------------------------------------------------- stage
    if ! git_run add -A; then log_msg "Error" "git add failed"; show_footer; return 1; fi

    local changes
    changes="$(git_run diff --cached --name-only | wc -l)"

    # --------------------------------------------------------------- commit
    if (( changes == 0 )); then
        log_msg "Info" "No changes to commit"
    else
        local msg="${COMMIT_MESSAGE}"
        if [[ -z "${msg}" ]]; then msg="Local commit: $(date '+%Y-%m-%d %H:%M:%S')"; fi
        if ! git_run commit -m "${msg}"; then log_msg "Error" "git commit failed"; show_footer; return 1; fi
        log_msg "Pass" "Committed ${changes} file(s): ${msg}"
    fi

    # ----------------------------------------------------------------- push
    if (( SWITCH_GITHUB == 0 )); then
        log_msg "Info" "GitHub push skipped, local commit only (--github to push)"
        show_footer
        return 0
    fi
    log_msg "Info" "GitHub push requested (--github)"
    if ! git_run remote get-url origin >/dev/null 2>&1; then
        log_msg "Error" "No origin remote configured, cannot push"
        show_footer
        return 1
    fi
    if ! git_run push -u origin "${branch}"; then
        log_msg "Error" "git push failed"
        show_footer
        return 1
    fi
    log_msg "Pass" "Pushed ${branch} to $(git_remote_url)"
    show_footer
    return 0
}

# *****************************************************************************
# Create a timestamped backup of the project. Only the file types in
# INCLUDE_EXTS are taken, the folders in INCLUDE_FOLDERS are taken whole, the
# folders in EXCLUDE_FOLDERS are skipped, and the tree structure is kept.
# *****************************************************************************
run_backup()
{
    show_header
    if [[ ! -d "${PATH_ROOT}" ]]; then log_msg "Error" "PATH_ROOT does not exist: ${PATH_ROOT}"; return 1; fi
    if [[ -z "${PATH_BACKUP}" ]]; then log_msg "Error" "PATH_BACKUP is empty --backup"; return 1; fi
    if ! command -v rsync >/dev/null 2>&1; then log_msg "Error" "rsync is not installed"; return 1; fi

    local ts dest
    ts="$(date +"%Y-%m-%d_%H%M")"
    dest="${PATH_BACKUP}/${ts}"

    # Refuse to write inside the tree being copied: rsync would be reading a
    # folder that is growing underneath it.
    case "${dest}/" in
        "${PATH_ROOT}"/*) log_msg "Error" "Backup path is inside the project: ${dest}"; return 1 ;;
    esac

    local exclude_args=() include_args=() folder file ext
    for folder in "${EXCLUDE_FOLDERS[@]}"; do
        exclude_args+=("--exclude=${folder}/")
    done
    include_args+=("--include=*/")
    for folder in "${INCLUDE_FOLDERS[@]}"; do
        include_args+=("--include=/${folder}/**")
    done
    for file in "${INCLUDE_FILES[@]}"; do
        include_args+=("--include=/${file}")
    done
    for ext in "${INCLUDE_EXTS[@]}"; do
        if [[ "${ext}" == .* ]]; then
            include_args+=("--include=${ext}")
        else
            include_args+=("--include=*.${ext}")
        fi
    done

    local dry_args=()
    if (( SWITCH_DRY_RUN == 1 )); then
        dry_args+=("--dry-run")
        log_msg "Info" "Dry run, nothing is written: ${dest}"
    else
        log_msg "Info" "Creating backup at: ${dest}"
        if ! mkdir -p -- "${dest}"; then log_msg "Error" "Creating backup at: ${dest}"; return 1; fi
    fi

    if ! rsync -av \
        --prune-empty-dirs \
        "${dry_args[@]}" \
        "${exclude_args[@]}" \
        "${include_args[@]}" \
        --exclude='*' \
        "${PATH_ROOT}/" "${dest}/"; then
        log_msg "Error" "rsync failed, backup not complete: ${dest}"
        return 1
    fi

    if (( SWITCH_DRY_RUN == 1 )); then
        log_msg "Pass" "Dry run completed, nothing written"
    else
        log_msg "Pass" "Backup completed at ${dest} ($(du -sh -- "${dest}" | cut -f1))"
    fi
    show_footer
    return 0
}

main()
{
    parse_args "$@"
    # Nothing asked for is the same as asking for help, so a bare run cannot
    # write anything by accident.
    if (( $# == 0 )); then usage; return 0; fi
    if (( SWITCH_HELP == 1 )); then usage; return 0; fi
    if (( SWITCH_LIST == 1 )); then list_backups; return 0; fi

    # The copy is taken first: if the commit or the push goes wrong, the state
    # of the project is already safely off to one side.
    if (( SWITCH_BACKUP == 1 || SWITCH_DRY_RUN == 1 )); then
        if ! run_backup; then return 1; fi
    fi
    if (( SWITCH_BACKUP == 1 || SWITCH_DRY_RUN == 1 || SWITCH_GITHUB == 1 )); then
        git_check
        return $?
    fi
    usage
    return 0
}

main "$@"

# *****************************************************************************
# End of backup.sh
# *****************************************************************************
