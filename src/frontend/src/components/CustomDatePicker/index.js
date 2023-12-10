import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers';


export default function CustomDatePicker(props) {
    const theme = useTheme();

    const combinedSx = {
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.info.main,
            },
        },
        '& .MuiFormLabel-root.Mui-focused': {
            color: theme.palette.info.main,
        },
        ...props.sx,
    }

    return (
        <DatePicker
            {...props}
            sx={combinedSx}
        />
    )
}