'use strict';

let redis = {};
const url = process.env.REDIS_CONNECTION_STRING;
// redis://host:port/db
// ex: redis://localhost:1234/0

if (url) {
    const Redis = require("ioredis");
    redis = new Redis(url);
}

module.exports = redis;
