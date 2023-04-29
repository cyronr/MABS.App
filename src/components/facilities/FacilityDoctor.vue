<template>
    <li v-if="pageLoaded">
        <base-card>
            <h2 v-if="newDoctorMode">Dodaj nowego lekarza</h2>
            <form @submit.prevent>
                <section>
                    <div class="form-control">
                        <label for="title">Tytuł: </label>
                        <select id="title" v-model="doctor.title.value" :disabled="!editMode" :class="{error: !doctor.title.valid}">
                            <option v-for="doctorTitle in doctorTitles" :key="doctorTitle.id" :value="doctorTitle.id">
                                {{ doctorTitle.shortName }}
                            </option>
                        </select>   
                    </div>
                    <div class="form-control">
                        <label for="firstName">Imię: </label>
                        <input type="text" id="firstName" v-model.trim="doctor.firstName.value" :disabled="!editMode" :class="{error: !doctor.firstName.valid}" />
                    </div>
                    <div class="form-control">
                        <label for="lastName">Nazwisko: </label>
                        <input type="text" id="lastName" v-model.trim="doctor.lastName.value" :disabled="!editMode" :class="{error: !doctor.lastName.valid}" />       
                    </div>
                    <div class="form-control">
                        <doctor-specialties 
                            :specialties="doctor.specialties.value" 
                            :editable="editMode"
                            @add="addSpecialty"
                            @remove="removeSpecialty"
                        >
                        </doctor-specialties>
                    </div>
                </section>
                <section v-if="formInvalid">
                    <p class="error" v-html="error.replace('\n', '<br/>')"></p>
                </section>
                <section class="actions">
                    <base-button v-if="!editMode" @click="edit">Edytuj</base-button>
                    <base-button v-if="!editMode" @click="remove" class="action-red">Usuń</base-button>
                    <base-button v-if="editMode" @click="save">Zapisz</base-button>
                    <base-button v-if="editMode" @click="cancel" class="action-red">Anuluj</base-button>
                </section>
            </form>
        </base-card>
    </li>
    <confirm-dialog 
        :show="confirmDialog.opened" 
        title="Potwierdzenie"
        @cancelClick="removeCancel" 
        @confirmClick="removeConfirm"
    >
        <p>Czy na pewno chcesz usunąć lekarza {{ this.doctor.firstName.value}} {{ this.doctor.lastName.value }}?</p>
    </confirm-dialog>
</template>

<script>
import axios from 'axios';
import { API_URL, API_BUSINESS_ERROR_CODES } from '../../api';
import DoctorSpecialties from './DoctorSpecialties.vue';

export default {
    components: {
        DoctorSpecialties
    },
    props: {
        id: String,
        firstName: String,
        lastName: String,
        title: Object,
        specialties: Array,

        newDoctorMode: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    emits: ['removeDoctor', 'addDoctor', 'cancel'],
    data() {
        return {
            doctor: {
                title: {
                    value: null,
                    valid: true
                },
                firstName: {
                    value: null,
                    valid: true
                },
                lastName: {
                    value: null,
                    valid: true
                },
                specialties: {
                    value: [],
                    valid: true
                }
            },

            editMode: false,
            formInvalid: false,
            error: null,

            confirmDialog: {
                opened: false
            },

            pageLoaded: false
        }   
    },
    computed: {
        doctorTitles() {
            return this.$store.getters['doctors/titles'];
        },
        allSpecialties() {
            return this.$store.getters['doctors/specialties']; 
        }
    },
    methods: {
        setDoctor() {
            this.doctor.title.value = this.doctorTitles.find(t => t.shortName === this.title.shortName).id;
            this.doctor.firstName.value = this.firstName;
            this.doctor.lastName.value = this.lastName;
            this.doctor.specialties.value = this.specialties;
        },
        removeSpecialty(specialty) {
            this.doctor.specialties.value = this.doctor.specialties.value.filter(s => s.name !== specialty.name);
        },
        addSpecialty(specialty) {
            this.doctor.specialties.value.push({
                name: specialty.name
            });
        },
        edit() {
            this.editMode = true;
        },
        remove() {
            this.confirmDialog.opened = true;
        },
        removeCancel() {
            this.confirmDialog.opened = false;
        },
        removeConfirm() {
            this.$emit('removeDoctor', this.id);
        },
        async save() {
            this.validateForm();
            if (this.formInvalid) {
                return;
            }
            
            this.$store.commit('setIsPageLoading', true, { root: true });
            let specialties = [];
            for(var key in this.doctor.specialties.value) {
                specialties.push(this.getSpecialtyIdByName(this.doctor.specialties.value[key].name));
            }
            const doctor = {
                id: this.id,
                titleId: this.doctor.title.value,
                firstName: this.doctor.firstName.value,
                lastName: this.doctor.lastName.value,
                specialties: specialties
            }

            console.log(doctor);
            try {
                if (this.newDoctorMode) {
                    const response = await axios.post(`${API_URL}/doctors`, doctor);
                    this.$emit('addDoctor', response.data.id);
                }
                else {
                    await axios.put(`${API_URL}/doctors`, doctor);
                }

                this.$store.commit('setIsPageLoading', false, { root: true });
                this.editMode = false;
            }
            catch (error) {
                console.log(error);
                this.formInvalid = true;

                if (API_BUSINESS_ERROR_CODES.includes(error.response.status)) {
                    const responseErrors = error.response.data.errors;
                    
                    let errors = '';
                    for(const key in responseErrors) {
                        errors += responseErrors[key] + '\n';
                    }

                    if (errors === '') {
                        errors = "Nieoczekiwany błąd aplikacji";
                    }

                    this.error = errors;
                }

                this.$store.commit('setIsPageLoading', false, { root: true });
            } 
        },
        cancel() {
            if (!this.newDoctorMode) {
                this.setDoctor();
                this.editMode = false;
                this.error = null;
                this.formInvalid = false;
            }
            else {
                this.$emit('cancel');
            }
        },
        validateForm() {
            this.resetFormValidation();

            let missingValue = false;
            let noSpecialties = false;
            
            if (this.doctor.title.value === null) {
                this.doctor.title.valid = false;
                this.formInvalid = true;

                missingValue = true;
            }

            if (this.doctor.firstName.value === null || this.doctor.firstName.value === '') {
                this.doctor.firstName.valid = false;
                this.formInvalid = true;

                missingValue = true;
            }
            
            if (this.doctor.lastName.value === null || this.doctor.lastName.value === '') {
                this.doctor.lastName.valid = false;
                this.formInvalid = true;

                missingValue = true;
            }

            if (this.doctor.specialties.value.length === 0) {
                this.doctor.specialties.valid = false;
                this.formInvalid = true;

                noSpecialties = true;
            }

            if (this.formInvalid) {
                if (missingValue) {
                    this.error = 'Uzupełnij wszystkie wymagane pola';
                }
                if (noSpecialties) {
                    this.error = (this.error !== null ? this.error + '\n' : '') + 'Wybierz przynajmniej jedną specjalizację';
                }
            }
        },
        resetFormValidation() {
            this.doctor.title.valid = true;
            this.doctor.firstName.valid = true;
            this.doctor.lastName.valid = true;

            this.formInvalid = false;
            this.error = null;
        },
        getSpecialtyIdByName(name) {
            return this.allSpecialties.find(s => s.name === name).id;
        }
    },
    async beforeMount() {
        if (!this.newDoctorMode) {
            this.setDoctor();
        }
        else {
            this.editMode = true;
        }
        this.pageLoaded = true;
    }
}
</script>

<style scoped>
h2 {
    text-align: center;
    margin-bottom: 3rem;
}

li {
    list-style: none;
}

form {
  margin: 1rem;
  text-align: center;
}

section {
    margin: 1rem 0;
}

.form-control {
  margin: 1.5rem 0;
  display: flex;
  align-items: center;
}

label {
  font-weight: bold;
  min-width: 20%;
  text-align: left;
}

input {
  display: block;
  width: 100%;
  font: inherit;
  border: none;
  background-color: #fff;
  border: 2px solid #aaa;
  border-radius: 30px;
  padding: 12px 24px;
  font-size: 16px;
  width: 100%;
  outline: none;
}

input::placeholder {
    color: #3b3b3b;
    padding-left: 5px;
}

input:focus {
  outline: none;
  border-color: #5162c2;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
}

input.error {
  outline: none;
  border-color: #d34646;
  box-shadow: 0 0 3px #d34646;
  color: #b83f3f;
}

input.error::placeholder {
    color: #b83f3f;
}

select {
    font: inherit;
    border: none;
    background-color: #fff;
    border: 2px solid #aaa;
    border-radius: 30px;
    padding: 11px 24px;
    font-size: 16px;
    max-height: 3rem;
    margin-top: 3px;
    outline: none;
} 

select.error {
  outline: none;
  border-color: #d34646;
  box-shadow: 0 0 3px #d34646;
  color: #b83f3f;
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
}

select option:hover {
  background-color: #e5e5e5;
}

p.error {
    color: #b83f3f; 
}

.actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 3rem;
}

.actions button {
    padding: 0.8rem 3rem;
}

.action-red {
    background-color: #f75f5f;
    border: 1px solid #f75f5f;
}

.action-red:hover,
.action-red:active {
  background-color: #dd5555;
  border-color: #dd5555;
}
</style>