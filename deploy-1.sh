#!/bin/bash

version=$1
echo "Deploying version $1"
git checkout develop
# git checkout -b rc-$version
# git push origin HEAD
node run.js