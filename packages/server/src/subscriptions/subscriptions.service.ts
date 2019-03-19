import { Injectable } from '@nestjs/common';
import { ISubscription, IUser } from '@listed/shared';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(user: IUser, topicId: string) {
    let client = await this.databaseService.pool.connect();
    try {
      let sql = `
      INSERT INTO listed.subscriptions(user_id, topic_id)
      VALUES ($1, $2)
      RETURNING *
      `;
      let { rows } = await client.query(sql, [user.id, topicId]);

      let row = rows[0];
      let subscription: ISubscription = {
        id: row.id,
        createdTime: row.created_time,
        updatedTime: row.updated_time,
        status: row.status,
      };

      client.release();

      return {
        subscription,
      };
    } catch (e) {
      client.release();
      throw e;
    }
  }

  async remove(user: IUser, topicId: string, subscriptionId: string) {
    let client = await this.databaseService.pool.connect();
    try {
      let sql = `
      DELETE
      FROM listed.subscriptions
      WHERE user_id = $1 AND topic_id = $2 AND id = $3
      RETURNING *
      `;
      let { rows } = await client.query(sql, [
        user.id,
        topicId,
        subscriptionId,
      ]);

      let row = rows[0];
      let subscription: ISubscription = {
        id: row.id,
        createdTime: row.created_time,
        updatedTime: row.updated_time,
        status: row.status,
      };

      client.release();

      return {
        subscription,
      };
    } catch (e) {
      client.release();
      throw e;
    }
  }
}
