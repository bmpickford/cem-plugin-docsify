#!/bin/bash
## Moves the README and package.json into the dist folder
## so it is ready to be published from there.
## Publishing needs to be done inside the dist folder
## to avoid publishing the dist dir
if [ ! -f package.json ] ; then
    echo "Please make sure you're in the root directory";
fi

cat package.json | jq 'del(.files)' > dist/package.json
cp README.md ./dist