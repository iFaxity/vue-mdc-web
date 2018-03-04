<template lang="pug">
.mdc-layout-grid(:class="cssClasses")
  .mdc-layout-grid__inner
    slot
</template>

<script>
export default {
  name: "MdcLayoutGrid",
  props: {
    fixedColumnWidth: Boolean,
    alignLeft: Boolean,
    alignRight: Boolean
  },
  computed: {
    cssClasses() {
      return {
        "mdc-layout-grid--fixed-column-width": this.fixedColumnWidth,
        "mdc-layout-grid--align-left": this.alignLeft,
        "mdc-layout-grid--align-right": this.alignRight
      };
    }
  }
};
</script>