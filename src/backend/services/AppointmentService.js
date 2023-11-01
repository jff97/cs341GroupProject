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

        // Get Service ID from UserID
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
        await DataAccess.deleteAppointment(AppointmentID);
    }

    async bookAppointment({AppointmentID, ClientUserID}) {
        
        //check if user allready has an appointment overlapping
        const possibleAppt = await DataAccess.getApptByApptID(AppointmentID);
        const appointments = await DataAccess.getAppointmentsByUserId(ClientUserID);
        //console.log(possibleAppt)
        //console.log(appointments)
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
        //return appointment1.StartDateTime <= appointment2.EndDateTime && appointment1.EndDateTime >= appointment2.StartDateTime
        let oneIntwo = this.#isInRange(appointment1.StartDateTime, appointment2) || this.#isInRange(appointment1.EndDateTime, appointment2);
        console.log("one in two = " + oneIntwo)
        let twoInone = this.#isInRange(appointment2.StartDateTime, appointment1) || this.#isInRange(appointment2.EndDateTime, appointment1);
        console.log("two in one = " + twoInone)
        return oneIntwo || twoInone;
    }
    #isInRange(date, appointment) {
        const start = appointment.StartDateTime.getTime();
        const end = appointment.EndDateTime.getTime();
        date = date.getTime();
        //log all three dates with lables
        console.log("date  = " + date)
        console.log("start = " + start)
        console.log("end   = " + end)
        return start <= date && date <= end;
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