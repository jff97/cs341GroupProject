import React from 'react';
import { Button, Box } from '@mui/material';
import { Edit, Cancel } from '@mui/icons-material';
import CustomNoRowsOverlay from 'src/components/CustomNoRowsOverlay';
import { DatePicker } from '@mui/x-date-pickers';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import appointmentService from 'src/services/appointment.service';

function CustomToolbar({ filterStartDate, filterEndDate, setFilterStartDate, setFilterEndDate }) {
    return (
        <GridToolbarContainer>
            <h2>Manage System Appointments</h2>
            <DatePicker
                label="Appointment Start Date"
                value={filterStartDate}
                onChange={(newValue) => {
                    setFilterStartDate(newValue);
                }}
                sx={{ color: 'white', marginLeft: 'auto', mt: 2 }}
            />
            <DatePicker
                label="Appointment End Date"
                value={filterEndDate}
                onChange={(newValue) => {
                    setFilterEndDate(newValue);
                }}
                sx={{ color: 'white', mt: 2, mr: 2 }}
            />
        </GridToolbarContainer>
    );
}
const columns = [
    { field: 'AppointmentTitle', headerName: 'Appointment Title', width: 200 },
    { field: 'Service.ServiceTitle', headerName: 'Provider', width: 200 },
    {
        field: 'User', headerName: 'Client', width: 200,
        valueGetter: (params) => {
            console.log(params);
            return params.row.ClientUserID ? (params.row["User.FirstName"] + ' ' + params.row["User.LastName"]) : 'None'
        }
    },
    {
        field: 'StartDateTime', headerName: 'Appointment Start', type: 'string', width: 250, valueGetter: (params) => {
            // Return date as string in the format of DAY MONTH DATE YEAR HH:MM AM/PM
            const date = new Date(params.value);
            return date.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
        }
    },
    {
        field: 'EndDateTime', headerName: 'Appointment End', type: 'string', width: 250, valueGetter: (params) => {
            const date = new Date(params.value);
            return date.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
        }
    },
    {
        field: 'LastModifiedDateTime', headerName: 'Last Modified', type: 'string', width: 250, valueGetter: (params) => {
            return new Date(params.value)
        }
    },
    {
        field: 'Actions', headerName: 'Actions', width: 200, headerAlign: 'center', renderCell: (params) => {
            return (
                <div>
                    <Button variant="contained" color="info" size="small" sx={{ color: 'white', marginLeft: 'auto', mr: 2 }}
                        onClick={() => {
                            params.row.setSelectedAppointment(params.row);
                            params.row.openCreateAppointmentSlotDialog(true);
                        }}
                        endIcon={<Edit />}>
                        Edit
                    </Button>
                    <Button
                        disabled={params.row.ClientUserID ? false : true}
                        variant="contained" color="error" size="small" sx={{ color: 'white', marginLeft: 'auto', mr: 2 }}
                        onClick={() => {
                            const appointmentToCancel = params.row;
                            //cancel the appointment
                            try {
                                appointmentService.unBookAppointment(appointmentToCancel.AppointmentID);
                            }
                            catch (err) {
                                // TODO1234: show error message with create notification i cant figure out how to use the notification provider here
                                console.log(err);
                            }
                            //make the grid reload
                            // TODO1234: make the grid reload
                        }}
                        endIcon={<Cancel />}>
                        Cancel
                    </Button>
                </div>)
        }
    },
];

export default function AdminAppointmentsTable({ appointmentSlots, filterStartDate, filterEndDate, setFilterStartDate, setFilterEndDate, setSelectedAppointment, openCreateAppointmentSlotDialog }) {

    // Inject a custom function into each row so it can be access
    // by the columns list (janky, but works)
    const modifiedAppointmentSlots = appointmentSlots.map(element => {
        return {
            ...element,
            setSelectedAppointment: setSelectedAppointment,
            openCreateAppointmentSlotDialog: openCreateAppointmentSlotDialog
        };
    });

    return (
        <Box sx={{ height: '93%' }}>
            <DataGrid
                rows={modifiedAppointmentSlots}
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
                }}
            />
        </Box>
    );
}