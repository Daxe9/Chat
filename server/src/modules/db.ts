import { Pool } from "pg";
import { DbConfig, Message } from "../helper/types";
import { loggerInfo, loggerError } from "../helper/logger";

export default class Database {
    // database pool
    public pool: Pool;

    // database table
    public readonly table: string;

    /**
     * @description: configuration for database
     * @param {object} config, configuration object
     * @param {string} table, row of table of database
     * */
    constructor(config: DbConfig, table: string) {
        try {
            this.pool = new Pool(config);
            this.table = table;

            loggerInfo.info({
                message: "Connection established",
                ...this.pool
            });
        } catch (e: any) {
            loggerError.error({
                message: "Connection failed",
                time: new Date().toLocaleString(),
                ...e
            });
        }
    }
    /**
     * @description: get all global chat messages
     * @return {Array<Message> | void} all messages or void
     * */
    public async getAllMessage(): Promise<Message[] | void> {
        try {
            const res = await this.pool.query(`SELECT *
                                               FROM ${this.table}`);

            return res.rows;
        } catch (err: any) {
            loggerError.error({
                message: err.message,
                time: new Date().toLocaleString(),
                ...err
            });
        }
    }
    /**
     * @description: store message in the database
     * @param {Message} message, message
     * */
    public async storeMessage(message: Message): Promise<void> {
        try {
            await this.pool.query(
                `INSERT INTO ${this.table} (AUTHOR, CONTENT, TIMESTAMP, TO_AUTHOR)
                                   VALUES ($1, $2, $3,
                                           $4)`,
                [
                    message.author,
                    message.content,
                    message.timestamp,
                    message.to_author
                ]
            );
        } catch (err: any) {
            loggerError.error({
                message: err.message,
                time: new Date().toLocaleString(),
                ...err
            });
        }
    }
    /**
     * @description: clear all messages belong to a specific author
     * @param {string} name, the name of author
     * */
    public async clearAllMessageByName(name: string): Promise<void> {
        try {
            await this.pool.query(
                `DELETE
                                   FROM ${this.table}
                                   WHERE AUTHOR = $1`,
                [name]
            );
        } catch (err: any) {
            loggerError.error({
                message: err.message,
                time: new Date().toLocaleString(),
                ...err
            });
        }
    }
}
