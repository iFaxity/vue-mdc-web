<template lang="pug">
demo-template
  mdc-chip-set(slot="hero")
    mdc-chip(text="Chip")
    mdc-chip(entry, text="Entry Chip")
    mdc-chip(filter, text="Filter Chip")
    mdc-chip(action="bookmark", text="Action Chip")


  template(slot="usage")
    demo-code(lang="markup", code=`
<mdc-chip text="My Chip"/>`)

    p It is also possible to use a mdc-chip-set in order to view multiple chips in order like this
    demo-code(lang="markup", code=`
<mdc-chip-set>
  <mdc-chip text="Chip 1"/>
  <mdc-chip text="Chip 2"/>
  <mdc-chip text="Chip 3"/>
</mdc-chip-set>`)

  template(slot="events")
    tr
      td click
      td
      td Emits a click event when chip is clicked

  template(slot="props")
    tr
      td checked
      td Boolean
      td false
      td Used to change the checked state of the checkbox
    tr
      td disabled
      td Boolean
      td false
      td Disables the checkbox from any input
    tr
      td indeterminate
      td Boolean
      td false
      td Changes the indetermined state of the checkbox
</template>

<script>
import DemoTemplate from "../DemoTemplate.vue";

export default {
  name: "DemoChips",
  components: { DemoTemplate }
};
</script>