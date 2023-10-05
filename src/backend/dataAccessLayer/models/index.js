const User = require('./models/user')
const Service = require('./models/service')
const AppointmentSlot = require('./AppointmentSlot')
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

module.exports = {
    User,
    Service,
    AppointmentSlot,
    Role
}