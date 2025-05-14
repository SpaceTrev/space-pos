#!/bin/bash
# Sync main into dependabot/breaking-changes

git checkout main
git pull origin main

if git show-ref --verify --quiet refs/heads/dependabot/breaking-changes; then
  git checkout dependabot/breaking-changes
else
  git checkout -b dependabot/breaking-changes origin/dependabot/breaking-changes || git checkout -b dependabot/breaking-changes
fi

git merge main --no-edit
git push origin dependabot/breaking-changes