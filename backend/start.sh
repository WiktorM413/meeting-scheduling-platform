#!/bin/bash

cat > .env << EOF
CI_ENVIRONMENT=development

database.default.hostname=${MYSQLHOST}
database.default.database=${MYSQL_DATABASE}
database.default.username=${MYSQLUSER}
database.default.password=${MYSQLPASSWORD}
database.default.port=${MYSQLPORT}
database.default.DBDriver=MySQLi
EOF

php spark migrate --all

php -S 0.0.0.0:$PORT -t public