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
    cities(state) {
        return state.cities;
    },
    paginationParams(state) {
        return state.paginationParams;
    }
};