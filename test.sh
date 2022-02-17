#!/bin/bash

git log \
    --pretty=format:'{%n  "tags": "%(describe)",%n  "message": "%f"%n},' \
    $@ | \
    perl -pe 'BEGIN{print "["}; END{print "]\n"}' | \
    perl -pe 's/},]/}]/' > log.json