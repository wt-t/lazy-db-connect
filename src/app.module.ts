import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbClient } from './app.dbclient';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DbClient],
})
export class AppModule {}
