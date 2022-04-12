import {Pool} from "pg";
import {DbConfig, loggerError, loggerInfo, Message} from "../utils";

export default class Database {
    public pool: Pool;
    public readonly row: string;

    constructor(config: DbConfig, rowOfTable: string) {
        try{
            this.pool = new Pool(config);
            this.row = rowOfTable;

            loggerInfo.info({message: "Connection established", ...this.pool});
        } catch (e: any) {
            loggerError.error({message: "Connection failed", ...e});
        }

    }

    public async getAllMessage(): Promise<Message[] | void> {
        try {
            const res = await this.pool.query(`SELECT *
                                               FROM ${this.row}`);
            return res.rows;
        } catch (err: any) {
            loggerError.error({message: err.message, ...err})
        }
    }

    public async storeMessage(message: Message): Promise<void> {
        try {
            await this.pool.query(`INSERT INTO ${this.row} (AUTHOR, CONTENT, TIMESTAMP, TO_AUTHOR)
                                   VALUES ($1, $2, $3,
                                           $4)`, [message.author, message.content, message.timestamp, message.to_author]);
        } catch (err: any) {
            loggerError.error({message: err.message, ...err});
        }
    }

    public async clearAllMessageByName(name: string): Promise<void> {
        try {
            await this.pool.query(`DELETE
                                   FROM ${this.row}
                                   WHERE AUTHOR = $1`, [name]);
        } catch (err: any) {
            loggerError.error({message: err.message, ...err});
        }
    }
}



// const db = new Database({
//     user: "postgres",
//     database: "chatroom",
//     password: "Xie__",
//     port: 5432
// }, "messages");
// async function main() {
//     const time = new Date().toLocaleString()
//     console.log(time.length)
//     await db.storeMessage({
//         author: "Xie",
//         content: "Hello",
//         to_author: "Xie"
//     });
//     const res: Message[] = await db.getAllMessage();
//     console.log(res)
//
// }
// main();
