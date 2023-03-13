FROM node:18-alpine

RUN echo "====== start b ======"

COPY ./ ./

RUN npm install
RUN mkdir -p /var/www/_test_tasks/fleet_management_system/service_b
WORKDIR /var/www/_test_tasks/fleet_management_system/service_b
ADD . /var/www/_test_tasks/fleet_management_system/service_b
RUN npm install

CMD npm run build && npm run start:dev
