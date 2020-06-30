FROM wordpress:latest

RUN apt-get update
# dependencies all needed to run the wp install tests script
RUN apt-get -y install subversion
RUN apt-get -y install default-mysql-server
RUN apt-get -y install git
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer