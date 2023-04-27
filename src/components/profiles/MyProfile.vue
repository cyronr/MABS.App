<template>
    <base-page>
        <div class="page">
            <div class="menu">
                <base-card vertical>
                    <ul>
                      <div v-if="isFacilityProfile">
                        <li :class="{active: activeTab === 'myDoctors'}">Moi lekarze</li>
                        <li> <hr /> </li>
                      </div>
                      <div v-if="isFacilityProfile">
                        <li :class="{active: activeTab === 'myDoctors'}">Moje adresy</li>
                        <li> <hr /> </li>
                      </div>
                      <div v-if="isPatientProfile">
                        <li :class="{active: activeTab === 'myAppointments'}">Moje wizyty</li>
                        <li> <hr /> </li>
                      </div>
                      <div>
                        <li :class="{active: activeTab == 'myData'}">Moje dane</li>
                        <li> <hr /> </li>
                      </div>
                      <li class="delete-profile">Usuń konto</li>
                    </ul>
                </base-card>
            </div>
            <div class="content">
              <base-card class="header" :style="contentHeaderStyle">
                  <h1> {{ title }} </h1>
              </base-card>
              <slot></slot>
            </div>
        </div>
    </base-page>
</template>

<script>
import { ProfileType } from '../../consts';

export default {
  props: {
    activeTab: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
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
        },
        contentHeaderStyle() {
          return {
            backgroundColor: '#c1caff',
            color: '#333333'
          }
        }
    },
}
</script>

<style scoped>
.page {
  display: flex;
}

.menu {
  margin-right: 2rem;
  min-width: 12rem;
  position: sticky;
}

.content {
   flex-grow: 1;  
}

h1 {
  font-size: 2rem;
  text-align: center;
}

.menu ul {
    list-style: none;
    padding: 0.5rem;
}

.menu ul li {
    font-size: 1.2rem;
    padding: 0.5rem;
    margin: 0.2rem 0.3rem;
    cursor: pointer;
    text-align: center;
}

.menu ul li hr {
    border-top: 1px solid #ccc;
    width: 95%;
    margin: 0;
}

.menu ul li:hover,
.menu ul li.active {
  font-weight: bolder;
}

.delete-profile {
    color: #e00000;
    margin-top: 15rem;
}

</style>