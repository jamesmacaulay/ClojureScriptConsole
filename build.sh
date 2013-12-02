#!/bin/bash

cd $(dirname ${0})/src

echo "Building cljs.js"
time ../../bin/cljsc ../../src/cljs/chrome_console.cljs > chrome_console.js
