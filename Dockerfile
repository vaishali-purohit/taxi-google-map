FROM node:12-stretch as builder

RUN mkdir -p /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . /app

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silen
RUN npm install && npm run build

FROM nginx:mainline

COPY --from=builder /app/build /usr/share/nginx/html

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
