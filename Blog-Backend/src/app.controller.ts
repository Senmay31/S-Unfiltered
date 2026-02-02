import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('blog')
  getBlog(): string {
    return this.appService.getBlog();
  }

  @Get('posts')
  findAllPosts() {
    return this.appService.findAll();
  }
}
