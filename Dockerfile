#
#---- Base node ----
FROM node:7.7.4-alpine as base
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY  ./package.json ./.env.json /usr/src/app/
COPY ./src /usr/src/app/src/
COPY ./config /usr/src/app/config/

#
#---- Dependecies ----
FROM base as dependencies
RUN npm install --production
RUN cp -R node_modules prod_node_modules
RUN npm install

#
#---- Local storage ----
FROM base as local_storage
COPY ./local /usr/src/app/local
RUN apk add --update sqlite && \
    sqlite3 /usr/src/app/local/db.sqlt -init /usr/src/app/local/db.schema

#
#---- Release ----
FROM base as release
COPY --from=dependencies /usr/src/app/prod_node_modules /usr/src/app/node_modules
# COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]
