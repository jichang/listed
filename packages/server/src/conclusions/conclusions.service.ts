import { Injectable } from '@nestjs/common';
import {
  IPaginatorParams,
  IConclusionCreateParams,
  IConclusion,
  IUser,
} from '@listed/shared';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ConclusionsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(topicId: string, paginatorParams: IPaginatorParams) {
    let client = await this.databaseService.pool.connect();
    try {
      let sql = `
      SELECT
        count(*) OVER() AS total,
        id,
        title,
        created_time,
        updated_time,
        status
      FROM listed.conclusions
      WHERE topic_id = $1
      OFFSET $2
      LIMIT $3
      `;
      let { rows } = await client.query(sql, [
        topicId,
        paginatorParams.offset,
        paginatorParams.limit,
      ]);

      client.release();

      let conclusions: IConclusion[] = [];
      for (let row of rows) {
        let sql = `
        SELECT *
        FROM listed.proofs
        WHERE conclusion_id = $1
        `;
        let { rows } = await client.query(sql, [row.id]);

        let conclusion: IConclusion = {
          id: row.id,
          title: row.title,
          proofs: {
            total: rows.length,
            items: rows.map(row => {
              return {
                id: row.id,
                content: row.content,
                created_time: row.created_time,
                updated_time: row.updated_time,
                status: row.status,
              };
            }),
          },
          created_time: row.created_time,
          updated_time: row.updated_time,
          status: row.status,
        };

        conclusions.push(conclusion);
      }
      let total = rows.length > 0 ? rows[0].total : 0;

      return {
        total,
        items: conclusions,
      };
    } catch (e) {
      client.release();
      throw e;
    }
  }

  async create(user: IUser, topicId: string, params: IConclusionCreateParams) {
    let client = await this.databaseService.pool.connect();
    try {
      await client.query('BEGIN');
      let sql = `
      INSERT INTO listed.conclusions(user_id, topic_id, title)
      VALUES ($1, $2, $3)
      RETURNING *
      `;
      let { rows } = await client.query(sql, [user.id, topicId, params.title]);

      let row = rows[0];
      let conclusion: IConclusion = {
        id: row.id,
        title: row.title,
        created_time: row.created_time,
        updated_time: row.updated_time,
        proofs: {
          total: params.proofs.length,
          items: [],
        },
        status: row.status,
      };

      for (let proof of params.proofs) {
        let sql = `
        INSERT INTO listed.proofs(user_id, conclusion_id, content)
        VALUES ($1, $2, $3)
        RETURNING *`;
        let { rows } = await client.query(sql, [
          user.id,
          conclusion.id,
          proof.content,
        ]);

        let row = rows[0];
        conclusion.proofs.items.push({
          id: row.id,
          content: row.content,
          created_time: row.created_time,
          updated_time: row.updated_time,
          status: row.status,
        });
      }

      await client.query('COMMIT');
      client.release();

      return {
        conclusion,
      };
    } catch (e) {
      await client.query('ROLLBACK');
      client.release();
      throw e;
    }
  }
}
