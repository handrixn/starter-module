'use strict';

const db = {};
const url = process.env.DB_PGSQL_CONNECTION_STRING;

if (url) {
    const fs = require('fs');
    const path = require('path');
    const Sequelize = require('sequelize');

    const basename = 'index.js';
    const dirname = `${__dirname}/../../src/model/pgsql/`;
    const timezoneOffset = require('./timezone.json');
    const config = {
        dialect: 'postgres',
        dialectOptions: {
            dateStrings: true,
            decimalNumbers: true,
            useUTC: false,
            typeCast(field, next) {
                if (field.type === 'DATETIME' || field.type === 'TIMESTAMP') {
                    return field.string();
                }
                return next();
            }
        },
        timezone: (process.env.TZ ? (timezoneOffset[process.env.TZ] || '+02:00') : '+02:00'),
        // eslint-disable-next-line no-console
        logging: (process.env.DB_LOGGING === 'true' ? console.log : false),
        operatorsAliases: 0,
        define: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'
        },
        pool: {
            max: (process.env.PGSQL_MAX_POOL ? parseInt(process.env.PGSQL_MAX_POOL) : 100),
            min: 1,
            acquire: 30000,
            idle: 10000
        }
    };

    const sequelize = new Sequelize(url, config);

    fs.readdirSync(dirname)
        .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
        .forEach((file) => {
            const model = require(path.join(dirname, file))(sequelize, Sequelize.DataTypes);
            db[model.name] = model;
        });

    Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    db.Op = Sequelize.Op;
}

module.exports = db;
