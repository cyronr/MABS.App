<template>
    <base-page>
        <div class="page-content" v-if="pageLoaded">
            <single-appointment :appointment="appointment" @cancel-appointment="cancel" @confirm-appointment="confirm"></single-appointment>
        </div>
    </base-page>
</template>

<script>
import SingleAppointment from '../../components/appointments/SingleAppointment.vue';

export default {
    props: ['id'],
    components: {
        SingleAppointment
    },  
    data() {
        return {
            pageLoaded: false
        }
    },
    computed: {
        appointment() {
            return this.$store.getters['appointments/appointment'];
        }
    },
    methods: {
        async fetchAppointment() {
            await this.$store.dispatch('appointments/getById', { id: this.id })
        },
        async cancel(appointmentId) {
            await this.$store.dispatch('appointments/cancel', { 
                id: appointmentId
            });
        },
        async confirm(appointment) {
            await this.$store.dispatch('appointments/confirm', { 
                id: appointment.appointmentId,
                confirmationCode: appointment.confirmationCode
            });
        }
    },
    async beforeMount() {
        if (this.appointment === null) {
            await this.fetchAppointment();
        }

        this.pageLoaded = true;
    }
}
</script>