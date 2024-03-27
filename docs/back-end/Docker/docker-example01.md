---
autoGroup-1: docker实例
title: docker example01
---

```shell
FROM image-docker.xxx.cc/base/node-builder:16.15.1-slim as builder

RUN apt-get update && apt-get install -y git && apt-get install -y openssh-client
COPY package.json /home/homework/package.json
COPY pnpm-lock.yaml /home/homework/pnpm-lock.yaml
COPY packages/site/package.json /home/homework/packages/site/package.json
COPY packages/components/package.json /home/homework/packages/components/package.json
COPY .npmrc  /home/homework/.npmrc
WORKDIR /home/homework/
COPY . /home/homework/
RUN npm install -g pnpm@6
RUN pnpm install

ARG CI_FE_DEBUG
ARG REPO_GIT_REMOTE_ADDRESS
ENV NODE_ENV production

ARG APP_NAME
ENV APP_NAME $APP_NAME

RUN pnpm build
RUN pnpm docs:build

# 运行
FROM image-docker.xxx.cc/privbase/fe-nginx:1.2.9

ARG APP_NAME
ENV APP_NAME $APP_NAME

ARG REPO_NAME
ENV REPO_NAME $REPO_NAME

COPY --from=builder /home/homework/packages/site/docs/.vitepress/dist/ /home/homework/www/static/hy/$APP_NAME/

```