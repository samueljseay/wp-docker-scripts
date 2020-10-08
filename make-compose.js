const yaml = require("js-yaml");
const fs = require("fs");

const generateConfig = () => {
  const config = getConfig();

  const mappings = config.mappings
    ? Object.entries(config.mappings).map(([target, source]) => {
        return {
          type: "bind",
          source,
          target: `/var/www/html/${target}`,
        };
      })
    : [];

  return {
    version: "3.8",
    services: {
      wordpress: {
        container_name: `${config.CONTAINER_NAME_PREFIX}_wordpress`,
        image: "wordpress_debug:latest",
        restart: "always",
        ports: [`${config.WP_PORT}:80`],
        environment: {
          WORDPRESS_DB_HOST: "db",
          WORDPRESS_DB_USER: "root",
          WORDPRESS_DB_PASSWORD: "root",
          WORDPRESS_DB_NAME: "wp_db",
        },
        volumes: [
          ...mappings,
          {
            type: "volume",
            source: "wp_data",
            target: "/var/www/html",
          },
        ],
        depends_on: ["db"],
      },
      db: {
        container_name: `${config.CONTAINER_NAME_PREFIX}_db`,
        image: "mysql:5.7.29",
        restart: "always",
        ports: ["3306:3306"],
        environment: {
          MYSQL_DATABASE: "wp_db",
          MYSQL_USER: "user",
          MYSQL_PASSWORD: "password",
          MYSQL_ROOT_PASSWORD: "root",
        },
        volumes: ["db:/var/lib/mysql"],
      },
      "wordpress-cli": {
        container_name: `${config.CONTAINER_NAME_PREFIX}_cli`,
        depends_on: ["db", "wordpress"],
        image: "wordpress_installer:latest",
        environment: {
          WP_HOST_NAME: `${config.WP_HOST_NAME}:${config.WP_PORT}`,
        },
        user: "xfs",
        command: "/usr/local/bin/install-wp.sh",
        volumes: ["wp_data:/var/www/html"],
      },
    },
    volumes: {
      db: null,
      wp_data: null,
    },
  };
};

const getConfig = () => {
  const config = require("./config.js");

  if (!config) {
    throw new Error("Could not find config.js");
  }

  return {
    CONTAINER_NAME_PREFIX: "wp_dev",
    WP_HOST_NAME: "http://docker.for.mac.localhost",
    WP_PORT: 1234,
    ...config,
  };
};

const generateYamlConfig = () => {
  return yaml.dump(generateConfig());
};

const generateCompose = () => {
  fs.writeFileSync("dynamic-compose.yml", generateYamlConfig(), {
    encoding: "utf8",
    flag: "w",
  });
};

generateCompose();
