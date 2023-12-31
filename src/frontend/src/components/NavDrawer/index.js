import React, { useState, useEffect } from 'react';
import { Box, Drawer, CssBaseline, Toolbar, List, Typography, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import TasksIcon from '@mui/icons-material/Task';
import EventIcon from '@mui/icons-material/Event';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined';
import HelpIcon from '@mui/icons-material/Help';
import { Link } from 'react-router-dom';
import TimelineIcon from '@mui/icons-material/Timeline';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AppConfig from 'src/config/config';
import useUserStore from 'src/utils/stores';
import GitInfo from 'react-git-info/macro';
import api from 'src/services/api';

const drawerWidth = 240;

const linkStyles = {
    textDecoration: 'none',
    color: 'white'
}

export default function NavDrawer() {
    const RoleID = useUserStore(state => state.RoleID);
    const gitInfo = GitInfo();
    const [platform, setPlatform] = useState('');

    useEffect(() => {
        api.get('/api/util/platform')
            .then((response) => {
                setPlatform(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }, []);

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
                                    <TimelineIcon />
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
                                        <TimelineIcon />
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
                    <ListItem disablePadding 
                        onClick={() => {
                            window.open('https://github.com/jff97/cs341GroupProject/blob/soft-delete/projectManagement/userManual/User%20Manual.pdf')
                        }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <HelpIcon />
                            </ListItemIcon>
                            <ListItemText primary="User Help Guide" />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Toolbar />
                {RoleID === 3 &&
                    (<div style={{marginTop: 'auto', textAlign:'center'}}>
                        <p onClick={() => {
                            window.open('https://github.com/jff97/cs341GroupProject/commit/' + gitInfo.commit.hash)
                        }}>Production Build {gitInfo.commit.shortHash}</p>
                        <p>Build Date: {gitInfo.commit.date}</p>
                        <p>Platform: {platform}</p>
                    </div>)}
            </Drawer>
        </Box>
    );
}