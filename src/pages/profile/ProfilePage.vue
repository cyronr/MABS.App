<template>
    <base-page>
        <div class="page">
            <div class="menu">
              <profile-menu :profileId="id" @tabChanged="changeTab"></profile-menu>
            </div>
            <div class="content">
              <header>
                <base-card class="header" :style="contentHeaderStyle">
                  <h1> {{ title }} </h1>
                </base-card>
              </header>
              <section>
                <router-view></router-view>
              </section>
            </div>
        </div>
    </base-page>
</template>

<script>
import ProfileMenu from '../../components/profiles/ProfileMenu.vue';

export default {
  props: ['id'],
  components: {
    ProfileMenu
  },
  data() {
    return {
      activeTab: 'data'
    }
  },
  computed: {
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