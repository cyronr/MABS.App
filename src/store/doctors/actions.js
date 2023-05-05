import axios from 'axios';
import { API_URL, handleAPIError } from '../../api';

export default {
    async searchDoctors(context, payload) {
        context.commit('setIsPageLoading', true, { root: true });
        context.commit('setDoctors', []);

        try {
            const response = await axios.get(`${API_URL}/doctors/search`, {
                params: {
                    PageNumber: payload.pageNumber,
                    PageSize: payload.pageSize,
                    searchText: payload.text,
                    specialtyId: payload.specialty,
                    cityId: payload.city
                }
            });

            context.commit('setDoctors', response.data);
            context.commit('setPaginationParams', JSON.parse(response.headers['x-pagination']));
            context.commit('setIsPageLoading', false, { root: true });
        }
        catch (error) {
            handleAPIError();
        } 
    },
    async getSpecialties(context) {
        context.commit('setIsPageLoading', true, { root: true })

        try {
            const response = await axios.get(`${API_URL}/doctors/dict/specialties`);

            context.commit('setSpecialties', response.data);
            context.commit('setIsPageLoading', false, { root: true });
        }
        catch (error) {
            handleAPIError();
        }        
    },
    async getTitles(context) {
        context.commit('setIsPageLoading', true, { root: true })

        try {
            const response = await axios.get(`${API_URL}/doctors/dict/titles`);

            context.commit('setTitles', response.data);
            context.commit('setIsPageLoading', false, { root: true });
        }
        catch (error) {
            handleAPIError();
        }        
    },
    async getCities(context) {
        context.commit('setIsPageLoading', true, { root: true })

        try {
            const response = await axios.get(`${API_URL}/dict/cities`);

            context.commit('setCities', response.data)
            context.commit('setIsPageLoading', false, { root: true });
        }
        catch (error) {
            handleAPIError();
        } 
    }
};