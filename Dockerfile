FROM node:21.4.0-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
FROM nginx:stable
COPY --from=build /app/anssihweb/ /usr/share/nginx/html
EXPOSE 80
