<template>
    <base-card>
        <form @submit.prevent="">
            <section>
                <div class="form-section">
                    <div class="form-section-description">
                        <label>Przyjmuje:</label>
                    </div>
                    <div class="form-control dayOfWeek">
                        <label for="dayOfWeek">W każdy:</label>
                        <select id="dayOfWeek" v-model="schedule.dayOfWeek.value" :disabled="!editMode" :class="{error: !schedule.dayOfWeek.valid}">
                            <option :value="null">Wybierz</option>
                            <option value="1">Poniedziałek</option>
                            <option value="2">Wtorek</option>
                            <option value="3">Środa</option>
                            <option value="4">Czwartek</option>
                            <option value="5">Piątek</option>
                            <option value="6">Sobota</option>
                            <option value="0">Niedziela</option>
                        </select>
                    </div>
                    <div class="form-control startTime">
                        <label for="startTime">Od:</label>
                        <input type="time" id="startTime" v-model="schedule.startTime.value" :disabled="!editMode" :class="{error: !schedule.startTime.valid}">
                    </div>
                    <div class="form-control endTime">
                        <label for="endTime">Do:</label>
                        <input type="time" id="endTime" v-model="schedule.endTime.value" :disabled="!editMode" :class="{error: !schedule.endTime.valid}">
                    </div>
                    <div class="form-control appointmentDuration">
                        <label for="appointmentDuration">Czas trawnia wizyty:</label>
                        <input type="number" id="appointmentDuration" v-model="schedule.appointmentDuration.value" v-on:blur="checkAppointmentDuration" :disabled="!editMode" :class="{error: !schedule.appointmentDuration.valid}">
                    </div>
                </div>
                <div class="form-section">
                    <div class="form-section-description">
                        <label>W dniach:</label>
                    </div>
                    <div class="form-control validFrom">
                        <label for="validDateFrom">Od:</label>
                        <input type="date" id="validDateFrom" v-model="schedule.validDateFrom.value" :disabled="!editMode" :class="{error: !schedule.validDateFrom.valid}">
                    </div>
                    <div class="form-control validTo">
                        <label for="validDateTo">Do:</label>
                        <input type="date" id="validDateTo" v-model="schedule.validDateTo.value" :disabled="!editMode" :class="{error: !schedule.validDateTo.valid}">
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
    <confirm-dialog 
        :show="confirmRemoveDialogOpened" 
        title="Potwierdzenie"
        @cancelClick="removeCancel" 
        @confirmClick="removeConfirm"
    >
        <p>Czy na pewno chcesz usunąć ten harmonogram?</p>
    </confirm-dialog>
</template>

<script>
export default {
    emits: ['remove', 'update', 'add', 'cancel'],
    props: {
        id: String,
        dayOfWeek: Number,
        endTime: String,
        startTime: String,
        appointmentDuration: Number,
        validDateFrom: String,
        validDateTo: String,

        newScheduleMode: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            schedule: {
                dayOfWeek: {
                    value: null,
                    valid: true
                },
                endTime: {
                    value: null,
                    valid: true
                },
                startTime: {
                    value: null,
                    valid: true
                },
                appointmentDuration: {
                    value: null,
                    valid: true
                },
                validDateFrom: {
                    value: null,
                    valid: true
                },
                validDateTo: {
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
    methods: {
        setSchedule() {
            this.schedule.dayOfWeek.value = this.dayOfWeek;
            this.schedule.endTime.value = this.endTime;
            this.schedule.startTime.value = this.startTime;
            this.schedule.appointmentDuration.value = this.appointmentDuration;
            this.schedule.validDateFrom.value = this.validDateFrom;
            this.schedule.validDateTo.value = this.validDateTo;
        },
        edit() {
            this.editMode = true;
        },
        cancel() {
            if (!this.newScheduleMode) {
                this.setSchedule();
                this.editMode = false;
            }
            else {
                this.$emit('cancel');
            }
        },
        save() {
            this.validateFrom();
            if (this.formInvalid) {
                return;
            }

            const schedule = {
                id: this.id,
                dayOfWeek: parseInt(this.schedule.dayOfWeek.value),
                endTime: this.convertTime(this.schedule.endTime.value),
                startTime: this.convertTime(this.schedule.startTime.value),
                appointmentDuration: this.schedule.appointmentDuration.value,
                validDateFrom: this.schedule.validDateFrom.value,
                validDateTo: this.schedule.validDateTo.value
            }

            if (this.newScheduleMode) {
                this.$emit('add', schedule);
            }
            else {
                this.$emit('update', schedule);
            }
        },
        remove() {
            this.confirmRemoveDialogOpened = true;
        },
        removeConfirm() {
            this.confirmRemoveDialogOpened = false;
            this.$emit('remove', this.id);
        },
        removeCancel() {
            this.confirmRemoveDialogOpened = false;
        },
        validateFrom() {
            this.resetFormValidation();

            let missingValue = false;
            let wrongDates = false;
            let wrongTimes = false;
            
            if (this.schedule.dayOfWeek.value === null) {
                this.schedule.dayOfWeek.valid = false;
                this.formInvalid = true;

                missingValue = true;
            }

            if (this.schedule.endTime.value === null) {
                this.schedule.endTime.valid = false;
                this.formInvalid = true;

                missingValue = true;
            }

            if (this.schedule.startTime.value === null) {
                this.schedule.startTime.valid = false;
                this.formInvalid = true;

                missingValue = true;
            }

            if (this.schedule.appointmentDuration.value === null) {
                this.schedule.appointmentDuration.valid = false;
                this.formInvalid = true;

                missingValue = true;
            }

            if (this.schedule.validDateFrom.value === null) {
                this.schedule.validDateFrom.valid = false;
                this.formInvalid = true;

                missingValue = true;
            }

            if (this.schedule.validDateTo.value === null) {
                this.schedule.validDateTo.valid = false;
                this.formInvalid = true;

                missingValue = true;
            }

            if (this.schedule.endTime.value !== null && this.schedule.startTime.value !== null && this.schedule.startTime.value > this.schedule.endTime.value){
                this.schedule.endTime.valid = false;
                this.schedule.startTime.valid = false;
                this.formInvalid = true;

                wrongTimes = true;
            }

            if (this.schedule.validDateFrom.value !== null && this.schedule.validDateTo.value !== null && this.schedule.validDateFrom.value > this.schedule.validDateTo.value){
                this.schedule.validDateFrom.valid = false;
                this.schedule.validDateTo.valid = false;
                this.formInvalid = true;

                wrongDates = true;
            }

            if (this.formInvalid) {
                if (missingValue) {
                    this.error = 'Uzupełnij wszystkie wymagane pola';
                }
                if (wrongTimes) {
                    this.error = (this.error !== null ? this.error + '\n' : '') + 'Czas Od nie może być większy od czasu Do';
                }
                if (wrongDates) {
                    this.error = (this.error !== null ? this.error + '\n' : '') + 'Data Od nie może być większy od daty Do';
                }
            }
        },
        resetFormValidation() {
            this.schedule.dayOfWeek.valid = true;
            this.schedule.endTime.valid = true;
            this.schedule.startTime.valid = true;
            this.schedule.appointmentDuration.valid = true;
            this.schedule.validDateFrom.valid = true;
            this.schedule.validDateTo.valid = true;

            this.formInvalid = false;
            this.error = null;
        },
        checkAppointmentDuration() {
            if (this.schedule.appointmentDuration.value < 10) {
                this.schedule.appointmentDuration.value = 10;
            }
            if (this.schedule.appointmentDuration.value > 60) {
                this.schedule.appointmentDuration.value = 60;
            }
        },
        convertTime(time) {
            if (time.lastIndexOf(":") === 2) {
                return time + ':00';
            }
            else {
                return time;
            }
        }
    },
    async beforeMount() {
        if (!this.newScheduleMode) {
            this.setSchedule();
        }
        else {
            this.editMode = true;
        }

        this.pageLoaded = true;
    },
}
</script>

<style scoped>
.schedule {
    margin: 1rem 0;
    box-shadow: 0 5px 2px rgba(0, 0, 0, 0.2);
    border: solid 1px #f5f0f0;
    border-radius: 12px;
    padding: 1rem;
    background-color: #f0f0f0;
}

.actions {
    display: flex;
    justify-content: flex-end;
    margin-right: 2rem;
}

.form-section {
    display: flex;
}

.form-control {
  margin: 1.5rem 0;
  display: block;
}

.form-section-description {
    min-width: 10%;
    margin-top: 3.8rem;
    margin-right: 1.2rem;
    text-align: left;
}

label {
  font-weight: bold;
  text-align: left;
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

input[type="time"],
input[type="date"] {
    padding: 10px 24px;
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
    display: block;
    font: inherit;
    border: none;
    background-color: #fff;
    border: 2px solid #aaa;
    border-radius: 30px;
    padding: 11px 24px;
    font-size: 16px;
    max-height: 3rem;
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

.form-control label {
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
    margin-left: 1rem;
    display: block;
}

.validFrom {
    margin-right: 1rem;
}

.validTo {
    margin-right: 1rem;
}

.dayOfWeek {
    margin-right: 1rem;
}

.startTime {
    margin-right: 1rem;
}

.endTime {
    margin-right: 1rem;
}

.appointmentDuration {
    width: 20%;
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
</style>