<template>
    <div class="page-container">
        <the-header></the-header>
        <main>
            <slot></slot>
        </main>
        <the-footer></the-footer>
    </div> 
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
.page-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh; 
    position: relative; 
}

main {
    flex-grow: 1; 
    padding: 1rem;
    margin: 0.5rem auto;
    width: 80%;
}

.the-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>
