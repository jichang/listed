import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  IPaginatorParams,
  IConclusionCreateParams,
  IConclusion,
  IUser,
  TopicType,
} from '@listed/shared';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ConclusionsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async getAll(
    user: IUser,
    topicId: string,
    paginatorParams: IPaginatorParams,
  ) {
    let client = await this.databaseService.pool.connect();
    try {
      let sql = `
      SELECT
        count(*) OVER() AS total,
        id,
        user_id,
        title,
        created_time,
        updated_time,
        status
      FROM listed.conclusions
      WHERE topic_id = $1
      ORDER BY id ASC
      OFFSET $2
      LIMIT $3
      `;
      let { rows } = await client.query(sql, [
        topicId,
        paginatorParams.offset,
        paginatorParams.limit,
      ]);

      let conclusions: IConclusion[] = [];
      for (let row of rows) {
        let isOwner = !!user && user.id === row.user_id;

        let sql = `
        SELECT *
        FROM listed.proofs
        WHERE conclusion_id = $1
        ORDER BY id ASC
        `;
        let { rows } = await client.query(sql, [row.id]);

        let conclusion: IConclusion = {
          id: row.id,
          title: row.title,
          isOwner,
          proofs: {
            total: rows.length,
            items: rows.map(row => {
              return {
                id: row.id,
                isOwner,
                title: row.title,
                content: row.content,
                createdTime: row.created_time,
                updatedTime: row.updated_time,
                status: row.status,
              };
            }),
          },
          createdTime: row.created_time,
          updatedTime: row.updated_time,
          status: row.status,
        };

        conclusions.push(conclusion);
      }
      let total = rows.length > 0 ? rows[0].total : 0;

      client.release();

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
      let topicSql = `
      SELECT user_id, type
      FROM listed.topics
      WHERE id = $1`;
      let { rows: topicRows } = await client.query(topicSql, [topicId]);
      if (topicRows.length === 0) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      let topicRow = topicRows[0];
      if (topicRow.type !== TopicType.PUBLIC && topicRow.user_id !== user.id) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }

      let sql = `
      INSERT INTO listed.conclusions(user_id, topic_id, title)
      VALUES ($1, $2, $3)
      RETURNING *
      `;
      let { rows } = await client.query(sql, [user.id, topicId, params.title]);

      let row = rows[0];
      let conclusion: IConclusion = {
        id: row.id,
        isOwner: true,
        title: row.title,
        createdTime: row.created_time,
        updatedTime: row.updated_time,
        proofs: {
          total: params.proofs.length,
          items: [],
        },
        status: row.status,
      };

      for (let proof of params.proofs) {
        let sql = `
        INSERT INTO listed.proofs(user_id, conclusion_id, title, content)
        VALUES ($1, $2, $3, $4)
        RETURNING *`;
        let { rows } = await client.query(sql, [
          user.id,
          conclusion.id,
          proof.title,
          proof.content,
        ]);

        let row = rows[0];
        conclusion.proofs.items.push({
          id: row.id,
          isOwner: true,
          title: row.title,
          content: row.content,
          createdTime: row.created_time,
          updatedTime: row.updated_time,
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
