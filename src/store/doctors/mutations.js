export default {
    setDoctors(state, payload) {
        state.doctors = payload;
    },
    setSpecialties(state, payload) {
        state.specialties = payload;
    },
    setTitles(state, payload) {
        state.titles = payload;
    },
    setCities(state, payload) {
        state.cities = payload;
    },
    setPaginationParams(state, payload) {
        state.paginationParams = payload;
    }
};