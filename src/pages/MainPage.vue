<template>
    <base-page>
        <doctor-searcher></doctor-searcher>
        <doctors-list></doctors-list>
    </base-page>
</template>

<script>
import DoctorsList from '../components/doctors/DoctorsList.vue';
import DoctorSearcher from '../components/doctors/DoctorSearcher.vue';

export default {
    components: {
        DoctorsList,
        DoctorSearcher
    }
}
</script>

<style>

</style>