#FROM arm64v8/node:21-bullseye
FROM node:21-bullseye

WORKDIR /app

COPY package.json .

# --ignore-scripts
# --ignore-engines : @azure/msal-node causing an issue (max node 18)
RUN yarn install --ignore-scripts --ignore-engines --network-timeout 100000

COPY . .
RUN yarn keystone build

ENV NEXT_TELEMETRY_DISABLED=1

RUN rm -rf node_modules && yarn add keystone --ignore-engines

ENTRYPOINT [ "yarn", "start" ]
CMD [ "--with-migrations" ]