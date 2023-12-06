//Author: Creed Zagrzebski
//Date Created: October 7  2023 
//Class & Methods Explained: This class is used to setup a store for managing global state 
import { create } from 'zustand';

// Stores the global state of the user
// This is essentially global variables that can be accessed from anywhere in the app
// The global state is updated using the set() function
// The global state is accessed using the get() function
const useUserStore = create((set, get) => ({
    UserID: -1,
    FullName: "",
    AccessToken: "",
    RoleID: -1,
    loading: true,

    setAuthenticatedUser : (userID, fullName, accessToken, RoleID) => {
        set({ UserID: userID, FullName: fullName, AccessToken: accessToken, RoleID: RoleID });
    },

    setAccessToken: (accessToken) => {
        set({ AccessToken: accessToken });
    },

    setLoading: (loading) => {
        set({ loading: loading });
    }
}));

export default useUserStore; 