import { Controller, Post as PostRoute, Body, Get } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';

@Controller('subscribers')
export class SubscribersController {
  constructor(private subService: SubscribersService) {}

  @PostRoute()
  subscribe(@Body('email') email: string) {
    return this.subService.subscribe(email);
  }

  @Get()
  getAllSubs() {
    return this.subService.findAllSubscribers();
  }
}