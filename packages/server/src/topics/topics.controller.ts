import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import {
  IPaginatorParams,
  ICollection,
  ITopic,
  ITopicCreateParams,
} from '@listed/shared';
import { TopicsService } from './topics.service';
import { AuthGuard } from '@nestjs/passport';
import { UserGuard } from 'src/user.guard';

@Controller('/api/v1')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get('/topics')
  @UseGuards(UserGuard)
  async getAll(@Req() req, @Query() paginatorParams: IPaginatorParams) {
    let topics: ICollection<ITopic> = await this.topicsService.getAll(
      req.user,
      paginatorParams,
    );

    return topics;
  }

  @Post('/topics')
  @UseGuards(AuthGuard())
  async create(@Req() req, @Body() params: ITopicCreateParams) {
    let { topic } = await this.topicsService.create(req.user, params);

    return topic;
  }

  @Get('/topics/:id')
  @UseGuards(UserGuard)
  async getOne(@Param() { id }: { id: string }, @Req() req) {
    return await this.topicsService.select(req.user, id);
  }
}
