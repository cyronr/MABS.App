import { createRouter, createWebHistory } from "vue-router";

import store from './store/index.js';

import MainPage from './pages/MainPage.vue';
import LoginPage from './pages/LoginPage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import ProfilePage from './pages/ProfilePage.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { 
            path: '/', 
            component: MainPage 
        },
        { 
            path: '/login', 
            component: LoginPage,
            meta: { requiresUnAuth: true } 
        },
        { 
            path: '/register', 
            component: RegisterPage,
            meta: { requiresUnAuth: true } 
        },
        { 
            path: '/profile', 
            component: ProfilePage,
            meta: { requiresAuth: true }
        },
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

router.beforeEach(function(to, from, next) {
    if (to.meta.requiresAuth && !store.getters['auth/isLogged']) {
        next('/login');
    }
    else if (to.meta.requiresUnAuth && store.getters['auth/isLogged']) {
        next('/notFound');
    }
    else {
        next();
    }
});

export default router;