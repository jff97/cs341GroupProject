//Author: Creed Zagrzebski
//Date Created: October 6  2023 
//Dates Modified: October 7, November 6
//Class & Methods Explained: This class is used to create a custom app bar for the notifications
import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Divider, Badge, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Grid, MenuItem, Menu, IconButton } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import RefreshIcon from "@mui/icons-material/Refresh";
import useUserStore from "src/utils/stores";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import authService from "src/services/auth.service";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import notificationService from "src/services/notification.service";
import { useNotification } from "../NotificationProvider";

const drawerWidth = 240;

const rootStyle = {
    display: "flex",
    flexGrow: 1
}

const appBarStyle = {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
}

const pageTitleStyle = {
    paddingRight: "20px",
    marginLeft: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1
}

const buttonStyle = {
    minWidth: "250px"
}

const rightButtonFloat = {
    float: "right"
}

const messageTitleStyles = (theme) => ({
    color: 'white',
    fontWeight: "bold",
    fontSize: "0.9rem",
})

const messageContentStyles = (theme) => ({
    color: theme.palette.text.disabled,
    fontSize: "0.8rem",
})

const verticalAlignStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
}

const popupMenuMarginStyles = {
    ml: 2,
    mr: 2,
    mb: 1,
    color: 'white'
}

const userNameStyles = (theme) => ({
    color: theme.palette.primary.main,
    fontWeight: "bold",
})

const noMessagesStyles = (theme) => ({
    color: theme.palette.text.disabled,
    fontSize: "0.8rem",
    mt: 1,
})

const readMessageStyles = (theme) => ({
    color: theme.palette.text.disabled,
})

function Notification({ notification, setSelectedNotification, setIsNotificationDetailsDialogOpen, getNotifications }) {

    const selectNotification = () => {
        setSelectedNotification(notification)
        setIsNotificationDetailsDialogOpen(true)
    }

    const markNotificationRead = () => {
        notificationService.toggleNotificationRead(notification.NotificationID)
            .then((response) => {
                getNotifications();
            })
    }

    return (
        <Grid2 container spacing={2} columns={24}>
        <Grid2 item xs={3} sx={verticalAlignStyles}>
            {notification.NotificationRead ?
                <IconButton
                    sx={{ ml: 0.5, mr: 0.5, width: "3ch" }}
                    aria-label={`Mark message unread: ${notification.NotificationTitle}`} size="small" onClick={markNotificationRead}>
                    <Tooltip title="Mark as Unread">
                        <MarkunreadIcon fontSize="inherit" sx={readMessageStyles} />
                    </Tooltip>
                </IconButton> :
                <IconButton
                    sx={{ ml: 0.5, mr: 0.5, width: "3ch" }}
                    aria-label={`Mark message read: ${notification.NotificationTitle}`} size="small" onClick={markNotificationRead}>
                    <Tooltip title="Mark as Read">
                        <MarkEmailReadIcon fontSize="inherit" />
                    </Tooltip>
                </IconButton>
            }
        </Grid2>
        <Grid2 item xs={21}>
            <MenuItem onClick={selectNotification}>
                <Grid2 container spacing={0}>
                    <Grid2 item xs={12}>
                        <Typography sx={notification.NotificationRead ? [messageTitleStyles, readMessageStyles] : messageTitleStyles}>{notification.NotificationTitle}</Typography>
                    </Grid2>
                    {!notification.NotificationRead &&
                        <Grid2 item xs={12}>
                            <Typography noWrap sx={messageContentStyles}>{notification.NotificationMessage}</Typography>
                        </Grid2>
                    }
                </Grid2>
            </MenuItem>
        </Grid2>
    </Grid2>
    )
}


export default function AppBarCustom({ pageTitle }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const notificationContext = useNotification();

    const [isNotificationDetailsDialogOpen, setIsNotificationDetailsDialogOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);

    const [notifications, setNotifications] = React.useState([]);
    const [unreadNotificationCount, setUnreadNotificationCount] = React.useState(notifications.length);

    const [notificationMenuAnchorEl, setNotificationMenuAnchorEl] = React.useState(null);
    const notificationMenuOpen = Boolean(notificationMenuAnchorEl);

    const username = useUserStore((state) => state.FullName)

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Handle menu opening and closing by setting the menu anchor
    const openNotificationMenu = (event) => {
        setNotificationMenuAnchorEl(event.currentTarget)
    }

    const handleNotificationMenuClose = () => {
        setNotificationMenuAnchorEl(null)
    }

    // Obtain an updated list of messages from the API
    const getNotifications = () => {
        notificationService.getAllNotification()
            .then((response) => {
                console.log(response);
                setNotifications(response)
                setUnreadNotificationCount(response.length)
            })
    }    

    const deleteNotification = () => {
        notificationService.deleteNotification(selectedNotification.NotificationID)
            .then((response) => {
                getNotifications();
                setIsNotificationDetailsDialogOpen(false);
                setSelectedNotification(null);
                notificationContext.createNotification("Notification deleted successfully", "success"); 
            })
    }
  
    useEffect(() => {
        getNotifications()
    }, [])

    return (
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, bgcolor: 'primary.main' }}
                elevation={0}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        {pageTitle}
                    </Typography>

                    <Grid container alignItems="center" justifyContent="flex-end" marginLeft="auto" maxWidth="400px">
                        <IconButton onClick={openNotificationMenu}>
                            <Badge badgeContent={unreadNotificationCount} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>

                        <Menu
                            anchorEl={notificationMenuAnchorEl}
                            open={notificationMenuOpen}
                            onClose={handleNotificationMenuClose}
                            PaperProps={{
                                style: {
                                    maxHeight: 300,
                                    minWidth: '30ch',
                                    maxWidth: '30ch'
                                },
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={10}>
                                    <Typography sx={[userNameStyles, popupMenuMarginStyles]}>Notifications</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton
                                        aria-label="Refresh messages" size="small" onClick={getNotifications}>
                                        <Tooltip title="Refresh">
                                            <RefreshIcon fontSize="inherit" />
                                        </Tooltip>
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Divider />
                            {notifications.map((notification) => (
                            <Notification
                                key={notification.NotificationID}
                                notification={notification}
                                setSelectedNotification={setSelectedNotification}
                                setIsNotificationDetailsDialogOpen={setIsNotificationDetailsDialogOpen}
                                getNotifications={getNotifications}
                            />
                        ))}
                        {notifications.length === 0 &&
                            <Typography sx={[popupMenuMarginStyles, noMessagesStyles]}>No messages</Typography>
                        }
                        </Menu>

                        {/* The message details dialog */}
                        <Dialog open={isNotificationDetailsDialogOpen} onClose={() => setIsNotificationDetailsDialogOpen(false)} maxWidth={'xs'} fullWidth>
                            <DialogTitle>
                                Viewing Notification
                            </DialogTitle>
                            <Divider />
                            <DialogContent>
                                <Grid2 container spacing={2} columns={24}>
                                    <Grid2 item xs={5}>
                                        <Typography sx={{ fontWeight: 'bold' }}>Title:</Typography>
                                    </Grid2>
                                    <Grid2 item xs={19}>
                                        <Typography>{selectedNotification?.NotificationTitle ?? "No message selected"}</Typography>
                                    </Grid2>
                                    <Grid2 item xs={5}>
                                        <Typography sx={{ fontWeight: 'bold' }}>Content:</Typography>
                                    </Grid2>
                                    <Grid2 item xs={19}>
                                        <Typography>{selectedNotification?.NotificationMessage ?? "No message selected"}</Typography>
                                    </Grid2>
                                    <Grid2 item xs={5}>
                                        <Typography sx={{ fontWeight: 'bold' }}>Type:</Typography>
                                    </Grid2>
                                    <Grid2 item xs={19}>
                                        <Typography>{selectedNotification?.NotificationType}</Typography>
                                    </Grid2>
                                </Grid2>    
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={deleteNotification} color="error">Delete Message</Button>
                                <Button color='info' onClick={() => setIsNotificationDetailsDialogOpen(false)}>Close</Button>
                            </DialogActions>
                        </Dialog>

                        <IconButton
                            aria-label="account"
                            size="large"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleMenuClick}
                        >
                            <AccountCircle />
                        </IconButton>
                        {username}
                    </Grid>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <MenuItem onClick={() => {
                            handleClose()
                            authService.logout();
                        }}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
                <Divider />
            </AppBar>
    );
}