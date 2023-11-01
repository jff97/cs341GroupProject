const DataAccess = require('../dataAccessLayer/DataAccess');

class AppointmentService {
    async createAppointment({StartDateTime, EndDateTime, UserID, AppointmentTitle}) {
        if(!StartDateTime || !EndDateTime || !UserID) {
            const err = new Error('Missing required fields for appointment creation!');
            err.code = 400;
            throw err;
        }
        if (AppointmentTitle === '') {
            const err = new Error('Appointment Title Cannot Be Empty!');
            err.code = 400;
            throw err;
        }

        // Check for conflicts
        // Get all appointments for the service

        // Get Service ID from UserID
        const service = await DataAccess.getServiceIDByUserID(UserID);
        const appointments = await DataAccess.getAllAppointmentSlotsForProvider(service.ServiceID);

        // Check for conflicts
        appointments.forEach((appointment) => {
            if (StartDateTime >= appointment.StartDateTime && StartDateTime <= appointment.EndDateTime) {
                const err = new Error('Appointment Start Time Conflicts With Another Appointment!');
                err.code = 400;
                throw err;
            } else if (EndDateTime >= appointment.StartDateTime && EndDateTime <= appointment.EndDateTime) {
                const err = new Error('Appointment End Time Conflicts With Another Appointment!');
                err.code = 400;
                throw err;
            }
        });

        const appointmentData = {
            StartDateTime,
            EndDateTime,
            AppointmentTitle: AppointmentTitle,
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

    async cancelAppointment({AppointmentID}) {
        await DataAccess.cancelAppointment(AppointmentID);
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

    async getAllAvailableAppointments() {
        return await DataAccess.getAllAvailableAppointments();
    }
    async getAppointmentsByUser(UserID) {
        if(!UserID) {
            const err = new Error('Missing UserID for appointment slot retrieval!');
            err.code = 400;
            throw err;
        }
        return await DataAccess.getAppointmentsByUserId(UserID);
    }

}



const appointmentServiceInstance = Object.freeze(new AppointmentService());
module.exports = appointmentServiceInstance;