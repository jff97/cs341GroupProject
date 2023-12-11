import React, {useEffect, useState} from 'react';
import CustomNoRowsOverlay from 'src/components/CustomNoRowsOverlay';
import { DatePicker } from '@mui/x-date-pickers';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import userService from "../../services/user.service";
import UserManagement from "../../pages/AdminUserManagement";
import UserService from "../../services/user.service";
import AppointmentService from "../../services/appointment.service";

function CustomToolbar({filterDate, setFilterDate}) {
    return (
      <GridToolbarContainer>
        <h2>User Table</h2>
      </GridToolbarContainer>
    );
}

async function getAppointmentsForUser(userID) {
    return await AppointmentService.getUsersAppointments(userID);
}

export default function AdminUsersTable({ users, setUsers, getAllSystemUsers }) {
    const columns = [
        { field: 'User', headerName: 'Client', width: 200, valueGetter: (params) => {
                //console.log(params.row.FullName);
                // Messy, but working
                return params.row.FullName}
        },
        {field: 'Active', headerName: 'Active', width: 100, valueGetter: (params) => {
                return params.row.Active ? "Yes" : "No"}
        },
        {field: "UserName", headerName: "UserName", width: 200},
        {
            field: 'delete',
            headerName: 'Delete',
            width: 100,
            renderCell: (params) => (
                <button onClick={() => handleDelete(params.row.UserID)}>Delete</button>
            ),
        },
        {
            field: 'disable',
            headerName: 'Disable Account',
            width: 200,
            renderCell: (params) => (
                <button onClick={() => {
                    UserService.disableUser(params.row.UserID);
                    getAllSystemUsers();
                }}>Disable</button>
            ),
        },
        {
            field: 'enable',
            headerName: 'Enable Account',
            width: 200,
            renderCell: (params) => (
                <button onClick={() => { 
                    UserService.enableUser(params.row.UserID)
                    getAllSystemUsers();
                }}>Enable</button>
            ),
        }
    ];

    const handleDelete = async (userID) => {
        try {
            const appointments = await getAppointmentsForUser(userID);

            // Unbook appointments associated with user
            const unBookPromises = appointments.map(appointment => {
                console.log(appointment.AppointmentID);
                return AppointmentService.unBookAppointment(appointment.AppointmentID, userID)
                    .then(r => console.log("UNBOOKED APPOINTMENT: " + appointment.AppointmentID));
            });
            await Promise.all(unBookPromises);

            // Delete user
            await userService.deleteUser(userID);

            // Filter out the deleted user from the current state
            const updatedUsers = users.filter(user => user.UserID !== userID);
            setUsers(updatedUsers);
        } catch (error) {
            console.error("Error deleting user: ", error);
        }
    };

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