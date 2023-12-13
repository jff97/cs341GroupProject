//Author: Creed Zagrzebski
//Date Created: November 3  2023 
//Dates Modified: November 5, 7
//Class & Methods Explained: This class is used to manage appointments via the Admin user 
import React, { useEffect, useState } from 'react';
import AdminAppointmentsTable from 'src/components/AdminAppointmentsTable';
import appointmentService from 'src/services/appointment.service';
import CustomAppBar from 'src/components/CustomAppBar';
import { Box } from '@mui/material';
import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

//admin view of page
export default function AdminPage() {
    const [systemAppointmentSlots, setSystemAppointmentSlots] = useState([]);
    const [filterDate, setFilterDate] = useState(dayjs());
    

    //ability to view all appointments in system
    const getAllSystemAppointments= async () => {
        appointmentService.getAllSystemAppointments(filterDate)
        .then((response) => {
            setSystemAppointmentSlots(response.data);
        }).catch((error) => {
            console.log(error);
        })
     }

    useEffect(() => {
        getAllSystemAppointments();
    }, [filterDate]);

  return (
    <Box sx={{height: '93%'}}>
        <CustomAppBar 
            pageTitle="Admin Appointment Management" 
        />
        <AdminAppointmentsTable
            systemAppointmentSlots={systemAppointmentSlots}
            filterDate={filterDate}
            setFilterDate={setFilterDate}
        />
    </Box>
  );
}