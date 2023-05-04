<template>
    <base-card v-if="patient">
        <form @submit.prevent>
            <section>
                <div class="form-control">
                    <label for="firstName">Imię: </label>
                    <input type="text" id="firstName" v-model="firstName.value" :disabled="!editMode" :class="{error: !firstName.valid}" />       
                </div>
                <div class="form-control">
                    <label for="lastName">Nazwisko: </label>
                    <input type="text" id="lastName" v-model="lastName.value" :disabled="!editMode" :class="{error: !lastName.valid}" />       
                </div>
            </section>
            <section v-if="formInvalid">
                <p class="error" v-html="error.replace('\n', '<br/>')"></p>
            </section>
            <section class="actions">
                <base-button v-if="!editMode" @click="edit">Edytuj</base-button>
                <base-button v-if="editMode" @click="save">Zapisz</base-button>
                <base-button v-if="editMode" @click="cancel" class="action-red">Anuluj</base-button>
            </section>
        </form>
    </base-card>
    <confirm-dialog 
        :show="confirmDialogVisible" 
        title="Potwierdzenie"
        @cancelClick="cancelOperation" 
        @confirmClick="confirmOperation"
    >
        <p>Czy na pewno chcesz zapisać wprowadzone zmiany?</p>
    </confirm-dialog>
</template>

<script>
export default {
    data() {
        return {
            firstName: {
                value: '',
                valid: true
            },
            lastName: {
                value: '',
                valid: true
            },

            editMode: false,
            formInvalid: false,
            error: null,

            confirmDialogVisible: false
        }
    },
    computed: {
        patient() {
            return this.$store.getters['patients/patient'];
        },
        currentLoggedProfile() {
            return this.$store.getters['auth/loggedProfile'];
        }
    },
    methods: {
        save() {
            this.validateForm();
            if (this.formInvalid) {
                return;
            }

            this.confirmDialogVisible = true;
        },
        edit() {
            this.editMode = true;
        },
        cancel() {
            this.setFormValues();
            this.resetFormValidation();
            this.editMode = false;
            this.error = null;
            this.formInvalid = false;
        },
        cancelOperation() {
            this.confirmDialogVisible = false;
            this.cancel();
        },
        async confirmOperation() {
            this.confirmDialogVisible = false;

            try {
                await this.$store.dispatch('patients/updatePatient', {
                    patientId: this.patient.id,
                    firstName: this.firstName.value,
                    lastName: this.lastName.value
                });
                
                this.setFormValues();
                this.editMode = false;
            } 
            catch (error) {
                this.formInvalid = true;
                this.error = error.message || 'Niepoprawne dane.';
            }
        },  
        validateForm() {
            this.resetFormValidation();

            if (this.firstName.value === '') {
                this.firstName.valid = false;
                this.formInvalid = true;
            }

            if (this.lastName.value === '') {
                this.lastName.valid = false;
                this.formInvalid = true;
            }

            if (this.formInvalid) {
                this.error = 'Uzupełnij wszystkie wymagane pola';
            }
        },
        resetFormValidation() {
            this.firstName.valid = true;
            this.lastName.valid = true;

            this.formInvalid = false;
            this.error = null;
        },
        setFormValues() {
            this.firstName.value = this.patient.firstname;
            this.lastName.value = this.patient.lastname;
        }
    },
    async beforeMount() {
        this.setFormValues();
    }
}
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
  text-align: center;
}

section {
    margin: 2rem 0;
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

p.error {
    color: #b83f3f; 
}

button {
    padding: 1rem 3rem;
}

.actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 3rem;
    margin-bottom: 0;
    padding-bottom: 0;
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