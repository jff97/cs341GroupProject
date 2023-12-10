import api from './api';

const APPOINTMENT_ENDPOINT = '/api/appointment/';

const appointmentService = {
    getAllAppointmentSlotsForProvider: async (UserID) => {
        return await api
            .get(APPOINTMENT_ENDPOINT + "/provider", {
                params: {
                    UserID: UserID
                }
            })
            .then((response) => {
                return response.data;
            });
    },

    createNewAppointmentSlot: async (StartDateTime, EndDateTime, UserID, AppointmentTitle ) => {
        return await api
            .post(APPOINTMENT_ENDPOINT + "/create", {
                AppointmentTitle: AppointmentTitle,
                StartDateTime: StartDateTime,
                EndDateTime: EndDateTime,
                UserID: UserID
            })
            .then((response) => {
                return response.data;
            });
    },

    modifyAppointmentSlot: async (AppointmentID, StartDateTime, EndDateTime, UserID, AppointmentTitle) => {
        return await api
            .put(APPOINTMENT_ENDPOINT + "/modify", {
                AppointmentID: AppointmentID,
                AppointmentTitle: AppointmentTitle,
                StartDateTime: StartDateTime,
                EndDateTime: EndDateTime,
                UserID: UserID
            })
            .then((response) => {
                return response.data;
            });
    },

    deleteAppointmentSlot: async (AppointmentID) => {
        return await api
            .delete(APPOINTMENT_ENDPOINT + "/delete", {
                params: {
                    AppointmentID: AppointmentID
                }
            }).then((response) => {
                return response.data;
            });
    },

    getAvailableAppointments: async (ProviderID) => {
        return await api
            .get(APPOINTMENT_ENDPOINT + "/available")
            .then((response) => {
                return response.data;
            });
    },
    getAppointmentTrends: async (ProviderID, StartDateTime, EndDateTime) => {
        return await api
            .get(APPOINTMENT_ENDPOINT + "/trends", {
                params: {
                    ProviderID: ProviderID,
                    StartDateTime: StartDateTime,
                    EndDateTime: EndDateTime
                }
            })
            .then((response) => {
                return response.data;
            });
    },
    getAppointmentProviders: async () => {
        return await api
            .get(APPOINTMENT_ENDPOINT + "/adminTrends", {

            })
            .then((response) => {
                return response.data;
            });
    },
    bookAppointment: async (AppointmentID, ClientUserID) => {
        return await api
            .put(APPOINTMENT_ENDPOINT + "/book", {
                AppointmentID: AppointmentID,
                ClientUserID: ClientUserID
            })
            .then((response) => {
                return response.data;
            });
    },
    unBookAppointment: async (AppointmentID) => {
        return await api
            .put(APPOINTMENT_ENDPOINT + "/cancel", {
                AppointmentID: AppointmentID
            })
            .then((response) => {
                return response.data;
            });
    },

    getUsersAppointments: async (UserID) => {
        return await api
            .get(APPOINTMENT_ENDPOINT + "/usersAppointments", {
                params: {
                    UserID: UserID
                }
            })
            .then((response) => {
                return response.data;
            });
    },

    getAppointmentsInRange: async (filterStartDate, filterEndDate) => {
        return await api 
            .get(APPOINTMENT_ENDPOINT + '/systemAppointments', {
                params: {
                    filterStartDate: filterStartDate.set('second', 0).set('minute', 0).set('hour', 0),
                    filterEndDate:   filterEndDate.set('second', 59).set('minute', 59).set('hour', 23)
                }
            })
    }
}

export default appointmentService;