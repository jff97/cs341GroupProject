//Author: Creed Zagrzebski
//Date Created: October 8 2023 
//Dates Modified: October 9, 10 , November 6
//Class & Methods Explained: This class is used as a page manage appointments slots
import React, { useEffect, useState } from 'react';
import AppointmentManageTable from 'src/components/AppointmentManageTable';
import appointmentService from 'src/services/appointment.service';
import useUserStore from 'src/utils/stores';
import CustomAppBar from 'src/components/CustomAppBar';
import CreateEditAppointmentSlotDialog from 'src/components/CreateEditAppointmentSlotDialog';
import { Box } from '@mui/material';

export default function AppointmentManagement() {
    const [appointmentSlots, setAppointmentSlots] = useState([]);
    const [createAppointmentSlotDialogOpen, setCreateAppointmentSlotDialogOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null); 
    const UserID = useUserStore(state => state.UserID);

    const onCreateAppointmentSlotDialogClose = () => {
        setCreateAppointmentSlotDialogOpen(false);
        getAppointmentSlotsForProvider();
    }

    const onDeleteAppointmentSlot = () => {
        getAppointmentSlotsForProvider();
    }

    const getAppointmentSlotsForProvider = async () => {
        appointmentService.getAllAppointmentSlotsForProvider(UserID)
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
            pageTitle="Appointment Management" 
        />
        <CreateEditAppointmentSlotDialog 
            open={createAppointmentSlotDialogOpen} 
            handleClose={onCreateAppointmentSlotDialogClose} 
            selectedAppointment={selectedAppointment}
            setSelectedAppointment={setSelectedAppointment}
        />
        <AppointmentManageTable 
            appointmentSlots={appointmentSlots} 
            getAppointmentSlotsForProvider={getAppointmentSlotsForProvider} 
            openCreateAppointmentSlotDialog={setCreateAppointmentSlotDialogOpen} 
            onDeleteAppointmentSlot={onDeleteAppointmentSlot}
            setSelectedAppointment={setSelectedAppointment}
        />
    </Box>
  );
}