export default {
    isLogged(state) {
        return !!state.token && !!state.loggedProfile;
    },
    loggedProfile(state) {
        return state.loggedProfile;
    },
    token(state) {
        return state.token;
    }
};