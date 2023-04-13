<template>
    <li>
        <base-card>
            <h2> <span class="doctor-title">{{ title.shortName }}</span> {{ fullName }} </h2>
            <div>
                <base-badge v-for="specialty in specialties" :key="specialty.name" :title="specialty.name" type="doctor-specialty"></base-badge>
            </div> 
            <div class="actions">
                <base-button>Sprawdź wolne terminy</base-button>
            </div>
        </base-card>
    </li>
</template>

<script>
    export default {
        props: ['id', 'firstName', 'lastName', 'title', 'specialties'],
        computed: {
            fullName() {
                return this.firstName + ' ' + this.lastName;
            }
        }
    }
</script>

<style scoped>
h2 {
  font-size: 1.5rem;
  margin: 0.5rem 0;
}

div {
  margin: 1rem 0;
}

.doctor-title {
    font-size: 1.2rem;
}

.actions {
  display: flex;
  margin-top: 1rem;
  justify-content: flex-end;
}
</style>