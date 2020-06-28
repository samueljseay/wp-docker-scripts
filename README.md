## WP Docker scripts

This is a basic docker-compose setup that spins up a new Wordpress docker stack and
automates the install process. This is purely to be used as a dev environment.

### Details

- Uses wp-cli in a separate container to automate setup actions like wordpress install

- Bind mounts a directory where all developed plugins live to allow
  running development plugins on the container.
