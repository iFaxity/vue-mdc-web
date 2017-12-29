<template lang="pug">
.mdc-card(:class="cssClasses")
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
        // TODO: move theming to a mixin
        "mdc-card--theme-dark": this.dark
      };
    }
  }
};
</script>