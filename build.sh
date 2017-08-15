#!/bin/sh

set -e

GIT=git@github.com:andreychuk/upload-microservice.git

if [ -z "$1" ]; then
  echo "[ERROR] Specify version as a first argument. Example: ./build.sh v0.0.1"
  exit
fi

rm -rf ./_build/.cache/
git clone $GIT ./_build/.cache/

cd ./_build/.cache/
git checkout $1

docker build -t andreychuk/upload-microservice:$1 ../
cd ..
rm -rf ./.cache/
#docker push andreychuk/upload-microservice:$1
