# #node'un official image'ini kullanin. versiyon 8
# FROM node:alpine as build

# WORKDIR /app

# COPY package.json package.json
# COPY package-lock.json /apman/package-lock.json

# #RUN npm ci --production
# RUN npm i --force

# COPY . .

# RUN npm run build

# nginx server
FROM nginx:1.22-alpine as prod

#COPY --from=build /app/build /usr/share/nginx/html
COPY ./build /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx","-g","daemon off;" ]