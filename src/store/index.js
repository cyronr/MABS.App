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
        // requests: requestsModule,
        // auth: authModule
    }
});

export default store;