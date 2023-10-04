const sequelize = require('./sequelize_index');
const User = require('./models/user')
const Service = require('./models/service')
const AppointmentSlot = require('./models/AppointmentSlot')
const Role = require('./models/role')

// One role serves many users
Role.hasMany(User, {
    'foreignKey': 'RoleID',
});
// One user offers one service
User.hasOne(Service, {
    'foreignKey': 'UserID',
    onDelete: 'CASCADE'
});
// A user books multiple appointments
User.hasMany(AppointmentSlot, {
    'foreignKey': 'UserID',
    onDelete: 'CASCADE'
});

// A service provides many appointment slots
Service.hasMany(AppointmentSlot, {
    'foreignKey': 'ServiceID',
});

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database successfully synchronized');
    }).catch((err) => {
        console.log('Database synchronization failed: ', err);
    });