const winston = require('winston')
require('winston-daily-rotate-file')

function getLogTransport(logDir) {
    return new (winston.transports.DailyRotateFile)({
        filename: `logs/${logDir}/app-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: false,
        maxSize: '20m',
        maxFiles: '90d',
    })
}

const defaultLogger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    defaultMeta: {
        time: new Date().toString()
    },
    transports: [
        getLogTransport('fast'),
        new winston.transports.Console()
    ],
})

// In non-production environment, all logs are also output directly to console for debugging purposes.
const loggers = [
    defaultLogger,
]
if (process.env.NODE_ENV !== 'production') {
    loggers.forEach(logger => {
        logger.add(new winston.transports.Console({
            format: winston.format.simple(),
        }))
    })
}
module.exports = {
    defaultLogger,
}