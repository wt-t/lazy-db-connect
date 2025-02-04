import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';


const delay = new Promise(resolve => setTimeout(resolve, 10_000));
@Injectable()
export class DbClient {
    private readonly logger = new Logger(DbClient.name, { timestamp: true });
    private connected: Boolean;
    private AppDataSource: DataSource;

    async connectFake() {
        if (this.connected) return;
        try {
            this.connected = true;
            await delay;
            this.logger.log("connected successfully");
        } catch (e) {
            this.connected = false;
            this.logger.error("connection failed: " + e);
        }
    }

    async queryFake() {
        if (!this.connected) await this.connectFake();
        return [];
    }

    //Same but with real database
    async connect() {
        if (this.connected) return;
        try {
            this.connected = true;
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
            this.logger.log("connected successfully");
        } catch (e) {
            this.connected = false;
            this.logger.error("connection failed: " + e);
        }
    }

    async query() {
        if (!this.connected) await this.connect();
        return this.AppDataSource.query("SELECT * FROM current_schema()");
    }
}
