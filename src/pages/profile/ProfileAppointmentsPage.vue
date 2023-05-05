<template>
    <div v-if="pageLoaded">
        <div class="list">
            <single-appointment v-for="appointment in appointments" :key="appointment.id"
                :appointment="appointment"
                @cancel-appointment="cancel" 
                @confirm-appointment="confirm"
            >
            </single-appointment>
        </div>
        <div v-if="showPagination" class="pagination">
            <base-pagination
                :currentPage="paginationParams.CurrentPage"
                :totalPages="paginationParams.TotalPages"
                :pageSize="paginationParams.PageSize"
                :totalCount="paginationParams.TotalCount"
                @page-changed="changePage"
            >
            </base-pagination>
        </div>
    </div>
</template>

<script>
import SingleAppointment from '../../components/appointments/SingleAppointment.vue';

export default {
    components: {
        SingleAppointment
    },
    data() {
        return {
            pageLoaded: false
        }
    },
    computed: {
        patient() {
            return this.$store.getters['patients/patient'];
        },
        appointments() {
            return this.$store.getters['appointments/appointments'];
        },
        paginationParams() {
            return this.$store.getters['appointments/paginationParams'];
        },
        showPagination() {
            return this.appointments.length > 0;
        },
    },
    methods: {
        async fetchAppointments(pageNumer = 1, pageSize = 5) {
            await this.$store.dispatch('appointments/getByPatient', { 
                id: this.patient.id,
                pageNumber: pageNumer,
                pageSize: pageSize
            });
        },
        async cancel(appointmentId) {
            await this.$store.dispatch('appointments/cancel', { 
                id: appointmentId
            });
            await this.fetchAppointments();
        },
        async confirm(appointment) {
            await this.$store.dispatch('appointments/confirm', { 
                id: appointment.appointmentId,
                confirmationCode: appointment.confirmationCode
            });
            await this.fetchAppointments();
        },
        async changePage(page) {
            await this.fetchAppointments(page, this.paginationParams.PageSize);
        },
    },
    async beforeMount() {
        await this.fetchAppointments();

        this.pageLoaded = true;
    }
}
</script>