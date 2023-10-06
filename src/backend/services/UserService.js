const DataAccess = require('../dataAccessLayer/DataAccess');
const bcrypt = require('bcrypt');
const logger = require('../logging');

const SALT_ROUNDS = 10;

class UserService {
    async createUser({FirstName, LastName, UserName, Password, Birthdate, RoleID}) {
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

        await DataAccess.createUser(userData);
    }

    isPasswordValid(password) {
        return (password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/g));
    }

    async deleteUser({UserID}) {
        await DataAccess.deleteUser(UserID);
    }
}

const userServiceInstance = Object.freeze(new UserService());
module.exports = userServiceInstance;