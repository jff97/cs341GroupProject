import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Divider, Box, Badge, Tooltip } from "@mui/material";
import { Grid, MenuItem, Menu, IconButton } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import RefreshIcon from "@mui/icons-material/Refresh";
import useUserStore from "src/utils/stores";
import authService from "src/services/auth.service";

const drawerWidth = 240;

const noMessagesStyles = (theme) => ({
    color: theme.palette.text.disabled,
    fontSize: "0.8rem",
    mt: 1,
})

const messageTitleStyles = (theme) => ({
    color: theme.palette.text.primary,
    fontWeight: "bold",
    fontSize: "0.9rem",
})

const messageContentStyles = (theme) => ({
    color: theme.palette.text.disabled,
    fontSize: "0.8rem",
})

const popupMenuMarginStyles = {
    ml: 2,
    mr: 2,
    mb: 1
}

const userNameStyles = (theme) => ({
    color: theme.palette.text.primary,
    fontWeight: "bold",
})

export default function AppBarCustom({ pageTitle }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

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
                            <Badge badgeContent={2} color="error">
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
                                    <Typography sx={[userNameStyles, popupMenuMarginStyles]}>Messages</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton
                                        aria-label="Refresh messages" size="small">
                                        <Tooltip title="Refresh">
                                            <RefreshIcon fontSize="inherit" />
                                        </Tooltip>
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Divider />
                            <Typography sx={[popupMenuMarginStyles, noMessagesStyles]}>Failed to load messages</Typography>
                        </Menu>

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