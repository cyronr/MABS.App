import { createStore } from "vuex";

 import doctorsModule from "./doctors";
// import requestsModule from "./modules/requests";
// import authModule from "./modules/auth";

const store = createStore({
    modules: {
        doctors: doctorsModule,
        // requests: requestsModule,
        // auth: authModule
    }
});

export default store;