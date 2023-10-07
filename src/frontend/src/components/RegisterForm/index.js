import React, { useState } from "react";
import userService from "../../services/user.service";
import { useNavigate, Link } from "react-router-dom";
import { Avatar, Button, CssBaseline, TextField, MenuItem, Box, Alert, Typography, Container, Paper } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AppConfig from "src/config/config";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';


function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceInfo, setServiceInfo] = useState("");
  const [category, setCategory] = useState(0);
  const [error, setError] = useState("");
  const [role, setRole] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    userService.createUser(firstname, lastname, username, password, birthdate, role, serviceTitle, serviceInfo, category).then(response => {
      console.log(response);
      navigate("/login");
    }).catch(err => {
      console.log(err)
      setError(err.response.data);
    })
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ zIndex: 1 }}>
      <CssBaseline />
      <Paper elevation={3} sx={{ padding: "50px", backgroundColor: "primary.main" }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, backgroundColor: 'info.main' }}>
            <AppRegistrationIcon backgroundColor="info" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register for {AppConfig.appName}
          </Typography>
          <Box component="form" display="flex" flexDirection="column" justifyContent="space-between" p={2} onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {error ? <Alert severity="error">{error}</Alert> : null}
            <TextField
              value={role}
              onChange={(e) => setRole(e.target.value)}
              select
              label="Account Type"
              color="info"
            >
              <MenuItem value={1}>Client</MenuItem>
              <MenuItem value={2}>Service Provider</MenuItem>
            </TextField>
            <Box sx={{ display: 'flex', mt: 2 }}>
              <Box style={{ flex: 1, marginRight: '8px' }}>
                <TextField
                  label="First Name"
                  color="info"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  variant="outlined"
                  fullWidth />
              </Box>
              <Box style={{ flex: 1 }}>
                <TextField
                  label="Last Name"
                  color="info"
                  variant="outlined"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  fullWidth />
              </Box>
            </Box>
            <TextField
              error={error}
              margin="normal"
              required
              fullWidth
              sx={{ mt: 2 }}
              color="info"
              id="username"
              label="Username"
              value={username}
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              autoComplete="username"
              variant="outlined"
            />
            <TextField
              error={error}
              margin="normal"
              required
              color="info"
              sx={{ mt: 1 }}
              fullWidth
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              label="Password"
              value={password}
              type="password"
              id="password"
              variant="outlined"
              autoComplete="current-password"
            />
            <DatePicker sx={{ mt: 1 }} label="Birthdate" onChange={(value) => setBirthdate(value)} />

            {role === 1 ? null : (
              <Box>
            <TextField
              error={error}
              margin="normal"
              fullWidth
              sx={{ mt: 2 }}
              color="info"
              id="serviceTitle"
              label="Service Title"
              value={serviceTitle}
              name="serviceTitle"
              onChange={(e) => {
                setServiceTitle(e.target.value);
              }}
              autoComplete="username"
              variant="outlined"
              autoFocus
            />

            <TextField
              error={error}
              margin="normal"
              fullWidth
              sx={{ mt: 1 }}
              color="info"
              id="serviceInfo"
              label="Service Qualifications"
              value={serviceInfo}
              name="serviceInfo"
              onChange={(e) => {
                setServiceInfo(e.target.value);
              }}
              autoComplete="username"
              variant="outlined"
              autoFocus
            />

            <TextField
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              select
              fullWidth
              label="Service Category"
              color="info"
              sx={{mt: 1}}
            >
              <MenuItem value={0}>Health</MenuItem>
              <MenuItem value={1}>Beauty</MenuItem>
              <MenuItem value={2}>Fitness</MenuItem>
            </TextField>
            </Box>
            )}
         
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="info"
                onClick={handleSubmit}
                sx={{ mt: 3, mb: 2 }}
              >
                Register Account
              </Button>

          
            
          </Box>
          <Typography>
            <Link to="/login" style={{ color: 'lightblue' }}>Already have an account? Sign-in</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default RegisterForm;