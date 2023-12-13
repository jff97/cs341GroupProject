//Author: John Fox, Alex Cappel
//Date Created: October 5 2023     
//Date Modified: October 7         
//Class & Methods Explained: This class is used to manage servies provided by users 
const DataAccess = require('../dataAccessLayer/DataAccess');

class ProviderService {
   //create a service and link it to a user with the given userID
   createProvidedService({ServiceTitle, ServiceInfo, Category, UserID}) {
      if (!ServiceTitle || !ServiceInfo || !Category || !UserID) {
         const err = new Error('Missing required fields for service creation!');
         err.code = 400;
         throw err;
      } else {
         const serviceData = {
            ServiceTitle,
            ServiceInfo,
            Category,
            UserID
         };
         DataAccess.createProvidedService(serviceData);
      }
   }

   //delete a provided service 
   deleteProvidedService({ServiceID}) {
      if (!ServiceID) {
         const err = new Error('Missing required fields for service deletion!');
         err.code = 400;
         throw err;
      }
      DataAccess.deleteProvidedService(ServiceID);
   }

   // I'm envisioning a screen similar to whatever the creation screen would be that would allow the user to edit all params at once. (probably query to fill in all 3 first)
   //modify provided service
   modifyProvidedService({ServiceID, ServiceTitle, ServiceInfo, Category}) {
      if (!ServiceID || !ServiceTitle || !ServiceInfo || !Category) {
         const err = new Error('Missing required fields for service modification!');
         err.code = 400;
         throw err;
      }
      DataAccess.modifyProvidedService(ServiceID, ServiceTitle, ServiceInfo, Category);
   }
}

const providerServiceInstance = Object.freeze(new ProviderService());
module.exports = providerServiceInstance;