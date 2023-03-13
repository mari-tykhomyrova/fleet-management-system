FROM node:18-alpine

RUN echo "====== start a ======"

COPY ./ ./

RUN npm install
RUN mkdir -p /var/www/_test_tasks/fleet_management_system/service_a
WORKDIR /var/www/_test_tasks/fleet_management_system/service_a
ADD . /var/www/_test_tasks/fleet_management_system/service_a
RUN npm install

CMD npm run build && npm run start:dev
