<template lang="pug">
.mdc-card(:class="cssClasses")
  slot
</template>

<script>
export default {
  name: 'MDCCard',
  props: {
    outlined: Boolean
  },
  computed: {
    cssClasses() {
      return this.outlined && 'mdc-card--outlined';
    }
  }
};
</script>