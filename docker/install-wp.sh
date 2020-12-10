#!/bin/bash

sleep 20;
wp core install --path="/var/www/html" --url="$WP_HOST_NAME:$WP_PORT" --title="WooCommerce Dev" --admin_user=admin --admin_password=password --admin_email=admin@example.com;      
wp config set JETPACK_AUTOLOAD_DEV true --raw --debug=bootstrap;      
wp config set WP_DEBUG true --raw --debug=bootstrap;
wp config set SCRIPT_DEBUG true --raw --debug=bootstrap;
wp config set WP_DEBUG_LOG true --raw --debug=bootstrap;
wp config set WP_DEBUG_DISPLAY false --raw --debug=bootstrap;
