<template>
    <header>
        <nav>
          <h1><router-link to="/" @click="goToHomePage">(nie)znanylekarz.cr</router-link></h1>
          <ul>
            <li v-if="!isLogged">
              <router-link to="/login">Zaloguj się</router-link>
            </li>
            <li v-if="!isLogged">
              <router-link to="/register">Zarejestruj się</router-link>
            </li>
            <li v-if="isLogged">
              <logged-user-menu></logged-user-menu>
            </li>
          </ul>
        </nav>
    </header>
</template>

<script>
import LoggedUserMenu from './LoggedUserMenu.vue';

export default {
  components: {
    LoggedUserMenu
  },
  data() {
    return {
      isDropdownOpen: false
    }
  },
  computed: {
    isLogged() {
      return this.$store.getters['auth/isLogged'];
    },
    currentLoggedProfile() {
      return this.$store.getters['auth/loggedProfile'];
    }
  },
  methods: {
    goToHomePage() {
      this.$router.push('/');
      window.location.href = '/';
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  }
}
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #5c6bc0;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #eee;
  display: inline-block;
  padding: 0.75rem 1.5rem;
}

a:active,
a:hover,
a.router-link-active {
  color: white;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}



.dropdown {
  position: relative;
}

.dropdown-button {
  display: flex;
  align-items: center;
  background-color: #eee;
  padding: 0.5rem;
  cursor: pointer;
  border: none;
  outline: none;
  width: 200px;
  justify-content: space-between;
}

.dropdown-icon {
  margin-left: 0.5rem;
  transform-origin: center;
  transition: transform 0.3s ease-in-out;
}

.rotate {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  padding: 0.5rem;
  list-style-type: none;
  margin-top: 0.5rem;
  max-height: 0;
  overflow-y: auto;
  transition: max-height 0.3s ease-in-out;
}

.dropdown-item {
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}

.dropdown-menu:empty {
  display: none;
}

.dropdown-menu:not(:empty) {
  max-height: 300px;
}
</style>