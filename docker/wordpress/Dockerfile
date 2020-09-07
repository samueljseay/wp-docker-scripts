FROM wordpress:latest as wordpress_debug

# uncomment this and run `bin/reset.sh && bin/start.sh` to rebuild with xdebug support
# RUN pecl install xdebug \
#   && echo 'xdebug.remote_enable=1' >> $PHP_INI_DIR/php.ini \
#   && echo 'xdebug.remote_port=9000' >> $PHP_INI_DIR/php.ini \
#   && echo 'xdebug.remote_host=host.docker.internal' >> $PHP_INI_DIR/php.ini \
#   && echo 'xdebug.remote_autostart=1' >> $PHP_INI_DIR/php.ini \
#   && docker-php-ext-enable d xdebug
