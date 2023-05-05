<template>
    <base-card v-if="facility">
        <form @submit.prevent>
            <section>
                <div class="form-control">
                    <label for="shortName">Nazwa skrócona: </label>
                    <input type="text" id="shortName" v-model="shortName.value" :disabled="!editMode" :class="{error: !shortName.valid}" />       
                </div>
                <div class="form-control">
                    <label for="fullName">Pełna nazwa: </label>
                    <input type="text" id="fullName" v-model="fullName.value" :disabled="!editMode" :class="{error: !fullName.valid}" />       
                </div>
                <div class="form-control">
                    <label for="taxIdentificationNumber">NIP: </label>
                    <input type="text" id="taxIdentificationNumber" v-mask="'###-###-##-##'" v-model="taxIdentificationNumber.value" :disabled="!editMode" :class="{error: !taxIdentificationNumber.valid}" />       
                </div>
            </section>
            <section v-if="formInvalid">
                <p class="error" v-html="error.replace('\n', '<br/>')"></p>
            </section>
            <section class="actions">
                <base-button v-if="!editMode" @click="edit">Edytuj</base-button>
                <base-button v-if="editMode" @click="save">Zapisz</base-button>
                <base-button v-if="editMode" @click="cancel" mode="negative">Anuluj</base-button>
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
            shortName: {
                value: '',
                valid: true
            },
            fullName: {
                value: '',
                valid: true
            },
            taxIdentificationNumber: {
                value: null,
                valid: true
            },

            editMode: false,
            formInvalid: false,
            error: null,

            confirmDialogVisible: false
        }
    },
    computed: {
        facility() {
            return this.$store.getters['facilities/facility'];
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
                await this.$store.dispatch('facilities/updateFacility', {
                    facilityId: this.facility.id,
                    shortName: this.shortName.value,
                    name: this.fullName.value,
                    taxIdentificationNumber: this.taxIdentificationNumber.value.toString().replace(/-/g, '')
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

            if (this.shortName.value === '') {
                this.shortName.valid = false;
                this.formInvalid = true;
            }

            if (this.fullName.value === '') {
                this.fullName.valid = false;
                this.formInvalid = true;
            }
            
            if (this.taxIdentificationNumber.value === '') {
                this.taxIdentificationNumber.valid = false;
                this.formInvalid = true;
            }

            if (this.formInvalid) {
                this.error = 'Uzupełnij wszystkie wymagane pola';
            }
        },
        resetFormValidation() {
            this.shortName.valid = true;
            this.fullName.valid = true;
            this.taxIdentificationNumber.valid = true;

            this.formInvalid = false;
            this.error = null;
        },
        setFormValues() {
            this.shortName.value = this.facility.shortName;
            this.fullName.value = this.facility.name;
            this.taxIdentificationNumber.value = this.facility.taxIdentificationNumber;
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
</style>