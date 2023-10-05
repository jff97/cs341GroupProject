const { Sequelize } = require("sequelize");

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
        foreignKey: 'UserID',
        onDelete: 'CASCADE'
    });

    // A service provides many appointment slots
    Service.hasMany(AppointmentSlot, {
        'foreignKey': 'ServiceID',
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
            console.log('Database synchronized');
        }).catch((error) => {
            console.log('Error synchronizing database');
            console.log(error);
        });
}

module.exports = {
    applyAssociations,
    synchronizeDatabase
}