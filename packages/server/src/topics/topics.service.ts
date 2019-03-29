import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import {
  ITopicCreateParams,
  ITopic,
  IUser,
  TopicType,
  ITopicQueryParams,
} from '@listed/shared';

@Injectable()
export class TopicsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(user: IUser, params: ITopicQueryParams) {
    let client = await this.databaseService.pool.connect();
    try {
      let rows = [];
      if (params.category === 'subscribe') {
        let sql = `
        SELECT
          count(*) OVER() AS total,
          topics.id,
          topics.user_id,
          topics.title,
          topics.description,
          topics.type,
          topics.created_time,
          topics.updated_time,
          topics.status
        FROM listed.subscriptions AS subscriptions
        LEFT JOIN listed.topics AS topics ON subscriptions.topic_id = topics.id
        WHERE topics.title LIKE $3 AND subscriptions.user_id = $4
        ORDER BY topics.id DESC
        OFFSET $1
        LIMIT $2
        `;
        let result = await client.query(sql, [
          params.offset,
          params.limit,
          `%${params.keyword}%`,
          user.id,
        ]);
        rows = result.rows;
      } else {
        let sql = `
        SELECT
          count(*) OVER() AS total,
          id,
          user_id,
          title,
          description,
          type,
          created_time,
          updated_time,
          status
        FROM listed.topics
        WHERE title LIKE $3
        ORDER BY id DESC
        OFFSET $1
        LIMIT $2
        `;
        let result = await client.query(sql, [
          params.offset,
          params.limit,
          `%${params.keyword}%`,
        ]);
        rows = result.rows;
      }

      client.release();

      let topics: ITopic[] = rows.map(row => {
        return {
          id: row.id,
          isOwner: !!user && row.user_id === user.id,
          title: row.title,
          description: row.description,
          type: row.type,
          subscription: null,
          createdTime: row.created_time,
          updatedTime: row.updated_time,
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
        params.type,
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
        isOwner: true,
        title: topicRow.title,
        description: topicRow.description,
        type: topicRow.type as TopicType,
        subscription: {
          id: subscriptionRow.id,
          createdTime: subscriptionRow.created_time,
          updatedTime: subscriptionRow.updated_time,
          status: subscriptionRow.status,
        },
        createdTime: topicRow.created_time,
        updatedTime: topicRow.updated_time,
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
        user_id,
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
            createdTime: subscriptionRow.created_time,
            updatedTime: subscriptionRow.updated_time,
            status: subscriptionRow.status,
          };
        }
      }

      client.release();

      let topic: ITopic = {
        id: topicRow.id,
        isOwner: !!user && topicRow.user_id === user.id,
        title: topicRow.title,
        description: topicRow.description,
        type: topicRow.type as TopicType,
        subscription,
        createdTime: topicRow.created_time,
        updatedTime: topicRow.updated_time,
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

  async update(user: IUser, topicId: string, params: ITopicCreateParams) {
    let client = await this.databaseService.pool.connect();
    try {
      let sql = `
      UPDATE listed.topics
      SET title = $3, description = $4, type = $5, updated_time = now()
      WHERE user_id = $1 AND id = $2
      RETURNING *
      `;

      let { rows } = await client.query(sql, [
        user.id,
        topicId,
        params.title,
        params.description,
        params.type,
      ]);

      client.release();

      let topicRow = rows[0];

      let topic = {
        id: topicRow.id,
        isOwner: true,
        title: topicRow.title,
        description: topicRow.description,
        type: topicRow.type as TopicType,
        createdTime: topicRow.created_time,
        updatedTime: topicRow.updated_time,
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
