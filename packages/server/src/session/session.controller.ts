import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/v1/session')
export class SessionController {
  constructor() {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Req() req) {
    return {
      user: req.user,
    };
  }
}
