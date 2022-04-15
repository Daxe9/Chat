export interface Message {
    author: string;
    content: string;
    to_author: string;
}

export interface MessageBackend extends Message {
    author_id?: number;
    timestamp: string;
}

export interface ContactType {
    userID: string;
    username: string;
    self?: boolean
}