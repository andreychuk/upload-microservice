FROM node:7.7.4-alpine

RUN apk add --update nginx

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY .cache /usr/src/app

RUN npm install --production

EXPOSE 8080
CMD [ "npm", "start" ]
