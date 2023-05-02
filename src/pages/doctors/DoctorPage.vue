<template>
    <base-page>
        <div class="content" v-if="pageLoaded">
            <base-card class="header" :style="contentHeaderStyle">
                <h1> {{ doctor.title.shortName }} {{ doctor.firstname }} {{ doctor.lastname }} </h1>
            </base-card>
            <div class="facilityMode" v-if="mode === 'facility'">
                <doctor-schedules :doctorId="id"></doctor-schedules>
            </div>
            <div class="patientMode" v-if="mode === 'patient'">
                <h3>Patint</h3>
            </div>
        </div>
    </base-page>
</template>

<script>
import axios from 'axios';
import { API_URL, handleAPIError } from '../../api';
import DoctorSchedules from '../../components/doctors/DoctorSchedules.vue';

export default {
    props: ['id'],
    components: {
        DoctorSchedules
    },
    data() {
        return {
            doctor: null, 
            
            pageLoaded: false
        }
    },
    computed: {
        mode() {
            return this.$route.query.mode;
        },
        facilityId() {
            return this.$route.query.facilityId;
        },
        contentHeaderStyle() {
            return {
                backgroundColor: '#c1caff',
                color: '#333333',
                textAlign: 'center'
            }
        },
    },
    methods: {
        async fetchDoctorData() {
            this.$store.commit('setIsPageLoading', true, { root: true })
            try {
                const response = await axios.get(`${API_URL}/doctors/${this.id}`);
                this.doctor = response.data;

                this.$store.commit('setIsPageLoading', false, { root: true });
            }
            catch (error) {
                handleAPIError(error);
            } 
        }
    },
    async beforeMount() {
        await this.fetchDoctorData();
        
        this.pageLoaded = true;
    }
}
</script>