docker rm $(docker ps -aq)
docker system prune --volumes
