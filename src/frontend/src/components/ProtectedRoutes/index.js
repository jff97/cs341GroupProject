//Author: Creed Zagrzebski
//Date Created: Ocotber 7  2023 
//Class & Methods Explained: This class is used to guard to protect routes 
import React from "react";
import useUserStore from "src/utils/stores";
import { CircularProgress, Box } from "@mui/material";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {
    const auth = useUserStore((state) => state.AccessToken)
    const loading = useUserStore((state) => state.loading)

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: 'background.default' }}>
                <CircularProgress color="info" />
            </Box>
        )
    }

    return (auth ? <Outlet /> : <Navigate to="/login" />);
}

export default ProtectedRoutes;