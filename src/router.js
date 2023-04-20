import { createRouter, createWebHistory } from "vue-router";

// import store from './store/index.js';

import MainPage from './pages/MainPage.vue';
import LoginPage from './pages/LoginPage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: MainPage },
        { path: '/login', component: LoginPage },
        { path: '/register', component: RegisterPage },
        // { path: '/coaches', component: CoachesList },
        // { 
        //     path: '/coaches/:id', 
        //     component: CoachDetail, 
        //     props: true,
        //     children: [
        //         { path: 'contact', component: ContactCoach },
        //     ]
        // },
        // { path: '/register', component: CoachRegister, meta: { requiresAuth: true } },
        // { path: '/requests', component: RequestsReceived, meta: { requiresAuth: true } },
        // { path: '/auth', component: UserAuth, meta: { requiresUnAuth: true } },
        { path: '/:notFound(.*)', component: NotFound }
    ]
});

// router.beforeEach(function(to, from, next) {
//     if (to.meta.requiresAuth && !store.getters.isAuth) {
//         next('/auth');
//     }
//     else if (to.meta.requiresUnAuth && store.getters.isAuth) {
//         next('/coaches');
//     }
//     else {
//         next();
//     }
// });

export default router;