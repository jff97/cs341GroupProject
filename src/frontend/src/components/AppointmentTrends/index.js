import React, { useState } from 'react';
import appointmentService from 'src/services/appointment.service';
import { BarChart } from '@mui/x-charts/BarChart';

export default function AppointmentTrends(UserID, StartDateTime, EndDateTime) {
   
   const trends = appointmentService.getAppointmentTrends(UserID, StartDateTime, EndDateTime);

   return (
      <BarChart
         xAxis={[
            {
               id: 'barCategories',
               data: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
               scaleType: 'band',
            },
         ]}
         series={[
            {
               data: trends,
            },
         ]}
         width={500}
         height={300}
      />
   );
}