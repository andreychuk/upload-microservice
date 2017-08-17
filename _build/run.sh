#!/bin/sh

npm start &

nginx -g "daemon off;"
