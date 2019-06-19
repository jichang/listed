import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
  Put,
} from '@nestjs/common';
import {
  ITopicQueryParams,
  ICollection,
  ITopic,
  ITopicCreateParams,
} from '@listed/shared';
import { TopicsService } from './topics.service';
import { AuthGuard } from '@nestjs/passport';
import { UserGuard } from '../user.guard';

@Controller('/api/v1')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get('/topics')
  @UseGuards(UserGuard)
  async getAll(@Req() req, @Query() params: ITopicQueryParams) {
    let topics: ICollection<ITopic> = await this.topicsService.getAll(
      req.user,
      params,
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

  @Put('/topics/:id')
  @UseGuards(AuthGuard())
  async update(
    @Req() req,
    @Param() { id }: { id: string },
    @Body() params: ITopicCreateParams,
  ) {
    let { topic } = await this.topicsService.update(req.user, id, params);

    return topic;
  }

  @Get('/topics/:id/rss.xml')
  @UseGuards(UserGuard)
  async getRss(@Param() { id }: { id: string }, @Req() req) {
    return await this.topicsService.getRSS(req.user, id);
  }
}
