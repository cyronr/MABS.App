<template>
    <base-page>
        <div class="page-content" v-if="pageLoaded">
            <single-appointment :appointment="appointment" @cancel-appointment="cancel" @confirm-appointment="confirm"></single-appointment>
        </div>
    </base-page>
</template>

<script>
import axios from 'axios';
import { API_URL, handleAPIErrorWithMessage } from '../../api';
import SingleAppointment from '../../components/appointments/SingleAppointment.vue';

export default {
    props: ['id'],
    components: {
        SingleAppointment
    },  
    data() {
        return {
            appointment: null,

            pageLoaded: false
        }
    },
    computed: {
        authToken() {
            return this.$store.getters['auth/token'];
        }
    },
    methods: {
        async fetchAppointment() {
            this.appointment = null;
            this.$store.commit('setIsPageLoading', true, { root: true })

            try {
                const response = await axios.get(`${API_URL}/appointments/${this.id}`, {
                    headers: { Authorization: `Bearer ${this.authToken}` }
                });

                this.appointment = response.data;

                this.$store.commit('setIsPageLoading', false, { root: true });
            }
            catch (error) {
                handleAPIErrorWithMessage(error);
            } 
        },
        async cancel(appointmentId) {
            this.$store.commit('setIsPageLoading', true, { root: true })
            try {
                const response = await axios.post(`${API_URL}/appointments/${appointmentId}/cancel`, {}, {
                    headers: { Authorization: `Bearer ${this.authToken}` }
                });

                this.appointment = response.data;

                this.$store.commit('setIsPageLoading', false, { root: true });
            }
            catch (error) {
                handleAPIErrorWithMessage(error);
            } 
        },
        async confirm(appointment) {
            this.$store.commit('setIsPageLoading', true, { root: true });
            try {
                const response = await axios.post(`${API_URL}/appointments/${appointment.appointmentId}/confirm`, {
                    params: {
                        confirmationCode: appointment.cofirmationCode
                    }
                },   
                {
                    headers: { Authorization: `Bearer ${this.authToken}` }
                });

                this.appointment = response.data;

                this.$store.commit('setIsPageLoading', false, { root: true });
            }
            catch (error) {
                handleAPIErrorWithMessage(error);
            }
        }
    },
    async beforeMount() {
        await this.fetchAppointment();

        this.pageLoaded = true;
    }
}
</script>