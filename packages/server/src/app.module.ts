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

@Module({
  imports: [],
  controllers: [AppController, UsersController, TopicsController, ConclusionsController, ProofsController],
  providers: [AppService, UsersService, TopicsService, ConclusionsService, ProofsService],
})
export class AppModule {}
