#!/bin/bash

sleep 20;
wp core install --path="/var/www/html" --url="http://localhost:1234" --title="WooCommerce Dev" --admin_user=admin --admin_password=password --admin_email=admin@example.com;
wp plugin install jetpack;      
wp config set JETPACK_AUTOLOAD_DEV true --raw --debug=bootstrap;      
wp config set WP_DEBUG true --raw --debug=bootstrap;
wp config set SCRIPT_DEBUG true --raw --debug=bootstrap;
wp config set WP_DEBUG_LOG true --raw --debug=bootstrap;
wp config set WP_DEBUG_DISPLAY false --raw --debug=bootstrap;
