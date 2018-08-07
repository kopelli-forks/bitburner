#!/bin/bash
set -ev
npm run build
if [ "${TRAVIS}" = "true" ]; then
    git add -u
    git commit -m "Updating bundles"
    git push
fi
