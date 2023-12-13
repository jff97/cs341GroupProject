//Author: Creed Zagrzebski, John Fox, Alex Cappel, Peter Xiong
//Date Created: October 4 2023 
//Dates Modified: October 5, 8, 10
//                November 3, 5, 7, 8
//Class & Methods Explained: This class is used to hold/access all data from program relating to users and appointments 
const { models } = require('../dataAccessLayer')
const { Op, Sequelize } = require('sequelize')
class DataAccess {

   // For User Services
   //create a user
   createUser(userData) {
      return models.User.create(userData);
   }

   //delete a user
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

   //get a users role
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

   //get users see if in system  
   getUser(userID) {
      return models.User.findOne({
         where: {
            UserID: userID
         }
      })
   }

   //create an appointment 
   createAppointment(appointmentData) {
      return models.AppointmentSlot.create(appointmentData)
   }

   //delete an appointment
   deleteAppointment(AppointmentID) {
      return models.AppointmentSlot.destroy({
         where: {
            AppointmentID
         }
      });
   }

   //booking an appointment with user
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
   
   //cancel an appointment 
   cancelAppointment(AppointmentID) {
      return models.AppointmentSlot.update({ClientUserID: null}, {
         where: {
            AppointmentID: AppointmentID
         }
      })
   }

   //get all appointment slots from a service provider
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

   //modify appointment time
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

   //get appointment by its ID
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

   //delete a service in bulk
   deleteProvidedService(ServiceID) {
      return models.Service.destroy({
         where: {
            ServiceID
         }
      })
   }

   //modify&change a provided service 
   modifyProvidedService(ServiceID, ServiceTitle, ServiceInfo, Category) {
      return models.Service.update({ServiceTitle: ServiceTitle, ServiceInfo: ServiceInfo, Category: Category}, {
         where: {
            ServiceID
         }
      })
   }

   //get all available appointments 
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

   //get all appointments associated with userId
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

   //get all appointments in system
   getAllSystemAppointments(filterDate) {
      const targetDate = new Date(filterDate);
      
      // Get all appointments that fall on the target date
      return models.AppointmentSlot.findAll({
         where: {
            StartDateTime: {
               [Op.between]: [targetDate, new Date(targetDate.getTime() + 86400000)] // Add 24 hours to target date
            }
         },
         nest: false,
         raw: true,
         include: [{
            model: models.Service,
            attributes: ['ServiceTitle', 'Category']
         }, {
            model: models.User,
            attributes: ['FirstName', 'LastName']
         }]
      })
   }

   //get all notifications from a user
   getAllNotificationsForUser(UserID) {
      return models.Notification.findAll({
         where: {
            UserID: UserID
         }
      })
   }

   //create notification
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

   //delete notification
   deleteNotification(NotificationID) {
      return models.Notification.destroy({
         where: {
            NotificationID: NotificationID
         }
      })
   }

   //toggle notification read
   toggleNotificationRead(NotificationID) {
      return models.Notification.update({NotificationRead: Sequelize.literal('NOT NotificationRead')}, {
         where: {
            NotificationID: NotificationID
         }
      })
   }

   //get a service via its Id
   getServiceByID(ServiceID) {
      return models.Service.findOne({
         where: {
            ServiceID: ServiceID
         }
      })
   }

   //modify&change appoiontment 
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

   //get all users who are a service provider
   getAllServiceProviders() {
      return models.User.findAll({
         where: {
            RoleID: 2
         }
      })
   }
}

// Singleton instance of DataAccess for "Dependency Injection"
const dataAccessInstance = Object.freeze(new DataAccess())
module.exports = dataAccessInstance