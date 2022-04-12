export interface DbConfig {
    user: string;
    database: string;
    password: string;
    port: number;
    host?: string;
}

export interface Message {
    author_id?: number;
    author: string;
    content: string;
    timestamp: string;
    to_author: string;
}

// TODO: resolve the problem of accessing class member from decorator and asynchrons function
export const Catch = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalF = descriptor.value;
    descriptor.value = (...args: any[]) => {
        try {
            return originalF.apply(target, args);
        } catch (error) {
            throw new Error("Error in " + propertyKey + ": " + error);
        }

    }
}
