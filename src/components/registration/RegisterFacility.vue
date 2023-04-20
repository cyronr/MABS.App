<template>
    <form @submit.prevent="register">
        <h3>Zarejestruj się jako placówka medyczna</h3>
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
                <input type="text" id="shortName" placeholder="Skrócona nazwa placówki" />       
            </div>
            <div class="form-control">
                <input type="text" id="fullName" placeholder="Pełna nazwa placówki" />       
            </div>
            <div class="form-control">
                <input type="text" id="taxIdentificationNumber" placeholder="Numer NIP" />       
            </div>
        </section>
        <div class="separator"></div>
        <section>
            <div class="form-control-address">
                <input type="text" id="zipCode" placeholder="Kod pocztowy" :class="{ 'address-zipCode': true }"/>     
                <input type="text" id="city" placeholder="Miejscowość" :class="{ 'address-city': true }"/>     
            </div>
            <div class="form-control-address">
                <input type="text" id="street" placeholder="Ulica" :class="{ 'address-street': true }" />     
                <input type="text" id="houseNumber" placeholder="Nr domu" :class="{ 'address-street-no': true }" />  
                <input type="text" id="flatNumber" placeholder="Nr lokalu" :class="{ 'address-street-no': true }" />       
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

.form-control-address {
    display: flex;
}

.form-control input {
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

.form-control-address input {
    margin: 0.2rem 0.2rem;
}

input {
  font: inherit;
  padding: 0.15rem;
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
}
</style>