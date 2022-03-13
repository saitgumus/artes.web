#node'un official image'ini kullanin. versiyon 8
FROM node:14.18.1 as build

WORKDIR /apman

COPY package.json package.json
COPY package-lock.json /apman/package-lock.json

RUN npm ci --production

COPY . .

RUN npm run build

# nginx server
FROM nginx:1.12-alpine as prod

COPY --from=build /apman/build /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx","-g","daemon off;" ]