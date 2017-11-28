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
ENV NPM_INSTALL_ARGS=install
COPY ./package.json /usr/src/app
RUN npm $NPM_INSTALL_ARGS


#
#---- Tests ----
FROM base as tests
COPY ./test /usr/src/app/test/

#
#---- Local storage ----
FROM base as local_storage
COPY ./local /usr/src/app/local
RUN /usr/bin/sqlite3 /usr/src/app/local/db.sqlt < /usr/src/app/local/db.schema

#
#---- Release ----
FROM base as release
ENV PORT=3035
WORKDIR /usr/src/app
VOLUME [ "/usr/src/app/src", "/usr/src/app/test", "/usr/src/app/config", "/usr/src/app/local" ]
COPY ./src /usr/src/app/src/
COPY ./config /usr/src/app/config
COPY ./package.json /usr/src/app/
COPY --from=local_storage /usr/src/app/local /usr/src/app/local
COPY --from=dependencies /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=tests /usr/src/app/test /usr/src/app/test
EXPOSE $PORT
CMD [ "npm", "run", "start" ]
