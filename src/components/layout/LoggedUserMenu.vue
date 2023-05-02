<template>
    <div class="dropdown">
        <base-button mode="flat" @click="toggleDropdown">
            {{ currentLoggedProfile.email }} <i class="fa-solid fa-caret-down"></i>
        </base-button> 
        <ul class="dropdown-menu" v-show="isDropdownOpen">
            <!-- <div v-if="isFacilityProfile">
                <li class="dropdown-item">Moi lekarze</li>
                <li class="dropdown-item"> <hr /> </li>
            </div>
            <div v-if="isFacilityProfile">
                <li class="dropdown-item">Moje adresy</li>
                <li class="dropdown-item"> <hr /> </li>
            </div>
            <div v-if="isPatientProfile">
                <li class="dropdown-item">Moje wizyty</li>
                <li class="dropdown-item"> <hr /> </li>
            </div> -->
            <div>
                <li class="dropdown-item">
                    <router-link :to="myProfileLink">Moje konto</router-link>
                </li>
                <li class="dropdown-item"> <hr /> </li>
            </div>
            <li class="dropdown-item logout" @click="logout">Wyloguj się</li>
        </ul>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            isDropdownOpen: false
        };
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
        myProfileLink() {
            return `/profile/${this.currentLoggedProfile.id}`;
        }
    },
    methods: {
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        handleOutsideClick(event) {
            if (!this.$el.contains(event.target)) {
                this.isDropdownOpen = false;
            }
        },
        logout() {
            this.$store.dispatch('auth/logout');
            this.$router.replace('/');
        },
        chooseMenuOption(page) {
            this.$router.replace('/' + page);
        }
    },
    mounted() {
        document.addEventListener("click", this.handleOutsideClick);
    },
    beforeUnmount() {
        document.removeEventListener("click", this.handleOutsideClick);
    }
};
</script>
  
<style scoped>
@import '~@fortawesome/fontawesome-free/css/all.min.css';
.dropdown {
  position: relative;
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #F5F5F5;
  padding: 0.5rem;
  list-style-type: none;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  max-height: 0;
  overflow-y: auto;
  min-width: 130px; 
  margin-right: 1.5rem;
}

.dropdown-item {
  padding: 0.5em 0.75rem;
  cursor: pointer;
  text-align: left;
}

.dropdown-item:hover {
  font-weight: bolder;
}

.dropdown-item > hr {
    border-top: 1px solid #ccc;
    width: 95%;
    margin: 0;
}

a {
    text-decoration: none;
    color: black;
}

.logout {
    color: #e00000;
}

.dropdown-menu:empty {
  display: none;
}

.dropdown-menu:not(:empty) {
  max-height: 300px;
}
  </style>