<template>
    <my-profile title="Moje dane" activeTab="myData">
        <facility-data v-if="isFacilityProfile"></facility-data>
        <patient-data v-if="isPatientProfile"></patient-data>
    </my-profile>
</template>

<script>
import { ProfileType } from '../consts';

import MyProfile from '../components/profiles/MyProfile.vue';
import FacilityData from '../components/facilities/FacilityData.vue';
import PatientData from '../components/patients/PatientData.vue';

export default {
    components: {
        MyProfile,
        FacilityData,
        PatientData
    },
    computed: {
        currentLoggedProfile() {
            return this.$store.getters['auth/loggedProfile'];
        },
        isFacilityProfile() {
            return this.currentLoggedProfile.profileType === ProfileType.Facility;
        },
        isPatientProfile() {
            return this.currentLoggedProfile.profileType === ProfileType.Patient;
        }
    }
}
</script>