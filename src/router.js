import { createRouter, createWebHistory } from "vue-router";

import store from './store/index.js';

import MainPage from './pages/MainPage.vue';
import LoginPage from './pages/auth/LoginPage.vue';
import RegisterPage from './pages/auth/RegisterPage.vue';
import ProfilePage from './pages/profile/ProfilePage.vue';
import ProfileDataPage from './pages/profile/ProfileDataPage.vue';
import ProfileDoctorsPage from './pages/profile/ProfileDoctorsPage.vue';
import ProfileAddressesPage from './pages/profile/ProfileAddressesPage.vue';
import ProfileAppointmentsPage from './pages/profile/ProfileAppointmentsPage.vue';
import DoctorPage from './pages/doctors/DoctorPage.vue';
import AppointmentPage from './pages/appointments/AppointmentPage.vue';
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
            path: '/profile/:id', 
            component: ProfilePage,
            props: true,
            meta: { requiresAuth: true },
            children: [
                { 
                    path: '', 
                    component: ProfileDataPage,
                    meta: { requiresAuth: true } 
                },
                { 
                    path: 'doctors', 
                    component: ProfileDoctorsPage,
                    meta: { requiresAuth: true } 
                },
                { 
                    path: 'addresses', 
                    component: ProfileAddressesPage,
                    meta: { requiresAuth: true } 
                },
                { 
                    path: 'appointments', 
                    component: ProfileAppointmentsPage,
                    meta: { requiresAuth: true } 
                }
            ]
        }, 
        { 
            path: '/doctors/:id', 
            component: DoctorPage,
            props: true,
            meta: { requiresAuth: true }
        },
        { 
            path: '/appointments/:id', 
            component: AppointmentPage,
            props: true,
            meta: { requiresAuth: true }
        },
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