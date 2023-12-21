FROM node:18-alpine3.19
WORKDIR /app

COPY package.json .
RUN yarn install --ignore-scripts

COPY . .
RUN yarn keystone build

ENV NEXT_TELEMETRY_DISABLED=1

ENTRYPOINT [ "yarn", "start" ]
CMD [ "--with-migrations" ]