RUN DATABASE

1. $ docker run \
--detach \
--name=pwebdb \
-e MYSQL_ROOT_PASSWORD=password123456789- \
-p 6603:3306 \
--memory="1g" \
mysql:8.0.29

RUN RABBITMQ ALERTING QUEUE

$ docker run \
--detach \
--name=alertingrabbit \
--hostname=alerting-rabbit \
-e RABBITMQ_DEFAULT_USER=admin \
-e RABBITMQ_DEFAULT_PASS=password123456789- \
-p 5672:5672 \
rabbitmq:3.9

2. $ mysql -h localhost -P 6603 --protocol=tcp -u root -ppassword123456789-
Enter password: password123456789-
mysql> CREATE DATABASE pweb;


RUN SERVER

0. npm -v && node -v
    8.5.5
    v18.1.0
1. npm install
2. npm run start_server
3. npm run start_alerting_service
