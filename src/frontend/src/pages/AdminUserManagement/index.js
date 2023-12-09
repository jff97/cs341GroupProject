import React, { useEffect, useState } from 'react';
import CustomAppBar from 'src/components/CustomAppBar';
import AdminUsersTable from 'src/components/AdminUsersTable';
import UserService from 'src/services/user.service';
import { Box } from '@mui/material';

export default function UserManagement() {
   const [systemUsers, setSystemUsers] = useState([]);

   const getAllSystemUsers= async () => {
      UserService.getAllNormalUsers()
      .then((response) => {
          setSystemUsers(response.data);
          //console.log(response.data)
      }).catch((error) => {
          console.log(error);
      })
   }

   useEffect(() => {
      getAllSystemUsers();
   }, []);

  return (
    <Box sx={{height: '93%'}}>
        <CustomAppBar 
            pageTitle="User Management" 
        />
        <AdminUsersTable users={systemUsers} setUsers={setSystemUsers} />
    </Box>
  );
}