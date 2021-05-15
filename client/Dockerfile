FROM node:14.16.0-alpine

WORKDIR /usr/src/app

COPY . ./

RUN apk update &&\
    apk add bash &&\
    chmod 755 wait-for-it.sh &&\
    yarn install

EXPOSE 8080

ENV HOST=0.0.0.0
ENV PORT=8080

RUN yarn build

CMD ["./wait-for-it.sh" , "api:3001" , "--strict" , "--timeout=300" , "--" , "yarn", "start"]
