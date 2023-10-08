import * as React from 'react';
import { Box, Drawer, CssBaseline, Toolbar, List, Typography, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import TasksIcon from '@mui/icons-material/Task';
import EventIcon from '@mui/icons-material/Event';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AppConfig from 'src/config/config';

const drawerWidth = 240;

const linkStyles = {
    textDecoration: 'none',
    color: 'white'
}

export default function NavDrawer() {
    const location = useLocation();

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
                    <Link to="/dashboard/tasks" style={linkStyles}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TasksIcon />
                                </ListItemIcon>
                                <ListItemText primary="Book Appointment" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                </List>
                <Toolbar />
            </Drawer>
        </Box>
    );
}