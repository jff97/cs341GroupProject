import UserService from "../../services/user.service";
import React, {useEffect, useState} from "react";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {FormControl, MenuItem, Select, TextField} from "@mui/material";
import dayjs from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import appointmentService from "../../services/appointment.service";

export default function AllTrendsByCategory() {
    const [trends, setApiData] = useState([]);
    const [startDateTime, setStartDateTime] = useState(dayjs().set('second', 0));
    const [endDateTime, setEndDateTime] = useState(dayjs());
    const [selectedCategory, setSelectedCategory] = useState(0);

    const getAllSystemUsers= async () => {
        UserService.getAllServiceProviders()
            .then(async (response) => {
                const sum = [0, 0, 0, 0, 0, 0, 0]

                // Get trend data from each provider and calculate running sum
                for (const provider of response.data) {
                    if (provider.Service.Category === "Beauty" && selectedCategory === 0) {
                        const weekTrends = await appointmentService.getAppointmentTrends(provider.UserID, startDateTime, endDateTime)
                        for (let i = 0; i < 7; i++) {
                            sum[i] = sum[i] + weekTrends[i];
                        }
                    } else if (provider.Service.Category === "Fitness" && selectedCategory === 1) {
                        const weekTrends = await appointmentService.getAppointmentTrends(provider.UserID, startDateTime, endDateTime)
                        for (let i = 0; i < 7; i++) {
                            sum[i] = sum[i] + weekTrends[i];
                        }
                    } else if (provider.Service.Category === "Health" && selectedCategory === 2) {
                        const weekTrends = await appointmentService.getAppointmentTrends(provider.UserID, startDateTime, endDateTime)
                        for (let i = 0; i < 7; i++) {
                            sum[i] = sum[i] + weekTrends[i];
                        }
                    } else {

                    }
                }
                setApiData(sum);
            }).catch((error) => {
            console.log(error);
        })
    }


    useEffect(() => {
        console.log(selectedCategory)
        getAllSystemUsers();
    }, [selectedCategory, startDateTime, endDateTime]);


    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const data = trends.map((value, index) => {
        return { day: daysOfWeek[index], 'Number of Appointments': value };
    });

    function handleChange(event) {
        setSelectedCategory(event.target.value);
    }

    return (
        <div>
            <h1>Trends By Category</h1>
            <FormControl fullWidth>
                <InputLabel shrink={true} color="info" id="category-label">Categories</InputLabel>
                <Select
                    labelId="category-label"
                    label="Categories"
                    notched={true}
                    color="info"
                    id="demo-simple-select"
                    value={selectedCategory}
                    onChange={handleChange}
                >
                    <MenuItem value={0}>Beauty</MenuItem>
                    <MenuItem value={1}>Fitness</MenuItem>
                    <MenuItem value={2}>Health</MenuItem>
                </Select>
            </FormControl>
            <ResponsiveContainer width="100%" height={300} style={{marginTop: '30px'}}>
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