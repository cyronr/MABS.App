<template>
    <button v-if="!link" :class="mode">
        <slot></slot>
    </button>
    <router-link v-else :to="to" :class="mode">
        <slot></slot>
    </router-link>
</template>

<script>
export default {
    props: {
        mode: {
            type: String,
            required: false,
            default: null
        },
        link: {
            type: Boolean,
            required: false,
            default: false
        },
        to: {
            type: String,
            required: false,
            default: '/'
        }
    }
}
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  font: inherit;
  background-color: #46bbf1;
  border: 0 solid #3994be;
  color: #fefefe ;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #23aff0;
  border-color: #0572a5;
  box-shadow: 0 0 10px rgba(0, 124, 182, 0.35);
}

.flat {
  background-color: transparent;
  color: #eee;
  border: none;
  margin: 0;
}

.flat:hover,
.flat:active{
  color: white;
  background-color: transparent;
  border: none;
}

.negative {
    background-color: #f75f5f;
    border: 0 solid #f75f5f;
}

.negative:hover,
.negative:active {
  background-color: #dd5555;
  border-color: #b84848;
  box-shadow: 0 0 10px rgba(184, 72, 182, 0.35);
}
</style>