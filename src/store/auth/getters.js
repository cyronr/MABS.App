import { ProfileType } from '../../consts'

export default {
    isLogged(state) {
        return !!state.token && !!state.loggedProfile;
    },
    loggedProfile(state) {
        return state.loggedProfile;
    },
    isFacilityProfile(state) {
        if (state.loggedProfile) {
            return state.loggedProfile.profileType === ProfileType.Facility;
        }
        else {
            return false;
        }
    },
    isPatientProfile(state) {
        if (state.loggedProfile) {
            return state.loggedProfile.profileType === ProfileType.Patient;
        }
        else {
            return false;
        }
    },
    token(state) {
        return state.token;
    }
};