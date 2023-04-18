FROM node:alpine

WORKDIR /app

ENV PORT=3001
ENV NODE_ENV=production

COPY package*.json ./

RUN npm install

COPY . .

COPY ./node_modules/songvault-7f750-firebase-adminsdk-6x758-8dfbc34995.json /app/node_modules/

EXPOSE $PORT
CMD ["node", "index.js"]