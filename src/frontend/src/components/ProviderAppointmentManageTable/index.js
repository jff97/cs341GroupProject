import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import appointmentService from 'src/services/appointment.service';
import { useNotification } from '../NotificationProvider';
import { useTheme } from '@mui/material/styles';
import CustomNoRowsOverlay from 'src/components/CustomNoRowsOverlay';

function CustomToolbar({ openCreateAppointmentSlotDialog }) {
    return (
        <GridToolbarContainer>
            <Typography variant="h6" component="div" sx={{ ml: 0.5, fontWeight: 'bold', mt: 2, mb: 2 }}>
                My Appointment Slots
            </Typography>
            <Button variant="contained" color="info" size="small" sx={{ color: 'white', marginLeft: 'auto', mr: 2 }} onClick={openCreateAppointmentSlotDialog} endIcon={<Add />}>
                Create Appointment Slot
            </Button>
        </GridToolbarContainer>
    );
}

export default function ProviderAppointmentManageTable({ appointmentSlots, openCreateAppointmentSlotDialog, onDeleteAppointmentSlot, setSelectedAppointment }) {
    const { createNotification } = useNotification();
    const theme = useTheme();

    const deleteAppointment = (AppointmentID) => {
        appointmentService.deleteAppointmentSlot(AppointmentID).then((response) => {
            onDeleteAppointmentSlot();
            createNotification('Appointment Slot Deleted', 'success');
        }).catch((error) => {
            createNotification('Error Deleting Appointment Slot', 'error');
        });
    }

    const columns = [
        { field: 'AppointmentTitle', headerName: 'Appointment Title', width: 200 },
        {
            field: 'User', headerName: 'Client', width: 200, valueGetter: (params) => {
                return params.value ? (params.value.FirstName + ' ' + params.value.LastName) : 'None'
            }
        },
        { field: 'StartDateTime', headerName: 'Appointment Start', type: 'string', width: 200, renderCell: (params) => {
            const date = new Date(params.value);
            const dateStr = date.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
            const isPast = date < new Date();
            return (
                <div style={{width: '100%'}}>
                    <p style={{color: isPast ? theme.palette.error.main : 'white'}}>{dateStr}</p>
                </div>
            )
        }},
        { field: 'EndDateTime', headerName: 'Appointment End', type: 'string', width: 200, renderCell: (params) => {
                const date = new Date(params.value);
                const dateStr = date.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
                const isPast = date < new Date();
                return (
                    <div style={{width: '100%'}}>
                        <p style={{color: isPast ? theme.palette.error.main : 'white'}}>{dateStr}</p>
                    </div>
                )
        }},
        {
            field: 'LastModifiedDateTime', headerName: 'Last Modified', type: 'string', width: 250, valueGetter: (params) => {
                const date = new Date(params.value);
                return date.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
            }
        },
        {
            field: 'Actions', headerName: 'Actions', width: 200, headerAlign: 'center', renderCell: (params) => {
                return (
                    <div>
                        <Button variant="contained" color="info" size="small" sx={{ color: 'white', marginLeft: 'auto', mr: 2 }}
                            onClick={() => {
                                setSelectedAppointment(params.row);
                                openCreateAppointmentSlotDialog(true);
                            }}
                            endIcon={<Edit />}>
                            Edit
                        </Button>
                        <Button variant="contained" color="error" size="small" sx={{ color: 'white', marginLeft: 'auto', mr: 2 }} onClick={() => { deleteAppointment(params.row.AppointmentID) }} endIcon={<Delete />}>
                            Delete
                        </Button>
                    </div>)
            }
        },
    ];

    return (
        <DataGrid
            rows={appointmentSlots}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(appointmentSlot) => appointmentSlot.AppointmentID}
            disableRowSelectionOnClick
            slots={{
                toolbar: CustomToolbar,
                noRowsOverlay: CustomNoRowsOverlay,
            }}

            slotProps={{ toolbar: { openCreateAppointmentSlotDialog }, row: { deleteAppointment } }}
            sx={{
                boxShadow: 2,
                border: 2,
                flex: 1,
                borderColor: 'primary.light',
                backgroundColor: theme.palette.grey[900],
            }}
        />
    );
}