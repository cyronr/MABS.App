<template>
    <li v-if="pageLoaded">
        <base-card>
            <h2 v-if="newAddressMode">Dodaj nowy adres</h2>
            <form @submit.prevent>
                <section>
                    <div class="form-section">
                        <div class="form-control name">
                            <label for="name">Nazwa adresu</label>
                            <input type="text" id="name" v-model="address.name.value" :class="{ error: !address.name.valid }" :disabled="!editMode" />     
                        </div>
                    </div>
                    <div class="form-section">
                        <div class="form-control zipCode">
                            <label for="zipCode">Kod pocztowy</label>
                            <input type="text" id="zipCode" v-mask="'##-###'" v-model="address.zipCode.value" :class="{ error: !address.zipCode.valid }" :disabled="!editMode" />     
                        </div>
                        <div class="form-control city">
                            <label for="city">Miejscowość</label>
                            <input type="text" id="city" v-model="address.city.value" :class="{ error: !address.city.valid }" :disabled="!editMode" />     
                        </div>
                    </div>
                    <div class="form-section">
                        <div class="form-control streetType">
                            <label for="streetType">Ulica</label>
                            <select v-model="address.streetType.value" id="streetType" :disabled="!editMode" :class="{ error: !address.streetType.valid }" >
                                <option v-for="streetType in streetTypes" :key="streetType.id" :value="streetType.id">
                                    {{ streetType.shortName }}
                                </option>
                            </select>
                        </div>
                        <div class="form-control streetName">
                            <input type="text" id="street" v-model="address.streetName.value" :class="{ error: !address.streetName.valid }" :disabled="!editMode" />   
                        </div>
                        <div class="form-control streetNumber">
                            <label for="houseNumber">Nr domu</label>
                            <input type="number" id="houseNumber" v-model="address.houseNumber.value" :class="{ error: !address.houseNumber.valid }" :disabled="!editMode" />  
                        </div>
                        <div class="form-control streetNumber">
                            <label for="flatNumber">Nr lokalu</label>
                            <input type="number" id="flatNumber" v-model="address.flatNumber.value" :class="{ error: !address.flatNumber.valid }" :disabled="!editMode" /> 
                        </div>           
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
        :show="confirmRemoveDialogOpened" 
        title="Potwierdzenie"
        @cancelClick="removeCancel" 
        @confirmClick="removeConfirm"
    >
        <p>Czy na pewno chcesz usunąć adres: {{ this.address.name.value}}?</p>
    </confirm-dialog>
</template>

<script>
export default {
    props: {
        id: String,
        name: String,
        zipCode: String,
        city: String,
        streetType: Object,
        streetName: String,
        houseNumber: Number,
        flatNumber: Number,

        newAddressMode: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    emits: ['removeAddress', 'addAddress', 'updateAddress', 'cancel'],
    data() {
        return {
            address: {
                name: {
                    value: null,
                    valid: true
                },
                zipCode: {
                    value: null,
                    valid: true
                },
                city: {
                    value: null,
                    valid: true
                },
                streetType: {
                    value: null,
                    valid: true
                },
                streetName: {
                    value: null,
                    valid: true
                },
                houseNumber: {
                    value: null,
                    valid: true
                },
                flatNumber: {
                    value: null,
                    valid: true
                }
            },

            editMode: false,
            formInvalid: false,
            error: null,

            confirmRemoveDialogOpened: false,

            pageLoaded: false
        }   
    },
    computed: {
        streetTypes() {
            return this.$store.getters['facilities/streetTypes']; 
        }
    },
    methods: {
        setAddress() {
            this.address.name.value = this.name;
            this.address.zipCode.value = this.zipCode;
            this.address.city.value = this.city;
            this.address.streetType.value = this.getStreetTypeIdByName(this.streetType.shortName);
            this.address.streetName.value = this.streetName;
            this.address.houseNumber.value = this.houseNumber;
            this.address.flatNumber.value = this.flatNumber;
        },
        edit() {
            this.editMode = true;
        },
        remove() {
            this.confirmRemoveDialogOpened = true;
        },
        removeCancel() {
            this.confirmRemoveDialogOpened = false;
        },
        removeConfirm() {
            this.confirmRemoveDialogOpened = false;
            this.$emit('removeAddress', this.id);
        },
        async save() {
            this.validateForm();
            if (this.formInvalid) {
                return;
            }
        
            const address = {
                id: this.id,
                name: this.address.name.value,
                city: this.address.city.value,
                postalCode: this.address.zipCode.value,
                streetTypeId: this.address.streetType.value,
                streetName: this.address.streetName.value,
                houseNumber: this.address.houseNumber.value,
                flatNumber: this.address.flatNumber.value,
                countryId: 'PL'
            }
            
            if (this.newAddressMode) {
                this.$emit('addAddress', address);
            }
            else {
                this.$emit('updateAddress', address);
            }

            this.editMode = false;
        },
        cancel() {
            if (!this.newAddressMode) {
                this.setAddress();
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
            
            if (this.address.name.value === null || this.address.name.value === '') {
                this.address.name.valid = false;
                this.formInvalid = true;
            }

            if (this.address.zipCode.value === null || this.address.zipCode.value === '') {
                this.address.zipCode.valid = false;
                this.formInvalid = true;
            }

            if (this.address.city.value === null || this.address.city.value === '') {
                this.address.city.valid = false;
                this.formInvalid = true;
            }

            if (this.address.streetType.value === null) {
                this.address.streetType.valid = false;
                this.formInvalid = true;
            }

            if (this.address.streetName.value === null || this.address.streetName.value === '') {
                this.address.streetName.valid = false;
                this.formInvalid = true;
            }

            if (this.address.houseNumber.value === null || this.address.houseNumber.value === '') {
                this.address.houseNumber.valid = false;
                this.formInvalid = true;
            }

            if (this.formInvalid) {
                this.error = 'Uzupełnij wszystkie wymagane pola';
            }
        },
        resetFormValidation() {
            this.address.name.valid = true;
            this.address.zipCode.valid = true;
            this.address.city.valid = true;
            this.address.streetType.valid = true;
            this.address.streetName.valid = true;
            this.address.houseNumber.valid = true;
            this.address.flatNumber.valid = true;

            this.formInvalid = false;
            this.error = null;
        },
        getStreetTypeIdByName(shortName) {
            return this.streetTypes.find(st => st.shortName === shortName).id;
        }
    },
    async beforeMount() {
        if (!this.newAddressMode) {
            this.setAddress();
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

.form-section {
    display: flex;
}

.form-control {
  margin: 1.5rem 0;
}

label {
    font-weight: bold;
    display: block;
    text-align: left;
    margin-left: 1rem;
    margin-bottom: 0.7rem;
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
    /* margin-top: 3px; */
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

.name {
    width: 80%;
}

.zipCode {
    width: 20%;
    margin-right: 1.5rem;
}

.city {
    width: 80%;
}

.streetType {
    margin-right: 0.5rem;
}

.streetName {
    width: 70%;
}

.streetNumber {
    margin-left: 0.5rem;
    width: 15%;
}

.streetName input {
    margin-top: 1.9rem;
}

</style>