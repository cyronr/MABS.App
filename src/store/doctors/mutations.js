export default {
    setDoctors(state, payload) {
        state.doctors = payload;
    },
    setSpecialties(state, payload) {
        state.specialties = payload;
    },
    setPaginationParams(state, payload) {
        state.paginationParams = payload;
    },
};