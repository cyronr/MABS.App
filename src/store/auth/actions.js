import axios from 'axios';
import { API_URL, handleAPIError } from '../../api';

export default {
    async login(context, payload) {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                email: payload.email,
                password: payload.password
            });
            
            const token = response.data.token;
            const profile = response.data.profile;

            localStorage.setItem('token', token);
            localStorage.setItem('profile', JSON.stringify(profile));
            context.commit('setToken', { token: token });
            context.commit('setloggedProfile', profile);

            console.log(profile);
        }
        catch (error) {
            handleAPIError(error);
        }
    },
    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('profile');

        console.log('logout');

        context.commit('setToken', { token: null });
        context.commit('setloggedProfile', null);
    },
    autoLogin(context) {
        const token = localStorage.getItem('token');
        const profile = JSON.parse(localStorage.getItem('profile'));

        context.commit('setToken', { token: token });
        context.commit('setloggedProfile', profile);
    },
    async registerPatient(context) {
        console.log(context);
    }
};