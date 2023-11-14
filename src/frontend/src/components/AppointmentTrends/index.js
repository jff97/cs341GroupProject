import React, { useEffect, useState } from 'react';
import appointmentService from 'src/services/appointment.service';
import useUserStore from '../../utils/stores';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button, TextField } from '@mui/material';
import dayjs from 'dayjs';
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

export default function AppointmentTrends() {
    const [apiData, setApiData] = useState([]);
    const [startDateTime, setStartDateTime] = useState(dayjs().set('second', 0));
    const [endDateTime, setEndDateTime] = useState(dayjs().set('second', 0).add(6, 'day'));
    const ProviderID = useUserStore(state => state.UserID);

    const fetchData = async (providerID, startDate, endDate) => {
        try {
            const trends = await appointmentService.getAppointmentTrends(providerID, startDate, endDate);
            setApiData(trends);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
        const day = startDateTime.add(i, 'day').format('MM-DD-YYYY');
        daysOfWeek.push(day);
    }
    const data = apiData.map((value, index) => {
        return { day: daysOfWeek[index], 'Number of Appointments': value };
    });

    // When alternative date is selected make API call and update data
    useEffect(() => {
        fetchData(ProviderID, startDateTime, endDateTime);
    }, [ProviderID, startDateTime, endDateTime]);

    const handleDateTimeChange = (newValue) => {
        const updatedStartDateTime = dayjs(newValue);
        const updatedEndDateTime = updatedStartDateTime.add(6, 'day');
        setStartDateTime(updatedStartDateTime);
        setEndDateTime(updatedEndDateTime);
    }

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
                    onChange={(newValue) => /*setStartDateTime(newValue.second(0))*/handleDateTimeChange(newValue)}
                />
            </div>
        </div>
    );
}
