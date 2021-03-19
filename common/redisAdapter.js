const adapter = require('socket.io-redis');
const redis = require("redis");

const host = process.env.REDIS_HOST;
const port = process.env.REDIS_PORT;
const password = process.env.REDIS_PASSWORD;

const pub = redis.createClient(port, host, {auth_pass: password});
const sub = redis.createClient(port, host, {auth_pass: password});


module.exports = adapter({pubClient: pub, subClient: sub});
