import React from 'react';
import { Button } from '@mui/material';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import appointmentService from 'src/services/appointment.service';
import useUserStore from 'src/utils/stores';
import { useNotification } from '../NotificationProvider';

function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <h2>Available Appointments</h2>
      </GridToolbarContainer>
    );
  }

const columns = [
    { field: 'AppointmentTitle', headerName: 'Appointment Title', width: 200 },
    { field: 'Service.Category', headerName: 'Category', width: 200 },
    { field: 'Service.ServiceTitle', headerName: 'Provider', width: 200},
    { field: 'Service.ServiceInfo', headerName: 'Qualification', width: 200},
    { field: 'StartDateTime', headerName: 'Appointment Start', type: 'dateTime', width: 200, valueGetter: (params) => {
        return new Date(params.value)
    }},
    { field: 'EndDateTime', headerName: 'Appointment End', type: 'dateTime', width: 200, valueGetter: (params) => {
        return new Date(params.value)
    }},
    { field: 'Actions', headerName: 'Actions', width: 200, renderCell: (params) => {
        return (
            <div>
                <Button variant="contained" color="info" size="small" sx={{color: 'white', marginLeft: 'auto', mr: 2}} onClick={() => {params.row.bookAppointment(params.row.AppointmentID)}}  endIcon={<BookmarkAddIcon />}>
                    Book
                </Button>
            </div>)
    }},
]

export default function BookAppointmentTable({availableAppointmentsData, loadAvailableAppointments}) {
    const UserID = useUserStore(state => state.UserID);
    const { createNotification } = useNotification();

    const bookAppointment = (AppointmentID) => {
        appointmentService.bookAppointment(AppointmentID, UserID)
            .then((response) => {
                loadAvailableAppointments();
                createNotification('Booked appointment successfully!', 'success');
            })
            .catch((error) => {
                createNotification(error.toString(), 'error');
            });
    }

   // Inject a custom function into each row so it can be access
   // by the columns list (janky, but works)
   const modifiedAvailableAppointmentsData = availableAppointmentsData.map(element => {
    return {
    ...element,
    bookAppointment: bookAppointment
    };
   });

  return (
    <DataGrid
        rows={modifiedAvailableAppointmentsData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(appointmentSlot) => appointmentSlot.AppointmentID}
        disableRowSelectionOnClick
        sx={{
            boxShadow: 2,
            border: 2,
            flex: 1,
            borderColor: 'primary.light',
        }}
        slots={{
            toolbar: CustomToolbar,
        }}
    />
  )
}