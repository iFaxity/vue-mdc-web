<template lang="pug">
  div(:class="cssClasses")
    slot

</template>

<script>
export default {
  name: "MdcCard",
  props: {
    dark: Boolean
  },
  computed: {
    cssClasses() {
      return {
        "mdc-card": true,
        // TODO: move theming to a mixin
        "mdc-card--theme-dark": this.dark
      };
    }
  }
};
</script>