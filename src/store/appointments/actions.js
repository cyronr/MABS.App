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
            context.commit('setPaginationParams', JSON.parse(response.headers['x-pagination']))
            context.commit('setIsPageLoading', false, { root: true })
        }
        catch (error) {
            handleAPIErrorWithMessage(error);
        }
    },
    async getByAddress(context, payload) {
        context.commit('setIsPageLoading', true, { root: true })

        try {
            const token = (context.rootGetters['auth/token']);
            const response = await axios.get(`${API_URL}/appointments/address/${payload.id}`, {
                params: {
                    PageNumber: payload.pageNumber,
                    PageSize: payload.pageSize
                },
                headers: { Authorization: `Bearer ${token}` }
            });


            context.commit('setAppointments', response.data);
            context.commit('setPaginationParams', JSON.parse(response.headers['x-pagination']));

            context.commit('setIsPageLoading', false, { root: true });
        }
        catch (error) {
            handleAPIErrorWithMessage(error);
        }
    },
    async getByDoctor(context, payload) {
        context.commit('setIsPageLoading', true, { root: true });

        try {
            const token = (context.rootGetters['auth/token']);
            const response = await axios.get(`${API_URL}/appointments/doctor/${payload.id}`, {
                params: {
                    PageNumber: payload.pageNumber,
                    PageSize: payload.pageSize
                },
                headers: { Authorization: `Bearer ${token}` }
            });

            context.commit('setAppointments', response.data);
            context.commit('setPaginationParams', JSON.parse(response.headers['x-pagination']));

            context.commit('setIsPageLoading', false, { root: true });
        }
        catch (error) {
            handleAPIErrorWithMessage(error);
        }
    },
    async getByDoctorAndAddress(context, payload) {
        context.commit('setIsPageLoading', true, { root: true });

        try {
            const token = (context.rootGetters['auth/token']);
            const response = await axios.get(`${API_URL}/appointments/doctor/${payload.doctorId}/address/${payload.addressId}`, {
                params: {
                    PageNumber: payload.pageNumber,
                    PageSize: payload.pageSize
                },
                headers: { Authorization: `Bearer ${token}` }
            });

            context.commit('setAppointments', response.data);
            context.commit('setPaginationParams', JSON.parse(response.headers['x-pagination']));

            context.commit('setIsPageLoading', false, { root: true });
        }
        catch (error) {
            handleAPIErrorWithMessage(error);
        }
    },
    async clearAppointments(context) {
        context.commit('setAppointments', []);
    },
    async create(context, payload) {
        context.commit('setIsPageLoading', true, { root: true });

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
            const response = await axios.post(`${API_URL}/appointments/${payload.id}/confirm`, null, {
                params: { confirmationCode: payload.confirmationCode },
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
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