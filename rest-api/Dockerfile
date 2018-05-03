FROM node:alpine

WORKDIR /home/docker/workspace/rest-api

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm i

COPY src src

CMD npm run start


