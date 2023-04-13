<template>
    <the-header></the-header>
    <main>
        <slot></slot>
    </main>
    <the-footer></the-footer>
</template>

<script>
import TheHeader from '../layout/TheHeader.vue';
import TheFooter from '../layout/TheFooter.vue';

export default {
    components: {
        TheHeader,
        TheFooter
    }
};
</script>

<style scoped>
    main {
        /* border-radius: 12px; */
        /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26); */
        padding: 1rem;
        margin: 0.5rem auto;
        max-width: 80%;
    }
</style>