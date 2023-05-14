FROM node:19.6.0-alpine
WORKDIR practicum/messanger/middle.messenger.praktikum.yandex
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD node server.js
