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


export default function AdminPage() {
    const [systemAppointmentSlots, setSystemAppointmentSlots] = useState([]);
    const [filterDate, setFilterDate] = useState(dayjs());
    

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