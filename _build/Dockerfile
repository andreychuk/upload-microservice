FROM node:7.7.4-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY .cache /usr/src/app

RUN npm install --production && \
    apk add --update sqlite && \
    sqlite3 /usr/src/app/local/db.sqlt -init /usr/src/app/local/db.schema

EXPOSE 8080
CMD [ "npm", "start" ]
