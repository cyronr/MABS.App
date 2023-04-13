<template>
    <span class="badge" :class="type">
        {{ text }}
    </span>
</template>

<script>
export default {
    props: ['title', 'type'],
    computed: {
        text() {
            return this.title.toUpperCase();
        }
    }
}
</script>

<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin: 0.2rem;
  font-size: 0.8rem;
}

.doctor-specialty {
  background-color: #7886c9 ;
  color: white;
}
</style>