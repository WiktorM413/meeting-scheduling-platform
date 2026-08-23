FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    libicu-dev libzip-dev unzip git \
    && docker-php-ext-install intl mysqli pdo_mysql zip

# apt upgrade of apache2 can enable mpm_event alongside mpm_prefork
# (mod_php requires prefork); two MPMs make Apache refuse to start.
# a2dismod prompts for confirmation on MPMs (non-interactive build answers
# "no"), so remove the symlinks directly instead.
RUN rm -f /etc/apache2/mods-enabled/mpm_event.load \
          /etc/apache2/mods-enabled/mpm_event.conf \
          /etc/apache2/mods-enabled/mpm_worker.load \
          /etc/apache2/mods-enabled/mpm_worker.conf \
    && a2enmod mpm_prefork rewrite \
    && apachectl configtest

RUN ln -sf /dev/stderr /var/log/apache2/error.log \
    && ln -sf /dev/stdout /var/log/apache2/access.log

COPY . /var/www/html
WORKDIR /var/www/html

RUN sed -i 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf
RUN sed -i 's!/var/www/!/var/www/html/public!g' /etc/apache2/apache2.conf

RUN { \
    echo '<Directory /var/www/html/public>'; \
    echo '    AllowOverride All'; \
    echo '    Require all granted'; \
    echo '</Directory>'; \
} >> /etc/apache2/apache2.conf

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader

RUN chown -R www-data:www-data /var/www/html/writable

RUN mkdir -p /var/www/html/writable/logs \
             /var/www/html/writable/cache \
             /var/www/html/writable/session \
             /var/www/html/writable/uploads \
    && chown -R www-data:www-data /var/www/html/writable \
    && chmod -R 775 /var/www/html/writable

EXPOSE 80

# Run pending migrations on boot (fresh Railway MySQL starts empty),
# then hand off to Apache. Migration failure must not block startup,
# hence ';' instead of '&&'.
CMD php spark migrate < /dev/null; exec apache2-foreground
