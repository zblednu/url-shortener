FROM postgres:latest

COPY ./db-init.sh /docker-entrypoint-initdb.d/

ENV POSTGRES_PASSWORD_FILE="secret"
