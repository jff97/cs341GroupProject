import useUserStore from "../utils/stores";
import jwt from "jwt-decode";

const tokenService = {
    getUserToken: () => {
        return useUserStore.getState().AccessToken;
    },

    setUserToken: (accessToken) => {
        const decoded = jwt(accessToken);
        useUserStore.getState().setAuthenticatedUser(decoded.UserID, decoded.FullName, accessToken, decoded.RoleID);
    },

    removeUserToken: () => {
        useUserStore.getState().setAuthenticatedUser(-1, "", "", -1);
    }
}

export default tokenService;