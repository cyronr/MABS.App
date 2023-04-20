<template>
    <base-page>
        <base-card>
            <h1>Zaloguj się</h1>
            <form @submit.prevent="login">
                <div class="form-control">
                    <!-- type="email" -->
                    <input type="text" id="email" v-model.trim="email" :class="{error: emailInvalid}" placeholder="Adres e-mail"/>               
                </div>
                <div class="form-control">
                    <input type="password" id="password" v-model.trim="password" :class="{error: passwordInvalid}" placeholder="Hasło"/>
                </div>
                <p v-if="formError" class="error"> {{ error }} </p>
                <base-button type="submit" class="loginButton">Zaloguj</base-button>
                <div class="register">
                    <router-link to="/register">Zarejestruj nowe konto</router-link>
                </div>
            </form>
        </base-card>
    </base-page>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',

            emailInvalid: false,
            passwordInvalid: false,
            
            error: null
        }
    },
    computed: {
        formError() {
            return this.emailInvalid || this.passwordInvalid || !!this.error;
        }
    },
    methods: {
        async login() {
            this.checkForm();
            
            if (this.formError) {
                return;
            }

            try {
                await this.$store.dispatch('auth/login', {
                    email: this.email,
                    password: this.password
                });
                //this.$router.replace('/' + (this.$route.query.redirect || 'coaches'));
            } 
            catch (error) {
                this.error = error.message || 'Niepoprawne dane.';
            }
        },
        checkForm() {
            this.emailInvalid = false;
            this.passwordInvalid = false;
            this.error = null;

            const errorMsg = "Podaj adres e-mail oraz hasło";

            if (this.email === '') {
                this.emailInvalid = true;
                this.error = errorMsg;
            }

            if (this.password === '') {
                this.passwordInvalid = true;
                this.error = errorMsg;
            }
        }
    }
}
</script>

<style scoped>
h1 {
  font-size: 2rem;
  margin: 0.5rem 0;
  text-align: center;
}

form {
  margin: 1rem;
  padding: 1rem;
  text-align: center;
}

.form-control {
  margin: 1.5rem 0;
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

.loginButton {
    display: inline-block;
    margin-top: 1rem;
    font-size: 1.2rem;
    width: 35%;
}
.register {
  margin-top: 2.5rem;
  display: inline-block;
  border-top: 2px solid #bdbdbd;
  width: 80%;
  padding-top: 1.5rem; 
}

.register a {
    text-decoration: none;
    color: #7a7a7a;
}

.register a:hover {
    color: #2e2e2e;
    cursor: pointer;
}
</style>