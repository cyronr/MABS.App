<template>
    <header>
        <nav>
          <h1><router-link to="/" @click="goToHomePage">(nie)znanylekarz.cr</router-link></h1>
          <h3 v-if="isLogged"> {{ currentLoggedProfile.email }} </h3>
          <ul>
            <li v-if="!isLogged">
              <router-link to="/login">Zaloguj się</router-link>
            </li>
            <li v-if="!isLogged">
              <router-link to="/register">Zarejestruj się</router-link>
            </li>
            <li v-if="isLogged">
              <base-button mode="flat" @click="logout" class="dupa">Wyloguj się</base-button>
            </li>
          </ul>
        </nav>
    </header>
</template>

<script>
export default {
  methods: {
    goToHomePage() {
      this.$router.push('/');
      window.location.href = '/';
    },
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.replace('/');
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

.dupa {
  text-decoration: none;
  color: #eee;
  display: inline-block;
  padding: 0.75rem 1.5rem;
}
</style>