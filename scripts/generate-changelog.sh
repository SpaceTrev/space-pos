#!/bin/bash
# Create a changelog from last tag to HEAD

LAST_TAG=$(git describe --tags --abbrev=0)
echo "Generating changelog from $LAST_TAG to HEAD..."

git log ${LAST_TAG}..HEAD --pretty=format:"* %s (%an)" > CHANGELOG.md

echo "✅ CHANGELOG.md updated"