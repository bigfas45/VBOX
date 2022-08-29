FROM node:latest as builder

WORKDIR /app

COPY . .

RUN npm install && npm run ng builder

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist/vebuxe-producer-frontend .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
