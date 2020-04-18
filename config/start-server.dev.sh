#!/bin/bash

PATH="$PWD/config/.env.dev"
set -a
source $PATH

COMPOSE_VARS='$PWD:$SERVER_CONTAINER_NAME:$DATABASE_CONTAINER_NAME:$DATABASE_ADMINER:$DATABASE_ADMINER_PORT:$POSTGRES_USER:$POSTGRES_PWD:$POSTGRES_PORT:$ADMIN_PORT:$DOMAIN:$URL_NAME:$CONTACT_EMAIL:$PWD_EMAIL:$TETRIS_APP_CONTAINER_NAME:$TETRIS_APP_PORT:$TETRIS_API_CONTAINER_NAME:$TETRIS_API_PORT:$TETRIS_FOLDER:$NODE_ENV'

#for nginx conf
FROM_PATH="$PWD/config/tetris-client.conf/.env"
PATH_TO="$PWD/tetris/client/.env"
/usr/bin/envsubst "$COMPOSE_VARS" < $FROM_PATH > $PATH_TO

#for the docker compose script
FROM_PATH="$PWD/config/compose.dev.yml"
PATH_TO="$PWD/docker-compose.dev.yml"
/usr/bin/envsubst "$COMPOSE_VARS" < $FROM_PATH > $PATH_TO

#create all containers
/usr/local/bin/docker-compose -f $PATH_TO up

# or
# /usr/local/bin/docker-compose -f $PATH_TO up --force-recreate
