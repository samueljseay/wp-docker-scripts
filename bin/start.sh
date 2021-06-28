#!/bin/bash
export DOCKER_CLIENT_TIMEOUT=120
export COMPOSE_HTTP_TIMEOUT=120
node ./make-compose.js || exit 1
docker build ./docker -f ./docker/wordpress-cli/Dockerfile -t wordpress_installer:latest
docker build ./docker -f ./docker/wordpress/Dockerfile -t wordpress_debug:latest
docker-compose -f dynamic-compose.yml up --build 
