const {Sequelize} = require('sequelize');
const measurmentModel = require('./model');

const db = {
    measurement: null,
    connection: new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: true
        },
        logging: false
    }),
    async init() {
        try {
            this.measurement = measurmentModel(this.connection);
            await this.connection.sync({force: true});
        } catch(err) {
            console.error(`[ERROR] db.index.db.init: ${err}`);
        }
    }
}

db.init();

module.exports = db;