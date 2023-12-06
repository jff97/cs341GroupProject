//Author: Creed Zagrzebski, John Fox
//Date Created: October 10 2023 
//Class & Methods Explained: This class is used to display a users appointments 
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import CustomAppBar from 'src/components/CustomAppBar';
import MyAppointmentTable from 'src/components/MyAppointmentTable';
import appointmentService from 'src/services/appointment.service';
import useUserStore from 'src/utils/stores';

export function MyAppointmentPage() {
   //make a empty list to store the grid data
   const [appointmentsData, setAppointmentsData] = useState([]);
   const UserID = useUserStore(state => state.UserID);

    useEffect(() => {
        loadUserAppointments();
    }, []);

    const loadUserAppointments = async () => {
        appointmentService.getUsersAppointments(UserID)
            .then((response) => {
                setAppointmentsData(response)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Box sx={{height: '93%'}}>
            <CustomAppBar pageTitle="My Appointments" />
            <MyAppointmentTable appointmentsData={appointmentsData} loadUserAppointments={loadUserAppointments} />
        </Box>
    )
}