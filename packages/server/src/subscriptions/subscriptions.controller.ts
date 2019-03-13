import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  UseGuards,
  Body,
  Req,
  Delete,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { ISubscription, ICollection, IPaginatorParams } from '@listed/shared';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/v1')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post('/topics/:id/subscriptions')
  @UseGuards(AuthGuard())
  async create(@Param() { id }: { id: string }, @Req() req) {
    let { subscription } = await this.subscriptionsService.create(req.user, id);

    return subscription;
  }

  @Delete('/topics/:id/subscriptions/:subscriptionId')
  @UseGuards(AuthGuard())
  async remove(
    @Param() { id, subscriptionId }: { id: string; subscriptionId: string },
    @Req() req,
  ) {
    let { subscription } = await this.subscriptionsService.remove(
      req.user,
      id,
      subscriptionId,
    );

    return subscription;
  }
}
