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

   bookAppointment(AppointmentID, ClientUserID) {
      return models.AppointmentSlot.update({ClientUserID: ClientUserID}, {
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
                                    
   cancelAppointment(AppointmentID) {
      return models.AppointmentSlot.update({ClientUserID: null}, {
         where: {
            AppointmentID: AppointmentID
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

   modifyAppointmentTime(AppointmentID, StartDateTime, EndDateTime) {
      return models.AppointmentSlot.update({StartDateTime: StartDateTime, EndDateTime: EndDateTime}, {
         where: {
            AppointmentID: AppointmentID
         }
      })
   }

   // For Appointment Service
   getUsersBookedAppointments(userID) {
      
   }

   getAppointmentByID(AppointmentID) {
      return models.AppointmentSlot.findOne({
         where: {
            AppointmentID: AppointmentID
         }
      })
   }

   //create a service and link it to the user with the given userID
   createProvidedService(serviceData) {
      //add the userid to link the service to the user
      //serviceData.UserID = userID
      return models.Service.create(serviceData)
   }

   deleteProvidedService(ServiceID) {
      return models.Service.destroy({
         where: {
            ServiceID
         }
      })
   }

   modifyProvidedService(ServiceID, ServiceTitle, ServiceInfo, Category) {
      return models.Service.update({ServiceTitle: ServiceTitle, ServiceInfo: ServiceInfo, Category: Category}, {
         where: {
            ServiceID
         }
      })
   }

   getAllAvailableAppointments() {
      return models.AppointmentSlot.findAll({
         where: {
            ClientUserID: null
         }, 
         nest: false,
         raw: true,
         include: [{
            model: models.Service,
            attributes: ['ServiceTitle', 'Category', 'ServiceInfo']
         }]
      })
   }

   getAppointmentsByUserId(UserID) {
      return models.AppointmentSlot.findAll({
         where: {
            ClientUserID: UserID
         }, 
         nest: false,
         raw: true,
         include: [{
            model: models.Service,
            attributes: ['ServiceTitle', 'Category']
         }]
      })
   }

   getAllUsernames() {
      return models.User.findAll({
         attributes: ['UserName']
      });
   }
}



// Singleton instance of DataAccess for "Dependency Injection"
const dataAccessInstance = Object.freeze(new DataAccess())
module.exports = dataAccessInstance