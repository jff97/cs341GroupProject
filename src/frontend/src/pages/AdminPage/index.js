import React, { useEffect, useState } from 'react';
import AppointmentManageTable from 'src/components/AppointmentManageTable';
import appointmentService from 'src/services/appointment.service';
import useUserStore from 'src/utils/stores';
import CustomAppBar from 'src/components/CustomAppBar';
import CreateAppointmentSlotDialog from 'src/components/CreateAppointmentSlotDialog';
import { Box } from '@mui/material';

export default function AppointmentManagement() {
    const [appointmentSlots, setAppointmentSlots] = useState([]);
    const [createAppointmentSlotDialogOpen, setCreateAppointmentSlotDialogOpen] = useState(false);
    const UserID = useUserStore(state => state.UserID);

    const onCreateAppointmentSlotDialogClose = () => {
        setCreateAppointmentSlotDialogOpen(false);
        getAppointmentSlotsForProvider();
    }

    const onDeleteAppointmentSlot = () => {
        getAppointmentSlotsForProvider();
    }

    const getAppointmentSlotsForProvider = async () => {
        appointmentService.getAllSystemAppointments()
            .then((response) => {
                setAppointmentSlots(response);
            }).catch((error) => {
                console.log(error);
            });
     }

    useEffect(() => {
        getAppointmentSlotsForProvider();
    }, []);

  return (
    <Box sx={{height: '93%'}}>
        <CustomAppBar 
            pageTitle="Admin Appointment Management" 
        />
        <CreateAppointmentSlotDialog 
            open={createAppointmentSlotDialogOpen} 
            handleClose={onCreateAppointmentSlotDialogClose} 
        />
        <AppointmentManageTable 
            appointmentSlots={appointmentSlots} 
            getAppointmentSlotsForProvider={getAppointmentSlotsForProvider} 
            openCreateAppointmentSlotDialog={setCreateAppointmentSlotDialogOpen} 
            onDeleteAppointmentSlot={onDeleteAppointmentSlot}
        />
    </Box>
  );
}