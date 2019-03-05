import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  UseGuards,
  Body,
  Req,
} from '@nestjs/common';
import { ConclusionsService } from './conclusions.service';
import {
  IConclusion,
  ICollection,
  IPaginatorParams,
  IConclusionCreateParams,
} from '@proveit/shared';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/v1')
export class ConclusionsController {
  constructor(private readonly conclusionsService: ConclusionsService) {}

  @Get('/topics/:id/conclusions')
  async getAll(
    @Param() { id }: { id: string },
    @Query() paginatorParams: IPaginatorParams,
  ) {
    let conclusions: ICollection<
      IConclusion
    > = await this.conclusionsService.getAll(id, paginatorParams);

    return conclusions;
  }

  @Post('/topics/:id/conclusions')
  @UseGuards(AuthGuard())
  async create(
    @Param() { id }: { id: string },
    @Req() req,
    @Body() params: IConclusionCreateParams,
  ) {
    let { conclusion } = await this.conclusionsService.create(
      req.user,
      id,
      params,
    );

    return conclusion;
  }
}
