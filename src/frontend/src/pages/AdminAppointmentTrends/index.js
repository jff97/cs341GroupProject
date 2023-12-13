//Author: Alex Cappel
//Date Created: November 16  2023 
//Class & Methods Explained: This class is used to represent a page and view appoinments 
import React, { useEffect, useState } from 'react';
import CustomAppBar from 'src/components/CustomAppBar';
import { Box } from '@mui/material';
import AdminAppointmentTrends from "../../components/AdminAppointmentTrends";

//admin ability to view appointment history
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