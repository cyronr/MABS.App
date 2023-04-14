<template>
    <section>
        <div class="search-bar">
            <input type="text" placeholder="Wyszukaj lekarza po nazwisku, imieniu, specjalizacji lub tytule" v-model="inputedText" />
        </div>
        <div class="search-options">
            <select v-model="selectedSpecialty" id="specialties-select">
                <option selected :value="null">Wybierz specjalizację</option>
                <option v-for="specialty in specialties" :key="specialty.id" :value="specialty.id">
                    {{ specialty.name }}
                </option>
            </select>
            <select v-model="selectedCity" id="cities-select">
                <option selected :value="null">Wybierz miasto</option>
                <option v-for="city in cities" :key="city.id" :value="city.id">
                    {{ city.name }}
                </option>
            </select>
            <base-button @click="search" id="search-button">SZUKAJ</base-button>
        </div>
        <div v-if="!!searchProps" class="search-summary">
            <p v-if="doctorsExists">
                Wyniki wyszukiwania 
                <span v-if="searchProps.text && searchProps.text !== ''"> dla <span class="search-summary-highlight"> {{ searchProps.text }} </span></span>
                <span v-if="searchProps.city.name && searchProps.city.name !== ''"> w mieście <span class="search-summary-highlight"> {{ searchProps.city.name }} </span></span>
                <span v-if="searchProps.specialty.name && searchProps.specialty.name !== ''"> dla specjalizacji <span class="search-summary-highlight"> {{ searchProps.specialty.name }} </span></span>
            </p>
            <p v-else>Dla podanych kryteriów nie znaleziono żadnego lekarza. Spróbuj zmienić kryteria wyszukiwania.</p>
        </div>
    </section>
</template>

<script>
import { ERROR_DEFAULT_MSG } from '../../consts';

export default {
    emits: ['search'],
    data() {
        return {
            inputedText: '',
            selectedSpecialty: null,
            selectedCity: null,

            searchProps: null
        }
    },
    computed: {
        specialties() {
            return this.$store.getters['doctors/specialties']; 
        },
        cities() {
            return this.$store.getters['facilities/cities']; 
        },
        doctorsExists() {
            return this.$store.getters['doctors/doctorsExists'];  
        }
    },
    methods: {
        async search() {
            let specialty = '';
            if (this.selectedSpecialty)
                specialty = this.specialties.find(s => s.id === this.selectedSpecialty);

            let city = '';
            if (this.selectedCity)
                city = this.cities.find(c => c.id === this.selectedCity);

            this.searchProps = {
                text: this.inputedText,
                specialty: specialty,
                city: city
            }

            this.$emit('search', this.searchProps);

            console.log(this.doctorsExists);

            this.inputedText = '';
            this.selectedSpecialty = null;
            this.selectedCity = null;
        },
        async loadSpecialties() {
            try {
                await this.$store.dispatch('doctors/getSpecialties');
            }
            catch (error) {
                this.error = ERROR_DEFAULT_MSG;
            }
        },
        loadCities() {
            
        }
    },
    created() {
        this.loadSpecialties();
        this.loadCities();
    }
}
</script>

<style scoped>
section {
    margin: 1rem auto 3rem auto;
}

div {
    margin: 0.5rem auto;
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

.search-options {
  display: flex;
  align-items: center; 
}

select {
    border: none;
    background-color: #fff;
    border: 2px solid #5c6bc0;
    border-radius: 30px;
    padding: 6px 24px;
    font-size: 14px;
    outline: none;
    margin: 0 0.5rem;
} 

select:focus {
    border-color: #5162c2;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
} 

select option {
  background-color: #f1f1f1;
  color: #333;
  font-size: 14px;
  padding: 8px 24px;
  border-bottom: 1px solid #ccc;
  transition: background-color 0.2s ease;
}

select option:hover {
  background-color: #e5e5e5;
}

#specialties-select {
    width: 50%;
}

#cities-select  {
    width: 30%;
}

#search-button {
    width: 20%;
    margin: 0 0.5rem;
}

.search-summary {
    color: #fff;
    background-color: #6378f0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 30px;
    padding: 6px 24px;
    font-size: 16px;
    width: 100%;
    margin: 3rem auto;
    text-align: center;
}

.search-summary-highlight {
    font-weight: bolder;
    text-transform: uppercase;
}
</style>