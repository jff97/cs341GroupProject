const { Sequelize } = require("sequelize");
const { logger } = require("../logging");

/**
 * Setups the associations between the models
 * 
 * @param {Sequelize} sequelize - Sequelize/DB instance
 */
function applyAssociations(sequelize) {
    const { User, Service, Role, AppointmentSlot } = sequelize.models;

    // One role serves many users
    Role.hasMany(User, {
        foreignKey: 'RoleID',
    });
    // One user offers one service
    User.hasOne(Service, {
        foreignKey: 'UserID',
        onDelete: 'CASCADE'
    });
    // A user books multiple appointments
    User.hasMany(AppointmentSlot, {
        foreignKey: {
            name: 'ClientUserID',
            allowNull: true
        },
        onDelete: 'CASCADE'
    });

    // A service provides many appointment slots
    Service.hasMany(AppointmentSlot, {
        foreignKey: {
            name: 'ServiceID',
            allowNull: false
        },

    });
}

/**
 * Synchronizes the database models with the ORM
 * 
 * @param {Sequelize} sequelize - Sequelize/DB instance
 */
function synchronizeDatabase(sequelize) {
    sequelize.sync({force: false}).
        then(() => {
            logger.info('Database models successfully synchronized with ORM!');
        }).catch((error) => {
            logger.error('Unable to synchronize database models with ORM!' + error);
        });
}

module.exports = {
    applyAssociations,
    synchronizeDatabase
}