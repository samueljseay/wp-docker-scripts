const generateInstallScript = ({
  wpConfig,
  installPlugins,
  activatePlugins,
}) => {
  return `
# wait for the wordpress and db containers to run  
sleep 20;
wp core install --path="/var/www/html" --url="$WP_HOST_NAME:$WP_PORT" --title="WooCommerce Dev" --admin_user=admin --admin_password=password --admin_email=admin@example.com;
${generateWpConfig(wpConfig)}
${generatePluginInstall(installPlugins)}
${generatePluginActivation(activatePlugins)}
`;
};

const generateWpConfig = (wpConfig) => {
  return Object.entries(wpConfig)
    .map(([key, { value, raw }]) => {
      return `wp config set ${key} ${generateValueToWrite(value)} ${
        raw ? "--raw" : ""
      } --debug=bootstrap`;
    })
    .join("\n");
};

const generateValueToWrite = (value) => {
  const valueToWrite = {
    boolean: value,
    number: value,
  }[typeof value];

  return valueToWrite !== undefined ? value : `"${value}"`;
};

const generatePluginInstall = (installPlugins) => {
  return installPlugins
    .map((plugin) => {
      return `wp plugin install ${plugin}`;
    })
    .join("\n");
};

const generatePluginActivation = (activatePlugins) => {
  return activatePlugins
    .map((plugin) => {
      return `wp plugin activate ${plugin}`;
    })
    .join("\n");
};

module.exports = generateInstallScript;
