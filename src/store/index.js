import { createStore } from "vuex";

 import doctorsModule from "./doctors";
 import facilitiesModule from "./facilities";

// import requestsModule from "./modules/requests";
// import authModule from "./modules/auth";

const store = createStore({
    modules: {
        doctors: doctorsModule,
        facilities: facilitiesModule
        // requests: requestsModule,
        // auth: authModule
    }
});

export default store;