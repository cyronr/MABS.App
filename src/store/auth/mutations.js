export default {
    setToken(state, payload) {
        state.token = payload.token;
    },
    setloggedProfile(state, payload) {
        state.loggedProfile = payload;
    }
};