<template>
    <section class="new-doctor">
        <div class="centered-button" v-if="showNewDoctorButton">
            <base-button @click="toggleNewDoctorForm" title="Dodaj nowego lekarza">
                <i class="fa-solid fa-plus"></i>
            </base-button>
        </div>
        <facility-doctor v-if="newDoctorFormVisible" newDoctorMode
            @cancel="toggleNewDoctorForm"
            @addDoctor="addDoctor"
        >
        </facility-doctor>
    </section>
    <section class="doctors-list">
        <ul v-if="pageLoaded">
            <facility-doctor v-for="doctor in doctors" :key="doctor.id"
                :id="doctor.id"
                :firstName="doctor.firstname"
                :lastName="doctor.lastname"
                :title="doctor.title"
                :specialties="doctor.specialties"
                @removeDoctor="removeDoctor"
            >
            </facility-doctor>
        </ul>
    </section>
    <section class="pagination" v-if="showPagination">
        <base-pagination
            :currentPage="paginationParams.CurrentPage"
            :totalPages="paginationParams.TotalPages"
            :pageSize="paginationParams.PageSize"
            :totalCount="paginationParams.TotalCount"
            @page-changed="changePage"
        >
        </base-pagination>
    </section>
</template>

<script>
import axios from 'axios';
import { API_URL, handleAPIError } from '../../api';
import FacilityDoctor from './FacilityDoctor';

export default {
    components: {
        FacilityDoctor
    },
    data() {
        return {
            doctors: [],
            paginationParams: null,

            newDoctorFormVisible: false,
            pageLoaded: false
        }
    },
    computed: {
        facility() {
            return this.$store.getters['facilities/facility'];
        },
        showPagination() {
            return this.doctors.length > 0;
        },
        showNewDoctorButton() {
            if (this.newDoctorFormVisible) {
                return false;
            }
            else if (this.paginationParams === null) {
                return false;
            }
            else if (this.paginationParams.PageNumber > 1) {
                return false;
            }
            else {
                return true;
            }
        }
    },
    methods: {
        async fetchDoctors(pageNumber = 1, pageSize = 5) {
            this.$store.commit('setIsPageLoading', true, { root: true })

            try {
                const response = await axios.get(`${API_URL}/facilities/${this.facility.id}/doctors`, {
                    params: {
                        PageNumber: pageNumber,
                        PageSize: pageSize
                    }
                });
                
                this.parseResponse(response);
                this.$store.commit('setIsPageLoading', false, { root: true });
            }
            catch (error) {
                handleAPIError(error);
            } 
        },
        async fetchDoctorTitles() {
            await this.$store.dispatch('doctors/getTitles');
        },
        async fetchDoctorSpecialties() {
            await this.$store.dispatch('doctors/getSpecialties');
        },
        async removeDoctor(doctorId) {
            this.$store.commit('setIsPageLoading', true, { root: true })

            try {
                const response = await axios.delete(`${API_URL}/facilities/${this.facility.id}/doctors/${doctorId}`, {
                    params: {
                        PageNumber: 1,
                        PageSize: 5
                    }
                });
                
                this.parseResponse(response);
                this.$store.commit('setIsPageLoading', false, { root: true });
            }
            catch (error) {
                handleAPIError(error);
            } 
        },
        async addDoctor(doctorId) {
            this.$store.commit('setIsPageLoading', true, { root: true })

            try {
                const response = await axios.post(`${API_URL}/facilities/${this.facility.id}/doctors/${doctorId}`, null, {
                    params: {
                        PageNumber: 1,
                        PageSize: 5
                    }
                });
                
                this.parseResponse(response);
                this.$store.commit('setIsPageLoading', false, { root: true });

                this.toggleNewDoctorForm();
            }
            catch (error) {
                handleAPIError(error);
            } 
        },
        parseResponse(response) {
            this.doctors = [];
            for (var key in response.data)
            {
                this.doctors.push(response.data[key])
            }

            this.paginationParams = JSON.parse(response.headers['x-pagination']);
        },
        toggleNewDoctorForm() {
            this.newDoctorFormVisible = !this.newDoctorFormVisible;
        },
        changePage(page) {
            this.fetchDoctors(page, this.paginationParams.PageSize);
        },
    },
    async beforeMount() {
        await this.fetchDoctors();
        await this.fetchDoctorTitles();
        await this.fetchDoctorSpecialties();

        this.pageLoaded = true;
    }
}
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}



.centered-button {
    display: flex;
    justify-content: center;
}
 .new-doctor button {
    padding: 0.5rem 10rem;
    background-color: #8e9fff;
    border-color: #8e9fff;
}

.new-doctor button:hover {
    background-color: #768afd;
    border-color: #768afd;
}
</style>