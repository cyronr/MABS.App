<template>
    <form @submit.prevent="register">
        <h3>Zarejestruj się jako pacjent</h3>
        <section>
            <div class="form-control">
                <input type="email" id="email" placeholder="Adres e-mail" v-model.trim="email.value" :class="{error: !email.valid}" />               
            </div>
        </section>
        <section>
            <div class="form-control">
                <input type="password" id="password" placeholder="Hasło" v-model.trim="password.value" :class="{error: !password.valid}" />               
            </div>
            <div class="form-control">
                <input type="password" id="repeteadPassword" placeholder="Powtórz hasło" v-model.trim="repeatedPassword.value" :class="{error: !repeatedPassword.valid}" />               
            </div>
        </section>
        <div class="separator"></div>
        <section>
            <div class="form-control">
                <input type="text" id="firstname" placeholder="Imię" v-model.trim="firstName.value" :class="{error: !firstName.valid}" />       
            </div>
            <div class="form-control">
                <input type="text" id="lastname" placeholder="Nazwisko" v-model.trim="lastName.value" :class="{error: !lastName.valid}" />       
            </div>
            <div class="form-control">
                <input type="phone" id="phone" placeholder="Numer telefonu" v-mask="'#########'" v-model.number="phone.value" :class="{error: !phone.valid}" />       
            </div>
        </section>
        <p v-if="formInvalid" class="error" v-html="error.replace('\n', '<br/>')"></p>
        <section>
            <base-button class="register-button">Zarejestruj</base-button>
        </section>
    </form>
</template>

<script>
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
            firstName: {
                value: '',
                valid: true
            },
            lastName: {
                value: '',
                valid: true
            },
            phone: {
                value: null,
                valid: true
            },

            formInvalid: false,
            error: null
        }
    },
    methods: {
        async register() {
            this.validateForm();
            if (this.formInvalid) {
                return;
            }

            try {
                await this.$store.dispatch('auth/registerPatient', {
                    email: this.email.value,
                    password: this.password.value,
                    firstName: this.firstName.value,
                    lastName: this.lastName.value,
                    phone: this.phone.value.toString()
                });
                
                this.$router.replace('/');
            } 
            catch (error) {
                this.formInvalid = true;
                this.error = error.message || 'Niepoprawne dane.';
            }

            this.resetFormValues();
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

            if (this.firstName.value === '') {
                this.firstName.valid = false;
                this.formInvalid = true;

                missingValue = true;
            }

            if (this.lastName.value === '') {
                this.lastName.valid = false;
                this.formInvalid = true;

                missingValue = true;
            }

            if (this.phone.value === null) {
                this.phone.valid = false;
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
            this.firstName.value = '';
            this.lastName.value = '';
            this.phone.value = null;
        },
        resetFormValidation() {
            this.email.valid = true;
            this.password.valid = true;
            this.repeatedPassword.valid = true;
            this.firstName.valid = true;
            this.lastName.valid = true;
            this.phone.valid = true;

            this.formInvalid = false;
            this.error = null;
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

form section {
    margin: 2rem 0;
}

.form-control {
  margin: 0.5rem 0;
}

input {
  display: block;
  width: 100%;
  font: inherit;
  padding: 0.15rem;
  border: none;
  background-color: #fff;
  border: 2px solid #aaa;
  border-radius: 30px;
  padding: 12px 24px;
  font-size: 16px;
  width: 100%;
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
</style>