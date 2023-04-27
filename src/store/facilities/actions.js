import axios from 'axios';
import { API_URL, handleAPIError } from '../../api';

export default {
    async getFacilityByProfile(context, payload) {
        context.commit('setIsPageLoading', true, { root: true })

        try {
            const response = await axios.get(`${API_URL}/facilities/byProfile/${payload.profileId}`);
            context.commit('setFacility', response.data);
            context.commit('setIsPageLoading', false, { root: true });
        }
        catch (error) {
            handleAPIError(error);
        }        
    },
    async updateFacility(context, payload) {
        context.commit('setIsPageLoading', true, { root: true })

        try {
            const response = await axios.put(`${API_URL}/facilities`, {
                id: payload.facilityId,
                shortName: payload.shortName,
                name: payload.name,
                taxIdentificationNumber: payload.taxIdentificationNumber
            });

            context.commit('setFacility', response.data);
            context.commit('setIsPageLoading', false, { root: true });
        }
        catch (error) {
            context.commit('setIsPageLoading', false, { root: true });
            handleAPIError(error);
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
            handleAPIError(error);
        }        
    },
};