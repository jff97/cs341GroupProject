import { useEffect } from 'react';
import './App.css';
import authService from 'src/services/auth.service';
import { Box } from '@mui/material';
import { Navigate } from 'react-router-dom';
import ProtectedRoutes from 'src/components/ProtectedRoutes';
import { Dashboard, Login, Register } from 'src/pages';
import useUserStore from "src/utils/stores";



import {
  HashRouter, Route, Routes, 
} from 'react-router-dom';

const rootStyle =  {
  display: 'flex',

}
const contentStyle =  {
  flexGrow: 1,
}

function App() {
  const setLoading = useUserStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(true);
    authService.fetchRefreshToken()
      .then((response) => {
        console.log("Token refreshed on page load");
        setLoading(false);
      }).catch((error) => {
        console.log("Error refreshing token on page load");
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={rootStyle}>
      <Box sx={contentStyle} >
      <HashRouter>
        <Routes>
          <Route exact path="*" element={<ProtectedRoutes />}>
            <Route exact path="*" element={<Navigate to="/dashboard" />} />
            <Route path="dashboard/*" element={<Dashboard />} />
          </Route>
          <Route path="register/*" element={<Register />} />
          <Route path="login/*" element={<Login />} />
        </Routes>
      </HashRouter>
    </Box>
  </Box>
  );
}

export default App;
