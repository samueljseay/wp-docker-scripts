#!/bin/bash

docker build ./docker -f ./docker/wordpress-cli/Dockerfile -t wordpress_installer:latest
docker build ./docker -f ./docker/wordpress/Dockerfile -t wordpress_debug:latest
docker-compose -f dev-bindings.yml up --build 
