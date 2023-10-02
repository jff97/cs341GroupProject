const Sequelize = require('sequelize');
const connection = require('../configs/connection.js');

// Create a Sequelize instance
const sequelize = new Sequelize(
    connection.database,
    connection.user,
    connection.password,
    {
        host: connection.host,
        port: connection.port,
        dialect: 'mysql',
        define: {
            freezeTableName: true,
            timestamps: true,
            createdAt: 'CreatedDateTime', 
            updatedAt: 'LastModifiedDateTime' 
        },
        logging: false
    }
)

module.exports = sequelize;