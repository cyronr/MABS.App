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
import FacilityDoctor from '../../components/facilities/FacilityDoctor.vue';

export default {
    components: {
        FacilityDoctor
    },
    data() {
        return {
            newDoctorFormVisible: false,
            pageLoaded: false
        }
    },
    computed: {
        facility() {
            return this.$store.getters['facilities/facility'];
        },
        doctors() {
            return this.$store.getters['facilities/doctors'];
        },
        paginationParams() {
            return this.$store.getters['facilities/paginationParams'];
        },
        authToken() {
            return this.$store.getters['auth/token'];
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
            await this.$store.dispatch('facilities/getDoctors', {
                pageNumber: pageNumber,
                pageSize: pageSize
            });
        },
        async fetchDoctorTitles() {
            await this.$store.dispatch('doctors/getTitles');
        },
        async fetchDoctorSpecialties() {
            await this.$store.dispatch('doctors/getSpecialties');
        },
        async removeDoctor(doctorId) {
            await this.$store.dispatch('facilities/deleteDoctor', {
                doctorId: doctorId,
                pageNumber: 1,
                pageSize: 5
            });
        },
        async addDoctor(doctorId) {
            await this.$store.dispatch('facilities/addDoctor', {
                doctorId: doctorId,
                pageNumber: 1,
                pageSize: 5
            });
            this.newDoctorFormVisible = false;
        },
        toggleNewDoctorForm() {
            this.newDoctorFormVisible = !this.newDoctorFormVisible;
        },
        changePage(page) {
            this.fetchDoctors(page, this.paginationParams.PageSize);
            window.scrollTo(0, 0);
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
    box-shadow: 0 0 10px rgba(118, 138, 253, 0.35);
}
</style>