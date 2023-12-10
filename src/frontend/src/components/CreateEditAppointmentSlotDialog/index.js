import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, FormControl, TextField, Select } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import appointmentService from 'src/services/appointment.service';
import useUserStore from 'src/utils/stores';
import dayjs from 'dayjs';
import { useNotification } from "../NotificationProvider";

export default function CreateEditAppointmentSlotDialog({ open, onDialogClose, selectedAppointment, setSelectedAppointment }) {
    const [appointmentTitle, setAppointmentTitle] = useState('');
    const [appointmentStart, setAppointmentStart] = useState(dayjs().set('second', 0));
    const [appointmentEnd, setAppointmentEnd] = useState(dayjs().set('second', 0));
    const [duration, setDuration] = useState(15);
    const UserID = useUserStore(state => state.UserID);
    const { createNotification } = useNotification();

    useEffect(() => {
        setAppointmentEnd(appointmentStart.add(duration, 'minute'));
    }, [appointmentStart, duration]);

    useEffect(() => {
        if (selectedAppointment) {
            setAppointmentTitle(selectedAppointment.AppointmentTitle);
            setAppointmentStart(dayjs(selectedAppointment.StartDateTime));
            setAppointmentEnd(dayjs(selectedAppointment.EndDateTime));
            setDuration(dayjs(selectedAppointment.EndDateTime).diff(dayjs(selectedAppointment.StartDateTime), 'minute'));
        }
    }, [selectedAppointment]);

    const onSubmit = () => {
        // If appointmentID is not -1, then we are editing an existing appointment slot
        if (!selectedAppointment) {
            appointmentService
                .createNewAppointmentSlot(appointmentStart, appointmentEnd, UserID, appointmentTitle)
                .then((response) => {
                    createNotification("Appointment Slot Successfully Created!");
                    closeDialog();
                }).catch((error) => {
                    createNotification(error.response.data, "error");
                });
        } else {
            appointmentService
                .modifyAppointmentSlot(selectedAppointment.AppointmentID, appointmentStart, appointmentEnd, UserID, appointmentTitle)
                .then((response) => {
                    createNotification("Appointment Slot Successfully Modified!");
                    closeDialog();
                }).catch((error) => {
                    createNotification(error.response.data, "error");
                });
        }
    }

    const closeDialog = () => {
        onDialogClose();
        setAppointmentTitle('');
        setAppointmentStart(dayjs().set('second', 0));
        setAppointmentEnd(dayjs().set('second', 0));
        setSelectedAppointment(null);
    }

    return (
        <Dialog
            open={open}
            keepMounted
            onClose={closeDialog}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{selectedAppointment ? "Edit Appointment \"" + selectedAppointment.AppointmentTitle + "\"" : "Create an Appointment" }</DialogTitle>
            <DialogContent>
                <FormControl sx={{ m: 1, minWidth: 475 }}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Appointment Title"
                        defaultValue=""
                        value={appointmentTitle}
                        color="info"
                        onChange={(event) => setAppointmentTitle(event.target.value)}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 475 }}>
                    <DateTimePicker
                        label="Start Time"
                        color="info"
                        value={appointmentStart}
                        onChange={(newValue) => setAppointmentStart(newValue.second(0))}
                    />
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 475 }}>
                    <InputLabel id="demo-simple-select-label">Duration</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={duration}
                        label="Duration"
                        onChange={(newValue) => {
                            const newDuration = newValue.target.value;
                            setDuration(newDuration); // Update the duration
                            // Calculate and update the end time based on the new duration
                            const newEndTime = appointmentStart.add(newDuration, 'minute');
                            setAppointmentEnd(newEndTime);
                        }}
                    >
                        <MenuItem value={15}>15 minutes</MenuItem>
                        <MenuItem value={30}>30 minutes</MenuItem>
                        <MenuItem value={45}>45 minutes</MenuItem>
                        <MenuItem value={60}>60 minutes</MenuItem>
                        <MenuItem value={90}>90 minutes</MenuItem>
                        <MenuItem value={120}>120 minutes</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 475 }}>
                    <DateTimePicker
                        label="End Time"
                        value={appointmentEnd}
                        sx={{ '&::-webkit-scrollbar': { display: 'none' } }}
                        onChange={(newValue) => setAppointmentEnd(newValue.second(0))}
                        disabled
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog} color="info">Cancel</Button>
                <Button onClick={onSubmit} color="info">Submit</Button>
            </DialogActions>
        </Dialog>
    );
}
