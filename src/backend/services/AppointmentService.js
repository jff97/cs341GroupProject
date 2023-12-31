const DataAccess = require('../dataAccessLayer/DataAccess');
const appSettings = require('../configs/tunableAppSettings.js');
const notificationServiceInstance = require('./NotificationService.js');

class AppointmentService {
    async createAppointment({StartDateTime, EndDateTime, UserID, AppointmentTitle}) {
        if(!StartDateTime || !EndDateTime || !UserID) {
            const err = new Error('Missing required fields for appointment creation!');
            err.code = 400;
            throw err;
        } else if (AppointmentTitle === '') {
            const err = new Error('Appointment Title Cannot Be Empty!');
            err.code = 400;
            throw err;
        } else if (new Date(StartDateTime) < new Date()) {
            const err = new Error('Appointment Must Be In The Future!');
            err.code = 400;
            throw err;
        }

        const service = await DataAccess.getServiceIDByUserID(UserID);

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
        const appointment = await DataAccess.getAppointmentByID(AppointmentID);
        
        // Format StartDateTime
        const startDateTime = new Date(appointment.StartDateTime);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const startDateTimeString = startDateTime.toLocaleString('en-US', options);
        await notificationServiceInstance.createNotification({
            UserID: appointment.ClientUserID,
            NotificationTitle: "Appointment Deleted",
            NotificationMessage: "Your appointment \"" + appointment.AppointmentTitle + "\" for " + startDateTimeString + " has been canceled.",
            NotificationDate: new Date(),
            NotificationType: "Appointment"
        });

        await DataAccess.deleteAppointment(AppointmentID);
    }

    async bookAppointment({AppointmentID, ClientUserID}) {
        //check if user allready has an appointment overlapping
        const possibleAppt = await DataAccess.getAppointmentByID(AppointmentID)
        const appointments = await DataAccess.getAppointmentsByUserId(ClientUserID);
        for (let i = 0; i < appointments.length; i++) {
            if (this.#isApptsOverlapping(possibleAppt, appointments[i])) {
                console.log('overlapping')
                const err = new Error('Appointment Overlaps with another appointment!');
                err.code = 400;
                throw err;
            }
        }
        await DataAccess.bookAppointment(AppointmentID, ClientUserID);
    }

    #isApptsOverlapping(appointment1, appointment2) {
        return appointment1.StartDateTime <= appointment2.EndDateTime && appointment1.EndDateTime >= appointment2.StartDateTime;
    }
   
    async cancelAppointment({AppointmentID}, UserID) {
        //prevent the user from canceling the appointment if it is not x many hours away
        const apptToCancel = await DataAccess.getAppointmentByID(AppointmentID)
        const allowedCancellationHours = appSettings.cancelationCutoffHours;
        const currentDate = new Date();
        var numOfMilliseconds = 1000 * 60 * 60 * allowedCancellationHours;
        var cancelableCutoffDate = new Date(currentDate.getTime() + numOfMilliseconds);


        // Get User Role for requesting user
        const user = await DataAccess.getUsersRole(UserID);
        if(user.RoleID == 1 && new Date(apptToCancel.StartDateTime) < cancelableCutoffDate) {
            const err = new Error("Appointment can only be canceled " + allowedCancellationHours + " hours before the appointment!");
            err.code = 400;
            throw err;
        }
     
        //prevent the appointment from trying to cancel if it is already canceled
        if (apptToCancel.ClientUserID == null) {
            const err = new Error("Appointment is already canceled!");
            err.code = 400;
            throw err;
        }

        await DataAccess.cancelAppointment(AppointmentID);

        // Get Service Provider's UserID
        const service = await DataAccess.getServiceByID(apptToCancel.ServiceID);
        const serviceProviderUserID = service.UserID;

        // Format StartDateTime
        const startDateTime = new Date(apptToCancel.StartDateTime);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const startDateTimeString = startDateTime.toLocaleString('en-US', options);

        notificationServiceInstance.createNotification({
            UserID: serviceProviderUserID,
            NotificationTitle: "Appointment Canceled",
            NotificationMessage: "Your appointment \"" + apptToCancel.AppointmentTitle + "\" for " + startDateTimeString + " has been canceled.",
            NotificationDate: new Date(),
            NotificationType: "Appointment"
        });
    }

    async cancelAllAppointments(UserID) {
        const appointments = await DataAccess.getAppointmentsByUserId(UserID);
        for(const appointment of appointments) {
            await this.cancelAppointment(appointment, UserID);
        }
    }

    async deleteAllAppointmentsByServiceID(ServiceID) {
        // Get all appointments for a service provider to notify client
        const appointments = await DataAccess.getAllAppointmentSlotsForProvider(ServiceID)
        for(const appointment of appointments) {
            this.deleteAppointment(appointment);
        }
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

    async getAppointmentsInRange(filterStartDate, filterEndDate) {
        return await DataAccess.getAppointmentsInRange(filterStartDate, filterEndDate);
    }

    async modifyAppointment({AppointmentID, StartDateTime, EndDateTime, AppointmentTitle}) {
        if(!StartDateTime || !EndDateTime || !AppointmentID) {
            const err = new Error('Missing required fields for appointment creation!');
            err.code = 400;
            throw err;
        } else if (AppointmentTitle === '') {
            const err = new Error('Appointment Title Cannot Be Empty!');
            err.code = 400;
            throw err;
        } else if (new Date(StartDateTime) < new Date()) {
            const err = new Error('Appointment Must Be In The Future!');
            err.code = 400;
            throw err;
        }

        await DataAccess.modifyAppointment(AppointmentID, StartDateTime, EndDateTime, AppointmentTitle);
    }

    #appointmentsToTrends(appointments) {
        let appointmentTrends = [0, 0, 0, 0, 0, 0, 0]
        for (let i = 0; i < appointments.length; i++) {
            let day = new Date(appointments[i].StartDateTime).getDay();
            console.log(day);
            appointmentTrends[day] = appointmentTrends[day] + 1;
        }
        return appointmentTrends;
    }
    
    async getAppointmentTrends(ServiceProviderUserID, StartDateTime, EndDateTime) {
        const service = await DataAccess.getServiceIDByUserID(ServiceProviderUserID);
        const appointments = await DataAccess.getAppointmentsInTimeFrame(service.ServiceID, StartDateTime, EndDateTime);
        return this.#appointmentsToTrends(appointments);
    }

    async getAllServiceProviders() {
        return await DataAccess.getAllServiceProviders();
    }
}


const appointmentServiceInstance = Object.freeze(new AppointmentService());
module.exports = appointmentServiceInstance;