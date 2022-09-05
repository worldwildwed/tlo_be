import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';

@Controller()
export class AppController {
  appService: any;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

}