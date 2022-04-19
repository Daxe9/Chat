import { Pool } from "pg";
import { DbConfig, loggerError, loggerInfo, Message } from "../utils";

export default class Database {
    public pool: Pool;
    public readonly row: string;
    /**
     * @description: configuration for database
     * @param {object} config, configuration object
     * @param {string} rowOfTable, row of table of database
     * */
    constructor(config: DbConfig, rowOfTable: string) {
        try {
            this.pool = new Pool(config);
            this.row = rowOfTable;

            loggerInfo.info({
                message: "Connection established",
                ...this.pool
            });
        } catch (e: any) {
            loggerError.error({ message: "Connection failed", ...e });
        }
    }
    /**
     * @description: get all global chat messages
     * @return {Array<Message> | void} all messages or void
     * */
    public async getAllMessage(): Promise<Message[] | void> {
        try {
            const res = await this.pool.query(`SELECT *
                                               FROM ${this.row}`);
            return res.rows;
        } catch (err: any) {
            loggerError.error({ message: err.message, ...err });
        }
    }
    /**
     * @description: store message in the database
     * @param {Message} message, message
     * */
    public async storeMessage(message: Message): Promise<void> {
        try {
            await this.pool.query(
                `INSERT INTO ${this.row} (AUTHOR, CONTENT, TIMESTAMP, TO_AUTHOR)
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
            loggerError.error({ message: err.message, ...err });
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
                                   FROM ${this.row}
                                   WHERE AUTHOR = $1`,
                [name]
            );
        } catch (err: any) {
            loggerError.error({ message: err.message, ...err });
        }
    }
}
