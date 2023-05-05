<template>
    <base-page>
        <div class="page">
            <div class="header">
                <base-card :style="headerStyle">
                    <h1>Zaplanowane wizyty</h1>
                </base-card>
            </div>
            <div v-if="pageLoaded" class="filters">
                <base-card>
                    <div class="filter-addresses">
                        <select v-model="selectedAddress" @change="changeFilters">
                            <option :value="null">Wybierz adres</option>
                            <option v-for="address in addresses" :key="address.id" :value="address">
                                {{ address.name }} ({{ address.postalCode }} {{ address.city }}, {{ address.streetName }} {{ address.houseNumber }})
                            </option>
                        </select>
                    </div>
                    <div class="filter-doctors">
                        <select v-model="selectedDoctor" @change="changeFilters">
                            <option :value="null">Wybierz lekarza</option>
                            <option v-for="doctor in doctors" :key="doctor.id" :value="doctor">
                                {{ doctor.firstname }} {{ doctor.lastname }}
                            </option>
                        </select>
                    </div>
                </base-card>
            </div>
            <div v-if="noAppoitmentsForFilter" class="empty-list">
                <p>Brak wizyt dla podanych kryteriów</p>
            </div>
            <div v-if="appointmentsLoaded" class="list">
                <single-appointment v-for="appointment in appointments" :key="appointment.id"
                    :appointment="appointment"
                    @cancel-appointment="cancel" 
                    @confirm-appointment="confirm"
                >
                </single-appointment>
            </div>
            <div v-if="appointmentsLoaded" class="pagination">
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
    </base-page>
</template>

<script>
import SingleAppointment from '../../components/appointments/SingleAppointment.vue';

export default {
    components: {
        SingleAppointment
    },
    data() {
        return {
            selectedAddress: null,
            selectedDoctor: null,

            pageLoaded: false
        }
    },
    computed: {
        headerStyle() {
          return {
            backgroundColor: '#c1caff',
            color: '#333333',
            textAlign: 'center'
          }
        },
        appointments() {
            return this.$store.getters['appointments/appointments'];
        },
        paginationParams() {
            return this.$store.getters['appointments/paginationParams'];
        },
        addresses() {
            return this.$store.getters['facilities/addresses'];
        },
        doctors() {
            return this.$store.getters['facilities/doctors'];
        },
        appointmentsLoaded() {
            return this.appointments.length > 0;
        },
        noAppoitmentsForFilter() {
            return this.appointments.length === 0 && (this.selectedAddress || this.selectedDoctor);
        }
    },
    methods: {
        async fetchAppointments(pageNumer = 1, pageSize = 5) {
            await this.$store.dispatch('appointments/clearAppointments');

            if (this.selectedAddress !== null) {
                await this.fetchAppointmentsByAddress(pageNumer, pageSize);
            }
            else if (this.selectedDoctor !== null) {
                await this.fetchAppointmentsByDoctor(pageNumer, pageSize);
            }
        },
        async fetchAppointmentsByDoctor(pageNumer = 1, pageSize = 5) {
            await this.$store.dispatch('appointments/getByDoctor', { 
                id: this.selectedDoctor.id,
                pageNumber: pageNumer,
                pageSize: pageSize
            });
        },
        async fetchAppointmentsByAddress(pageNumer = 1, pageSize = 5) {
            await this.$store.dispatch('appointments/getByAddress', { 
                id: this.selectedAddress.id,
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
        async changeFilters() {
            this.fetchAppointments();
        },
        async changePage(page) {
            await this.fetchAppointments(page, this.paginationParams.PageSize);
        },
    },
    async beforeMount() {
        await this.$store.dispatch('facilities/getAddresses')
        await this.$store.dispatch('facilities/getDoctors', { 
            pageNumber: 1,
            pageSize: 100
        })

        this.pageLoaded = true;
    }
}
</script>

<style scoped>
.filters div {
    display: flex;
    flex-direction: row;
    justify-content: center; 
}

.filter-addresses,
.filter-doctors {
  flex-basis: 50%;
}

select {
    border: none;
    background-color: #fff;
    border: 2px solid #5c6bc0;
    border-radius: 30px;
    padding: 0.5rem 1.5rem;
    font-size: 1rem;
    outline: none;
    margin: 0 0.5rem;
    width: 100%;
} 

select:focus {
    border-color: #5162c2;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
} 

select option {
  background-color: #f1f1f1;
  color: #333;
  font-size: 1rem;
  border-bottom: 1px solid #ccc;
  transition: background-color 0.2s ease;
}

.empty-list {
    display: flex;
    justify-content: center;
    font-size: 1.2rem;
    color: #dd5555;
    font-weight: bold;
}
</style>