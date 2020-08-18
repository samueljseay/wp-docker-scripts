#!/bin/bash

docker build ./docker -f ./docker/Dockerfile -t wordpress_installer:latest
docker-compose -f dev-bindings.yml up --build 
