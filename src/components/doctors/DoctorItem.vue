<template>
    <li>
        <base-card>
            <h2> <span class="doctor-title">{{ title.shortName }}</span> {{ fullName }} </h2>
            <div>
                <base-badge v-for="specialty in specialties" :key="specialty.name" :title="specialty.name" type="doctor-specialty"></base-badge>
            </div> 
            <doctor-booking :doctorId="id"></doctor-booking>
        </base-card>
    </li>
</template>

<script>
import DoctorBooking from './DoctorBooking.vue';

export default {
    components: {
        DoctorBooking
    },
    props: ['id', 'firstName', 'lastName', 'title', 'specialties'],
    computed: {
        fullName() {
            return this.firstName + ' ' + this.lastName;
        }
    },
}
</script>

<style scoped>
h2 {
  font-size: 1.5rem;
  margin: 0.5rem 0;
}

div {
  margin: 1rem 0;
}

.doctor-title {
    font-size: 1.2rem;
}
</style>