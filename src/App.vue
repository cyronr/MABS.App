<template>
    <router-view v-if="pageLoaded"></router-view>
    <base-dialog :show="isError" title="Błąd :(" error @close="closeErrorDlg">
        <p> Wystąpił błąd podczas ładowania strony. </p>
    </base-dialog>
</template>

<script>
export default {
  data() {
    return {
      pageLoaded: false,
      isError: false,
    }
  },
  computed: {
    isFacilityProfile() {
        return this.$store.getters['auth/isFacilityProfile'];
    },
    isPatientProfile() {
        return this.$store.getters['auth/isPatientProfile'];
    },
  },
  methods: {
    async tryLoadPage() {
      try {
        await this.$store.dispatch('auth/autoLogin');

        if (this.isFacilityProfile) {
          await this.$store.dispatch('facilities/getFacility');
        }
        else if (this.isPatientProfile) {
          await this.$store.dispatch('patients/getPatientByProfile');
        }
        // else {
        //   throw new Error("Nieznany profil.");
        // }

        this.pageLoaded = true;
      }
      catch {
        this.isError = true;
      }
    },
    async closeErrorDlg() {
      this.isError = false;

      await this.tryLoadPage();
    }
  },
  async created() {
      await this.tryLoadPage();
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
@import '~@fortawesome/fontawesome-free/css/all.min.css';

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}
</style>