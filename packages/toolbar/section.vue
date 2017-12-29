<template lang="pug">
section.mdc-toolbar__section(:class=`cssClasses` role="toolbar")
  slot
</template>

<script>
export default {
  name: "MdcToolbarSection",
  props: {
    alignStart: Boolean,
    alignEnd: Boolean,
    shrink: Boolean
  },
  computed: {
    cssClasses() {
      return {
        "mdc-toolbar__section--align-start": this.alignStart,
        "mdc-toolbar__section--align-end": this.alignEnd,
        "mdc-toolbar__section--shrink-to-fit": this.shrink,
      };
    }
  }
};
</script>