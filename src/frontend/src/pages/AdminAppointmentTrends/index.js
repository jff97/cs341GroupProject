import React, { useEffect, useState } from 'react';
import CustomAppBar from 'src/components/CustomAppBar';
import {Box, Button, Tab, Tabs} from '@mui/material';
import AdminAppointmentTrends from "../../components/AdminAppointmentTrends";
import AllAppointmentTrends from "../../components/AllAppointmentTrends";
import AllTrendsByCategory from "../../components/AllTrendsByCategory";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const tabTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9', // Replace with your preferred primary color for dark mode tabs
        },
    },
    components: {
        MuiTabs: {
            styleOverrides: {
                root: {
                    backgroundColor: '#424242', // Background color for the tabs bar in dark mode
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    color: '#ffffff', // Text color for tabs in dark mode
                    '&.Mui-selected': {
                        color: '#90caf9', // Text color for selected tab in dark mode
                    },
                },
            },
        },
    },
});

export default function AdminAppointmentHistory() {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Box sx={{ height: '93%' }}>
            <CustomAppBar
                pageTitle={
                    selectedTab === 0
                        ? 'Trends by Provider'
                        : selectedTab === 1
                            ? 'Trends for all Providers'
                            : 'By Provider Category'
                }
            />
            <ThemeProvider theme={tabTheme}>
                <Tabs value={selectedTab} onChange={handleTabChange}>
                    <Tab label="Trends by Provider" value={0} />
                    <Tab label="Trends for all Providers" value={1} />
                    <Tab label="By Provider Category" value={2} />
                </Tabs>
            </ThemeProvider>
            {selectedTab === 0 && <AdminAppointmentTrends />}
            {selectedTab === 1 && <AllAppointmentTrends />}
            {selectedTab === 2 && <AllTrendsByCategory />}
        </Box>
    );
}