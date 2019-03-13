import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import {
  IPaginatorParams,
  ITopicCreateParams,
  ITopic,
  IUser,
  TopicType,
} from '@listed/shared';

@Injectable()
export class TopicsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(user: IUser, paginatorParams: IPaginatorParams) {
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
      FROM listed.topics
      OFFSET $1
      LIMIT $2
      `;
      let { rows } = await client.query(sql, [
        paginatorParams.offset,
        paginatorParams.limit,
      ]);

      client.release();

      let topics: ITopic[] = rows.map(row => {
        return {
          id: row.id,
          title: row.title,
          description: row.description,
          type: (row.type === 0 ? 'private' : 'public') as TopicType,
          subscription: null,
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
      await client.query('BEGIN');

      let sql = `
      INSERT INTO listed.topics(user_id, title, description, type)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `;
      let { rows: topicRows } = await client.query(sql, [
        user.id,
        params.title,
        params.description,
        params.type === 'public' ? 0 : 1,
      ]);

      let topicRow = topicRows[0];

      sql = `
      INSERT INTO listed.subscriptions(user_id, topic_id)
      VALUES ($1, $2)
      RETURNING *
      `;

      let { rows: subscriptionRows } = await client.query(sql, [
        user.id,
        topicRow.id,
      ]);

      await client.query('COMMIT');
      client.release();

      let subscriptionRow = subscriptionRows[0];
      let topic: ITopic = {
        id: topicRow.id,
        title: topicRow.title,
        description: topicRow.description,
        type: (topicRow.type === 0 ? 'private' : 'public') as TopicType,
        subscription: {
          id: subscriptionRow.id,
          created_time: subscriptionRow.created_time,
          updated_time: subscriptionRow.updated_time,
          status: subscriptionRow.status,
        },
        created_time: topicRow.created_time,
        updated_time: topicRow.updated_time,
        status: topicRow.status,
      };

      return {
        topic,
      };
    } catch (e) {
      await client.query('ROLLBACK');
      client.release();
      throw e;
    }
  }

  async select(user: IUser, topicId: string) {
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
      FROM listed.topics
      WHERE id = $1
      `;
      let { rows: topicRows } = await client.query(sql, [topicId]);

      let topicRow = topicRows[0];

      let subscription = null;
      if (user) {
        sql = `
        SELECT
          id,
          created_time,
          updated_time,
          status
        FROM listed.subscriptions
        WHERE user_id = $1 AND topic_id = $2
        `;
        let { rows: subscriptionRows } = await client.query(sql, [
          user.id,
          topicId,
        ]);
        let subscriptionRow = subscriptionRows[0];
        if (subscriptionRow) {
          subscription = {
            id: subscriptionRow.id,
            created_time: subscriptionRow.created_time,
            updated_time: subscriptionRow.updated_time,
            status: subscriptionRow.status,
          };
        }
      }

      client.release();

      let topic: ITopic = {
        id: topicRow.id,
        title: topicRow.title,
        description: topicRow.description,
        type: (topicRow.type === 0 ? 'private' : 'public') as TopicType,
        subscription,
        created_time: topicRow.created_time,
        updated_time: topicRow.updated_time,
        status: topicRow.status,
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
