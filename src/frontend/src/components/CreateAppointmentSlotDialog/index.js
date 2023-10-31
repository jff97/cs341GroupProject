import React, { useState} from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, FormControl, TextField, Select, Menu } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import appointmentService from 'src/services/appointment.service';
import useUserStore from 'src/utils/stores';
import dayjs from 'dayjs';
import { useNotification } from "../NotificationProvider";
import { create } from '@mui/material/styles/createTransitions';

function CreateAppointmentSlotDialog({ open, handleClose }) {
    const [appointmentTitle, setAppointmentTitle] = useState('')
    const [appointmentStart, setAppointmentStart] = useState(dayjs());
    const [appointmentEnd, setAppointmentEnd] =  useState(dayjs());
    const [duration, setDuration] = useState(30);
    const UserID = useUserStore(state => state.UserID);
    const { createNotification } = useNotification();

    const onSubmit = () => {
        console.log("appointment title = <" + appointmentTitle + ">");
        //if (appointmentTitle === '') {
            //createNotification("Appointment Title Cannot Be Empty!", "error");
            //return;
        //}
        appointmentService.createNewAppointmentSlot(appointmentStart, appointmentEnd, UserID, appointmentTitle)
            .then((response) => {
                createNotification("Appointment Slot Successfully Created!");
                closeDialog();
            }).catch((error) => {
                createNotification("Error Creating Appointment Slot!", "error");
            });
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
                    setDuration(newValue.target.value);
                    createNotification("end time = " + appointmentEnd.format("YYYY-MM-DD HH:mm:ss"));
                }}
            >
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={45}>45</MenuItem>
                <MenuItem value={60}>60</MenuItem>
                <MenuItem value={90}>90</MenuItem>
            </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 475 }}>
            <DateTimePicker 
                label="End Time" 
                value={appointmentStart.add(duration, 'minute')}
                sx={{'&::-webkit-scrollbar': {display: 'none'}}}
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