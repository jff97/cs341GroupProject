import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavDrawer from "src/components/NavDrawer";
import { Box } from "@mui/material";
import { NotificationProvider } from "src/components/NotificationProvider";
import CustomAppBar from "src/components/CustomAppBar";
import AppointmentManagement from "src/pages/AppointmentManagement";

const rootStyle = {
    display: 'flex'
}

export function Dashboard() {
    return (
        <NotificationProvider>
            <Box sx={rootStyle}>
                <NavDrawer />
                <Box component="main" sx={{ flexGrow: 1, p: 2, bgcolor: 'background.default' }}>
                    <Box sx={theme => theme.mixins.toolbar} />
                    <Routes>
                        <Route path="/book" element={<CustomAppBar pageTitle="Book an Appointment" />} />
                        <Route path="/appointment" element={<AppointmentManagement />} />
                        <Route path="/" element={<Navigate to="/dashboard/book" />} />
                    </Routes>
                </Box>
            </Box>
        </NotificationProvider>
    );
}