FROM postgres:13.3-alpine

COPY init.sql pg_hba.conf /tmp/
COPY init.sh /docker-entrypoint-initdb.d/

RUN chmod 755 /docker-entrypoint-initdb.d/init.sh /tmp/pg_hba.conf /tmp/init.sql

USER postgres
