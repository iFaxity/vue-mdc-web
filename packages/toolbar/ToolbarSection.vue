<template lang="pug">
section.mdc-toolbar__section(role="toolbar", :class="cssClasses")
  slot
</template>

<script>
export default {
  name: "MDCToolbarSection",
  props: {
    alignStart: Boolean,
    alignEnd: Boolean,
    shrinkToFit: Boolean
  },
  computed: {
    cssClasses() {
      return {
        "mdc-toolbar__section--align-start": this.alignStart,
        "mdc-toolbar__section--align-end": this.alignEnd,
        "mdc-toolbar__section--shrink-to-fit": this.shrinkToFit,
      };
    }
  }
};
</script>