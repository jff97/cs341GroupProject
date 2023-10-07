import axios from "axios"
import authService from "../auth.service"
import tokenService from "../token.service"

//Base URL, using Proxy to Backend
const baseUrl = "/";

//Create Axios Instance for Accessing Resources 
const api = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Sends the access token with every request
api.interceptors.request.use(
    (config) => {
      const token = tokenService.getUserToken();
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Checks if a token was expired, attempts to get a new access token using the refresh token. 
  // If token is expired, it retrieves a new access token and retries the original request.
  api.interceptors.response.use(
    (response) => {
      //Successful Response, do nothing.
      return response;
    },
    async (err) => {
      const originalConfig = err.config;
  
      //Do not retrieve new rs token if a invalid login caused 401 response
      if (
        originalConfig.url !== "/api/auth/login" &&
        originalConfig.url !== "/api/auth/refresh_token" &&
        err.response 
      ) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          //Retry original failed request after re-authentication
          originalConfig._retry = true;
  
          try {
            //Attempt to get a new Access Token using Refresh Token
            return await api
              .post("/api/auth/refresh_token", {
                withCredentials: true,
              })
              .then((response) => {
                const { AccessToken } = response.data;
                tokenService.setUserToken(AccessToken);
                return api(originalConfig);
              })
              .catch((_error) => {
                //If refresh token is invalid (401), then logout.
                if (err.response.status === 401) {
                  authService.logout();
                  return Promise.reject(_error);
                }
              });
          } catch (error) {
            return Promise.reject(error);
          }
        }
      }
  
      return Promise.reject(err);
    }
  );

export default api;