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