import { Controller, Get } from '@nestjs/common';
import { DbClient } from './app.dbclient';


@Controller()
export class AppController {
  constructor(private readonly dbClient: DbClient) {}

  @Get("/queryFake")
  getQueryFake() {
    return this.dbClient.queryFake();
  }

  //Same but with real database
  @Get("/query")
  getQuery() {
    return this.dbClient.query();
  }
}
