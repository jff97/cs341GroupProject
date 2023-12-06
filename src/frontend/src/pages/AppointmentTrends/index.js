//Author: John Fox
//Date Created: November 14  2023 
//Class & Methods Explained: This class is used to populate a page that displays appoinment history 
import React, { useEffect, useState } from 'react';
import CustomAppBar from 'src/components/CustomAppBar';
import AppointmentTrends from 'src/components/AppointmentTrends';
import { Box } from '@mui/material';

export default function AppointmentHistory() {

    useEffect(() => {
    }, []);

  return (
    <Box sx={{height: '93%'}}>
        <CustomAppBar 
            pageTitle="Appointment Trends" 
        />
        <AppointmentTrends />
    </Box>
  );
}