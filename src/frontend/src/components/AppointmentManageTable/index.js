import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';

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
    }}
];

export default function AppointmentManageTable({ appointmentSlots, openCreateAppointmentSlotDialog }) {
    return (
        <div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid 
                    rows={appointmentSlots} 
                    columns={columns} 
                    pageSize={5} 
                    height={'100vh'}
                    rowsPerPageOptions={[5]} 
                    getRowId={(appointmentSlot) => appointmentSlot.AppointmentID} 
                    disableRowSelectionOnClick
                    slots={{
                        toolbar: CustomToolbar,
                    }}
                    slotProps={{toolbar: {openCreateAppointmentSlotDialog}}}
                    sx={{
                        boxShadow: 2,
                        border: 2,
                        borderColor: 'primary.light'
                    }}
                    />
            </div>
        </div>
    );
}