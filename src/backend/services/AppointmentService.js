const DataAccess = require('../dataAccessLayer/DataAccess');

class AppointmentService {
    async createAppointment({StartDateTime, EndDateTime, UserID, AppointmentTitle}) {
        if(!StartDateTime || !EndDateTime || !UserID) {
            const err = new Error('Missing required fields for appointment creation!');
            err.code = 400;
            throw err;
        }

        // Get Service ID from UserID
        const service = await DataAccess.getServiceIDByUserID(UserID);

        const appointmentData = {
            StartDateTime,
            EndDateTime,
            AppointmentTitle: AppointmentTitle || 'Appointment',
            ClientUserID: null,
            ServiceID: service.ServiceID,
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