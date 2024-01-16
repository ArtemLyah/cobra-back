FROM node:lts-slim as init
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev

FROM node:lts-slim as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY tsconfig.json .
COPY nest-cli.json .
COPY src ./src
RUN ["npm", "run", "build"]

FROM node:lts-slim as prod
WORKDIR /app
COPY package.json .
COPY --from=init /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

CMD ["npm", "run", "start:prod"]
