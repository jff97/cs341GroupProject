const Sequelize = require('sequelize');
const connection = require('../configs/connection');
const { applyAssociations, synchronizeDatabase } = require('./extraSetup')

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

// Import models
const modelDefiners = [
    require('./models/User'),
    require('./models/Service'),
    require('./models/Role'),
    require('./models/AppointmentSlot'),
];

// Instantiate the models through dependency injection with sequelize
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

// Apply relationships then synchronize the database
applyAssociations(sequelize);
synchronizeDatabase(sequelize);

module.exports = sequelize;