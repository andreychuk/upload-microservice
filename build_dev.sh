#!/bin/sh

if [ $# -ne 1 ]; then
  echo "[ERROR] Please specify one argument (docker_username). Example: ./build.sh docker_username "
  exit
fi

cd _build
docker build -t $1/upload-microservice:latest  -f Dockerfile_dev ./
