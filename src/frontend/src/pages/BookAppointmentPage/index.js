//Author: Creed Zagrzebski
//Date Created: October 10 2023 
//Class & Methods Explained: This class is used to create a page for booking appointments
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import CustomAppBar from 'src/components/CustomAppBar';
import BookAppointmentTable from 'src/components/BookAppointmentTable';
import appointmentService from 'src/services/appointment.service';

export function BookAppointmentPage() {
    const [availableAppointmentsData, setAvailableAppointmentsData] = useState([]);

    useEffect(() => {
        loadAvailableAppointments();
    }, []);

    const loadAvailableAppointments = async () => {
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
            <BookAppointmentTable availableAppointmentsData={availableAppointmentsData} loadAvailableAppointments={loadAvailableAppointments} />
        </Box>
    )
}