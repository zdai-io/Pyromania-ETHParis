FROM node:latest

RUN mkdir /app
COPY app/ /app 
WORKDIR /app

RUN npm i
RUN npm install @skalenetwork/filestorage-js
EXPOSE 80

CMD ["node","app.js"]
