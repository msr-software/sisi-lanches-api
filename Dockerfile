FROM node:18-alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
RUN npx prisma migrate deploy

EXPOSE 3333

CMD [ "npm", "start" ]