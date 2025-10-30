import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  health() {
    return {
      ok: true,
      uptime: process.uptime(),
      message: 'OK',
      timestamp: new Date().toISOString(),
    };
  }
}
