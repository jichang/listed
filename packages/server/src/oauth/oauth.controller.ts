import { Controller, Post, Body } from '@nestjs/common';
import { OAuthParams } from '@listed/shared';
import { OauthService } from './oauth.service';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service';

@Controller('/api/v1/oauth')
export class OauthController {
  constructor(
    private readonly oauthService: OauthService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async auth(@Body() params: OAuthParams) {
    let { oauthService, authService } = this;
    let user = await oauthService.verify(params);
    let token = await authService.signIn(user);

    return {
      token,
    };
  }
}
