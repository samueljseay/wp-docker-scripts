## My WP Docker scripts

This is a basic docker-compose setup that spins up a new Wordpress docker stack and
automates the install process. This is purely to be used as a dev environment.

### Details

- Uses wp-cli in a separate container to automate setup actions like wordpress install
- bin/run-dev.sh runs/builds docker-compose'd containers that bind mount to local plugin files
- bin/run-test.sh runs/builds docker-compose'd containers that just have WP, for running the phpunit tests on
- bin/reset.sh stops/rms containers and volumes. Take care, this will delete everything

### TODO

- Configure leaner alpine-fpm image alternative
- Make paths etc more configurable so this is more reusable
