export default {
    doctors(state) {
        return state.doctors;
    },
    doctorsExists(state) {
        return state.doctors.length > 0;
    },
    specialties(state) {
        return state.specialties;
    },
    paginationParams(state) {
        return state.paginationParams;
    }
};