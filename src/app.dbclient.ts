import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DbClient {

    private AppDataSource: DataSource;

    async connect() {
        if (this.AppDataSource) return;
        const dataSource = new DataSource({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "postgres",
            database: "postgres",
            synchronize: true,
            logging: true,
            entities: [],
            subscribers: [],
            migrations: [],
        });
        this.AppDataSource = await dataSource.initialize();
    }


    async query() {
        if (!this.AppDataSource) await this.connect();
        return this.AppDataSource.query("SELECT * FROM current_schema()");
    }
}
