import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import { Edit, Cancel } from '@mui/icons-material';
import CustomNoRowsOverlay from 'src/components/CustomNoRowsOverlay';
import CustomDatePicker from 'src/components/CustomDatePicker';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import { FormControlLabel, Checkbox, Typography} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import appointmentService from 'src/services/appointment.service';
import { useNotification } from '../NotificationProvider';

function CustomToolbar({ filterStartDate, filterEndDate, setFilterStartDate, setFilterEndDate }) {
    const [showAllAppointments, setShowAllAppointments] = useState(false);

    return (
        <GridToolbarContainer>
            <Typography variant="h6" component="div" sx={{ ml: 0.5, fontWeight: 'bold', mt: 2, mb: 2 }}>
                Manage System Appointments
            </Typography>

            <FormControlLabel
                sx={{ marginLeft: 'auto', mt: 2 }}
                control={
                    <Checkbox
                        checked={showAllAppointments}
                        onChange={(event) => {
                            setShowAllAppointments(event.target.checked);
                            if (event.target.checked) {
                                setFilterStartDate(dayjs('1900-01-01'));
                                setFilterEndDate(dayjs('3000-01-01'));
                            } else {
                                setFilterStartDate(dayjs());
                                setFilterEndDate(dayjs());
                            }
                        }}
                        name="filterStartDate"
                        color="info"
                    />
                }
                label="Show All Appointments"
            />

            {!showAllAppointments && (
                <div>
                    <CustomDatePicker
                        label="Appointment Start Date"
                        value={filterStartDate}
                        onChange={(newValue) => {
                            setFilterStartDate(newValue);
                        }}
                        sx={{ color: 'white', mt: 2, mr: 1 }}
                    />
                    <CustomDatePicker
                        label="Appointment End Date"
                        value={filterEndDate}
                        onChange={(newValue) => {
                            setFilterEndDate(newValue);
                        }}
                        sx={{ color: 'white', mt: 2, mr: 2 }}
                    />
                </div>
            )}
        </GridToolbarContainer>
    );
}

export default function AdminAppointmentsTable({ appointmentSlots, filterStartDate, filterEndDate, setFilterStartDate, setFilterEndDate, setSelectedAppointment, openCreateAppointmentSlotDialog, onDeleteAppointmentSlot }) {
    const theme = useTheme();
    const { createNotification } = useNotification();

    const columns = [
        { field: 'AppointmentTitle', headerName: 'Appointment Title', width: 200 },
        {
            field: 'Service.ServiceTitle', headerName: 'Provider', width: 200,
            valueGetter: (params) => {
                return params.row["Service.ServiceTitle"] + " (" + params.row["Service.User.FirstName"] + " " + params.row["Service.User.LastName"] + ")"
            }
        },
        {
            field: 'User', headerName: 'Client', width: 200,
            valueGetter: (params) => {
                return params.row.ClientUserID ? (params.row["User.FirstName"] + ' ' + params.row["User.LastName"]) : 'None'
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
            field: 'LastModifiedDateTime', headerName: 'Last Modified', type: 'string', width: 200, 
            valueGetter: (params) => {
                const date = new Date(params.value);
                return date.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
            }
        },
        {
            field: 'Actions', headerName: 'Actions', width: 320, headerAlign: 'center', 
            renderCell: (params) => {
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
                        <Button
                            variant="contained" color="error" size="small" sx={{ color: 'white', marginLeft: 'auto', mr: 2 }}
                            onClick={() => {
                                deleteAppointment(params.row.AppointmentID);
                            }}
                            endIcon={<Cancel />}>
                            Delete
                        </Button>
                        <Button
                            disabled={params.row.ClientUserID == null}
                            variant="contained" color="error" size="small" sx={{ color: 'white', marginLeft: 'auto', mr: 2 }}
                            onClick={() => {
                                unbookAppointment(params.row.AppointmentID);
                            }}
                            endIcon={<Cancel />}>
                            Cancel
                        </Button>
                    </div>)
            }
        },
    ];

    const deleteAppointment = (AppointmentID) => {
        appointmentService.deleteAppointmentSlot(AppointmentID).then((response) => {
            onDeleteAppointmentSlot();
            createNotification('Appointment Slot Deleted', 'success');
        }).catch((error) => {
            createNotification('Error Deleting Appointment Slot', 'error');
        });
    }

    const unbookAppointment = (AppointmentID) => {
        appointmentService.unBookAppointment(AppointmentID).then((response) => {
            onDeleteAppointmentSlot();
            createNotification('Appointment Slot Unbooked', 'success');
        }).catch((error) => {
            createNotification('Error Unbooking Appointment Slot', 'error');
            console.log(error);
        });
    }

    return (
        <Box sx={{ height: '93%' }}>
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
                slotProps={{ toolbar: { filterStartDate, setFilterStartDate, filterEndDate, setFilterEndDate } }}
                sx={{
                    boxShadow: 2,
                    border: 2,
                    flex: 1,
                    borderColor: 'primary.light',
                    backgroundColor: theme.palette.grey[900],
                }}
            />
        </Box>
    );
}