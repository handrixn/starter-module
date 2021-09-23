'use strict';

const Redis = require("ioredis");
const url = process.env.REDIS_CONNECTION_STRING;
// redis://host:port/db
// ex: redis://localhost:1234/0

const redis = new Redis(url);

module.exports = redis;
