import React from 'react';
import { Button, Typography } from '@mui/material';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import appointmentService from 'src/services/appointment.service';
import useUserStore from 'src/utils/stores';
import { useNotification } from '../NotificationProvider';
import { useTheme } from '@mui/material/styles';
import CustomNoRowsOverlay from 'src/components/CustomNoRowsOverlay';

function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Typography variant="h6" component="div" sx={{ ml: 0.5, fontWeight: 'bold', mt: 2, mb: 2 }}>
            Book Appointment
        </Typography>
      </GridToolbarContainer>
    );
  }

export default function BookAppointmentTable({availableAppointmentsData, getAvailableAppointments}) {
    const UserID = useUserStore(state => state.UserID);
    const { createNotification } = useNotification();
    const theme = useTheme();

    const columns = [
        { field: 'AppointmentTitle', headerName: 'Appointment Title', width: 200 },
        { field: 'Service.Category', headerName: 'Category', width: 200 },
        { field: 'Service.ServiceTitle', headerName: 'Provider', width: 200,
        valueGetter: (params) => {
            return params.row["Service.ServiceTitle"] + " (" + params.row["Service.User.FirstName"] + " " + params.row["Service.User.LastName"] + ")"
        }
        },
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
                    <Button variant="contained" color="info" size="small" sx={{color: 'white', marginLeft: 'auto', mr: 2}} onClick={() => {bookAppointment(params.row.AppointmentID)}}  endIcon={<BookmarkAddIcon />}>
                        Book
                    </Button>
                </div>)
        }},
    ]

    const bookAppointment = (AppointmentID) => {
        appointmentService.bookAppointment(AppointmentID, UserID)
            .then((response) => {
                createNotification('Booked appointment successfully!', 'success');
                getAvailableAppointments();
            })
            .catch((error) => {
                createNotification(error.response.data, 'error');
            });
    }

  return (
    <DataGrid
        rows={availableAppointmentsData}
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
            backgroundColor: theme.palette.grey[900],
        }}
        slots={{
            toolbar: CustomToolbar,
            noRowsOverlay: CustomNoRowsOverlay,
        }}
    />
  )
}