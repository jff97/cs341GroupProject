import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import CustomAppBar from 'src/components/CustomAppBar';
import BookAppointmentTable from 'src/components/BookAppointmentTable';
import appointmentService from 'src/services/appointment.service';

export default function BookAppointment() {
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