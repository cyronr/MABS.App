import axios from 'axios';
import { API_URL, handleAPIError, handleAPIErrorWithMessage } from '../../api';

export default {
    async getFacility(context) {
        context.commit('setIsPageLoading', true, { root: true });

        try {
            const token = context.rootGetters['auth/token'];
            const profile = context.rootGetters['auth/loggedProfile'];

            const response = await axios.get(`${API_URL}/facilities/byProfile/${profile.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            context.commit('setFacility', response.data);
            context.commit('setIsPageLoading', false, { root: true });
        }
        catch (error) {
            handleAPIError(error);
        }
    },
    async getAddresses(context) {
        const facility = context.getters['facility'];
        context.commit('setAddresses', facility.addresses);
    },
    async getDoctors(context, payload) {
        context.commit('setIsPageLoading', true, { root: true })

        try {
            const facility = context.getters['facility'];
            const token = context.rootGetters['auth/token'];

            const response = await axios.get(`${API_URL}/facilities/${facility.id}/doctors`, {
                params: {
                    PageNumber: payload.pageNumber,
                    PageSize: payload.pageSize
                }
            },
                {
                    headers: { Authorization: `Bearer ${token}` }
                });

            context.commit('setDoctors', response.data);
            context.commit('setPaginationParams', JSON.parse(response.headers['x-pagination']));
            context.commit('setIsPageLoading', false, { root: true });
        }
        catch (error) {
            handleAPIErrorWithMessage(error);
        }
    },
    async getStreetTypes(context) {
        context.commit('setIsPageLoading', true, { root: true })

        try {
            const response = await axios.get(`${API_URL}/facilities/dict/streetTypes`);

            context.commit('setStreetTypes', response.data);
            context.commit('setIsPageLoading', false, { root: true });
        }
        catch (error) {
            handleAPIErrorWithMessage(error);
        }
    },
    async updateFacility(context, payload) {
        context.commit('setIsPageLoading', true, { root: true })

        try {
            const token = (context.rootGetters['auth/token']);
            const response = await axios.put(`${API_URL}/facilities`, {
                id: payload.facilityId,
                shortName: payload.shortName,
                name: payload.name,
                taxIdentificationNumber: payload.taxIdentificationNumber
            },
                {
                    headers: { Authorization: `Bearer ${token}` }
                });

            context.commit('setFacility', response.data);
            context.commit('setIsPageLoading', false, { root: true });
        }
        catch (error) {
            context.commit('setIsPageLoading', false, { root: true });
            handleAPIError(error);
        }
    },
    async addAddress(context, payload) {
        context.commit('setIsPageLoading', true, { root: true })

        try {
            const facility = context.getters['facility'];
            const token = context.rootGetters['auth/token'];

            const response = await axios.post(`${API_URL}/facilities/${facility.id}/addresses`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            context.commit('setAddresses', response.data.addresses);
            context.commit('setIsPageLoading', false, { root: true });
        }
        catch (error) {
            handleAPIErrorWithMessage(error);
        }
    },
    async updateAddress(context, payload) {
        context.commit('setIsPageLoading', true, { root: true })

        try {
            const facility = context.getters['facility'];
            const token = context.rootGetters['auth/token'];

            const response = await axios.put(`${API_URL}/facilities/${facility.id}/addresses`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            context.commit('setAddresses', response.data.addresses);
            context.commit('setIsPageLoading', false, { root: true });
        }
        catch (error) {
            handleAPIErrorWithMessage(error);
        }
    },
    async deleteAddress(context, payload) {
        context.commit('setIsPageLoading', true, { root: true })

        try {
            const facility = context.getters['facility'];
            const token = context.rootGetters['auth/token'];

            const response = await axios.delete(`${API_URL}/facilities/${facility.id}/addresses/${payload.addressId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            context.commit('setAddresses', response.data.addresses);
            context.commit('setIsPageLoading', false, { root: true });
        }
        catch (error) {
            handleAPIErrorWithMessage(error);
        }
    },
    async addDoctor(context, payload) {
        context.commit('setIsPageLoading', true, { root: true })

        try {
            const facility = context.getters['facility'];
            const token = context.rootGetters['auth/token'];

            const response = await axios.post(`${API_URL}/facilities/${facility.id}/doctors/${payload.doctorId}`, null, {
                params: {
                    PageNumber: payload.pageNumber,
                    PageSize: payload.pageSize
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            context.commit('setDoctors', response.data);
            context.commit('setPaginationParams', JSON.parse(response.headers['x-pagination']));
            context.commit('setIsPageLoading', false, { root: true });
        }
        catch (error) {
            handleAPIErrorWithMessage(error);
        }
    },
    async deleteDoctor(context, payload) {
        context.commit('setIsPageLoading', true, { root: true })

        try {
            const facility = context.getters['facility'];
            const token = context.rootGetters['auth/token'];

            const response = await axios.delete(`${API_URL}/facilities/${facility.id}/doctors/${payload.doctorId}`, {
                params: {
                    PageNumber: payload.pageNumber,
                    PageSize: payload.pageSize
                },
                headers: { Authorization: `Bearer ${token}` }
            });

            context.commit('setDoctors', response.data);
            context.commit('setPaginationParams', JSON.parse(response.headers['x-pagination']));
            context.commit('setIsPageLoading', false, { root: true });
        }
        catch (error) {
            handleAPIErrorWithMessage(error);
        }
    }
};