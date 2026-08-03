#!/usr/bin/env sh

set -eu

case "${1-}" in
  "" | --check) ;;
  *)
    echo "Usage: sh scripts/sync-instructions.sh [--check]" >&2
    exit 2
    ;;
esac

SCRIPT_DIR=$(CDPATH= cd "$(dirname "$0")" && pwd)
REPOSITORY_ROOT=$(CDPATH= cd "$SCRIPT_DIR/.." && pwd)
SOURCE_FILE="$REPOSITORY_ROOT/CODEX.md"
TARGET_FILE="$REPOSITORY_ROOT/.github/copilot-instructions.md"

if [ ! -f "$SOURCE_FILE" ]; then
  echo "Canonical instruction file is missing: $SOURCE_FILE" >&2
  exit 1
fi

if [ "${1-}" = "--check" ]; then
  if [ -f "$TARGET_FILE" ] && cmp -s "$SOURCE_FILE" "$TARGET_FILE"; then
    echo "Instruction files are synchronized."
    exit 0
  fi

  echo "Instruction files are not synchronized. Run: sh scripts/sync-instructions.sh" >&2
  exit 1
fi

mkdir -p "$(dirname "$TARGET_FILE")"
cp "$SOURCE_FILE" "$TARGET_FILE"
echo "Synchronized $TARGET_FILE from CODEX.md."
