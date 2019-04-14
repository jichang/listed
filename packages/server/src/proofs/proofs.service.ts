import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IProof, IUser, TopicType } from '@listed/shared';
import { DatabaseService } from '../database/database.service';

export interface ProofParams {
  topicId: string;
  conclusionId: string;
  proofId: string;
}

@Injectable()
export class ProofsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getOne(user: IUser, params: ProofParams) {
    let client = await this.databaseService.pool.connect();
    try {
      let sql = `
      SELECT
        id,
        user_id,
        content,
        created_time,
        updated_time,
        removed_time,
        status
      FROM listed.proofs AS proofs
      WHERE id = $1 AND conclusion_id = $2
      `;
      let { rows } = await client.query(sql, [
        params.proofId,
        params.conclusionId,
      ]);

      let row = rows[0];
      let proof: IProof = {
        id: row.id,
        isOwner: row.user_id === user.id,
        content: row.content,
        createdTime: row.created_time,
        updatedTime: row.updated_time,
        status: row.status,
      };

      client.release();

      return {
        proof,
      };
    } catch (e) {
      client.release();
      throw e;
    }
  }

  async update(
    user: IUser,
    params: ProofParams,
    { content }: { content: string },
  ) {
    let client = await this.databaseService.pool.connect();
    try {
      let sql = `
      UPDATE listed.proofs
      SET content = $4, updated_time = now()
      WHERE user_id = $1 AND conclusion_id = $2 AND id = $3
      RETURNING *
      `;
      let { rows } = await client.query(sql, [
        user.id,
        params.conclusionId,
        params.proofId,
        content,
      ]);

      let row = rows[0];
      let proof: IProof = {
        id: row.id,
        isOwner: row.user_id === user.id,
        content: row.content,
        createdTime: row.created_time,
        updatedTime: row.updated_time,
        status: row.status,
      };
      client.release();

      return {
        proof,
      };
    } catch (e) {
      client.release();
      throw e;
    }
  }
}
