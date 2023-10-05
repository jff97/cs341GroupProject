const DataAccess = require('../dataAccessLayer/DataAccess');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

class UserService {
    async createUser({FirstName, LastName, UserName, Password, Birthdate, RoleID}) {
        if(!FirstName || !LastName || !UserName || !Password || !Birthdate || !RoleID) {
            const err = new Error('Missing required fields for user creation!');
            err.code = 400;
            throw err;
        }
        bcrypt.hash(Password, SALT_ROUNDS, (err, hash) => {
            if (err) {
                err.code = 500;
                throw err;
            }
            const userData = {
                FirstName,
                LastName,
                UserName,
                HashedPassword: hash,
                Birthdate,
                RoleID,
                Active: true
            };
            return DataAccess.createUser(userData);
        });
    }
}

const userServiceInstance = Object.freeze(new UserService());
module.exports = userServiceInstance;