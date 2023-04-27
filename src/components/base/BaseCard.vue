<template>
    <div class="card" :class="{vertical: vertical}" :style="style">
        <slot></slot>
    </div>
</template>

<script>
export default {
  props: {
    vertical: {
      type: Boolean,
      required: false,
      default: false
    },
    style: {
      type: Object,
      default: () => ({}),
    },
  }
}
</script>

<style scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 50rem;
  background-color: #F5F5F5;
}

.vertical {
  max-width: 20rem;
  min-height: 30rem;
}
</style>