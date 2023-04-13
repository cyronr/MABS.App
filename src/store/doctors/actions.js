import axios from 'axios';

export default {
    async getDoctors(context, payload) {
        const response = await axios.get(`http://localhost:5032/api/doctors?PageNumber=1&PageSize=5&searchText=${payload.text}`);
        
        if (response.status !== 200) {
            throw new Error(response.statusText || 'Failed to fetch!');
        }

        context.commit('setDoctors', response.data)
    }
};