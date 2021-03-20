const { cacheLogger } = require('./logging')
const NodeCache = require("node-cache")
const cache = new NodeCache()

cache.on('set', (key, value) => {
    cacheLogger.info(`Cache saved with key: ${key}`)
})
module.exports = cache