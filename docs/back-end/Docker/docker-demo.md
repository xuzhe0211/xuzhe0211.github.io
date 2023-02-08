---
title: docker-demo
---
```shell
FROM khub.wps.cn/sreopen/node:14.2.0

COPY package.json /opt/zhiliao/package.json
# COPY package-lock.json /opt/zhiliao/package-lock.json
COPY .npmrc /opt/zhiliao/.npmrc

RUN cd /opt/zhiliao && npm install

ADD ./ /opt/zhiliao


WORKDIR /opt/zhiliao

# RUN npm install
RUN npm run build

FROM khub.wps.cn/sreopen/nginx:1.18.0

COPY --from=0 /opt/zhiliao/dist/ /var/www/zhiliao/
COPY --from=0 /opt/zhiliao/nginx/nginx.conf /etc/nginx/
COPY --from=0 /opt/zhiliao/nginx/startup.sh /opt/nginx/

#RUN nginx
#CMD ["nginx","-g","daemon off;"]
RUN chmod +x /opt/nginx/startup.sh
ENTRYPOINT ["/opt/nginx/startup.sh"]
```