docker stop $(docker ps -aq)
docker rm $(docker ps -aq)
docker volume ls -q --filter name=docker-wp | xargs -r docker volume rm
docker system prune --volumes
