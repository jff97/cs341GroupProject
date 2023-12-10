import React, {useEffect, useState} from "react";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {TextField} from "@mui/material";
import dayjs from "dayjs";
import appointmentService from "../../services/appointment.service";

export default function AdminAppointmentTrends() {
    const [trends, setApiData] = useState([]);
    const [startDateTime, setStartDateTime] = useState(dayjs().set('second', 0));
    const [endDateTime, setEndDateTime] = useState(dayjs());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const serviceProviders = await appointmentService.getAppointmentProviders();
                const sum = [0, 0, 0, 0, 0, 0, 0]

                // Get trend data from each provider and calculate running sum
                for (const provider of serviceProviders) {
                    const weekTrends = await appointmentService.getAppointmentTrends(provider.UserID, startDateTime, endDateTime)
                    for (let i = 0; i < 7; i++) {
                        sum[i] = sum[i] + weekTrends[i];
                    }
                }
                setApiData(sum)
                /*const weekTrends = await appointmentService.getAppointmentTrends(providerID, startDateTime, endDateTime);
                setApiData(weekTrends);*/
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [startDateTime, endDateTime]);

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const data = trends.map((value, index) => {
        return { day: daysOfWeek[index], 'Number of Appointments': value };
    });

    return (
        <div>
            <h1>All Trends</h1>
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
    )

}