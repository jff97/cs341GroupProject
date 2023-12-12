const DataAccess = require('../dataAccessLayer/DataAccess');
const bcrypt = require('bcrypt');
const logger = require('../logging')
const appointmentServiceInstance = require('./AppointmentService.js');

const SALT_ROUNDS = 10;

class UserService {
    async createUser({FirstName, LastName, UserName, Password, Birthdate, RoleID, ServiceTitle, ServiceInfo, Category}) {
        let hashedPassword; 
        if(!FirstName || !LastName || !UserName || !Password || !Birthdate || !RoleID) {
            const err = new Error('Missing required fields for user creation!');
            err.code = 400;
            throw err;
        }

        if(!this.isPasswordValid(Password)) {
            const err = new Error('Password must contain at least 8 characters, 1 uppercase, 1 lowercase, and 1 number!');
            err.code = 406;
            throw err;
        }
        
        // Generate a hashed password
        hashedPassword = bcrypt.hashSync(Password, SALT_ROUNDS)

        const userData = {
            FirstName,
            LastName,
            UserName,
            HashedPassword: hashedPassword,
            Birthdate,
            Active: true,
            RoleID
        };

        const user = await DataAccess.createUser(userData);

        if(RoleID === 2) {
            user.createService({ServiceTitle, ServiceInfo, Category})
        }

    }

    isPasswordValid(password) {
        return (password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/g));
    }

    async deleteUser({UserID}) {
        await DataAccess.deleteUser(UserID);
    }

    async getAllNormalUsers() {
        return await DataAccess.getUsers();
    }

    async getAllServiceProvidersWithService() {
        return await DataAccess.getAllServiceProvidersWithService();
    }

    async disableUser({UserID}) {
        // Get User
        const user = await DataAccess.getUser(UserID);

        // If user is a client, cancel all appointments
        if(user.RoleID === 1) {
            appointmentServiceInstance.cancelAllAppointments(UserID);
        } else if (user.RoleID === 2) {
            const service = await DataAccess.getServiceIDByUserID(UserID);
            appointmentServiceInstance.deleteAllAppointmentsByServiceID(service.ServiceID);
        }

        await DataAccess.disableUser(UserID);
    }
    
    async enableUser({UserID}) {
        await DataAccess.enableUser(UserID);
    }
}

const userServiceInstance = Object.freeze(new UserService());
module.exports = userServiceInstance;