const User = require('./models/User')
const Service = require('./models/Service')
const AppointmentSlot = require('./models/AppointmentSlot')
const Role = require('./models/Role')

class DataAccess {

   // For User Services
   createUser(userData) {
      return User.create(userData);
   }

   getUsersRole(userID) {
      return User.findOne({
         where: {
            UserID: userID
         },
         include: [{
            model: Role,
            required: true
         }]
      })
   }

   getUser(userID) {
      return User.findOne({
         where: {
            UserID: userID
         }
      })
   }


   // For Appointment Service
   getUsersBookedAppointments(userID) {
      
   }
}

// Singleton instance of DataAccess for "Dependency Injection"
const dataAccessInstance = Object.freeze(new DataAccess())
module.exports = dataAccessInstance