export default {
    setDoctors(state, payload) {
        state.doctors = payload;
    },
    setSpecialties(state, payload) {
        state.specialties = payload;
    },
    setCities(state, payload) {
        state.cities = payload;
    },
    setPaginationParams(state, payload) {
        state.paginationParams = payload;
    },
};