#FROM node:8-slim

#RUN apt-get update  && apt-get install -y nginx

#WORKDIR /var/web/lnmpa-web
#COPY . /var/web/lnmpa-web

#RUN npm install --no-optional && npm run build:prod

#RUN rm -rf /usr/share/nginx/html
#COPY --from=0 /var/web/lnmpa-web/dist /usr/share/nginx/html
#CMD ["nginx","-g","daemon off;"]
