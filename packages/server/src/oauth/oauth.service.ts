import { Injectable } from '@nestjs/common';
import { OAuthParams, IUser } from '@listed/shared';
import axios from 'axios';
import { ConfigService } from 'src/config/config.service';
import { DatabaseService } from 'src/database/database.service';

export interface OAuthResponse {
  id: number;
  open_id: string;
  access_token: string;
  refresh_token: string;
}

@Injectable()
export class OauthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly databaseService: DatabaseService,
  ) {}

  async verify(params: OAuthParams): Promise<IUser> {
    let config = this.configService.config;

    let response = await axios.post(config.oauth.server_api, {
      code: params.code,
      client_id: config.oauth.client_id,
      client_secret: config.oauth.client_secret,
    });

    let data: OAuthResponse = response.data;

    let client = await this.databaseService.pool.connect();
    try {
      await client.query('BEGIN');
      let sql = `
      INSERT INTO listed.users(open_id)
      VALUES ($1)
      ON CONFLICT ON CONSTRAINT users_open_id_ukey DO UPDATE SET updated_time = now()
      RETURNING *
      `;
      let { rows } = await client.query(sql, [data.open_id]);
      let row = rows[0];

      await client.query('COMMIT');
      client.release();

      let user = {
        id: row.id,
        openId: row.open_id,
        createdTime: row.created_time,
        status: row.status,
      };

      return user;
    } catch (e) {
      await client.query('ROLLBACK');
      client.release();
      throw e;
    }
  }
}
