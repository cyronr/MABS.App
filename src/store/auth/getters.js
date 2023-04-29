import { ProfileType } from '../../consts'

export default {
    isLogged(state) {
        return !!state.token && !!state.loggedProfile;
    },
    loggedProfile(state) {
        return state.loggedProfile;
    },
    isFacilityProfile(state) {
        return state.loggedProfile.profileType === ProfileType.Facility;
    },
    isPatientProfile(state) {
        return state.loggedProfile.profileType === ProfileType.Patient;
    },
    token(state) {
        return state.token;
    }
};