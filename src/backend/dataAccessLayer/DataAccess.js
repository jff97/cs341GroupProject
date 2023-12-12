const { models } = require('../dataAccessLayer')
const { Op, Sequelize } = require('sequelize')
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
            model: models.Role,
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

   //return just the service id attribute of the user associated with the userid
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
            attributes: ['ServiceTitle', 'Category', 'ServiceInfo'],
            include: [{
               model: models.User,
               attributes: ['FirstName', 'LastName']
            }]
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
            attributes: ['ServiceTitle', 'Category'],
            include: [{
               model: models.User,
               attributes: ['FirstName', 'LastName']
            }]
         }]
      })
   }

   getAppointmentsInRange(filterStartDate, filterEndDate) {
      const targetStartDate = new Date(filterStartDate);
      const targetEndDate = new Date(filterEndDate);

      // Get all appoinemtents, including the first and lastname of the service provider
      
      // Get all appointments that fall on the target date
      return models.AppointmentSlot.findAll({
         where: {
            StartDateTime: {
               [Op.between]: [targetStartDate, targetEndDate] // Add 24 hours to target date
            }
         },
         nest: false,
         raw: true,
         include: [{
            model: models.Service,
            attributes: ['ServiceTitle', 'Category'],
            include: [{
               model: models.User,
               attributes: ['FirstName', 'LastName']
            }]
         }, {
            model: models.User,
            attributes: ['FirstName', 'LastName']
         }]
      })
   }

   getAllNotificationsForUser(UserID) {
      return models.Notification.findAll({
         where: {
            UserID: UserID
         }
      })
   }

   createNotification(NotificationTitle, NotificationMessage, NotificationDate, NotificationType, UserID) {
      return models.Notification.create({ 
         NotificationTitle: NotificationTitle, 
         NotificationMessage: NotificationMessage, 
         NotificationDate: NotificationDate, 
         NotificationType: NotificationType, 
         NotificationRead: false, 
         UserID: UserID
      })
   }

   deleteNotification(NotificationID) {
      return models.Notification.destroy({
         where: {
            NotificationID: NotificationID
         }
      })
   }

   toggleNotificationRead(NotificationID) {
      return models.Notification.update({NotificationRead: Sequelize.literal('NOT NotificationRead')}, {
         where: {
            NotificationID: NotificationID
         }
      })
   }

   getServiceByID(ServiceID) {
      return models.Service.findOne({
         where: {
            ServiceID: ServiceID
         }
      })
   }

   modifyAppointment(AppointmentID, StartDateTime, EndDateTime, AppointmentTitle) {
      return models.AppointmentSlot.update({StartDateTime: StartDateTime, EndDateTime: EndDateTime, AppointmentTitle: AppointmentTitle}, {
         where: {
            AppointmentID: AppointmentID
         }
      })
   }

   //get all booked appointments that were within the given time frame and where a clientUserid of not null means booked
   getAppointmentsInTimeFrame(ServiceID, StartDateTime, EndDateTime) {
      return models.AppointmentSlot.findAll({
         where: {
            ServiceID: ServiceID,
            StartDateTime: {
               [Op.between]: [StartDateTime, EndDateTime]
            },
            ClientUserID: {
               [Op.not]: null
            }
         }
      })
   }

   getAllServiceProviders() {
      return models.User.findAll({
         where: {
            RoleID: 2
         }
      })
   }
   getUsersByRoleID(RoleID) {
      return models.User.findAll({
         where: {
            RoleID: RoleID
         }
      })
   }

   getUsers() {
      // Get all users except for the admin
      return models.User.findAll()
   }

   getAllServiceProvidersWithService() {
      return models.User.findAll({
         include: [{
            model: models.Service,
            required: true, // Ensures it's an INNER JOIN
            /*on: {
               UserId: models.Sequelize.c('User.UserId') // ON condition
            }*/
         }],
         where: {
            RoleID: 2
         }
      })
   }

   async disableUser(UserID) {
      await models.User.update({Active: false}, {
         where: {
            UserID
         }
      })
   }

   async enableUser(UserID) {
      await models.User.update({Active: true}, {
         where: {
            UserID
         }
      })
   }

   async deleteAllAppointmentsByServiceID(ServiceID) {
      await models.AppointmentSlot.destroy({
         where: {
            ServiceID
         }
      })
   }
}

// Singleton instance of DataAccess for "Dependency Injection"
const dataAccessInstance = Object.freeze(new DataAccess())
module.exports = dataAccessInstance