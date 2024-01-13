import { Controller, Get, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('Statusx')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()

  getHello(): string {
    return this.appService.getHello();
  }

  @Put()
  update(): string {
    return this.appService.getHello();
  }
}
