const User = require('./models/user')
const Service = require('./models/service')
const AppointmentSlot = require('./models/AppointmentSlot')
const Role = require('./models/role')

class DataAccess {
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

   getUsersBookedAppointments(userID) {
      
   }
}