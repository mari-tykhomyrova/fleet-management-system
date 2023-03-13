FROM node:18-alpine

RUN echo "====== start c ======"

COPY ./ ./

RUN npm install
RUN mkdir -p /var/www/_test_tasks/fleet_management_system/service_c
WORKDIR /var/www/_test_tasks/fleet_management_system/service_c
ADD . /var/www/_test_tasks/fleet_management_system/service_c
RUN npm install

CMD npm run build && npm run start:dev
