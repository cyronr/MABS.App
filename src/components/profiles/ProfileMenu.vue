<template>
    <base-card vertical>
        <ul>
            <div v-if="isFacilityProfile">
                <li :class="{active: activeTab === 'doctors'}" @click="changeTab('doctors')">Moi lekarze</li>
                <li> <hr /> </li>
            </div>
            <div v-if="isFacilityProfile">
                <li :class="{active: activeTab === 'addresses'}" @click="changeTab('addresses')">Moje adresy</li>
                <li> <hr /> </li>
            </div>
            <div v-if="isPatientProfile">
                <li :class="{active: activeTab === 'appointments'}" @click="changeTab('appointments')">Moje wizyty</li>
                <li> <hr /> </li>
            </div>
            <div>
                <li :class="{active: activeTab == 'data'}" @click="changeTab('data')">Moje dane</li>
                <li> <hr /> </li>
            </div>
            <li class="delete-profile">Usuń konto</li>
        </ul>
    </base-card>
</template>

<script>
export default {
    emits: ['tabChanged'],
    props: {
        activeTab: {
            type: String,
            required: true
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
        }
    },
    methods: {
        changeTab(tab) {
            this.$emit('tabChanged', tab);
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

ul li:hover,
ul li.active {
  font-weight: bolder;
}

.delete-profile {
    color: #e00000;
}
</style>