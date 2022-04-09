import {Pool} from "pg";
import {DbConfig, Message} from "../types";

export class Database {
    private pool: Pool;
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
            const res = await this.pool.query(`INSERT INTO ${this.row} (AUTHOR, CONTENT, TIME, TO_AUTHOR)
                                               VALUES ($1, $2, $3, $4)`, [
                message.author,
                message.content,
                new Date().toLocaleString(),
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
//     await db.clearAllMessageByName("Davide")
//     const res: Message[] = await db.getAllMessage();
//     console.log(res)
//
// }
//
// main();