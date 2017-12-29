<template lang="pug">
h1.mdc-card__title(:class="cssClasses")
  slot
</template>

<script>
export default {
  name: "MdcCardTitle",
  props: {
    large: Boolean
  },
  computed: {
    cssClasses() {
      return {
        "mdc-card__title--large": this.large
      };
    }
  }
};
</script>