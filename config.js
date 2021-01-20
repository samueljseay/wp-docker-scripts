module.exports = {
  mappings: {
    "wp-content/plugins/woocommerce-admin": "/local/path/to/woocommerce-admin",
  },
  installPlugins: ["woocommerce"],
  activatePlugins: ["woocommerce"],
  CONTAINER_NAME_PREFIX: "wp_dev",
  WP_HOST_NAME: "http://docker.for.mac.localhost",
  WP_PORT: 1234,
  wpConfig: {
    SCRIPT_DEBUG: {
      value: true,
      raw: true,
    },
    WP_DEBUG_LOG: {
      value: true,
      raw: true,
    },
    WP_DEBUG_DISPLAY: {
      value: false,
      raw: true,
    },
  },
};
