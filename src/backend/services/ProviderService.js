const DataAccess = require('../dataAccessLayer/DataAccess');

class ProviderService {
   //create a service and link it to a user with the given userID
   createProvidedService({ServiceTitle, ServiceInfo, Category, UserID}) {
      if (!ServiceTitle || !ServiceInfo || !Category) {
         const err = new Error('Missing required fields for service creation!');
         err.code = 400;
         throw err;
      } else {
         const serviceData = {
            ServiceTitle,
            ServiceInfo,
            Category
         };
         DataAccess.createProvidedService(serviceData, UserID);
      }
   }
   
}