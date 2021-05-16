FROM nginx:1.20.0-alpine

WORKDIR /etc/nginx/conf.d

COPY . ./

RUN apk update &&\
    # apk add bash python3 python3-dev py3-pip build-base libressl-dev musl-dev libffi-dev certbot certbot-nginx &&\
    apk add bash nano &&\
    chmod 755 wait-for-it.sh

CMD ["./wait-for-it.sh", "client:8080", "--strict", "--timeout=300", "--", "nginx", "-g", "daemon off;"]
