import { createLogger, format, transports } from "winston";

// logger for errors
const loggerError = createLogger({
    level: "error",
    format: format.json(),
    transports: [
        new transports.File({ filename: "../logs/error.log", level: "error" })
    ]
});

// logger for information log
const loggerInfo = createLogger({
    level: "info",
    format: format.json(),
    transports: [
        new transports.File({ filename: "../logs/info.log", level: "info" })
    ]
});

if (process.env.NODE_ENV !== "production") {
    loggerError.add(new transports.Console());
    loggerInfo.add(new transports.Console());
}

function handleUncaughtExceptions() {
    process.on("uncaughtException", (error: Error) => {
        loggerError.error({
            message: error.message,
            time: new Date().toLocaleString()
        });
    });
    process.on("unhandledRejection", (error: Error) => {
        loggerError.error({
            message: error.message,
            time: new Date().toLocaleString()
        });
    });
}

export { loggerError, loggerInfo, handleUncaughtExceptions };
