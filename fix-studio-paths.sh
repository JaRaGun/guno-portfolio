#!/bin/bash

# Fix asset paths in Sanity Studio build output for subfolder hosting
# This replaces absolute paths like "/static/..." with "/studio/static/..."

DIRECTORY="public/studio"

if [ ! -d "$DIRECTORY" ]; then
  echo "Error: $DIRECTORY does not exist."
  exit 1
fi

echo "Fixing asset paths in $DIRECTORY..."

# Handle macOS vs Linux sed
if [[ "$OSTYPE" == "darwin"* ]]; then
  SED_CMD="sed -i ''"
else
  SED_CMD="sed -i"
fi

# Find files containing "/static/" and replace with "/studio/static/"
grep -rl "/static/" "$DIRECTORY" | xargs $SED_CMD 's|"/static/|"/studio/static/|g'
grep -rl "/static/" "$DIRECTORY" | xargs $SED_CMD 's|src="/static/|src="/studio/static/|g'
grep -rl "/static/" "$DIRECTORY" | xargs $SED_CMD 's|href="/static/|href="/studio/static/|g'

echo "Done fixing paths."
