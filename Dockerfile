FROM node:10-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

USER node

CMD ["node", "-r", "ts-node/register/transpile-only", "./bin/www/index.ts"]
