const DataAccess = require('../dataAccessLayer/DataAccess');

class AppointmentService {
    async createAppointment({StartDateTime, EndDateTime, CreatedDateTime, LastModifiedDateTime, UserID, AppointmentTitle}) {
        if(!StartDateTime || !EndDateTime || !CreatedDateTime || !LastModifiedDateTime || !UserID || !ServiceID) {
            const err = new Error('Missing required fields for appointment creation!');
            err.code = 400;
            throw err;
        }

        // Get Service ID from UserID
        const service = await DataAccess.getServiceIDByUserID(UserID);

        const appointmentData = {
            StartDateTime,
            EndDateTime,
            CreatedDateTime,
            LastModifiedDateTime,
            AppointmentTitle: AppointmentTitle || 'Appointment',
            ClientUserID: null,
            ServiceID: service.ServiceID,
        };

        await DataAccess.createAppointment(appointmentData);
    }

    async deleteAppointment({AppointmentID}) {
        await DataAccess.deleteAppointment(AppointmentID);
    }

    async bookAppointment({AppointmentID, UserID}) {
        await DataAccess.bookAppointment(AppointmentID, UserID);
    }

    async getAllAppointmentSlotsForProvider(UserID) {
        if(!UserID) {
            const err = new Error('Missing UserID for appointment slot retrieval!');
            err.code = 400;
            throw err;
        }
        const service = await DataAccess.getServiceIDByUserID(UserID);
        const appointments = await DataAccess.getAllAppointmentSlotsForProvider(service.ServiceID);
        return appointments;
    }
}

const appointmentServiceInstance = Object.freeze(new AppointmentService());
module.exports = appointmentServiceInstance;