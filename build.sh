#!/bin/sh

GIT_REPO=$(git config --get remote.origin.url)

echo "Cloning repostory : "
echo $GIT_REPO

if [ $# -ne 2 ]; then
  echo "[ERROR] Please specify two arguments (branch_name docker_username). Example: ./build.sh dev docker_username "
  exit
fi

rm -rf ./_build/.local/
mkdir -p ./_build/.local/
cp ./local/ ./_build/.local/

rm -rf ./_build/.cache/
mkdir -p ./_build/.cache/
git clone $GIT_REPO ./_build/.cache/

docker build -t $2/upload-microservice:$1 -f Dockerfile ./

rm -rf ./.cache/
rm -rf ./.local/
