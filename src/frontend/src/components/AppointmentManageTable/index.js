import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import appointmentService from 'src/services/appointment.service';
import { useNotification } from '../NotificationProvider';

function CustomToolbar({openCreateAppointmentSlotDialog}) {
    return (
      <GridToolbarContainer>
        <h2>My Appointment Slots</h2>
        <Button variant="contained" color="info" size="small" sx={{color: 'white', marginLeft: 'auto', mr: 2}} onClick={openCreateAppointmentSlotDialog}  endIcon={<Add />}>
            Create Appointment Slot
        </Button>
      </GridToolbarContainer>
    );
  }

const columns = [
    { field: 'AppointmentTitle', headerName: 'Appointment Title', width: 200 },
    { field: 'User', headerName: 'Client', width: 200, valueGetter: (params) => {
        return params.value ? (params.value.FirstName + ' ' + params.value.LastName) : 'None'
    }
     },
    { field: 'StartDateTime', headerName: 'Appointment Start', type: 'dateTime', width: 200, valueGetter: (params) => {
        return new Date(params.value)
    }},
    { field: 'EndDateTime', headerName: 'Appointment End', type: 'dateTime', width: 200, valueGetter: (params) => {
        return new Date(params.value)
    }},
    { field: 'LastModifiedDateTime', headerName: 'Last Modified', type: 'dateTime', width: 200, valueGetter: (params) => {
        return new Date(params.value)
    }},
    { field: 'Actions', headerName: 'Actions', width: 200, headerAlign: 'center',  renderCell: (params) => {
        return (
            <div>
                <Button variant="contained" color="info" size="small" sx={{color: 'white', marginLeft: 'auto', mr: 2}} onClick={() => {console.log(params)}}  endIcon={<Edit />}>
                    Edit
                </Button>
                <Button variant="contained" color="error" size="small" sx={{color: 'white', marginLeft: 'auto', mr: 2}} onClick={() => {params.row.deleteAppointment(params.row.AppointmentID)}}  endIcon={<Delete />}>
                    Delete
                </Button>
            </div>)
    }},
];

export default function AppointmentManageTable({ appointmentSlots, openCreateAppointmentSlotDialog, onDeleteAppointmentSlot }) {
    const { createNotification } = useNotification();

    const deleteAppointment = (AppointmentID) => {
        appointmentService.deleteAppointmentSlot(AppointmentID).then((response) => {
            onDeleteAppointmentSlot();
            createNotification('Appointment Slot Deleted', 'success');
        }).catch((error) => {
            createNotification('Error Deleting Appointment Slot', 'error');
        });
    }

   // Inject a custom function into each row so it can be access
   // by the columns list (janky, but works)
   const modifiedAppointmentSlots = appointmentSlots.map(element => {
    return {
    ...element,
    deleteAppointment: deleteAppointment
    };
   });
    
    return (
        <DataGrid 
            rows={modifiedAppointmentSlots} 
            columns={columns} 
            pageSize={5} 
            rowsPerPageOptions={[5]} 
            getRowId={(appointmentSlot) => appointmentSlot.AppointmentID} 
            disableRowSelectionOnClick
            slots={{
                toolbar: CustomToolbar,
            }}
            
            slotProps={{toolbar: {openCreateAppointmentSlotDialog}, row: {deleteAppointment}}}
            sx={{
                boxShadow: 2,
                border: 2,
                flex: 1,
                borderColor: 'primary.light',
            }}
            />
    );
}