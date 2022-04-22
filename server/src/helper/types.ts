import { Socket } from "socket.io";

interface DbConfig {
    user: string;
    database: string;
    password: string;
    port: number;
    host?: string;
}

interface Message {
    author_id?: number;
    author: string;
    content: string;
    timestamp: string;
    to_author: string;
}

// extend socket with username
interface AuthSocket extends Socket {
    username?: string;
    sessionID?: string;
    userID?: string;
}

// struct for user
interface User {
    userID: string;
    username: string;
}

// TODO: resolve the problem of accessing class member from decorator and asynchrons function
const Catch = (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) => {
    const originalF = descriptor.value;
    descriptor.value = (...args: any[]) => {
        try {
            return originalF.apply(target, args);
        } catch (error) {
            throw new Error("Error in " + propertyKey + ": " + error);
        }
    };
};

export { DbConfig, Message, AuthSocket, User };
