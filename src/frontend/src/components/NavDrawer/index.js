import * as React from 'react';
import { Box, Drawer, CssBaseline, Toolbar, List, Typography, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import TasksIcon from '@mui/icons-material/Task';
import EventIcon from '@mui/icons-material/Event';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AppConfig from 'src/config/config';
import useUserStore from 'src/utils/stores';

const drawerWidth = 240;

const linkStyles = {
    textDecoration: 'none',
    color: 'white'
}

export default function NavDrawer() {
    const location = useLocation();
    const RoleID = useUserStore(state => state.RoleID);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: 'primary.main',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar>
                    <EventIcon sx={{ marginRight: '5px' }} />
                    <Typography variant="h6">{AppConfig.appName}</Typography>
                </Toolbar>
                <Divider />
                <List>
                    {RoleID === 1 && 
                        <Link to="/dashboard/myAppointment" style={linkStyles}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <CalendarMonthOutlined />
                                </ListItemIcon>
                                <ListItemText primary="My Appointments" />
                            </ListItemButton>
                        </ListItem>
                        </Link>
                    }
                    {RoleID === 1 && 
                    <Link to="/dashboard/book" style={linkStyles}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TasksIcon />
                                </ListItemIcon>
                                <ListItemText primary="Book Appointment" />
                            </ListItemButton>
                        </ListItem>      
                    </Link>
                    }
                    {RoleID === 2 && 
                        <Link to="/dashboard/appointment" style={linkStyles}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <CalendarMonthOutlined />
                                </ListItemIcon>
                                <ListItemText primary="Create Appointment" />
                            </ListItemButton>
                        </ListItem>
                        </Link>
                    }
                    {RoleID === 3 &&
                     <Link to="/dashboard/admin" style={linkStyles}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <EditCalendarIcon />
                                </ListItemIcon>
                                <ListItemText primary="Manage Appointments" />
                            </ListItemButton>
                        </ListItem>
                        </Link>
                    }
                    {RoleID === 2 &&
                     <Link to="/dashboard/trends" style={linkStyles}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AdminPanelSettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Appointment Trends" />
                            </ListItemButton>
                        </ListItem>
                        </Link>
                    }
                    {RoleID === 3 &&
                        <Link to="/dashboard/adminTrends" style={linkStyles}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <AdminPanelSettingsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Admin Appointment Trends" />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    }
                    {RoleID === 3 &&
                        <Link to="/dashboard/adminUserManagement" style={linkStyles}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <AdminPanelSettingsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Admin User Management" />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    }
                    <ListItem disablePadding onClick={() => {
                            window.location.replace('https://github.com/jff97/cs341GroupProject/blob/soft-delete/projectManagement/userManual/User%20Manual.pdf')
                    }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <AdminPanelSettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="User Help" />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Toolbar />
            </Drawer>
        </Box>
    );
}