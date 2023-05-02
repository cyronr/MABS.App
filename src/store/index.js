import { createStore } from "vuex";

 import doctorsModule from "./doctors";
 import facilitiesModule from "./facilities";
 import authModule from "./auth";

// import requestsModule from "./modules/requests";
// import authModule from "./modules/auth";

const store = createStore({
    modules: {
        doctors: doctorsModule,
        facilities: facilitiesModule,
        auth: authModule
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