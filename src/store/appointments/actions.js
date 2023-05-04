import axios from 'axios';
import { API_URL, handleAPIErrorWithMessage } from '../../api';

export default {
    async getById(context, payload) {
        context.commit('setIsPageLoading', true, { root: true })

        try {
            const token = (context.rootGetters['auth/token']);
            const response = await axios.get(`${API_URL}/appointments/${payload.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            context.commit('setAppointment', response.data);
            context.commit('setIsPageLoading', false, { root: true })
        }
        catch (error) {
            handleAPIErrorWithMessage(error);
        }       
    },
    async getByPatient(context, payload) {
        context.commit('setIsPageLoading', true, { root: true })

        try {
            const token = (context.rootGetters['auth/token']);
            const response = await axios.get(`${API_URL}/appointments/patient/${payload.id}`, {
                params: {
                    PageNumber: payload.pageNumber,
                    PageSize: payload.pageSize
                },
                headers: { Authorization: `Bearer ${token}` }
            });
            
            context.commit('setAppointments', response.data);
            context.commit('setIsPageLoading', false, { root: true })
        }
        catch (error) {
            handleAPIErrorWithMessage(error);
        }       
    },
    async create(context, payload) {
        context.commit('setIsPageLoading', true, { root: true })

        try {
            const token = (context.rootGetters['auth/token']);
            const response = await axios.post(`${API_URL}/appointments`, {
                patientId: payload.patientId,
                scheduleId: payload.scheduleId,
                date: payload.date,
                time: payload.time
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            });

            context.commit('setAppointment', response.data);
            context.commit('setIsPageLoading', false, { root: true });
        }
        catch (error) {
            handleAPIErrorWithMessage(error);
        }  
    },
    async confirm(context, payload) {
        context.commit('setIsPageLoading', true, { root: true })
        try {
            const token = (context.rootGetters['auth/token']);
            const response = await axios.post(`${API_URL}/appointments/${payload.id}/confirm`, {
                params: {
                    confirmationCode: payload.cofirmationCode
                }
            },   
            {
                headers: { Authorization: `Bearer ${token}` }
            });

            context.commit('setAppointment', response.data);
            context.commit('setIsPageLoading', false, { root: true });
        }
        catch (error) {
            handleAPIErrorWithMessage(error);
        }  
    },
    async cancel(context, payload) {
        context.commit('setIsPageLoading', true, { root: true })

        try {
            const token = (context.rootGetters['auth/token']);
            const response = await axios.post(`${API_URL}/appointments/${payload.id}/cancel`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            context.commit('setAppointment', response.data);
            context.commit('setIsPageLoading', false, { root: true });
        }
        catch (error) {
            handleAPIErrorWithMessage(error);
        }  
    }
};