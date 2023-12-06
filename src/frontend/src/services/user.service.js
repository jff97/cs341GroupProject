//Author: Creed Zagrzebski
//Date Created: October 7  2023 
//Class & Methods Explained: This class is used to setup interactions with the backend regarding userServices
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
    }
}

export default userService;