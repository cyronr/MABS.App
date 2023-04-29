<template>
    <facility-data v-if="isFacilityProfile"></facility-data>
    <patient-data v-if="isPatientProfile"></patient-data>
</template>

<script>
import FacilityData from '../facilities/FacilityData.vue';
import PatientData from '../patients/PatientData.vue';

export default {
    components: {
        FacilityData,
        PatientData
    },
    computed: {
        currentLoggedProfile() {
            return this.$store.getters['auth/loggedProfile'];
        },
        isFacilityProfile() {
            return this.$store.getters['auth/isFacilityProfile'];
        },
        isPatientProfile() {
            return this.$store.getters['auth/isPatientProfile'];
        }
    }
}
</script>