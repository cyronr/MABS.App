<template>
    <base-page>
        <div class="page">
            <div class="menu">
              <profile-menu :activeTab="activeTab" @tabChanged="changeTab"></profile-menu>
            </div>
            <div class="content" v-if="isPageReady">
              <header>
                <base-card class="header" :style="contentHeaderStyle">
                  <h1> {{ title }} </h1>
                </base-card>
              </header>
              <section>
                <profile-data v-if="activeTab === 'data'"></profile-data>
                <facility-doctors v-else-if="activeTab === 'doctors'"></facility-doctors>
              </section>
            </div>
        </div>
    </base-page>
</template>

<script>
import ProfileMenu from '../components/profiles/ProfileMenu.vue';
import ProfileData from '../components/profiles/ProfileData.vue';
import FacilityDoctors from '../components/facilities/FacilityDoctors.vue';

export default {
  components: {
    ProfileMenu,
    ProfileData,
    FacilityDoctors
  },
  data() {
    return {
      activeTab: 'data'
    }
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
        },
        isPageReady() {
          if (this.isFacilityProfile)
            return this.$store.getters['facilities/facility'] !== null;
          else
            return false;
        },
        contentHeaderStyle() {
          return {
            backgroundColor: '#c1caff',
            color: '#333333'
          }
        },
        title() {
          if (this.activeTab === 'data')
            return 'Moje dane';
          else if (this.activeTab === 'addresses')
            return 'Moje adresy';
          else if (this.activeTab === 'appointments')
            return 'Moje wizyty';
          else if (this.activeTab === 'doctors')
            return 'Moi lekarze';
          else 
            return '';
        }
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab;
    }
  },
  async beforeMount() {
    await this.$store.dispatch('facilities/getFacilityByProfile', { profileId: this.currentLoggedProfile.id });
  }
}
</script>

<style scoped>
.page {
  display: flex;
  min-height: 100vh;
}

.menu {
  margin-right: 2rem;
  min-width: 12rem;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
  height: 100%;
}

.content {
   flex-grow: 1;  
}

h1 {
  font-size: 2rem;
  text-align: center;
}
</style>