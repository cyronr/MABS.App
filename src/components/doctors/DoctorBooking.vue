<template>
    <div class="bookings" v-if="bookingsVisible">
        <div class="address">
            <select v-model="selectedAddress" @change="changeAddress">
                <option v-for="address in addresses" :key="address.id" :value="address.id">
                    {{ address.facility.name }}
                    ({{ address.postalCode }} {{ address.city }}, {{ address.streetType.shortName }} {{ address.streetName }} {{ address.houseNumber }})
                </option>
            </select>
        </div>
        <div class="timeSlots">
            <time-slots v-if="timeSlotsVisible" :timeSlots="timeSlots" @select="selectTimeSlot"></time-slots>
            <p v-else class="error"> Dla tego miejsca nie ma aktualnie żadych dostępnych terminów :( </p>
        </div>
    </div>
    <div class="actions">
        <base-button v-if="showBookingsButtonVisible" @click="showBookings">Sprawdź wolne terminy</base-button>
        <base-button v-if="bookAppointmentButtonVisible" @click="bookAppointment" class="book-appointment" :disabled="bookAppointmentButtonDisabled">Zarezerwuj wizytę</base-button>
        <base-button v-if="!showBookingsButtonVisible" @click="hideBookings">Ukryj terminy</base-button>
    </div>
    <div class="error" v-if="!!errorMsg">
        <p> {{ errorMsg }} </p>
    </div>
</template>

<script>
import axios from 'axios';
import { API_URL, handleAPIErrorWithMessage } from '../../api';
import TimeSlots from './TimeSlots.vue';

export default {
    components: {
        TimeSlots
    },
    props: ['doctorId'],
    data() {
        return {
            addresses: [],
            selectedAddress: null,

            timeSlots: [],
            selectedTimeSlot: null,

            bookingsVisible: false,
            showBookingsButtonVisible: true,
            errorMsg: null
        }
    },
    computed: {
        timeSlotsVisible() {
            return this.timeSlots.length > 0;
        },
        bookAppointmentButtonVisible() {
            return !this.isFacilityProfile && this.bookingsVisible;
        },
        bookAppointmentButtonDisabled() {
            return this.selectedTimeSlot === null;
        },
        isLogged() {
            return this.$store.getters['auth/isLogged'];
        },
        isFacilityProfile() {
            return this.$store.getters['auth/isFacilityProfile'];
        },
        currentLoggedProfile() {
            return this.$store.getters['auth/loggedProfile'];
        },
        patient() {
            return this.$store.getters['patients/patient'];
        }, 
        authToken() {
            return this.$store.getters['auth/token'];
        },
        apponitment() {
            return this.$store.getters['appointments/appointment'];
        }
    },  
    methods: {
        async fetchAddresses() {
            this.addresses = [];
            this.$store.commit('setIsPageLoading', true, { root: true })

            try {
                const response = await axios.get(`${API_URL}/doctors/${this.doctorId}/addresses`);
                for (var key in response.data)
                {
                    this.addresses.push(response.data[key]);
                }

                this.$store.commit('setIsPageLoading', false, { root: true });
            }
            catch (error) {
                handleAPIErrorWithMessage(error);
            } 
        },
        async fetchTimeSlots() {
            this.timeSlots = [];
            this.$store.commit('setIsPageLoading', true, { root: true })

            try {
                const response = await axios.get(`${API_URL}/doctors/${this.doctorId}/timeSlots`, {
                    params: {
                        addressId: this.selectedAddress
                    }
                });
                for (var key in response.data)
                {
                    this.timeSlots.push(response.data[key]);
                }

                this.$store.commit('setIsPageLoading', false, { root: true });
            }
            catch (error) {
                handleAPIErrorWithMessage(error);
            } 
        },
        async changeAddress() {
            this.selectedTimeSlot = null;
            await this.fetchTimeSlots();
        },
        async showBookings() {
            await this.fetchAddresses();

            if(this.addresses.length > 0) {
                for(let i = 0; i<this.addresses.length; i++){
                    this.selectedAddress = this.addresses[i].id;
                    await this.fetchTimeSlots();
                    
                    if (this.timeSlots.length > 0) {
                        break;
                    }
                }

                this.bookingsVisible = true;
                this.showBookingsButtonVisible = false;
            }
            else {
                this.errorMsg = 'Ten lekarz aktualnie nie przyjmuje w żadnej placówce :(';
            }
        },
        hideBookings() {
            this.selectedTimeSlot = null;
            this.bookingsVisible = false;
            this.showBookingsButtonVisible = true;
        },
        selectTimeSlot(timeSlot) {
            this.selectedTimeSlot = timeSlot;
        },
        async bookAppointment() {
            if (!this.isLogged) {
                this.$router.push('/login');
                return;
            }

            this.$store.commit('setIsPageLoading', true, { root: true });
            try {

                if (this.patient === null) {
                    await this.$store.dispatch('patients/getPatientByProfile', { profileId: this.currentLoggedProfile.id }, { root: true });
                    this.$store.commit('setIsPageLoading', true, { root: true });
                }

                await this.$store.dispatch('appointments/create', {
                    patientId: this.patient.id,
                    scheduleId: this.selectedTimeSlot.scheduleId,
                    date: this.selectedTimeSlot.date,
                    time: this.selectedTimeSlot.time
                })

                this.$router.push(`/appointments/${this.apponitment.id}`);
            }
            catch (error) {
                handleAPIErrorWithMessage(error);
            } 
        }
    }
}
</script>

<style scoped>
.bookings {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    justify-content: center;
}
.actions {
  display: flex;
  margin-top: 1rem;
  justify-content: flex-end;
}

.address,
.timeSlots {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 2rem;
}

.error {
    display: flex;
    justify-content: center;
    color: #b83f3f; 
    margin-top: 1rem;
    font-weight: bolder;
}

select {
    border: none;
    background-color: #fff;
    border: 2px solid #5c6bc0;
    border-radius: 30px;
    padding: 6px 24px;
    font-size: 1rem;
    outline: none;
    margin: 0 0.5rem;
    width: 100%;
} 

select:focus {
    border-color: #5162c2;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
} 

select option {
  background-color: #f1f1f1;
  color: #333;
  font-size: 1rem;
  padding: 8px 24px;
  border-bottom: 1px solid #ccc;
  transition: background-color 0.2s ease;
}

select option:hover {
  background-color: #e5e5e5;
}

.book-appointment {
    background-color: #30d121;
    border-color: #30d121;
}

.book-appointment:hover {
    background-color: #1ac00b;
    border-color: #1ac00b;
}

button:disabled {
    background-color: #ccc;
    border-color: #ccc;
    cursor: default;
}

button:disabled:hover {
    background-color: #ccc;
    border-color: #ccc;
    cursor: default;
}
</style>