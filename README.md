## Wordpress Plugin Development Environment

### Introduction

This is a basic Wordpress development environment that is useful for developing plugins. It is intentionally simple to get you up and running quickly. If you need
more functionality later you should be able to customise this setup fairly easily.

### Installation

1. [Install Docker](https://docs.docker.com/docker-for-mac/install/)
2. Configure `.env` to your liking. See `.env setup` for more. You will need to at least configure `PLUGIN_DEV_DIRECTORY` to point to your local
   directory with plugins.
3. run `./bin/start.sh`, this should start a Wordpress environment running
   at the host and port you specified in `.env`

You should now have a wordpress install available at `http://localhost:1234`. The
admin username is `admin` with password `password`.

If you would like to connect to the DB it is exposed on port 3306, so you can
connect to it as normal with your DB management tool of choice.

### .env setup

You will need to set `PLUGIN_DEV_DIRECTORY` for plugin development.
Currently this only supports mounting a single directory. What I do is keep
all the plugins I'm developing in a single development directory and then
mount that directory as `PLUGIN_DEV_DIRECTORY`.

If you want to mount additional directories you'll need to modify `volumes`
for the wordpress container in `docker-compose.yml`.

There are other settings such as port and host for Wordpress that you can
configure if needed. By default the Wordpress instance runs on `localhost:1234`.

### Teardown

To clear out all cached images, volumes, containers etc, run `./bin/clean.sh`. **Warning** this is a system wide
clean and will clear out **all** the Docker things.

### XDebug

XDebug support is disabled by default because it does slow down the environment
significantly. If you'd like to enable it, just uncomment the Xdebug enable code
in `docker/wordpress/Dockerfile` then run:

`./bin/reset.sh`
`./bin/start.sh`

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

### Limitations

Currently wp-cli won't activate plugins mounted in your volume so you'll need to do that manually, I don't have a solution
for this yet.
