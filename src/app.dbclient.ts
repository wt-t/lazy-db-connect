import { Injectable, Logger } from '@nestjs/common';
import { query } from 'express';
import { connect } from 'http2';
import { async } from 'rxjs';
import { DataSource } from 'typeorm';


const delay = new Promise(resolve => setTimeout(resolve, 10_000));
const debounce = function(func, wait) {
    let timeoutId = null;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    }
}

@Injectable()
export class DbClient {
    private readonly logger = new Logger(DbClient.name, { timestamp: true });
    private AppDataSource: DataSource;
    private initializing: Promise<DataSource>;

    async connectFake() {
        if (this.AppDataSource) {
            return this.AppDataSource;
        }
        if (!this.initializing) {
        // we connect to a database here;
        await delay;
        }
        return this.initializing;
    }


    async queryFake() {
        const database = await this.connectFake();
        return [];
    }

    //Same but with real database
    async connect() {
        if (this.AppDataSource) {
            return this.AppDataSource;
        }
        try {
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
            await dataSource.initialize();
            this.AppDataSource = dataSource;
            this.logger.log("connected successfully");
            return dataSource;
        } catch (e) {
            this.initializing = null;
            this.logger.error("connection failed: " + e);
        }
    }

    async query() {
        const database = await this.connect();
        return database.query("SELECT * FROM current_schema()");
    }
}
