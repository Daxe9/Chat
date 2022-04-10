import {Pool} from "pg";
import {DbConfig, Message} from "../types";

export default class Database {
    // @ts-ignore
    public pool: Pool;
    private readonly row: string;

    constructor(config: DbConfig, rowOfTable: string) {
        this.pool = new Pool(config);
        this.row = rowOfTable;
    }



    public async getAllMessage(): Promise<Message[]> {
        try {
            const res = await this.pool.query(`SELECT *
                                               FROM ${this.row}`);
            return res.rows;
        } catch (err) {
            throw err;
        }
    }

    public async storeMessage(message: Message): Promise<void> {
        try {
            await this.pool.query(`INSERT INTO ${this.row} (AUTHOR, CONTENT, TIMESTAMP, TO_AUTHOR)
                                               VALUES ($1, $2, $3, $4)`, [
                message.author,
                message.content,
                message.timestamp,
                message.to_author
            ]);
        } catch (err) {
            throw err;
        }
    }

    public async clearAllMessageByName(name: string): Promise<void> {
        try {
            await this.pool.query(`DELETE
                                   FROM ${this.row}
                                   WHERE AUTHOR = $1`, [name]);
        } catch (err) {
            throw err;
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