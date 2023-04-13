<template>
    <ul>
        <doctor-item v-for="doctor in doctors" :key="doctor.id"
            :id="doctor.id"
            :firstName="doctor.firstname"
            :lastName="doctor.lastname"
            :title="doctor.title"
            :specialties="doctor.specialties"
        >
        </doctor-item>
    </ul>
</template>

<script>
import DoctorItem from './DoctorItem.vue';

export default {
    components: {
        DoctorItem
    },
    computed: {
        doctors() {
            return this.$store.getters['doctors/doctors']; 
        }
    }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>