FROM node:12-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm i lerna@^3.20.2 -g --loglevel notice

COPY package*.json ./
RUN npm install --only=production --loglevel notice

COPY packages/app/package*.json ./packages/app/
COPY packages/app-router/package*.json ./packages/app-router/
COPY packages/authentication/package*.json ./packages/authentication/
COPY packages/config/package*.json ./packages/config/
COPY packages/config-parser/package*.json ./packages/config-parser/
COPY packages/database/package*.json ./packages/database/
COPY packages/db-common/package*.json ./packages/db-common/
COPY packages/ddd-common/package*.json ./packages/ddd-common/
COPY packages/errors/package*.json ./packages/errors/
COPY packages/healthcheck/package*.json ./packages/healthcheck/
COPY packages/http-common/package*.json ./packages/http-common/
COPY packages/inject/package*.json ./packages/inject/
COPY packages/logging/package*.json ./packages/logging/

COPY lerna.json .
RUN lerna bootstrap --hoist
RUN lerna run "npm install --only=production"

USER node

ENV TS_NODE_TRANSPILE_ONLY=true

CMD ["npm", "--prefix", "packages/app", "start"]
