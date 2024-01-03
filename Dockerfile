FROM node:18-alpine3.19 as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:18-alpine3.19

WORKDIR /app

COPY --from=build /app/node_modules/ ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/build ./
COPY --from=build /app/prisma/schema.prisma ./prisma/
COPY --from=build /app/prisma/migrations/ ./prisma/migrations/


COPY --from=build /app/entrypoint.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/entrypoint.sh

RUN npm config set update-notifier false

ENTRYPOINT [ "entrypoint.sh" ]

EXPOSE 3333

CMD [ "npm", "start" ]