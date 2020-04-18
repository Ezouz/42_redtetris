I made it that way cause i was working aside on a deployment template, and its a way to deliver a public version of that project.
IMPORTANT : create custom .env files which will be used to configure the app via the 'start-server.sh' and 'start-server.dev.sh' scripts

- config/.env
```
#tetris api
TETRIS_API_CONTAINER_NAME=tetris-api
TETRIS_API_PORT=10000

#tetris client
TETRIS_APP_CONTAINER_NAME=tetris
TETRIS_APP_PORT=10001

#database
DATABASE_CONTAINER_NAME=db
POSTGRES_USER=user
POSTGRES_PWD=password
POSTGRES_PORT=5432
DATABASE_ADMINER=db-admin
DATABASE_ADMINER_PORT=8080
ADMIN_PORT=10002

#nginx
SERVER_CONTAINER_NAME=webserver
DOMAIN=example.com
URL_NAME=www.exemple.com

#
NODE_ENV=production
TETRIS_FOLDER=/tetris
#
COMPOSE_PATH=/final/path/to/docker-compose.yml
CONTACT_EMAIL=example@gmail.com
PWD_EMAIL=password
```

- config/.env.dev

```
#database
DATABASE_CONTAINER_NAME=db
POSTGRES_USER=user
POSTGRES_PWD=example
POSTGRES_PORT=5432
DATABASE_ADMINER=db_admin
DATABASE_ADMINER_PORT=8080
ADMIN_PORT=3004

#tetris client
TETRIS_APP_CONTAINER_NAME=tetris-client-dev
TETRIS_APP_PORT=3005

#tetris api
TETRIS_API_CONTAINER_NAME=tetris-api-dev
TETRIS_API_PORT=3006

#nginx
SERVER_CONTAINER_NAME=webserver-dev
DOMAIN=0.0.0.0
URL_NAME=http://localhost

#
NODE_ENV=devlopment
TETRIS_FOLDER=/tetris
#
CONTACT_EMAIL=example@gmail.com
PWD_EMAIL=password
```

and this one exactly like that
- tetris-client.conf/.env

```
PORT=${TETRIS_APP_PORT}
REACT_APP_MAIN_PORT=${TETRIS_APP_PORT}
REACT_APP_DOMAIN=${DOMAIN}
REACT_APP_BASE_URL=${URL_NAME}
REACT_APP_TETRIS_API_PORT=${TETRIS_API_PORT}
```
# on xubuntu vm
```
$ sudo service postgresql stop
```
IMPORTANT : then use sudo to execute the commands below

# to start the server with docker-compose
```
$ npm run start
$ npm run start:dev
```
# to watch the server logs
```
$ npm run log
```
# Useful commands
watch all containers
```
$  docker ps -a
```
clean all about docker containers
```
$ docker stop $(docker ps -a -q)
$ docker system prune
```

# to get both client & server coverage
first, you have to run the tests separately
```
$ npm run server:coverage
$ npm run client:coverage
```
then, install globaly istanbul-coverage :
```
$ npm install -g istanbul-combine
```
and execute in the root folder :
```
$ istanbul-combine -d coverage -p detail -r lcov client/coverage/coverage-final.json server/coverage/coverage-final.json
```
or
```
$ npm run coverage:all
```

