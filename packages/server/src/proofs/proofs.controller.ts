import {
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
  Body,
  Req,
} from '@nestjs/common';
import { ProofsService, ProofParams } from './proofs.service';
import { AuthGuard } from '@nestjs/passport';
import { UserGuard } from '../user.guard';

@Controller('/api/v1')
export class ProofsController {
  constructor(private readonly proofsService: ProofsService) { }

  @Get('/topics/:proofId/conclusions/:conclusionId/proofs/:proofId')
  @UseGuards(UserGuard)
  async getOne(
    @Req() req,
    @Param()
    { topicId, conclusionId, proofId }: ProofParams,
  ) {
    return await this.proofsService.getOne(req.user, {
      topicId,
      conclusionId,
      proofId,
    });
  }

  @Put('/topics/:topicId/conclusions/:conclusionId/proofs/:proofId')
  @UseGuards(AuthGuard())
  async update(
    @Param()
    { topicId, conclusionId, proofId }: ProofParams,
    @Req() req,
    @Body() { title, content }: { title: string, content: string },
  ) {
    let { proof } = await this.proofsService.update(
      req.user,
      {
        topicId,
        conclusionId,
        proofId,
      },
      { title, content },
    );

    return proof;
  }
}
