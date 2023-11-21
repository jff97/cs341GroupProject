import React, { useEffect, useState } from 'react';
import CustomAppBar from 'src/components/CustomAppBar';
import { Box } from '@mui/material';
import AdminAppointmentTrends from "../../components/AdminAppointmentTrends";

export default function AdminAppointmentHistory() {

    useEffect(() => {
    }, []);

    return (
        <Box sx={{height: '93%'}}>
            <CustomAppBar
                pageTitle="Admin Appointment Trends"
            />
            <AdminAppointmentTrends />
        </Box>
    );
}