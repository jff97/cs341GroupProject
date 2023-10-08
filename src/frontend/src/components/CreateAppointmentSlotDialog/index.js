import React, { useState} from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, FormControl, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

function CreateAppointmentSlotDialog({ open, handleClose }) {
    const [appointmentTitle, setAppointmentTitle] = useState('')
    const [appointmentStart, setAppointmentStart] = useState(dayjs());
    const [appointmentEnd, setAppointmentEnd] =  useState(dayjs());

    return (
        <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
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
          <Button onClick={handleClose} color="info">Cancel</Button>
          <Button onClick={handleClose} color="info">Submit</Button>
        </DialogActions>
      </Dialog>
    );
}

export default CreateAppointmentSlotDialog;