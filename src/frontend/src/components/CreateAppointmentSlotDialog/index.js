import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, FormControl, TextField, Select } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import appointmentService from 'src/services/appointment.service';
import useUserStore from 'src/utils/stores';
import dayjs from 'dayjs';
import { useNotification } from "../NotificationProvider";

function CreateAppointmentSlotDialog({ open, handleClose }) {
    const [appointmentTitle, setAppointmentTitle] = useState('')
    const [appointmentStart, setAppointmentStart] = useState(dayjs());
    const [appointmentEnd, setAppointmentEnd] =  useState(dayjs());
    const [duration, setDuration] = useState(30);
    const UserID = useUserStore(state => state.UserID);
    const { createNotification } = useNotification();

    useEffect(() => {
        setAppointmentEnd(appointmentStart.add(duration, 'minute'));
    }, [appointmentStart, duration]);

    const onSubmit = () => {
        console.log("appointment title = <" + appointmentTitle + ">");
        if (appointmentTitle === '') {
            createNotification("Appointment Title Cannot Be Empty!", "error");
            return;
        } else if (appointmentStart.isBefore(dayjs())) {
            createNotification("Appointment Must Be In The Future!", "error");
            return;
        } else {
            appointmentService
            .createNewAppointmentSlot(appointmentStart, appointmentEnd, UserID, appointmentTitle)
            .then((response) => {
                createNotification("Appointment Slot Successfully Created!");
                closeDialog();
            }).catch((error) => {
                createNotification("Error Creating Appointment Slot!", "error");
            });
        }
    }

    const closeDialog = () => {
        setAppointmentTitle('');
        setAppointmentStart(dayjs());
        setAppointmentEnd(dayjs());
        handleClose();
    }
    

    return (
        <Dialog
        open={open}
        keepMounted
        onClose={closeDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Create Appointment Slot"}</DialogTitle>
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
                onChange={(newValue) => setAppointmentStart(newValue)}
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
                sx={{'&::-webkit-scrollbar': {display: 'none'}}}
                onChange={(newValue) => setAppointmentEnd(newValue)}
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

export default CreateAppointmentSlotDialog;