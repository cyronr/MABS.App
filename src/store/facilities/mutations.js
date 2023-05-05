export default {
    setFacility(state, payload) {
        state.facility = payload;
    },
    setAddresses(state, payload) {
        state.addresses = payload;
    },
    setDoctors(state, payload) {
        state.doctors = payload;
    },
    setStreetTypes(state, payload) {
        state.streetTypes = payload;
    },
    setPaginationParams(state, payload) {
        state.paginationParams = payload;
    }
};