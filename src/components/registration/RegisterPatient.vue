<template>
    <form @submit.prevent="register">
        <h3>Zarejestruj się jako pacjent</h3>
        <section>
            <div class="form-control">
                <input type="email" id="email" placeholder="Adres e-mail" />               
            </div>
        </section>
        <section>
            <div class="form-control">
                <input type="password" id="password" placeholder="Hasło" />               
            </div>
            <div class="form-control">
                <input type="password" id="repeteadPassword" placeholder="Powtórz hasło" />               
            </div>
        </section>
        <div class="separator"></div>
        <section>
            <div class="form-control">
                <input type="text" id="firstname" placeholder="Imię" />       
            </div>
            <div class="form-control">
                <input type="text" id="lastname" placeholder="Nazwisko" />       
            </div>
            <div class="form-control">
                <input type="text" id="phone" placeholder="Numer telefonu" />       
            </div>
        </section>
        <section>
            <base-button class="register-button">Zarejestruj</base-button>
        </section>
    </form>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        register() {

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