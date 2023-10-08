const DataAccess = require('../dataAccessLayer/DataAccess');

class AppointmentService {
    async createAppointment({StartDateTime, EndDateTime, CreatedDateTime, LastModifiedDateTime, ClientUserID, ServiceID}) {
        if(!StartDateTime || !EndDateTime || !CreatedDateTime || !LastModifiedDateTime || !ServiceID) {
            const err = new Error('Missing required fields for appointment creation!');
            err.code = 400;
            throw err;
        }

        const appointmentData = {
            StartDateTime,
            EndDateTime,
            CreatedDateTime,
            LastModifiedDateTime,
            ClientUserID, // ClientUserID should be null when created
            ServiceID
        };

        await DataAccess.createAppointment(appointmentData);
    }

    async deleteAppointment({AppointmentID}) {
        await DataAccess.deleteAppointment(AppointmentID);
    }

    async bookAppointment({AppointmentID, ClientUserID}) {
        await DataAccess.bookAppointment(AppointmentID, ClientUserID);
    }

    async cancelAppointment({AppointmentID, ClientUserID}) {
        await DataAccess.cancelAppointment(AppointmentID, ClientUserID);
    }

    async modifyAppointmentTime({AppointmentID, StartDateTime, EndDateTime}) {
        await DataAccess.modifyAppointmentTime(AppointmentID, StartDateTime, EndDateTime);
    }
}

const appointmentServiceInstance = Object.freeze(new AppointmentService());
module.exports = appointmentServiceInstance;