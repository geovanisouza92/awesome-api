FROM node:10-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD package.json .
ADD package-lock.json .
RUN npm ci --only=production

ADD . .

USER node

CMD ["node", "-r", "ts-node/register/transpile-only", "./bin/www/index.ts"]
