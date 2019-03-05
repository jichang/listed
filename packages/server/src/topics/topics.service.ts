import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import {
  IPaginatorParams,
  ITopicCreateParams,
  ITopic,
  IUser,
  TopicType,
} from '@proveit/shared';

@Injectable()
export class TopicsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(paginatorParams: IPaginatorParams) {
    let client = await this.databaseService.pool.connect();
    try {
      let sql = `
      SELECT
        count(*) OVER() AS total,
        id,
        title,
        description,
        type,
        created_time,
        updated_time,
        status
      FROM proveit.topics
      OFFSET $1
      LIMIT $2
      `;
      let { rows } = await client.query(sql, [
        paginatorParams.offset,
        paginatorParams.limit,
      ]);

      client.release();

      let topics = rows.map(row => {
        return {
          id: row.id,
          title: row.title,
          description: row.description,
          type: (row.type === 0 ? 'private' : 'public') as TopicType,
          created_time: row.created_time,
          updated_time: row.updated_time,
          status: row.status,
        };
      });
      let total = rows.length > 0 ? rows[0].total : 0;

      return {
        total,
        items: topics,
      };
    } catch (e) {
      client.release();
      throw e;
    }
  }

  async create(user: IUser, params: ITopicCreateParams) {
    let client = await this.databaseService.pool.connect();
    try {
      let sql = `
      INSERT INTO proveit.topics(user_id, title, description, type)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `;
      let { rows } = await client.query(sql, [
        user.id,
        params.title,
        params.description,
        params.type === 'public' ? 0 : 1,
      ]);

      client.release();

      let row = rows[0];
      let topic: ITopic = {
        id: row.id,
        title: row.title,
        description: row.description,
        type: (row.type === 0 ? 'private' : 'public') as TopicType,
        created_time: row.created_time,
        updated_time: row.updated_time,
        status: row.status,
      };

      return {
        topic,
      };
    } catch (e) {
      client.release();
      throw e;
    }
  }

  async select(topicId: string) {
    let client = await this.databaseService.pool.connect();
    try {
      let sql = `
      SELECT
        id,
        title,
        description,
        type,
        created_time,
        updated_time,
        status
      FROM proveit.topics
      WHERE id = $1
      `;
      let { rows } = await client.query(sql, [topicId]);

      client.release();

      let row = rows[0];
      let topic: ITopic = {
        id: row.id,
        title: row.title,
        description: row.description,
        type: (row.type === 0 ? 'private' : 'public') as TopicType,
        created_time: row.created_time,
        updated_time: row.updated_time,
        status: row.status,
      };

      return {
        topic,
      };
    } catch (e) {
      client.release();
      throw e;
    }
  }
}
