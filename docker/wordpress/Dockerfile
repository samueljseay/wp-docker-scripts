FROM wordpress:latest as wordpress_debug

RUN echo "file_uploads = On\n" \
  "memory_limit = 500M\n" \
  "upload_max_filesize = 500M\n" \
  "post_max_size = 500M\n" \
  "max_execution_time = 600\n" \
  > /usr/local/etc/php/conf.d/uploads.ini

RUN set -ex; \
  curl -LJO https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar; \
  chmod +x wp-cli.phar; \
  mv wp-cli.phar /usr/local/bin/wp;

# Install PHP extensions deps
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        vim less

# uncomment the lines below and run `bin/reset.sh && bin/start.sh` to rebuild with xdebug support
# RUN pecl install xdebug \
#   && docker-php-ext-enable xdebug \
#   && echo 'xdebug.mode=debug' >> $PHP_INI_DIR/php.ini \
#   && echo 'xdebug.client_port=9003' >> $PHP_INI_DIR/php.ini \
#   && echo 'xdebug.client_host=host.docker.internal' >> $PHP_INI_DIR/php.ini
