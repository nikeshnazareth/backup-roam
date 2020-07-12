#!/usr/bin/env bash

BACKUP_DIR="./notes"

mkdir -p $BACKUP_DIR

shopt -s nullglob
for archive in Roam-Export*.zip; do
    unzip $archive -d $BACKUP_DIR
    rm $archive
done

git add notes
git commit -m "Backup: $(date)"
git push
