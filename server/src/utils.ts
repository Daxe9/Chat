import {createLogger, format, transports} from "winston";

const loggerError = createLogger({
    level: "error",
    format: format.json(),
    transports: [
        new transports.File({filename: "../logs/error.log", level: "error"}),
    ]
})

const loggerInfo = createLogger({
    level: "info",
    format: format.json(),
    transports: [
        new transports.File({filename: "../logs/info.log", level: "info"}),
    ]
})

if (process.env.NODE_ENV !== "production") {
    loggerError.add(new transports.Console())
    loggerInfo.add(new transports.Console())
}

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

// TODO: resolve the problem of accessing class member from decorator and asynchrons function
const Catch = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalF = descriptor.value;
    descriptor.value = (...args: any[]) => {
        try {
            return originalF.apply(target, args);
        } catch (error) {
            throw new Error("Error in " + propertyKey + ": " + error);
        }

    }
}

function handleUncaughtExceptions() {
    process.on("uncaughtException", (error: Error) => {
        loggerError.error(error.message);
    })
    process.on("unhandledRejection", (error: Error) => {
        loggerError.error(error.message);
    })
}

export {
    loggerError,
    loggerInfo,
    handleUncaughtExceptions,
    DbConfig,
    Message
}