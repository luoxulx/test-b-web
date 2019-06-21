FROM node:10.8.0-alpine
WORKDIR /app

ADD ["./package.json", "./public/index.html", "./public/favicon.ico", "./"]

RUN apk update \
  && apk add python2 \
  && apk add git \
  && npm install --no-optional


ADD ["./.postcssrc.js", "./.eslintignore", "./.eslintrc.js", ".env.production", "./"]

ADD ./build ./build
ADD ./src ./src
ADD ./public/static ./public/static

RUN  npm run build

FROM nginx:1.14-alpine
RUN rm -rf /usr/share/nginx/html
COPY --from=0 /app/dist /usr/share/nginx/html
