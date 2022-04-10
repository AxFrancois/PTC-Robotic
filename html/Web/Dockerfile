FROM php:7.4-apache

COPY /Web/src/ /var/www/html/

COPY /Web/lib/smarty3 /usr/local/lib/smarty3/

WORKDIR /var/www/html/

# WebSocket Port
ENV PORT=8080
EXPOSE 8080

# HTTP Port
ENV PORT=3080
EXPOSE 3080

# User Config
RUN chown -R www-data:www-data /var/www/*
RUN chmod -R ug+rw /var/www/*

# Apache Permission
RUN chmod 777 -R /var/www/
# Smarty Permission
RUN chmod 777 -R /usr/local/lib/

# Affichage erreurs PHP
#RUN sed -i 's/display_errors = Off/display_errors = On/g' /etc/php/7.4/apache2/php.ini
#RUN systemctl reload apache2.service

#CMD [ "php", "./index.php" ]
