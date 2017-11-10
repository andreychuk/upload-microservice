#!/bin/sh

if [ $# -ne 2 ]; then
  echo "[ERROR] Please specify two arguments (version docker_username). Example: ./build.sh v0.0.1 docker_username "
  exit
fi

./build.sh $1 $2 && docker push $2/upload-microservice:$1
