<template>
    <form @submit.prevent="register">
        <h3>Zarejestruj się jako placówka medyczna</h3>
        <section>
            <div class="form-control">
                <input type="email" id="email" placeholder="Adres e-mail" v-model="email.value" :class="{error: !email.valid}" />               
            </div>
        </section>
        <section>
            <div class="form-control">
                <input type="password" id="password" placeholder="Hasło" v-model="password.value" :class="{error: !password.valid}" />               
            </div>
            <div class="form-control">
                <input type="password" id="repeteadPassword" placeholder="Powtórz hasło" v-model="repeatedPassword.value" :class="{error: !repeatedPassword.valid}" />               
            </div>
        </section>
        <section>
            <div class="form-control">
                <input type="phone" id="phone" placeholder="Numer telefonu" v-mask="'#########'" v-model.number="phone.value" :class="{error: !phone.valid}" />      
            </div>
        </section>
        <div class="separator"></div>
        <section>
            <div class="form-control">
                <input type="text" id="shortName" placeholder="Skrócona nazwa placówki" v-model="shortName.value" :class="{error: !shortName.valid}" />       
            </div>
            <div class="form-control">
                <input type="text" id="fullName" placeholder="Pełna nazwa placówki" v-model="fullName.value" :class="{error: !fullName.valid}" />       
            </div>
            <div class="form-control">
                <input type="text" id="taxIdentificationNumber" placeholder="Numer NIP" v-mask="'###-###-##-##'" v-model="taxIdentificationNumber.value" :class="{error: !taxIdentificationNumber.valid}" />       
            </div>
        </section>
        <div class="separator"></div>
        <section>
            <div class="form-control-address">
                <input type="text" id="zipCode" placeholder="Kod pocztowy" v-mask="'##-###'" v-model="zipCode.value" :class="{ 'address-zipCode': true, error: !zipCode.valid }"/>     
                <input type="text" id="city" placeholder="Miejscowość" v-model="city.value" :class="{ 'address-city': true, error: !city.valid }"/>     
            </div>
            <div class="form-control-address">
                <select v-model="streetType.value" id="streetType-select">
                    <option v-for="streetType in streetTypes" :key="streetType.id" :value="streetType.id">
                        {{ streetType.shortName }}
                    </option>
                </select>
                <input type="text" id="street" placeholder="Ulica" v-model="street.value" :class="{ 'address-street': true, error: !street.valid }" />     
                <input type="number" id="houseNumber" placeholder="Nr domu" v-model="houseNumber.value" :class="{ 'address-street-no': true, error: !houseNumber.valid }" />  
                <input type="number" id="flatNumber" placeholder="Nr lokalu" v-model="flatNumber.value" :class="{ 'address-street-no': true, error: !flatNumber.valid }" />       
            </div>
        </section>
        <p v-if="formInvalid" class="error" v-html="error.replace('\n', '<br/>')"></p>
        <section>
            <base-button class="register-button">Zarejestruj</base-button>
        </section>
    </form>
</template>

<script>
import { ERROR_DEFAULT_MSG } from '../../consts';

export default {
    data() {
        return {
            email: {
                value: '',
                valid: true
            },
            password: {
                value: '',
                valid: true
            },
            repeatedPassword: {
                value: '',
                valid: true
            },
            phone: {
                value: null,
                valid: true
            },
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
            zipCode: {
                value: null,
                valid: true
            },
            city: {
                value: '',
                valid: true
            },
            streetType: {
                value: 1,
                valid: true
            },
            street: {
                value: '',
                valid: true
            },
            houseNumber: {
                value: null,
                valid: true
            },
            flatNumber: {
                value: null,
                valid: true
            },

            formInvalid: false,
            error: null
        }
    },
    computed: {
        streetTypes() {
            return this.$store.getters['facilities/streetTypes']; 
        }
    },
    methods: {
        async register() {
            this.validateForm();
            if (this.formInvalid) {
                return;
            }
            
            try {
                await this.$store.dispatch('auth/registerFacility', {
                    email: this.email.value,
                    password: this.password.value,
                    phoneNumber: this.phone.value.toString(),
                    shortName: this.shortName.value,
                    name: this.fullName.value,
                    taxIdentificationNumber: this.taxIdentificationNumber.value.toString().replace(/-/g, ''),
                    addressName: 'Główny adres',
                    streetType: this.streetType.value,
                    streetName: this.street.value,
                    houseNumber: this.houseNumber.value,
                    flatNumber: this.flatNumber.value,
                    city: this.city.value,
                    postalCode: this.zipCode.value,
                });
                
                this.resetFormValues();
                this.$router.replace('/profile');
            } 
            catch (error) {
                this.formInvalid = true;
                this.error = error.message || 'Niepoprawne dane.';
            }
        },
        async loadStreetTypes() {
            try {
                await this.$store.dispatch('facilities/getStreetTypes');
            }
            catch (error) {
                this.error = ERROR_DEFAULT_MSG;
            }
        },
        validateForm() {
            this.resetFormValidation();

            let missingValue = false;
            let differentPasswords = false;

            if (this.email.value === '') {
                this.email.valid = false;
                this.formInvalid = true;

                missingValue = true;
            }

            if (this.password.value === '') {
                this.password.valid = false;
                this.formInvalid = true;

                missingValue = true;
            }

            if (this.repeatedPassword.value === '') {
                this.repeatedPassword.valid = false;
                this.formInvalid = true;

                missingValue = true;
            }

            if (this.shortName.value === '') {
                this.shortName.valid = false;
                this.formInvalid = true;

                missingValue = true;
            }

            if (this.fullName.value === '') {
                this.fullName.valid = false;
                this.formInvalid = true;

                missingValue = true;
            }

            if (this.phone.value === null) {
                this.phone.valid = false;
                this.formInvalid = true;

                missingValue = true;
            }

            if (this.taxIdentificationNumber.value === null) {
                this.taxIdentificationNumber.valid = false;
                this.formInvalid = true;

                missingValue = true;
            }

            if (this.zipCode.value === null) {
                this.zipCode.valid = false;
                this.formInvalid = true;

                missingValue = true;
            }

            if (this.city.value === '') {
                this.city.valid = false;
                this.formInvalid = true;

                missingValue = true;
            }

            if (this.street.value === '') {
                this.street.valid = false;
                this.formInvalid = true;

                missingValue = true;
            }

            if (this.houseNumber.value === null) {
                this.houseNumber.valid = false;
                this.formInvalid = true;

                missingValue = true;
            }
          
            if (this.repeatedPassword.value !== '' && this.password.value !== '' && this.password.value !== this.repeatedPassword.value) {
                this.password.valid = false;
                this.repeatedPassword.valid = false;
                this.formInvalid = true;

                differentPasswords = true;
            }

            if (this.formInvalid) {
                if (missingValue) {
                    this.error = 'Uzupełnij wszystkie wymagane pola';
                }
                if (differentPasswords) {
                    this.error = (this.error !== null ? this.error + '\n' : '') + 'Podane hasła się nie zgadzają';
                }
            }
        },
        resetFormValues() {
            this.email.value = '';
            this.password.value = '';
            this.repeatedPassword.value = '';
            this.phone.value = null;
            this.shortName.value = '';
            this.fullName.value = '';
            this.taxIdentificationNumber.value = null;
            this.zipCode.value = null;
            this.city.value = '';
            this.streetType.value = 1;
            this.street.value = '';
            this.houseNumber.value = null;
            this.flatNumber.value = null;
        },
        resetFormValidation() {
            this.email.valid = true;
            this.password.valid = true;
            this.repeatedPassword.valid = true;
            this.phone.valid = true;
            this.shortName.valid = true;
            this.fullName.valid = true;
            this.taxIdentificationNumber.valid = true;
            this.zipCode.valid = true;
            this.city.valid = true;
            this.streetType.valid = true;
            this.street.valid = true;
            this.houseNumber.valid = true;
            this.flatNumber.valid = true;

            this.formInvalid = false;
            this.error = null;
        }
    },
    async created() {
        try {
            await this.loadStreetTypes();
        } catch (error) {
            console.error(error);
        }
    }
}
</script>

<style scoped>
h3 {
  font-size: 1.5rem;
  margin-bottom: 4rem;
  text-align: center;
}

form {
  margin: 1rem;
  padding: 1rem;
  text-align: center;
}

section {
    margin: 2rem 0;
}

.form-control {
  margin: 0.5rem 0;
}

.form-control-address {
    display: flex;
}

.form-control input {
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

.form-control-address input {
    margin: 0.2rem 0.2rem;
}

input {
  font: inherit;
  border: none;
  background-color: #fff;
  border: 2px solid #aaa;
  border-radius: 30px;
  padding: 12px 24px;
  font-size: 16px;
  outline: none;
}

input.required {
    border-color: #727272;
}

input.required::placeholder {
    color: #505050;
    padding-left: 5px;
}

input:focus {
  outline: none;
  border-color: #5162c2;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
}

input::placeholder {
    color: #A9A9A9;
    padding-left: 5px;
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
    padding: 6px 8px;
    font-size: 16px;
    max-height: 3rem;
    margin-top: 3px;
    outline: none;
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

.separator {
  border-top: 2px solid #bdbdbd;
  margin: 1rem 0;
  width: 80%;
  display: inline-block;
}

.register-button {
    display: inline-block;
    margin-top: 1rem;
    font-size: 1.2rem;
    width: 35%;
}

.address-zipCode {
    width: 25%;
    margin-right: 0.2rem;
}

.address-city {
    width: 75%;
}

.address-street {
    width: 60%;
}

.address-street-no {
    width: 20%;
    padding: 12px 12px;
}
</style>