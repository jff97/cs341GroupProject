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

   // For Appointment Service
   getUsersBookedAppointments(userID) {
      
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
}

// Singleton instance of DataAccess for "Dependency Injection"
const dataAccessInstance = Object.freeze(new DataAccess())
module.exports = dataAccessInstance