const {Sequelize} = require('sequelize');
const measurmentModel = require('./model');
const config = require('dotenv').config({path: __dirname + '/../../.env'}).parsed;

const db = {
    measurement: null,
    connection: new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASS, {
        host: config.DB_HOST,
        dialect: 'postgres',
        logging: false
    }),
    async init() {
        try {
            this.measurement = measurmentModel(this.connection);
            await this.connection.sync();
        } catch(err) {
            console.error(`[ERROR] db.index.db.init: ${err}`);
        }
    }
}

db.init();

module.exports = db;