FROM node:16
# Installing libvips-dev for sharp compatability
RUN apt-get update -y && apt-get install libvips-dev -y
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY ./package.json ./
COPY ./yarn.lock ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN yarn config set network-timeout 600000 -g
RUN yarn install
WORKDIR /opt/app
COPY ./ .
ADD "https://www.random.org/cgi-bin/randbyte?nbytes=10&format=h" skipcache
RUN yarn build
EXPOSE 1337
CMD ["yarn", "start"]
