FROM node:14.16.0-alpine

WORKDIR /kc-client

COPY . ./

ENV HOST=0.0.0.0 PORT=8080

RUN apk update &&\
    apk add bash &&\
    chmod 755 wait-for-it.sh &&\
    yarn install &&\
    yarn build

CMD ["./wait-for-it.sh", "api:3001", "--strict", "--timeout=300", "--", "yarn", "start"]
