#!/bin/bash
set -ev
npm run build
if [ "${TRAVIS}" = "true" ]; then
    git add -a
    git commit -m "Updating bundles"
    git push
fi
