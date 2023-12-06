//Author: John Fox, Alex Cappel
//Date Created: November 14  2023 
//Dates Modified: November 15
//Class & Methods Explained: This class is used to display a bar chart that represents the number of appointments over a specfic date range
import React, { useEffect, useState } from 'react';
import appointmentService from 'src/services/appointment.service';
import useUserStore from '../../utils/stores';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button, TextField } from '@mui/material';
import dayjs from 'dayjs';
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

export default function AppointmentTrends() {
    const [trends, setApiData] = useState([]);
    const [startDateTime, setStartDateTime] = useState(dayjs().set('second', 0));
    const [endDateTime, setEndDateTime] = useState(dayjs());
    const ProviderID = useUserStore(state => state.UserID);

    const fetchData = async (providerID, startDate, endDate) => {
        try {
            const weekTrends = await appointmentService.getAppointmentTrends(providerID, startDate, endDate);
            setApiData(weekTrends);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const data = trends.map((value, index) => {
        return { day: daysOfWeek[index], 'Number of Appointments': value };
    });

    // When alternative date is selected make API call and update data
    useEffect(() => {
        fetchData(ProviderID, startDateTime, endDateTime);
    }, [ProviderID, startDateTime, endDateTime]);

    return (
        <div>
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
