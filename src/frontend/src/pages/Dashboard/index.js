import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavDrawer from "src/components/NavDrawer";
import { Box } from "@mui/material";
import { NotificationProvider } from "src/components/NotificationProvider";
import AppointmentManagement from "src/pages/AppointmentManagement";
import { BookAppointmentPage } from "src/pages/BookAppointmentPage";
import { MyAppointmentPage } from "src/pages/MyAppointmentPage";
import AppointmentTrends from "src/pages/AppointmentTrends";
import AdminAppointmentTrends from "src/pages/AdminAppointmentTrends";
import AdminUserManagement from "src/pages/AdminUserManagement";
import AdminPage from "src/pages/AdminPage";
import useUserStore from "src/utils/stores";
import styled from "@mui/material/styles/styled";

const rootStyle = {
    display: 'flex',
    height: '100%',
}

export function Dashboard() {
    const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
    const RoleID = useUserStore(state => state.RoleID);
    return (
        <NotificationProvider>
            <Box sx={rootStyle}>
                <NavDrawer />
                <Box sx={{height: '100vh', flexGrow: 1, p: 2, bgcolor: 'background.default' }}>
                    <Offset />
                    <Routes>
                        <Route path="/book" element={<BookAppointmentPage />} />
                        {/*TODO: refactor the appointment path to make more sense*/}
                        <Route path="/appointment" element={<AppointmentManagement />} />
                        <Route path="/myAppointment" element={<MyAppointmentPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/trends" element={<AppointmentTrends />} />
                        <Route path="/adminTrends" element={<AdminAppointmentTrends />} />
                        <Route path="/adminUserManagement" element={<AdminUserManagement />} />
                        {RoleID === 1 && <Route path="/" element={<Navigate to="/dashboard/book" />}/>}
                        {RoleID === 2 && <Route path="/" element={<Navigate to="/dashboard/appointment" />}/>}
                        {RoleID === 3 && <Route path="/" element={<Navigate to="/dashboard/admin" />}/>}

                    </Routes>
                </Box>
            </Box>
        </NotificationProvider>
    );
}