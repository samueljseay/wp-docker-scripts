## Wordpress Plugin Development Environment

### Introduction

This is a basic Wordpress development environment that is useful for developing plugins. It is intentionally simple to get you up and running quickly. If you need
more functionality later you should be able to customise this setup fairly easily.

### Installation

1. [Install Docker](https://docs.docker.com/docker-for-mac/install/)
2. Install Node.js
3. `npm install`
4. Configure `config.js` with your desired mappings, config and plugins to install (see the file for examples)
5. run `./bin/start.sh`, this should start a Wordpress environment running
   at the host and port specified in `config.js`

If you used the defaults you should now have a wordpress install available at `http://localhost:1234`. The admin username is `admin` with password `password`.

If you would like to connect to the DB it is exposed on port 3306, so you can
connect to it as normal with your DB management tool of choice.

### Enter the container

If you want run commands inside the container you'll find it has wp-cli available.
To enter the container run `npm run enter`.

### config.js setup

The config `mappings` is very similar to the `mappings` in @wordpress/env. It allows you to have multiple
local directories as `bind` volumes in the dynamically generated docker compose file. See the file for examples.

TODO - more documentation here.

### Hard Reset

To clear out **all** cached images, volumes, containers etc, and restart, run `npm run reset`. **Warning** this is a system wide clean and will clear out **all** the Docker things.

### XDebug

XDebug support is disabled by default because it does slow down the environment
significantly. If you'd like to enable it, just uncomment the Xdebug enable code
in `docker/wordpress/Dockerfile` then run:

`npm run reset`

If you use the VSCode PHP Debug extension here is a config that works with the default settings of this project:

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Listen for XDebug",
      "type": "php",
      "request": "launch",
      "hostname": "localhost",
      "port": 1234
    },
    {
      "name": "Launch currently open script",
      "type": "php",
      "request": "launch",
      "program": "${file}",
      "cwd": "${fileDirname}",
      "port": 9000
    }
  ]
}
```

### Access inside the container

An npm script allows you to get access to the main Wordpress instance container. run `npm run enter`.

### Limitations

1. For some reason, wp cli not see plugins that have been bind mounted into wp-content/plugins, so activation of local
   plugins does not work right now.

2. wp-cli must be run with `--allow-root` when inside the container right now. I'm exploring some solutions to this.

### Why not just use @wordpress/env

I encourage you to use @wordpress/env if it suits your needs. It is designed as a low customisation solution
though.

I admit this project is very immature currently, but, it solves my problems by allowing me to manually
tweak things like the Dockerfiles and solve problems like enabling Xdebug without much hassle.
