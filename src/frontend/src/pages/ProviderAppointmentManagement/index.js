import React, { useEffect, useState } from 'react';
import ProviderAppointmentManageTable from 'src/components/ProviderAppointmentManageTable';
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

    useEffect(() => {
        getAppointmentSlotsForProvider();
    }, []);

    const onDialogClose = () => {
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

  return (
    <Box sx={{height: '93%'}}>
        <CustomAppBar 
            pageTitle="Appointment Management" 
        />
        <CreateEditAppointmentSlotDialog 
            open={createAppointmentSlotDialogOpen} 
            onDialogClose={onDialogClose}
            selectedAppointment={selectedAppointment}
            setSelectedAppointment={setSelectedAppointment}
        />
        <ProviderAppointmentManageTable 
            appointmentSlots={appointmentSlots} 
            getAppointmentSlotsForProvider={getAppointmentSlotsForProvider} 
            openCreateAppointmentSlotDialog={setCreateAppointmentSlotDialogOpen} 
            onDeleteAppointmentSlot={onDeleteAppointmentSlot}
            setSelectedAppointment={setSelectedAppointment}
        />
    </Box>
  );
}