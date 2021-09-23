'use strict';

exports.Mysql = require('./database/mysql');
exports.Pgsql = require('./database/pgsql');
exports.Mongo =  require('./database/mongodb');
exports.Redis = require('./database/redis');

module.exports = exports;