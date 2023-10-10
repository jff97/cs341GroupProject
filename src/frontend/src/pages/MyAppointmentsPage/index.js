import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import CustomAppBar from 'src/components/CustomAppBar';
import BookAppointmentTable from 'src/components/BookAppointmentTable';
import appointmentService from 'src/services/appointment.service';

export function MyAppointmentPage() {
   //make a empty list to store the grid data
   const [availableAppointmentsData, setAvailableAppointmentsData] = useState([]);

    useEffect(() => {
        loadUserAppointments();
    }, []);

    const loadUserAppointments = async () => {
        appointmentService.getAvailableAppointments()
            .then((response) => {
                setAvailableAppointmentsData(response)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Box sx={{height: '93%'}}>
            <CustomAppBar pageTitle="Book Appointment" />
            <BookAppointmentTable availableAppointmentsData={availableAppointmentsData} loadAvailableAppointments={loadUserAppointments} />
        </Box>
    )
}