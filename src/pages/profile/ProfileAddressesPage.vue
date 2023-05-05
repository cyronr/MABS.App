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
import FacilityAddress from '../../components/facilities/FacilityAddress.vue';

export default {
    components: {
        FacilityAddress
    },
    data() {
        return {
            error: null,
            
            newAddressFormVisible: false,
            pageLoaded: false
        }
    },
    computed: {
        facility() {
            return this.$store.getters['facilities/facility'];
        },
        addresses() {
            return this.$store.getters['facilities/addresses'];
        },
        showNewAddressButton() {
            return !this.newAddressFormVisible;
        },
        authToken() {
            return this.$store.getters['auth/token'];
        }
    },
    methods: {
        async fetchAddresses() {
            this.$store.dispatch('facilities/getAddresses');
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

            await this.$store.dispatch('facilities/deleteAddress', { addressId: addressId });
        },
        async addAddress(address) {
            await this.$store.dispatch('facilities/addAddress', address);
            this.newAddressFormVisible = false;
        },
        async updateAddress(address) {
            await this.$store.dispatch('facilities/updateAddress', address);
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
    box-shadow: 0 0 10px rgba(118, 138, 253, 0.35);
}
</style>