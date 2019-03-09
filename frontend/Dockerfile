FROM ubuntu:latest

RUN mkdir /app
ADD . /app
WORKDIR /app

RUN apt-get update && apt-get upgrade -y
RUN apt-get install curl -y
RUN apt-get install -y gnupg2
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn -y
RUN yarn build


FROM nginx:1.15.7-alpine

COPY /build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 80
