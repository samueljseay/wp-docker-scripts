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
  // Useful for supporting ngrok.
  WP_CONFIG_EXTRA: `
$_SERVER['HTTPS'] = isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https' ? 'on' : NULL;
define('DOCKER_REQUEST_URL', (!empty($_SERVER['HTTPS']) ? 'https://' : 'http://') . (!empty($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'localhost'));
define('WP_SITEURL', DOCKER_REQUEST_URL);
define('WP_HOME', DOCKER_REQUEST_URL);
  `
};
