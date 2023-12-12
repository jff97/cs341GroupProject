import React from 'react';
import CustomNoRowsOverlay from 'src/components/CustomNoRowsOverlay';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import userService from "../../services/user.service";
import { useNotification } from '../NotificationProvider';
import AppointmentService from "../../services/appointment.service";
import { Button } from '@mui/material';

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
    const { createNotification } = useNotification();

    const columns = [
        { field: 'User', headerName: 'Client', width: 200, valueGetter: (params) => {
                return params.row.FullName}
        },
        {field: "UserName", headerName: "Username", width: 200},
        {field: 'Role', headerName: 'Role', width: 200, valueGetter: (params) => {
                if (params.row.RoleID === 1) {
                    return "Client";
                } else if (params.row.RoleID === 2) {
                    return "Provider";
                } else if (params.row.RoleID === 3) {
                    return "Admin";
                }
            }
        },
        {field: 'Active', headerName: 'Active', width: 100, valueGetter: (params) => {
            return params.row.Active ? "Yes" : "No"}
        },
        {
            field: 'CreatedDateTime', headerName: 'Account Created', type: 'string', width: 250, valueGetter: (params) => {
                // Return date as string in the format of DAY MONTH DATE YEAR HH:MM AM/PM
                const date = new Date(params.value);
                return date.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
            }
        },
        {field: 'Actions', headerName: 'Actions', width: 300, headerAlign: 'center', renderCell: (params) => {
                return (
                    <div style={{display:"flex", justifyContent: "center"}}>
                        <Button 
                            disabled={params.row.RoleID === 3}
                            variant="contained" 
                            color="info" 
                            size="small" 
                            sx={{ color: 'white', mr: 2 }}
                            onClick={() => {
                                handleDelete(params.row.UserID);
                            }}
                            >
                            Delete
                        </Button>
                        <Button
                            disabled={params.row.Active || params.row.RoleID === 3}
                            variant="contained" color="success" size="small" sx={{ color: 'white', mr: 2 }}
                            onClick={() => {
                                handleEnable(params.row.UserID);
                            }}
                            >
                            Enable 
                        </Button>
                        <Button
                            disabled={!params.row.Active || params.row.RoleID === 3}
                            variant="contained" color="error" size="small" sx={{ color: 'white' }}
                            onClick={() => {
                                handleDisable(params.row.UserID);
                            }}
                            >
                            Disable
                        </Button>
                    </div>)
            }
        },
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
            createNotification("User deleted", "success");
            getAllSystemUsers();
        } catch (error) {
            createNotification("Error deleting user", "error");
            console.error("Error deleting user: ", error);
        }
    };

    const handleEnable = async (userID) => {
        try {
            await userService.enableUser(userID);
            createNotification("User enabled successfully!", "success");
            getAllSystemUsers();
        } catch (error) {
            createNotification("Error enabling user", "error");
            console.error("Error enabling user: ", error);
        }
    };

    const handleDisable = async (userID) => {
        try {
            await userService.disableUser(userID);
            createNotification("User disabled successfully!", "success");
            getAllSystemUsers();
        } catch (error) {
            createNotification("Error disabling user", "error");
            console.error("Error disabling user: ", error);
        }
    }

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