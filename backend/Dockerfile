FROM node:10

RUN npm -g install forever

WORKDIR /usr/src/app

COPY package*.json ./

RUN mkdir dist && npm install

COPY dist/ ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]