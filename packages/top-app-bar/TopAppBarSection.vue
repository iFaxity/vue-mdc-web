<template lang="pug">
section.mdc-top-app-bar__section(:class="cssClasses")
  slot
</template>

<script>
export default {
  name: "MDCTopAppBarSection",
  props: {
    alignStart: Boolean,
    alignEnd: Boolean,
  },

  computed: {
    cssClasses() {
      return {
        "mdc-top-app-bar__section--align-start": this.alignStart,
        "mdc-top-app-bar__section--align-end": this.alignEnd
      };
    }
  }
};
</script>