import axios from 'axios';
import { API_URL, handleAPIError, handleAPIErrorWithMessage } from '../../api';

export default {
    async getPatient(context) {
        context.commit('setIsPageLoading', true, { root: true })

        try {
            const token = (context.rootGetters['auth/token']);
            const profile = context.rootGetters['auth/loggedProfile'];

            const response = await axios.get(`${API_URL}/patients/byProfile/${profile.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            context.commit('setPatient', response.data);
            context.commit('setIsPageLoading', false, { root: true });
        }
        catch (error) {
            handleAPIErrorWithMessage(error);
        }
    },
    async updatePatient(context, payload) {
        context.commit('setIsPageLoading', true, { root: true })

        try {
            const token = (context.rootGetters['auth/token']);
            const response = await axios.put(`${API_URL}/patients`, {
                id: payload.patientId,
                firstname: payload.firstName,
                lastname: payload.lastName
            },
                {
                    headers: { Authorization: `Bearer ${token}` }
                });

            context.commit('setPatient', response.data);
            context.commit('setIsPageLoading', false, { root: true });
        }
        catch (error) {
            context.commit('setIsPageLoading', false, { root: true });
            handleAPIError(error);
        }
    }
};