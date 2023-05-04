export default {
    setAppointments(state, payload) {
        state.appointments = payload;
    },
    setAppointment(state, payload) {
        state.appointment = payload;
    },
    setPaginationParams(state, payload) {
        state.paginationParams = payload;
    }
};