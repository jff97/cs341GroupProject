import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import CustomAppBar from 'src/components/CustomAppBar';
import MyAppointmentTable from 'src/components/MyAppointmentTable';
import appointmentService from 'src/services/appointment.service';
import useUserStore from 'src/utils/stores';

export default function UserBookedAppointments() {
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