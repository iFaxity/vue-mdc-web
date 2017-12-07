<template lang="pug">
section.mdc-toolbar__section(:class=`cssClasses` role="toolbar")
  slot
</template>

<script>
const ALIGNMENTS = ["start", "end"];

export default {
  name: "MdcToolbarSection",
  props: {
    align: {
      type: String,
      validator: value => ALIGNMENTS.includes(value)
    },
    shrink: Boolean
  },
  computed: {
    cssClasses() {
      const classes = { "mdc-toolbar__section--shrink-to-fit": this.shrink };
      if(this.align) {
        classes[`mdc-toolbar__section--align-${this.align}`] = true;
      }
      return classes;
    }
  }
};
</script>