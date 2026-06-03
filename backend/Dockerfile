FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
	libicu-dev \
	unzip \
	&& docker-php-ext-install intl mysqli pdo pdo_mysql \
	&& rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

RUN composer install --no-dev --optimize-autoloader

RUN chmod +x start.sh

CMD ["bash", "start.sh"]