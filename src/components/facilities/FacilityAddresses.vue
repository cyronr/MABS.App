<template>
    <section class="new-address">
        <div class="centered-button" v-if="showNewAddressButton">
            <base-button @click="toggleNewAddressForm" title="Dodaj nowy adres">
                <i class="fa-solid fa-plus"></i>
            </base-button>
        </div>
        <facility-address v-if="newAddressFormVisible" newAddressMode
            @cancel="toggleNewAddressForm"
            @addAddress="addAddress"
        >
        </facility-address>
    </section>
    <section class="addresss-list">
        <ul v-if="pageLoaded">
            <facility-address v-for="address in addresses" :key="address.id"
                :id="address.id"
                :name="address.name"
                :zipCode="address.postalCode"
                :city="address.city"
                :streetType="address.streetType"
                :streetName="address.streetName"
                :houseNumber="address.houseNumber"
                :flatNumber="address.flatNumber"
                @removeAddress="removeAddress"
                @updateAddress="updateAddress"
            >
            </facility-address>
        </ul>
    </section>
    <base-dialog error :show="!!error" title="Błąd :(" @close="closeErrorDialog">
        <p> {{ error.msg }} </p>
    </base-dialog>
</template>

<script>
import axios from 'axios';
import { API_URL, handleAPIError, API_BUSINESS_ERROR_CODES } from '../../api';
import FacilityAddress from './FacilityAddress';

export default {
    components: {
        FacilityAddress
    },
    data() {
        return {
            addresses: [],

            error: null,
            
            newAddressFormVisible: false,
            pageLoaded: false
        }
    },
    computed: {
        facility() {
            return this.$store.getters['facilities/facility'];
        },
        showNewAddressButton() {
            return !this.newAddressFormVisible;
        }
    },
    methods: {
        async fetchAddresses() {
            this.addresses = [];

            this.$store.commit('setIsPageLoading', true, { root: true })

            try {
                const response = await axios.get(`${API_URL}/facilities/${this.facility.id}`);
                
                this.parseResponse(response);
                this.$store.commit('setIsPageLoading', false, { root: true });
            }
            catch (error) {
                handleAPIError(error);
            } 
        },
        async fetchAddressStreetTypes() {
            await this.$store.dispatch('facilities/getStreetTypes');
        },
        async removeAddress(addressId) {
            if (this.addresses.length === 1) {
                this.error = {
                    title: 'Błąd :(',
                    msg: 'Nie można usunąć adresu. Placówka musi posiadać przynajmniej jeden adres.'
                };
                return;
            }

            this.$store.commit('setIsPageLoading', true, { root: true })

            try {
                const response = await axios.delete(`${API_URL}/facilities/${this.facility.id}/addresses/${addressId}`);
                
                this.parseResponse(response);
                this.$store.commit('setIsPageLoading', false, { root: true });
            }
            catch (error) {
                handleAPIError(error);
            } 
        },
        async addAddress(address) {
            this.$store.commit('setIsPageLoading', true, { root: true })
            try {
                const response = await axios.post(`${API_URL}/facilities/${this.facility.id}/addresses`, address);
                
                this.parseResponse(response);

                this.$store.commit('setIsPageLoading', false, { root: true });
                this.toggleNewAddressForm();
            }
            catch (error) {
                this.error = {
                    msg: 'Nieoczekiwany błąd aplikacji.'
                };

                if (API_BUSINESS_ERROR_CODES.includes(error.response.status)) {
                    const responseErrors = error.response.data.errors;
                    
                    let errors = '';
                    for(const key in responseErrors) {
                        errors += responseErrors[key] + '\n';
                    }

                    if (errors === '') {
                        errors = "Nieoczekiwany błąd aplikacji";
                    }

                    this.error = {
                        msg: errors
                    };
                }

                this.$store.commit('setIsPageLoading', false, { root: true });
            } 
        },
        async updateAddress(address) {
            this.$store.commit('setIsPageLoading', true, { root: true })

            try {
                const response = await axios.put(`${API_URL}/facilities/${this.facility.id}/addresses`, address);
                this.parseResponse(response);

                this.$store.commit('setIsPageLoading', false, { root: true });
            }
            catch (error) {
                this.error = {
                    msg: 'Nieoczekiwany błąd aplikacji.'
                };

                if (API_BUSINESS_ERROR_CODES.includes(error.response.status)) {
                    const responseErrors = error.response.data.errors;
                    
                    let errors = '';
                    for(const key in responseErrors) {
                        errors += responseErrors[key] + '\n';
                    }

                    if (errors === '') {
                        errors = "Nieoczekiwany błąd aplikacji";
                    }

                    this.error = {
                        msg: errors
                    };
                }

                this.$store.commit('setIsPageLoading', false, { root: true });
            } 
        },
        parseResponse(response) {
            this.addresses = [];
            for (var key in response.data.addresses)
            {
                this.addresses.push(response.data.addresses[key]);
            }
        },
        toggleNewAddressForm() {
            this.newAddressFormVisible = !this.newAddressFormVisible;
        },
        closeErrorDialog() {
            this.error = null;
        }
    },
    async beforeMount() {
        await this.fetchAddresses();
        await this.fetchAddressStreetTypes();

        this.pageLoaded = true;
    }
}
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.centered-button {
    display: flex;
    justify-content: center;
}
 .new-address button {
    padding: 0.5rem 10rem;
    background-color: #8e9fff;
    border-color: #8e9fff;
}

.new-address button:hover {
    background-color: #768afd;
    border-color: #768afd;
}
</style>