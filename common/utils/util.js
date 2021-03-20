const { defaultLogger } = require('./logging')

exports.log = (cls, method, message) => {
    let log = `[${cls} -> ${method}] :: ${message}`
    defaultLogger.info(log)
    return log
}

exports.error = (cls, method, message, error) => {
    let log = `[${cls} -> ${method}] :: ${message}`
    defaultLogger.error(log, error)
    return log
}