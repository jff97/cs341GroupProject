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
        
        // Generate a hashed password
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(Password, SALT_ROUNDS, (err, hash) => {
                if (err) reject(err)
                resolve(hash)
            })
        }).catch(err => {
            err.code = 500;
            throw err;
        });

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

    async deleteUser({UserID}) {
        await DataAccess.deleteUser(UserID);
    }
}

const userServiceInstance = Object.freeze(new UserService());
module.exports = userServiceInstance;