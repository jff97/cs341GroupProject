import React, { useEffect, useState } from 'react';
import AdminAppointmentsTable from 'src/components/AdminAppointmentsTable';
import appointmentService from 'src/services/appointment.service';
import CustomAppBar from 'src/components/CustomAppBar';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import CreateEditAppointmentSlotDialog from 'src/components/CreateEditAppointmentSlotDialog';

export default function AdminManageAppointments() {
    const [appointmentSlots, setAppointmentSlots] = useState([]);
    const [filterStartDate, setFilterStartDate] = useState(dayjs());
    const [filterEndDate, setFilterEndDate] = useState(dayjs());
    const [createAppointmentSlotDialogOpen, setCreateAppointmentSlotDialogOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null); 

    useEffect(() => {
        getAppointmentsInRange();
    }, [filterStartDate, filterEndDate]);

    const onDialogClose = () => {
        setCreateAppointmentSlotDialogOpen(false);
        getAppointmentsInRange();
    }

    const getAppointmentsInRange= async () => {
        appointmentService.getAppointmentsInRange(filterStartDate, filterEndDate)
        .then((response) => {
            setAppointmentSlots(response.data);
        }).catch((error) => {
            console.log(error);
        })
     }

  return (
    <Box sx={{height: '98%'}}>
        <CustomAppBar 
            pageTitle="Admin Appointment Management" 
        />
        <AdminAppointmentsTable
            appointmentSlots={appointmentSlots}
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            setFilterStartDate={setFilterStartDate}
            setFilterEndDate={setFilterEndDate}
            setSelectedAppointment={setSelectedAppointment}
            openCreateAppointmentSlotDialog={setCreateAppointmentSlotDialogOpen}
            onDeleteAppointmentSlot={getAppointmentsInRange}
        />
        <CreateEditAppointmentSlotDialog
            open={createAppointmentSlotDialogOpen}
            onDialogClose={onDialogClose}
            selectedAppointment={selectedAppointment}
            setSelectedAppointment={setSelectedAppointment}
        />
    </Box>
  );
}