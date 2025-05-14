#!/bin/bash
pnpm exec license-checker --production --summary > LICENSES.txt
cat LICENSES.txt