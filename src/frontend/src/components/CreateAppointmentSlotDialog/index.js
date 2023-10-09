import React, { useState} from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, FormControl, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import appointmentService from 'src/services/appointment.service';
import useUserStore from 'src/utils/stores';
import dayjs from 'dayjs';
import { useNotification } from "../NotificationProvider";

function CreateAppointmentSlotDialog({ open, handleClose }) {
    const [appointmentTitle, setAppointmentTitle] = useState('')
    const [appointmentStart, setAppointmentStart] = useState(dayjs());
    const [appointmentEnd, setAppointmentEnd] =  useState(dayjs());
    const UserID = useUserStore(state => state.UserID);
    const { createNotification } = useNotification();

    const onSubmit = () => {
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
            <DateTimePicker 
                label="End Time" 
                value={appointmentEnd}
                sx={{'&::-webkit-scrollbar': {display: 'none'}}}
                onChange={(newValue) => setAppointmentEnd(newValue)}
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