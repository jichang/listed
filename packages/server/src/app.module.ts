import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { TopicsController } from './topics/topics.controller';
import { ConclusionsController } from './conclusions/conclusions.controller';
import { ProofsController } from './proofs/proofs.controller';
import { TopicsService } from './topics/topics.service';
import { ConclusionsService } from './conclusions/conclusions.service';
import { ProofsService } from './proofs/proofs.service';
import { OauthController } from './oauth/oauth.controller';
import { OauthService } from './oauth/oauth.service';
import { ConfigService } from './config/config.service';
import { DatabaseService } from './database/database.service';
import { AuthService, JwtStrategy } from './auth/auth.service';
import { SessionController } from './session/session.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 360000,
      },
    }),
  ],
  controllers: [
    AppController,
    UsersController,
    TopicsController,
    ConclusionsController,
    ProofsController,
    OauthController,
    SessionController,
  ],
  providers: [
    AppService,
    UsersService,
    TopicsService,
    ConclusionsService,
    ProofsService,
    OauthService,
    {
      provide: ConfigService,
      useValue: new ConfigService(`config.${process.env.NODE_ENV}.toml`),
    },
    DatabaseService,
    AuthService,
    JwtStrategy,
  ],
})
export class AppModule {}
