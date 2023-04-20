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
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #46bbf1;
  border: 1px solid #46bbf1;
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
  background-color: #0694d6;
  border-color: #0694d6;
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
</style>