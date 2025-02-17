FROM nginx:latest

COPY ./nginx.conf /etc/nginx/
COPY ./src/ /usr/share/nginx/html/
COPY ./ssl/domain.cert.pem /etc/ssl/certs/
COPY ./ssl/private.key.pem /etc/ssl/private/

EXPOSE 80
EXPOSE 443 
