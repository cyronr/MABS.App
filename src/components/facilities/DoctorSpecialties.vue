<template>
    <div>
        <label>Specjalizacje: </label>
        <ul>
            <li v-for="specialty in specialties" :key="specialty.name" class="specialty">
                <base-badge :title="specialty.name" type="doctor-specialty"></base-badge> 
                <i class="fa-solid fa-trash" @click="removeSpecialty(specialty.name)" :class="{ disabled: !editable }" ></i>
            </li>
            <li class="add-new">
                <select v-model="selectedSpecialty" :disabled="!editable">
                    <option selected :value="null">Wybierz specjalizację</option>
                    <option v-for="specialty in availableSpecialties" :key="specialty.id" :value="specialty.id">
                        {{ specialty.name }}
                    </option>
                </select>
                <base-button @click="addSpecialty" :disabled="addButtonDisabled">
                    <i class="fa-solid fa-plus"></i>
                </base-button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        specialties: Array,
        editable: {
            type: Boolean,
            required: true
        }
    },
    emits: ['add', 'remove'],
    data() {
        return {
            selectedSpecialty: null
        }
    },
    computed: {
        allSpecialties() {
            return this.$store.getters['doctors/specialties']; 
        },
        availableSpecialties() {
            let toDelete = [];
            for (var spec in this.specialties) {
                toDelete.push(this.getSpecialtyIdByName(this.specialties[spec].name))
            }
            
            return this.allSpecialties.filter(s => !toDelete.includes(s.id));
        },
        addButtonDisabled() {
            return this.selectedSpecialty === null || !this.editable;
        }
    },
    methods: {
        getSpecialtyIdByName(name) {
            return this.allSpecialties.find(s => s.name === name).id;
        },
        addSpecialty() {
            const spec = this.allSpecialties.find(s => s.id === this.selectedSpecialty);
            this.$emit('add', spec);

            this.selectedSpecialty = null;
        },
        removeSpecialty(specialty) {
            if (!this.editable) {
                return
            }

            const spec = this.allSpecialties.find(s => s.name === specialty);
            this.$emit('remove', spec);
        }
    }
}
</script>

<style scoped>
div {
    display: flex;
}

label {
    font-weight: bold;
    min-width: 20%;
    text-align: left;
}

ul {
    list-style: none;
}

li {
    display: flex;
}

.fa-trash {
    margin-left: 0.5rem;
    margin-top: 0.4rem;
    color: #f75f5f;
    font-size: 1.5rem; 
}

.fa-trash:hover {
    color: #dd5555;
    cursor: pointer;
}

.disabled {
    color: #a7a7a7;
    cursor: default;
}

.disabled:hover {
    color: #a7a7a7;
    cursor: default;
}

.add-new {
    margin: 1rem 0.2rem 0 0.2rem;
}

.add-new button {
    background-color: #7886c9;
    border-color: #7886c9;
    font-size: 0.8rem;
    padding: 0.5rem 1.5rem;
    margin-left: 0.5rem;
}

.add-new button:hover {
    background-color: #6673ad;
    border-color: #6673ad;
}

select {
    font: inherit;
    border: none;
    background-color: #fff;
    border: 2px solid #aaa;
    border-radius: 30px;
    padding: 0 0.4rem; 
    font-size: 0.8rem;
    max-height: 2rem;
    margin-top: 0.5rem;
    outline: none;
    text-transform: uppercase;
} 

select:focus {
    border-color: #5162c2;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
} 

select option {
  background-color: #f1f1f1;
  color: #333;
  font-size: 14px;
  padding: 5px 18px;
  border-bottom: 1px solid #ccc;
  transition: background-color 0.2s ease;
  text-transform: uppercase;
}

select option:hover {
  background-color: #e5e5e5;
}

.add-new button:disabled {
    background-color: #a7a7a7;
    border-color: #a7a7a7;
    cursor: default;
}
</style>