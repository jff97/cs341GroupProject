import api from './api';
import tokenService from './token.service';

const AUTH_ENDPOINT = '/api/auth/';

const authService = {

    /**
     * Login a user and save their information in the global state (zustand store)
     * @param {String} username 
     * @param {String} password 
     * @returns 
     */
    login: async (UserName, Password) => {
        return await api
            .post(AUTH_ENDPOINT + "login", { UserName, Password })
            .then((response) => {
                if (response.data.AccessToken) {
                    tokenService.setUserToken(response.data.AccessToken);
                }
                return response.data;
            });
    },

    /**
     * Logout a user and remove their information from the global state (zustand store)
     */
    logout: async () => {
        tokenService.removeUserToken();
        api
            .post(AUTH_ENDPOINT + "logout", { withCredentials: true })
            .then((response) => {
                return response.data;
            })
    },

    /**
     * Fetches a new access token for the user using the refresh token 
     */
    fetchRefreshToken: async () => {
        return await api
            .post(AUTH_ENDPOINT + "refresh_token", { withCredentials: true })
            .then((response) => {
                if (response.data.AccessToken) {
                    tokenService.setUserToken(response.data.AccessToken);
                }
                return response.data;
            })
    }
}

export default authService;