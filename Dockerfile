FROM registry-vpc.cn-hangzhou.aliyuncs.com/bxh-base/node-base:2.0.2

WORKDIR /usr/src/app

COPY package.json ./

RUN apt update && apt install -y procps && yarn install --prod

EXPOSE 8000

COPY . .

HEALTHCHECK --interval=3s --timeout=30s \
  CMD curl -f http://localhost:8000 || exit 1

CMD [ "node", "src/main.js" ]