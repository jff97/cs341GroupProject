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
            My Appointments
        </Typography>
      </GridToolbarContainer>
    );
  }

const columns = [
    { field: 'AppointmentTitle', headerName: 'Appointment Title', width: 200 },
    { field: 'Service.Category', headerName: 'Category', width: 200 },
    { field: 'Service.ServiceTitle', headerName: 'Provider', width: 200,
        valueGetter: (params) => {
            return params.row["Service.ServiceTitle"] + " (" + params.row["Service.User.FirstName"] + " " + params.row["Service.User.LastName"] + ")"
        }
    },
    { field: 'StartDateTime', headerName: 'Appointment Start', type: 'dateTime', width: 200, valueGetter: (params) => {
        return new Date(params.value)
    }},
    { field: 'EndDateTime', headerName: 'Appointment End', type: 'dateTime', width: 200, valueGetter: (params) => {
        return new Date(params.value)
    }},
    { field: 'Actions', headerName: 'Actions', width: 200, renderCell: (params) => {
        return (
            <div style={{width: '100%'}}>
                <Button variant="contained" color="info" size="small" sx={{color: 'white', marginLeft: 'auto', mr: 2}} onClick={() => {params.row.unBookAppointment(params.row.AppointmentID)}}  endIcon={<BookmarkAddIcon />}>
                    Unbook
                </Button>
            </div>)
    }},
]

export default function MyAppointmentTable({appointmentsData, loadUserAppointments}) {
    const UserID = useUserStore(state => state.UserID);
    const { createNotification } = useNotification();
    const theme = useTheme();

    const unBookAppointment = (AppointmentID) => {
        appointmentService.unBookAppointment(AppointmentID, UserID)
            .then((response) => {
                loadUserAppointments();
                createNotification('Canceled appointment successfully!', 'success');
            }).catch((error) => {
                createNotification(error.response.data, "error");
            });
    }

   // Inject a custom function into each row so it can be access
   // by the columns list (janky, but works)
   const modifiedAppointmentsData = appointmentsData.map(element => {
    return {
    ...element,
    unBookAppointment: unBookAppointment
    };
   });

  return (
    <DataGrid
        rows={modifiedAppointmentsData}
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