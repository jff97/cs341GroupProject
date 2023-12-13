//Author: Creed Zagrzebski
//Date Created: November 5  2023 
//Dates Modified: November 6
//Class & Methods Explained: This class is used to manage appointments and service providers that are part of the program 
import React from 'react';
import CustomNoRowsOverlay from 'src/components/CustomNoRowsOverlay';
import { DatePicker } from '@mui/x-date-pickers';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';

//creating the appointment data toolbar
function CustomToolbar({filterDate, setFilterDate}) {
    return (
      <GridToolbarContainer>
        <h2>System Appointment Slots</h2>
        <DatePicker
            label="Appointment Date"
            value={filterDate}
            onChange={(newValue) => {
                setFilterDate(newValue);
            }}
            sx={{color: 'white', marginLeft: 'auto', mt: 2, mr: 2}}
        />
      </GridToolbarContainer>
    );
  }

const columns = [
    { field: 'AppointmentTitle', headerName: 'Appointment Title', width: 200 },
    { field: 'Service.ServiceTitle', headerName: 'Provider', width: 200},
    { field: 'User', headerName: 'Client', width: 200, valueGetter: (params) => {
        return params.value ? (params.value.FirstName + ' ' + params.value.LastName) : 'None'
    }
    },
    { field: 'StartDateTime', headerName: 'Appointment Start', type: 'string', width: 250, valueGetter: (params) => {
        // Return date as string in the format of DAY MONTH DATE YEAR HH:MM AM/PM
        const date = new Date(params.value);
        return date.toLocaleString('en-US', {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true})
    }},
    { field: 'EndDateTime', headerName: 'Appointment End', type: 'string', width: 250, valueGetter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString('en-US', {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true})
    }},
    { field: 'LastModifiedDateTime', headerName: 'Last Modified', type: 'string', width: 250, valueGetter: (params) => {
        return new Date(params.value)
    }},
];

export default function AdminAppointmentsTable({ systemAppointmentSlots, filterDate, setFilterDate }) {
    return (
        <DataGrid 
            rows={systemAppointmentSlots} 
            columns={columns} 
            pageSize={5} 
            rowsPerPageOptions={[5]} 
            getRowId={(appointmentSlot) => appointmentSlot.AppointmentID} 
            disableRowSelectionOnClick
            slots={{
                toolbar: CustomToolbar,
                noRowsOverlay: CustomNoRowsOverlay,
            }}
            slotProps={{toolbar: {filterDate, setFilterDate}}}
            sx={{
                boxShadow: 2,
                border: 2,
                flex: 1,
                borderColor: 'primary.light',
            }}
            />
    );
}