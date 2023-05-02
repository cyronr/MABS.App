<template>
    <base-page>
        <div class="content" v-if="!pageLoading">
            <base-card class="header" :style="contentHeaderStyle">
                <h1> {{ doctor.title.shortName }} {{ doctor.firstname }} {{ doctor.lastname }} </h1>
            </base-card>
            <div class="facilityMode" v-if="mode === 'facility'">
                <h3>Facility</h3>
            </div>
            <div class="patientMode" v-if="mode === 'patient'">
                <h3>Patint</h3>
            </div>
        </div>
    </base-page>
</template>

<script>
import axios from 'axios';
import { API_URL, handleAPIError } from '../api';

export default {
    props: ['id'],
    data() {
        return {
            doctor: null, 
            
            pageLoading: true
        }
    },
    computed: {
        mode() {
            return this.$route.query.mode;
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

        this.pageLoading = false;
    }
}
</script>