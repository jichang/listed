import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as toml from 'toml';

export interface Config {
  postgres: {
    addr: string;
  };
  oauth: {
    server_api: string;
    client_id: string;
    client_secret: string;
  };
}

@Injectable()
export class ConfigService {
  readonly config: Config;

  constructor(filePath: string) {
    this.config = toml.parse(
      fs.readFileSync(filePath, {
        encoding: 'utf8',
      }),
    );
  }
}
