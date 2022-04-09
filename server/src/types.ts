export interface DbConfig {
    user: string;
    database: string;
    password: string;
    port: number;
    host?: string;
}

export interface Message {
    author_id?: number
    author: string,
    content: string,
    to_author: string
}