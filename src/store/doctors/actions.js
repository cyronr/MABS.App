import axios from 'axios';
import { API_URL, API_SUCCESS_RESPONSE_CODES } from '../../consts';

export default {
    async searchDoctors(context, payload) {
        context.commit('setDoctors', []);

        const response = await axios.get(`${API_URL}/doctors`, {
            params: {
                PageNumber: payload.pageNumber,
                PageSize: payload.pageSize,
                searchText: payload.text
            }
        });

        if (!API_SUCCESS_RESPONSE_CODES.includes(response.status)) {
            throw new Error(response.statusText || 'Failed to fetch!');
        }

        context.commit('setDoctors', response.data)
        context.commit('setPaginationParams', JSON.parse(response.headers['x-pagination']))
    },
    async getSpecialties(context) {
        const response = await axios.get(`${API_URL}/doctors/dictonaries/specialties`);

        if (!API_SUCCESS_RESPONSE_CODES.includes(response.status)) {
            throw new Error(response.statusText || 'Failed to fetch!');
        }

        context.commit('setSpecialties', response.data)
    }
};