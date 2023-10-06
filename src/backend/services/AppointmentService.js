const DataAccess = require('../dataAccessLayer/DataAccess');

class AppointmentService {
    async createAppointment({StartDateTime, EndDateTime, CreatedDateTime, LastModifiedDateTime, UserID, ServiceID}) {
        if(!StartDateTime || !EndDateTime || !CreatedDateTime || !LastModifiedDateTime || !UserID || !ServiceID) {
            const err = new Error('Missing required fields for appointment creation!');
            err.code = 400;
            throw err;
        }

        const appointmentData = {
            StartDateTime,
            EndDateTime,
            CreatedDateTime,
            LastModifiedDateTime,
            UserID,
            ServiceID
        };

        await DataAccess.createAppointment(appointmentData);
    }

    async deleteAppointment({AppointmentID}) {
        await DataAccess.deleteAppointment(AppointmentID);
    }

    async bookAppointment({AppointmentID, UserID}) {
        await DataAccess.bookAppointment(AppointmentID, UserID);
    }
}

const appointmentServiceInstance = Object.freeze(new AppointmentService());
module.exports = appointmentServiceInstance;