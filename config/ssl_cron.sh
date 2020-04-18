#!/bin/bash

COMPOSE_PATH="${PWD}/docker-compose.yml"

/usr/local/bin/docker-compose -f $COMPOSE_PATH run certbot renew \
&& /usr/local/bin/docker-compose -f $COMPOSE_PATH kill -s SIGHUP ${SERVER_CONTAINER_NAME}

