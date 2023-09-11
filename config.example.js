module.exports = {
  mappings: {
    "wp-content/plugins/woocommerce-admin": "/local/path/to/woocommerce-admin",
  },
  multiSite: false,
  installPlugins: ["woocommerce", "gutenberg@16.5.0" ],
  activatePlugins: ["woocommerce", "woocommerce-admin", "wc-smooth-generator"],
  CONTAINER_NAME_PREFIX: "wp_dev",
  WP_HOST_NAME: "http://docker.for.mac.localhost",
  WP_PORT: 1234,
  wpConfig: {
    WP_DEBUG: {
      value: true,
      raw: true,
    },
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
