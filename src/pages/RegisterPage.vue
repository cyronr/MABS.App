<template>
    <base-page>
        <base-card>
            <div class="change-profile-type">
                <base-button class="change-profile-type-tab" @click="changeTab('patient')" :class="{ active: activePatientTab }">Pacjent</base-button>
                <base-button class="change-profile-type-tab" @click="changeTab('facility')" :class="{ active: activeFacilityTab }">Placówka medyczna</base-button>
            </div>
            <transition name="tab-change">
                <register-patient v-if="activePatientTab"></register-patient>
                <register-facility v-else-if="activeFacilityTab"></register-facility>
            </transition>
        </base-card>
    </base-page>
</template>

<script>
import RegisterPatient from '../components/registration/RegisterPatient.vue';
import RegisterFacility from '../components/registration/RegisterFacility.vue';

export default {
    components: {
        RegisterPatient,
        RegisterFacility
    },
    data() {
        return {
            activeTab: 'patient'
        }
    },
    computed: {
        activePatientTab() {
            return this.activeTab === 'patient';
        },
        activeFacilityTab() {
            return this.activeTab === 'facility';
        }
    },
    methods: {
        changeTab(tab) {
            this.activeTab = tab;
        }
    }
}
</script>

<style scoped>
.change-profile-type {
  display: flex;
}

.change-profile-type-tab {
  flex: 1;
  padding: 0.7rem;
  background-color: #f0f0f0;
  color: #000;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
}

.change-profile-type-tab:hover {
  background-color: #e0e0e0;
}

.change-profile-type-tab:focus {
  outline: none;
}

.change-profile-type-tab.active {
  background-color: white;
  border-bottom-color: #404d97;
}

.tab-change-enter-active,
.tab-change-leave-active {
  transition: opacity 0.3s ease;
}

.tab-change-enter,
.tab-change-leave-to {
  opacity: 0;
}
</style>