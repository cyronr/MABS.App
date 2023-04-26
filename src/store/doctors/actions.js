import axios from 'axios';
import { API_URL, API_SUCCESS_RESPONSE_CODES } from '../../api';

export default {
    async searchDoctors(context, payload) {
        context.commit('setIsPageLoading', true, { root: true })
        context.commit('setDoctors', []);

        const response = await axios.get(`${API_URL}/doctors/search`, {
            params: {
                PageNumber: payload.pageNumber,
                PageSize: payload.pageSize,
                searchText: payload.text,
                specialtyId: payload.specialty,
                cityId: payload.city
            }
        });

        if (!API_SUCCESS_RESPONSE_CODES.includes(response.status)) {
            context.commit('setIsPageLoading', false, { root: true })
            throw new Error(response.statusText || 'Failed to fetch!');
        }

        context.commit('setDoctors', response.data)
        context.commit('setPaginationParams', JSON.parse(response.headers['x-pagination']))
        context.commit('setIsPageLoading', false, { root: true })
    },
    async getSpecialties(context) {
        context.commit('setIsPageLoading', true, { root: true })

        const response = await axios.get(`${API_URL}/doctors/dictonaries/specialties`);

        if (!API_SUCCESS_RESPONSE_CODES.includes(response.status)) {
            context.commit('setIsPageLoading', false, { root: true })
            throw new Error(response.statusText || 'Failed to fetch!');
        }

        context.commit('setSpecialties', response.data)
        context.commit('setIsPageLoading', false, { root: true })
    },
    async getCities(context) {
        context.commit('setIsPageLoading', true, { root: true })

        const response = await axios.get(`${API_URL}/dict/cities`);

        if (!API_SUCCESS_RESPONSE_CODES.includes(response.status)) {
            context.commit('setIsPageLoading', false, { root: true })
            throw new Error(response.statusText || 'Failed to fetch!');
        }

        context.commit('setCities', response.data)
        context.commit('setIsPageLoading', false, { root: true })
    }
};