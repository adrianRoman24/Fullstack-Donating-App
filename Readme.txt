RUN DATABASE

docker run \
--detach \
--name=pwebdb \
-e MYSQL_ROOT_PASSWORD=password123456789- \
-p 6603:3306 \
--volume=path-to-file/db-config.cnf:/etc/mysql/conf.d \
mysql:8.0.29

RUN SERVER

0. npm -v && node -v
    8.5.5
    v18.1.0 
1. npm install
2. node src/index.js