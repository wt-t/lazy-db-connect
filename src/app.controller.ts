import { Controller, Get } from '@nestjs/common';
import { DbClient } from './app.dbclient';


@Controller()
export class AppController {
  constructor(private readonly dbClient: DbClient) {}

  @Get("/test")
  getHello() {
    return this.dbClient.connect();
  }

  @Get("/query")
  getQuery() {
    return this.dbClient.query();
  }
}
