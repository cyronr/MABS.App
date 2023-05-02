<template>
    <base-card>Harmonogram</base-card>
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
    <div class="schedule-list" v-if="pageLoaded">
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
    </div>
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
            schedules: [],
            newScheduleFormVisible: false,

            pageLoaded: false
        }
    },
    computed: {
        facilityId() {
            return this.$route.query.facilityId;
        },
        authToken() {
            return this.$store.getters['auth/token'];
        }
    },
    methods: {
        async fetchSchedules() {
            this.schedules = [];
            
            this.$store.commit('setIsPageLoading', true, { root: true })
            try {
                const response = await axios.get(`${API_URL}/schedules`, {
                    params: {
                        facilityId: this.facilityId,
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
        async addSchedule(schedule) {
            this.$store.commit('setIsPageLoading', true, { root: true })
            try {
                await axios.post(`${API_URL}/schedules`, {
                    doctorId: this.doctorId,
                    facilityId: this.facilityId,
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
        await this.fetchSchedules();

        this.pageLoaded = true;
    }
}
</script>

<style scoped>
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
}
</style>