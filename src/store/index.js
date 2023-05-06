import { createStore } from "vuex";

import doctorsModule from "./doctors";
import facilitiesModule from "./facilities";
import authModule from "./auth";
import patientModule from "./patients";
import appointmentsModule from "./appointments";
import profileModule from "./profile";

const store = createStore({
    modules: {
        doctors: doctorsModule,
        facilities: facilitiesModule,
        auth: authModule,
        patients: patientModule,
        appointments: appointmentsModule,
        profile: profileModule
    },
    state() {
        return {
            isPageLoading: false,
            errorMessage: null
        }
    },
    getters: {
        isPageLoading(state) {
            return state.isPageLoading;
        },
        errorMessage(state) {
            return state.errorMessage;
        }
    },
    mutations: {
        setIsPageLoading(state, payload) {
            state.isPageLoading = payload;
        },
        setErrorMessage(state, payload) {
            state.errorMessage = payload;
        }
    }
});

export default store;