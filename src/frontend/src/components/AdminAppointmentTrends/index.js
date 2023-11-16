import React, { useEffect, useState, useCallback } from 'react';
import {Select, MenuItem, FormControl, TextField} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import appointmentService from 'src/services/appointment.service';
import dayjs from "dayjs";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

export default function AdminAppointmentTrends() {
    const [providers, setProviders] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [selectedProviderUserID, setSelectedProviderUserID] = useState(null);
    const [trends, setApiData] = useState([]);
    const [startDateTime, setStartDateTime] = useState(dayjs().set('second', 0));
    const [endDateTime, setEndDateTime] = useState(dayjs());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const serviceProviders = await appointmentService.getAppointmentProviders();
                setProviders(serviceProviders);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const fetchTrends = async (providerID, startDate, endDate) => {
        try {
            const weekTrends = await appointmentService.getAppointmentTrends(providerID, startDate, endDate);
            setApiData(weekTrends);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const newItems = [];
        providers.forEach((item, index) => {
            const newItem = (
                <MenuItem key={index + 1} value={item.UserID}>
                    {item.FullName}
                </MenuItem>
            );
            newItems.push(newItem);
        });
        setMenuItems(newItems);

        // Set default selected provider as the first one in the list
        if (providers.length > 0 && !selectedProvider) {
            setSelectedProvider(providers[0].UserID);
        }
    }, [providers, selectedProvider]);

    const handleChange = useCallback((event) => {
        const selectedValue = event.target.value;
        const selectedProvider = providers.find((provider) => provider.UserID === selectedValue);

        if (selectedProvider) {
            setSelectedProviderUserID(selectedProvider.UserID);
        }

        setSelectedProvider(selectedValue);
    }, [providers]);

    useEffect(() => {
        if (selectedProviderUserID) {
            // Ensure selectedProviderUserID exists before fetching trends
            fetchTrends(selectedProviderUserID, startDateTime, endDateTime);
        }
    }, [selectedProviderUserID, startDateTime, endDateTime]);

    useEffect(() => {
        // Call handleChange when providers change to select the first provider
        if (providers.length > 0 && !selectedProvider) {
            handleChange({ target: { value: providers[0].UserID } });
        }
    }, [providers, selectedProvider, handleChange]);

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const data = trends.map((value, index) => {
        return { day: daysOfWeek[index], 'Number of Appointments': value };
    });

    return (
        <div>
            <h1>Admin Trends</h1>
            <FormControl fullWidth>
                <InputLabel shrink={true} id="demo-simple-select-label">Provider</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedProvider}
                    onChange={handleChange}
                >
                    {menuItems}
                </Select>
            </FormControl>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Number of Appointments" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
                <DatePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Start Date Time"
                    value={startDateTime}
                    onChange={(newValue) => setStartDateTime(newValue.second(0))}
                />
                <DatePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="End Date Time"
                    value={endDateTime}
                    onChange={(newValue) => setEndDateTime(newValue.second(0))}
                />
            </div>
        </div>
    );
}
