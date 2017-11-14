#
#---- Base node ----
FROM node:7.7.4-alpine as base
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN apk add --update-cache sqlite && \
    apk add imagemagick


#
#---- Dependecies ----
FROM base as dependencies
COPY ./package.json /usr/src/app
RUN npm install --production && \
    cp -R node_modules prod_node_modules && \
    npm install

#
#---- Tests ----
FROM base as tests
COPY ./test /usr/src/app/test/

#
#---- Local storage ----
FROM base as local_storage
COPY ./local /usr/src/app/local
RUN  /usr/bin/sqlite3 /usr/src/app/local/db.sqlt < /usr/src/app/local/db.schema

#
#---- Release ----
FROM base as release
COPY ./.env.json /usr/src/app/
COPY ./src /usr/src/app/src/
COPY ./config /usr/src/app/config/
COPY --from=local_storage /usr/src/app/local /usr/src/app/local
COPY --from=dependencies /usr/src/app/prod_node_modules /usr/src/app/node_modules
COPY --from=tests /usr/src/app/test /usr/src/app/test
EXPOSE 3035
CMD [ "npm", "run", "dev" ]
