import axios from 'axios';
import { API_URL, handleAPIErrorWithMessage } from '../../api';

export default {
    async deleteProfile(context) {
        context.commit('setIsPageLoading', true, { root: true })

        try {
            const token = (context.rootGetters['auth/token']);
            const profile = context.rootGetters['auth/loggedProfile'];
            
            await axios.delete(`${API_URL}/profiles/${profile.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            context.commit('setIsPageLoading', false, { root: true });
        }
        catch (error) {
            handleAPIErrorWithMessage(error);
        }        
    }
};