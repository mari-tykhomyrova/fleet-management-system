import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

import { MessageHandlerService } from './message-handler.service';

import { CarStateDto } from './dto/car-state.dto';

@Controller()
export class MessageHandlerController {
  constructor(private messageHandlerService: MessageHandlerService) {}

  @MessagePattern('car_state')
  async handleEvent(
    @Payload() data: CarStateDto,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    return this.messageHandlerService.handleCarState(data);
  }
}
