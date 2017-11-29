#!/bin/sh

if [ ! -d /usr/src/app/local ]
then
  mkdir -p /usr/src/app/local
fi;

if [ ! -d /usr/src/app/local/files ]
then
  mkdir /usr/src/app/local/files
fi;

if [ ! -d /usr/src/app/local/temp ]
then
  mkdir /usr/src/app/local/temp
fi;

if [ ! -f /usr/src/app/local/db.sqlt ]
then
  sqlite3 /usr/src/app/local/db.sqlt < /usr/src/app/db.schema
fi;

npm run start
