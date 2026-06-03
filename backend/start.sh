#!/bin/bash
cat > .env << EOF
CI_ENVIRONMENT=production
database.default.hostname=${MYSQLHOST}
database.default.database=${MYSQL_DATABASE}
database.default.username=${MYSQLUSER}
database.default.password=${MYSQLPASSWORD}
database.default.port=${MYSQLPORT}
database.default.DBDriver=MySQLi
EOF

php spark migrate
php spark serve --host 0.0.0.0 --port $PORT