<template>
    <base-card vertical>
        <ul>
            <div v-if="isFacilityProfile">
                <li :class="{active: activeTab === 'doctors'}" @click="changeTab('doctors')">
                    <router-link :to="doctorsLink">Moi lekarze</router-link>
                </li>
                <li> <hr /> </li>
            </div>
            <div v-if="isFacilityProfile">
                <li :class="{active: activeTab === 'addresses'}">
                    <router-link :to="addressesLink" @click="changeTab('addresses')">Moje adresy</router-link>
                </li>
                <li> <hr /> </li>
            </div>
            <div v-if="isPatientProfile">
                <li :class="{active: activeTab === 'appointments'}">
                    <router-link :to="appointmentsLink" @click="changeTab('appointments')">Moje wizyty</router-link>
                </li>
                <li> <hr /> </li>
            </div>
            <div>
                <li :class="{active: activeTab == 'data'}">
                    <router-link :to="dataLink" @click="changeTab('data')">Moje dane</router-link>
                </li>
                <li> <hr /> </li>
            </div>
            <li class="delete-profile" @click="deleteProfile">Usuń konto</li>
        </ul>
    </base-card>
</template>

<script>
export default {
    emits: ['tabChanged'],
    props: {
        profileId: {
            type: String,
            required: true
        }
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
        doctorsLink() {
            return `/profile/${this.profileId}/doctors`;
        },
        addressesLink() {
            return `/profile/${this.profileId}/addresses`;
        }, 
        appointmentsLink() {
            return `/profile/${this.profileId}/appointments`;
        }, 
        dataLink() {
            return `/profile/${this.profileId}`;
        }
    },
    methods: {
        changeTab(tab) {
            this.activeTab = tab;
            this.$emit('tabChanged', tab);
        },
        async deleteProfile() {
            await this.$store.dispatch('profile/deleteProfile');
            await this.$store.dispatch('auth/logout');
        }
    }
}
</script>

<style scoped>
ul {
    list-style: none;
    padding: 0.5rem;
}

ul li {
    font-size: 1.2rem;
    padding: 0.5rem;
    margin: 0.2rem 0.3rem;
    cursor: pointer;
    text-align: center;
}

ul li hr {
    border-top: 1px solid #ccc;
    width: 95%;
    margin: 0;
}

ul li a {
    text-decoration: none;
    color: black;
}

ul li:hover,
ul li.active {
  font-weight: bolder;
}

.delete-profile {
    color: #e00000;
}
</style>