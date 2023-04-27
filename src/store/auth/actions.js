import axios from 'axios';
import { API_URL, handleAPIError } from '../../api';

export default {
    async login(context, payload) {
        try {
            context.commit('setIsPageLoading', true, { root: true })

            const response = await axios.post(`${API_URL}/auth/login`, {
                email: payload.email,
                password: payload.password
            });
            
            context.dispatch('authenticate', response);
            context.commit('setIsPageLoading', false, { root: true })
        }
        catch (error) {
            context.commit('setIsPageLoading', false, { root: true })
            handleAPIError(error);
        }
    },
    async registerPatient(context, payload) {
        try {
            context.commit('setIsPageLoading', true, { root: true })

            const response = await axios.post(`${API_URL}/auth/register/patient`, {
                email: payload.email,
                password: payload.password,
                phoneNumber: payload.phone,
                firstname: payload.firstName,
                lastname: payload.lastName
            });
            
            context.dispatch('authenticate', response);
            context.commit('setIsPageLoading', false, { root: true })
        }
        catch (error) {
            context.commit('setIsPageLoading', false, { root: true })
            handleAPIError(error);
        }
    },
    async registerFacility(context, payload) {
        try {
            context.commit('setIsPageLoading', true, { root: true })

            const response = await axios.post(`${API_URL}/auth/register/facility`, {
                email: payload.email,
                password: payload.password,
                phoneNumber: payload.phone,
                facility: {
                    shortName: payload.shortName,
                    name: payload.name,
                    taxIdentificationNumber: payload.taxIdentificationNumber,
                    address: {
                        name: payload.addressName,
                        streetTypeId: payload.streetType,
                        streetName: payload.streetName,
                        houseNumber: payload.houseNumber,
                        flatNumber: payload.flatNumber,
                        city: payload.city,
                        postalCode: payload.postalCode,
                        countryId: 'PL'
                    }
                }
            });
            
            context.dispatch('authenticate', response);
            context.commit('setIsPageLoading', false, { root: true })
        }
        catch (error) {
            context.commit('setIsPageLoading', false, { root: true })
            handleAPIError(error);
        }
    },
    authenticate(context, payload) {
        const token = payload.data.token;
        const profile = payload.data.profile;

        localStorage.setItem('token', token);
        localStorage.setItem('profile', JSON.stringify(profile));
        context.commit('setToken', { token: token });
        context.commit('setloggedProfile', profile);
    },
    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('profile');

        context.commit('setToken', { token: null });
        context.commit('setloggedProfile', null);
    },
    autoLogin(context) {
        const token = localStorage.getItem('token');
        const profile = JSON.parse(localStorage.getItem('profile'));

        context.commit('setToken', { token: token });
        context.commit('setloggedProfile', profile);
    }
};