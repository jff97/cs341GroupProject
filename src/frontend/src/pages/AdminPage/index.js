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
    const [filterStartDate, setFilterStartDate] = useState(dayjs());
    const [filterEndDate, setFilterEndDate] = useState(dayjs());
    

    const getAppointmentsInRange= async () => {
        appointmentService.getAppointmentsInRange(filterStartDate, filterEndDate)
        .then((response) => {
            setSystemAppointmentSlots(response.data);
        }).catch((error) => {
            console.log(error);
        })
     }

    useEffect(() => {
        getAppointmentsInRange();
    }, [filterStartDate, filterEndDate]);

  return (
    <Box sx={{height: '93%'}}>
        <CustomAppBar 
            pageTitle="Admin Appointment Management" 
        />
        <AdminAppointmentsTable
            systemAppointmentSlots={systemAppointmentSlots}
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            setFilterStartDate={setFilterStartDate}
            setFilterEndDate={setFilterEndDate}
        />
    </Box>
  );
}