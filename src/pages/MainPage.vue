<template>
    <base-page>
        <doctor-search @search="searchDoctors"></doctor-search>
        <section>
            <base-dialog error :show="!!error" title="Błąd :(" @close="confirmError">
                <p> {{ error }} </p>
            </base-dialog>
            <doctors-list></doctors-list>
        </section>
        <base-pagination v-if="showPagination"
            :currentPage="paginationParams.CurrentPage"
            :totalPages="paginationParams.TotalPages"
            :pageSize="paginationParams.PageSize"
            :totalCount="paginationParams.TotalCount"
            @page-changed="changePage"
        >
        </base-pagination>
    </base-page>
</template>

<script>
import { ERROR_DEFAULT_MSG } from '../consts';

import DoctorsList from '../components/doctors/DoctorsList.vue';
import DoctorSearch from '../components/doctors/DoctorSearch.vue';

export default {
    components: {
        DoctorsList,
        DoctorSearch
    },
    data() {
        return {
            searchProps: null,

            error: null,
            showPagination: false
        }
    },
    computed: {
        paginationParams() {
            return this.$store.getters['doctors/paginationParams'];
        },
        doctorsExists() {
            return this.$store.getters['doctors/doctorsExists'];  
        }
    },
    methods: {
        async search(pageNumber = 1, pageSize = 10) {
            this.showPagination = false;

            try {
                await this.$store.dispatch('doctors/searchDoctors', {
                    text: this.searchProps.text,
                    specialty: this.searchProps.specialty.id,
                    city: this.searchProps.city.id,
                    pageNumber: pageNumber,
                    pageSize: pageSize
                });

                this.showPagination = this.doctorsExists;
            }
            catch (error) {
                this.error = ERROR_DEFAULT_MSG;
            }
        },
        changePage(page) {
            this.search(page, this.paginationParams.PageSize);
        },
        searchDoctors(searchProps) {
            this.searchProps = searchProps;
            this.search();
        },
        confirmError() {
            this.error = null;
        }
    }
}
</script>
