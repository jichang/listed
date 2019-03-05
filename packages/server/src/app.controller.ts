import { Get, Controller, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/v1')
  @UseGuards(AuthGuard())
  root(): string {
    return this.appService.root();
  }
}
