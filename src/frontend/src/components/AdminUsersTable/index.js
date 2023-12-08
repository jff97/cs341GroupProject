import React from 'react';
import CustomNoRowsOverlay from 'src/components/CustomNoRowsOverlay';
import { DatePicker } from '@mui/x-date-pickers';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';

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
    { field: 'User', headerName: 'Client', width: 200, valueGetter: (params) => {
        return params.value ? (params.value.FirstName + ' ' + params.value.LastName) : 'None'}
    },
    {field: "UserName", headerName: "UserName", width: 200},
];

export default function AdminUsersTable({ users }) {
    return (
        <DataGrid 
            rows={users} 
            columns={columns} 
            pageSize={5} 
            rowsPerPageOptions={[5]} 
            getRowId={(userSlot) => userSlot.UserID} 
            disableRowSelectionOnClick
            slots={{
                toolbar: CustomToolbar,
                noRowsOverlay: CustomNoRowsOverlay,
            }}
            sx={{
                boxShadow: 2,
                border: 2,
                flex: 1,
                borderColor: 'primary.light',
            }}
            />
    );
}