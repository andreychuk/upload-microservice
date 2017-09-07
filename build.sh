#!/bin/sh

GIT_REPO=$(git config --get remote.origin.url)

echo "Cloning repostory : "
echo $GIT_REPO

if [ $# -ne 2 ]; then
  echo "[ERROR] Please specify two arguments (version docker_username). Example: ./build.sh v0.0.1 docker_username "
  exit
fi


rm -rf ./_build/.cache/
mkdir -p ./_build/.cache/
git clone $GIT_REPO ./_build/.cache/

cd ./_build/.cache/
git fetch --all --tags --prune
git checkout tags/$1

cd ..

docker build -t $2/upload-microservice:$1 ./
rm -rf ./.cache/


