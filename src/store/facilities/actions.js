import axios from 'axios';
import { API_URL, API_SUCCESS_RESPONSE_CODES } from '../../consts';

export default {
    async getFacilities(context) {
        const response = await axios.get(`${API_URL}/doctors/dictonaries/specialties`);

        if (!API_SUCCESS_RESPONSE_CODES.includes(response.status)) {
            throw new Error(response.statusText || 'Failed to fetch!');
        }

        context.commit('setSpecialties', response.data)
    }
};