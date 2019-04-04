import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import * as pg from 'pg';

@Injectable()
export class DatabaseService {
  pool: pg.Pool;

  constructor(private readonly configService: ConfigService) {
    this.pool = new pg.Pool({
      connectionString: configService.config.postgres.addr,
    });
  }
}
