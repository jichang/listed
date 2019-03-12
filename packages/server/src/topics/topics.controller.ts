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

@Controller('/api/v1')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get('/topics')
  async getAll(@Query() paginatorParams: IPaginatorParams) {
    let topics: ICollection<ITopic> = await this.topicsService.getAll(
      paginatorParams,
    );

    console.log(paginatorParams, topics);
    return topics;
  }

  @Post('/topics')
  @UseGuards(AuthGuard())
  async create(@Req() req, @Body() params: ITopicCreateParams) {
    let { topic } = await this.topicsService.create(req.user, params);

    return topic;
  }

  @Get('/topics/:id')
  async getOne(@Param() { id }: { id: string }) {
    return await this.topicsService.select(id);
  }
}
