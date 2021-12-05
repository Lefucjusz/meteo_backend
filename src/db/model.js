const {Sequelize} = require('sequelize');

module.exports = (connection) => {
    return connection.define('measurements', {
        sensorName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tempInside: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        tempOutside: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        pressure: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        humidity: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        timestamp: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false //I'm storing my own timestamps
    });
}