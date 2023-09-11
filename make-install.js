const generateInstallScript = ({
  email,
  multiSite,
  wpConfig,
  installPlugins,
  activatePlugins,
}) => {
  const adminEmail = email || "admin@example.com";
  let url = "$WP_HOST_NAME";
  if (wpConfig.WP_PORT !== 80) {
    url += ":$WP_PORT";
  }
  const installMethod = multiSite ? "multisite-install" : "install";
  return `
#!/usr/bin/env bash

until wp core is-installed
do
  wp core ${installMethod} --path="/var/www/html" --url="${url}" --title="WooCommerce Dev" --admin_user=admin --admin_password=password --admin_email=${adminEmail};
  sleep 5  
done

${generateWpConfig(wpConfig)}
wp plugin list
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
      if (plugin.includes("@")) {
        const [plugin, version] = plugin.split("@");
        return `wp plugin install ${plugin} --version ${version}`;
      }
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
