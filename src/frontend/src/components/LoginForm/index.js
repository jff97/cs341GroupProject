//Author: Creed Zagrzebski
//Date Created: November 7  2023 
//Class & Methods Explained: This class is used to make a login form when creating account 
import React, { useState } from "react";
import authService from "../../services/auth.service";
import { useNavigate, Link } from "react-router-dom";
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Box, Alert, Typography, Container, Paper } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AppConfig from "src/config/config";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        //validate a successful login prior to redirect
        authService.login(username, password).then(response => {
            navigate("/dashboard");
        }).catch(err => {
            console.log(err)
            setError(err.response.data);
        })
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ zIndex: 1 }}>
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
                        <LockOutlinedIcon backgroundColor="info" />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in to {AppConfig.appName}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        {error ? <Alert severity="error">{error}</Alert> : null}
                        <TextField
                            error={error}
                            margin="normal"
                            required
                            fullWidth
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
                            autoFocus
                        />
                        <TextField
                            error={error}
                            margin="normal"
                            required
                            color="info"
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

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="info"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                    <Typography sx={{ mt: 2 }}>
                        <Link to="/register" style={{ color: 'lightblue' }}>Don't have an account? Register here</Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}

export default LoginForm;