FROM httpd:latest

COPY ./build/ /usr/local/apache2/htdocs/

RUN sed -i 's/Listen\ 80/Listen\ 8080/g' /usr/local/apache2/conf/httpd.conf & \
chown -R 1001:0 /usr/local/apache2/ & \
chmod -R g+w /usr/local/apache2/

EXPOSE 8080

USER 1001