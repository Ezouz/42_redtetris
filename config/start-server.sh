#!/bin/bash

PATH="$PWD/config/.env"
set -a
source $PATH

COMPOSE_VARS='$PWD:$SERVER_CONTAINER_NAME:$DATABASE_CONTAINER_NAME:$DATABASE_ADMINER:$DATABASE_ADMINER_PORT:$POSTGRES_USER:$POSTGRES_PWD:$POSTGRES_PORT:$ADMIN_PORT:$DOMAIN:$URL_NAME:$CONTACT_EMAIL:$PWD_EMAIL:$TETRIS_APP_CONTAINER_NAME:$TETRIS_APP_PORT:$TETRIS_API_CONTAINER_NAME:$TETRIS_API_PORT:$TETRIS_FOLDER:$NODE_ENV'

#BEFORE SSL CERTIFICATES INITIALISATION

FROM_PATH="$PWD/config/tetris-client.conf/.env"
PATH_TO="$PWD/tetris/client/.env"
/usr/bin/envsubst "$COMPOSE_VARS" < $FROM_PATH > $PATH_TO

FROM_PATH="$PWD/config/nginx-conf/nginx.conf"
PATH_TO="$PWD/config/nginx-conf/nginx-envsubst.conf"
/usr/bin/envsubst "$COMPOSE_VARS" < $FROM_PATH > $PATH_TO

#AFTER INITIALISATION

#FROM_PATH="$PWD/config/ssl_cron.sh"
#PATH_TO="$PWD/ssl_renew.sh"
#/usr/bin/envsubst "$COMPOSE_VARS" < $FROM_PATH > $PATH_TO

FROM_PATH="$PWD/config/compose.yml"
PATH_TO="$PWD/docker-compose.yml"
/usr/bin/envsubst "$COMPOSE_VARS" < $FROM_PATH > $PATH_TO

#create all containers
#/usr/local/bin/docker-compose -f $PATH_TO up -d
#/usr/local/bin/docker-compose -f $PATH_TO up -d --force-recreate

# ***************************************************************************
# STOP SERVER

# sudo docker stop $(sudo docker ps -a -q)
# sudo docker system prune
# sudo docker network prune
# sudo docker volume prune

# sudo docker ps -a
# sudo docker volume ls
# sudo docker network ls
