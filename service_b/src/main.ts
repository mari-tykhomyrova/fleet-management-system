import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_HOST}`,
      ],
      queue: process.env.RABBITMQ_QUEUE_NAME,
      noAck: true,
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.API_PORT);
}
bootstrap();
