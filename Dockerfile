FROM nginx:1.15.7-alpine

COPY app/frontend/ /usr/share/nginx/html
COPY app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
