<template>
    <base-card>
        <h2>Harmonogram pracy</h2>
    </base-card>
    <section class="address" v-if="pageLoaded">
        <select v-model="selectedAddress" @change="changeAddress">
            <option v-for="address in addresses" :key="address.id" :value="address.id">
                {{ address.name }} - {{ address.postalCode }} {{ address.city }}, {{ address.streetType.shortName }} {{ address.streetName }} {{ address.houseNumber }}
            </option>
        </select>
    </section>
    <section>
        <section class="new-schedule">
            <div class="centered-button" v-if="!newScheduleFormVisible">
                <base-button @click="toggleNewScheduleForm" title="Dodaj nowy adres">
                    <i class="fa-solid fa-plus"></i>
                </base-button>
            </div>
            <doctor-schedule v-if="newScheduleFormVisible" newScheduleMode
                @cancel="toggleNewScheduleForm"
                @add="addSchedule"
            >
            </doctor-schedule>
        </section>
        <section class="schedule-list" v-if="pageLoaded">
            <doctor-schedule v-for="schedule in schedules" :key="schedule.id"
                :id="schedule.id"
                :dayOfWeek="schedule.dayOfWeek"
                :endTime="schedule.endTime"
                :startTime="schedule.startTime"
                :appointmentDuration="schedule.appointmentDuration"
                :validDateFrom="schedule.validDateFrom"
                :validDateTo="schedule.validDateTo"
                @update="updateSchedule"
                @remove="removeSchedule"
            >
            </doctor-schedule>
        </section>
    </section>
</template>

<script>
import axios from 'axios';
import { API_URL, handleAPIErrorWithMessage } from '../../api';
import DoctorSchedule from './DoctorSchedule.vue';

export default {
    props: ['doctorId'],
    components: {
        DoctorSchedule
    },
    data() {
        return {
            addresses: [],
            schedules: [],

            selectedAddress: null,
            newScheduleFormVisible: false,

            pageLoaded: false
        }
    },
    computed: {
        facility() {
            return this.$store.getters['facilities/facility'];
        },
        authToken() {
            return this.$store.getters['auth/token'];
        },
        currentLoggedProfile() {
            return this.$store.getters['auth/loggedProfile'];
        }
    },
    methods: {
        async fetchAddresses() {
            this.addresses = [];

            this.$store.commit('setIsPageLoading', true, { root: true })

            try {
                const response = await axios.get(`${API_URL}/facilities/${this.facility.id}`, {
                    headers: { Authorization: `Bearer ${this.authToken}` }
                });
                
                for (var key in response.data.addresses)
                {
                    this.addresses.push(response.data.addresses[key]);
                }
                this.$store.commit('setIsPageLoading', false, { root: true });
            }
            catch (error) {
                handleAPIErrorWithMessage(error);
            } 
        },
        async fetchSchedules() {
            this.schedules = [];
            
            this.$store.commit('setIsPageLoading', true, { root: true })
            try {
                const response = await axios.get(`${API_URL}/schedules`, {
                    params: {
                        addressId: this.selectedAddress,
                        doctorId: this.doctorId
                    },
                    headers: { Authorization: `Bearer ${this.authToken}` }
                });

                for (var key in response.data)
                {
                    this.schedules.push(response.data[key])
                }

                this.$store.commit('setIsPageLoading', false, { root: true });
            }
            catch (error) {
                handleAPIErrorWithMessage(error);
            } 
        },
        async changeAddress() {
            await this.fetchSchedules();
        },
        async addSchedule(schedule) {
            this.$store.commit('setIsPageLoading', true, { root: true })
            try {
                await axios.post(`${API_URL}/schedules`, {
                    doctorId: this.doctorId,
                    addressId: this.selectedAddress,
                    ...schedule
                }, 
                {
                    headers: { Authorization: `Bearer ${this.authToken}` }
                });

                this.toggleNewScheduleForm();
                await this.fetchSchedules();

                this.$store.commit('setIsPageLoading', false, { root: true });
            }
            catch (error) {
                handleAPIErrorWithMessage(error);
            } 
        },
        async updateSchedule(schedule) {
            this.$store.commit('setIsPageLoading', true, { root: true })
            try {
                await axios.put(`${API_URL}/schedules`, schedule, {
                    headers: { Authorization: `Bearer ${this.authToken}` }
                });
                await this.fetchSchedules();

                this.$store.commit('setIsPageLoading', false, { root: true });
            }
            catch (error) {
                handleAPIErrorWithMessage(error);
            } 
        },
        async removeSchedule(id) {
            this.$store.commit('setIsPageLoading', true, { root: true })
            try {
                await axios.delete(`${API_URL}/schedules/${id}`, {
                    headers: { Authorization: `Bearer ${this.authToken}` }
                });
                await this.fetchSchedules();

                this.$store.commit('setIsPageLoading', false, { root: true });
            }
            catch (error) {
                handleAPIErrorWithMessage(error);
            } 
        },
        toggleNewScheduleForm() {
            this.newScheduleFormVisible = !this.newScheduleFormVisible;
        }
    },
    async beforeMount() {
        await this.fetchAddresses();
        this.selectedAddress = this.addresses[0].id;
        await this.changeAddress();

        this.pageLoaded = true;
    }
}
</script>

<style scoped>
h2 {
    text-align: center;
    padding: 0;
    margin: 0;
}
.centered-button {
    display: flex;
    justify-content: center;
}
 .new-schedule button {
    padding: 0.5rem 10rem;
    background-color: #8e9fff;
    border-color: #8e9fff;
}

.new-schedule button:hover {
    background-color: #768afd;
    border-color: #768afd;
    box-shadow: 0 0 10px rgba(118, 138, 253, 0.35);
}

.address {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
}

select {
    border: none;
    background-color: #fff;
    border: 2px solid #5c6bc0;
    border-radius: 30px;
    padding: 6px 24px;
    font-size: 1.2rem;
    outline: none;
    margin: 0 0.5rem;
    min-width: 60%;
} 

select:focus {
    border-color: #5162c2;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
} 

select option {
  background-color: #f1f1f1;
  color: #333;
  font-size: 14px;
  padding: 8px 24px;
  border-bottom: 1px solid #ccc;
  transition: background-color 0.2s ease;
}

select option:hover {
  background-color: #e5e5e5;
}
</style>