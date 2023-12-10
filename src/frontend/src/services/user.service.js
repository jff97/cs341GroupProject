import api from './api';

const USER_ENDPOINT = '/api/user/';

const categories = ['Health', 'Beauty', 'Fitness']

const userService = {
    createUser: (FirstName, LastName, UserName, Password, Birthdate, RoleID, ServiceTitle, ServiceInfo, ServiceCategoryID) => {
        return api
            .post(USER_ENDPOINT + "create", {
                FirstName,
                LastName,
                UserName,
                Password,
                Birthdate,
                RoleID,
                ServiceTitle,
                ServiceInfo,
                Category: categories[ServiceCategoryID]
            })
    },
    //just return a hard coded json test value for the front end for now TODO
    //field User = john Fox
    //field UserName = jfox
    //dont hit the api just return a mock value
    getAllNormalUsers: () => {
        return api.get(USER_ENDPOINT + "getnormalusers")
    },

    getAllServiceProviders: () => {
        return api.get(USER_ENDPOINT + "getsp")
    },

    deleteUser: (UserID) => {
        return api.delete(USER_ENDPOINT + "delete", {
            params: {
                UserID: UserID
            }
        })/*.then((response) => {
            return response.data;
        });*/
    }
}

export default userService;