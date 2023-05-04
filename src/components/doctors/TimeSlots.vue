<template>
    <div class="timeSlotsContainer">
        <div class="dates">
            <div class="date" v-for="date in dates" :key="date">
                <span class="option" @click="selectDate(date)" :class="{ selected: date === selectedDate }">
                    {{ formatDate(date) }}
                </span>
            </div>
        </div>
        <div class="times" v-if="timeSlotsForSelectedDate.length > 0">
            <div class="time" v-for="timeSlot in timeSlotsForSelectedDate" :key="timeSlot.time">
                <span class="option" @click="selectTimeSlot(timeSlot)" :class="{ unavailable: !timeSlot.available, selected: selectedTimeSlot === timeSlot }">
                    {{ formatTime(timeSlot.time) }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['timeSlots'],
    emits: ['select'],
    data() {
        return {
            selectedDate: null,
            timeSlotsForSelectedDate: [],

            selectedTimeSlot: null
        }
    },
    computed: {
        dates() {
            const uniqueDates = this.timeSlots.reduce((dates, slot) => {
                if (!dates.includes(slot.date)) {
                    dates.push(slot.date);
                }
                return dates;
            }, []);

            return uniqueDates;
        }
    },
    methods: {
        formatDate(date) {
            // eslint-disable-next-line no-unused-vars
            const [year, month, day] = date.split('-');
            return `${day}.${month}`;
        },
        formatTime(time) {
            // eslint-disable-next-line no-unused-vars
            const [hour, minute, second] = time.split(':');
            return `${hour}:${minute}`;
        },
        selectDate(date) {
            this.selectedDate = date;
            this.timeSlotsForSelectedDate = this.timeSlots.filter(ts => ts.date === date);

            this.selectedTimeSlot = null;
            this.$emit('select', null);
        },
        selectTimeSlot(timeSlot) {
            if (!timeSlot.available) {
                return;
            }

            this.selectedTimeSlot = timeSlot;
            this.$emit('select', timeSlot);
        }
    },
    beforeMount() {
        this.selectDate(this.dates[0]);
    }
}
</script>

<style scoped>
.timeSlotsContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
}

.dates,
.times {
  flex-basis: calc(50% - 0.5rem);
  display:flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items:flex-start;
  margin: 0;
  padding: 0.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 10px;
  background-color: #fdfdfd;
}

.date,
.time {
  flex-basis: calc(100% / 3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.option {
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin: 0.2rem;
  font-size: 0.9rem;
  background-color: #5cd851;
  cursor: pointer;
  color: #ffffff;
}

.option:hover {
    background-color: #30d121;
}

.unavailable {
    background-color: #ccc;
    cursor: default;
}

.unavailable:hover {
    background-color: #ccc;
    cursor: default;
}

.selected {
    background-color: #10b801;
}
</style>