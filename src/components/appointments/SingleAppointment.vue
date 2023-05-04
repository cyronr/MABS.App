<template>
    <base-card>
        <div class="appointment-section status">
            <h3 :class="status">
                {{ statusName }}
            </h3>
        </div>
        <div class="appointment-section">
            <h2>
                <span class="doctor-title"> {{ title }} </span> {{ doctorName }}
            </h2>
        </div>
        <div class="appointment-section">
            <base-badge v-for="specialty in appointment.doctor.specialties" :key="specialty.name"
                :title="specialty.name" type="doctor-specialty"
            ></base-badge>
        </div>
        <div class="appointment-section date">
            <div class="section-icon">
                <i class="fa-regular fa-calendar-days"></i>
            </div> 
            <span> {{ date }}, godz. {{ time }}  </span>
        </div>
        <div class="appointment-section place">
            <div class="section-icon">
                <i class="fa-solid fa-location-dot"></i>
            </div> 
            <span> {{ facilityName }} - </span>
            <span class="address"> {{ address }} </span>
        </div>
        <div v-if="confirmVisible" class="appointment-section confirmation-code">
            <label for="confirmationCode">Kod potwierdzenia:</label>
            <input type="text" id="confirmationCode" maxlength="6" inputmode="numeric" v-model.trim="confirmationCode.value" @input="cutNonNumeric" :class="{error: !confirmationCode.valid}" />
        </div>
        <div v-if="actionsVisible" class="appointment-section actions">
            <base-button v-if="confirmVisible" @click="confirmAppointment">Potwierdź</base-button>
            <base-button v-if="cancelVisible" class="action-red" @click="cancelAppointment">Odwołaj</base-button>
        </div>
    </base-card>
    <confirm-dialog :show="cancelDialogVisible" title="Odwołaj wizytę" @confirmClick='cancelAppointmentConfirm' @cancelClick='cancelAppointmentCancel'>
        <p>Czy na pewno chcesz odwołać wizytę?</p>
    </confirm-dialog>
</template>

<script>
import { AppointmentStatus } from '../../consts';

export default {
    props: ['appointment'],
    emits: ['cancel-appointment', 'confirm-appointment'],
    data() {
        return {
            cancelDialogVisible: false,

            confirmationCode: {
                value: '',
                valid: true
            }
        }
    },
    computed: {
        date() {
            const [year, month, day] = this.appointment.date.split('-');
            return `${day}.${month}.${year}`;
        },
        time() {
            // eslint-disable-next-line no-unused-vars
            const [hour, minute, second] = this.appointment.time.split(':');
            return `${hour}:${minute}`;
        },
        address() {
            const postalCode = this.appointment.address.postalCode;
            const city = this.appointment.address.city;
            const streeType = this.appointment.address.streetType.shortName;
            const streeName = this.appointment.address.streetName;
            const houseNumber = this.appointment.address.houseNumber;
            const flatNumber = this.appointment.address.flatNumber;

            return `${postalCode} ${city}, ${streeType} ${streeName} ${houseNumber} ${flatNumber !== null ? ` lok. ${flatNumber}` : '' }`;
        },
        facilityName() {
            return `${this.appointment.facility.shortName}`;
        },
        title() {
            return this.appointment.doctor.title.shortName;
        },
        doctorName() {
            return `${this.appointment.doctor.firstname} ${this.appointment.doctor.lastname}`;
        },
        statusName() {
            const status = this.appointment.status;
            if (status === AppointmentStatus.Prepared) {
                return "Zarezerwowana (wymaga potwierdzenia)";
            }
            else if (status === AppointmentStatus.Confirmed) {
                return "Potwierdzona";
            }
            else if (status === AppointmentStatus.Cancelled) {
                return "Odwołana";
            }
            else {
                return "";
            }
        },
        status() {
            const status = this.appointment.status;
            if (status === AppointmentStatus.Prepared) {
                return "prepared";
            }
            else if (status === AppointmentStatus.Confirmed) {
                return "confirmed";
            }
            else if (status === AppointmentStatus.Cancelled) {
                return "cancelled";
            }
            else {
                return "";
            }
        },
        actionsVisible() {
            return this.confirmVisible || this.cancelVisible;
        },
        confirmVisible() {
            return this.appointment.status === AppointmentStatus.Prepared;
        },
        cancelVisible() {
            const status = this.appointment.status;
            const now = new Date();
            const appointmentDate = new Date(`${this.appointment.date}T${this.appointment.time}`);

            return status !== AppointmentStatus.Cancelled && appointmentDate > now;
        }
    },
    methods: {
        cutNonNumeric() {
            this.confirmationCode.value = this.confirmationCode.value.replace(/\D/g, '');
        },
        cancelAppointment() {
            this.cancelDialogVisible = true;
        },
        cancelAppointmentConfirm() {
            this.cancelDialogVisible = false;
            this.$emit('cancel-appointment', this.appointment.id);
        },
        cancelAppointmentCancel() {
            this.cancelDialogVisible = false;
        },
        confirmAppointment() {
            this.confirmationCode.valid = true;
            if (this.confirmationCode.value === '' || this.confirmationCode.value.length !== 6) {
                this.confirmationCode.valid = false;
                return;
            }

            this.$emit('confirm-appointment', {
                appointmentId: this.appointment.id,
                confimationCode: this.confirmationCode.value
            });
        }
    }
}
</script>

<style scoped>
.appointment-section {
    display: flex;
}

.section-icon {
    margin-right: 1rem;
    font-size: 1.5rem;
}

.date,
.place {
    display: flex;
    align-items: center;
    margin: 2rem 0 2rem 1.3rem;
    font-size: 1.2rem;
}

.doctor-title {
    font-size: smaller;
}

.address {
    margin-left: 0.3rem;
    font-weight: bolder;
}

.status {
    justify-content: right;
    margin-right: 1rem;
    margin-top: 0.5rem;
}

.status h3 {
    margin: 0;
}

.cancelled {
    color: #dd5555;
}

.confirmed {
    color: #61d357;
}

.prepared {
    color: #818181;
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

.confirmation-code {
    display: flex;
    align-items: center;
    margin: 3rem 0 0 1.3rem;
}

label {
  font-weight: bold;
  min-width: 20%;
  text-align: left;
}

input {
  display: block;
  width: 6.9rem;
  font: inherit;
  border: none;
  background-color: #fff;
  border: 2px solid #aaa;
  border-radius: 30px;
  padding: 12px 24px;
  outline: none;
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
</style>