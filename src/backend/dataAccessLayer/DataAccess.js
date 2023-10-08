const { models } = require('../dataAccessLayer')
class DataAccess {

   // For User Services
   createUser(userData) {
      return models.User.create(userData);
   }

   deleteUser(UserID) {
      return models.User.destroy({
         where: {
            UserID
         }
      });
   }

   /**
    * Retrieves a user from the database by their username
    * @param {string} UserName 
    * @returns {Promise<User>} A promise for models.User instance
    */
   getUserByUserName(UserName) {
      return models.User.findOne({
         where: {
            UserName
         }
      });
   }

   getUsersRole(userID) {
      return models.User.findOne({
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
      return models.User.findOne({
         where: {
            UserID: userID
         }
      })
   }


   createAppointment(appointmentData) {
      return models.AppointmentSlot.create(appointmentData)
   }

   deleteAppointment(AppointmentID) {
      return models.AppointmentSlot.destroy({
         where: {
            AppointmentID
         }
      });
   }

   bookAppointment(AppointmentID, UserID) {
      return models.AppointmentSlot.update({UserID: UserID}, {
         where: {
            AppointmentID: AppointmentID
         }
      })
   }

   getServiceIDByUserID(UserID) {
      return models.Service.findOne({
         where: {
            UserID: UserID
         }
      })
   }

   getAllAppointmentSlotsForProvider(ServiceID) {
      return models.AppointmentSlot.findAll({
         where: {
            ServiceID: ServiceID
         },
         include: [{
            model: models.User,
            attributes: ['FirstName', 'LastName']
         }]
      })
   }

   // For Appointment Service
   getUsersBookedAppointments(userID) {
      
   }
}

// Singleton instance of DataAccess for "Dependency Injection"
const dataAccessInstance = Object.freeze(new DataAccess())
module.exports = dataAccessInstance