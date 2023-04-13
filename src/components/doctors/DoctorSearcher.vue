<template>
    <section>
        <input type="text" placeholder="Wyszukaj lekarza po nazwisku, imieniu, specjalizacji lub tytule" v-model="searchText" />
        <div class="actions">
            <base-button @click="search">SZUKAJ</base-button>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            searchText: ''
        }
    },
    methods: {
        async search() {
            try {
                await this.$store.dispatch('doctors/getDoctors', {
                    text: this.searchText
                });
            }
            catch (error) {
                //this.error = error.message || 'Something went wrong!';
                console.log(error);
            }
        }
    }
}
</script>

<style scoped>
section {
    margin: 1rem auto 3rem auto;
}

input {
    border: none;
    background-color: #fff;
    border: 2px solid #5c6bc0;
    border-radius: 30px;
    padding: 12px 24px;
    font-size: 16px;
    width: 100%;
    outline: none;
}   

input:focus {
    border-color: #5162c2;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
} 

input::placeholder {
    color: #A9A9A9;
    font-size: 14px;
    font-style: italic;
}

input:focus::placeholder {
    color: transparent;
}

.actions {
  display: flex;
  margin-top: 0.5rem;
  justify-content: center;
  font-size: 1.2rem;
}
</style>