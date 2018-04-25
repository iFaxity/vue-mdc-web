<template lang="pug">
demo-template
  template(slot="usage")
    demo-code(lang="markup", code=`
<mdc-app>
  <mdc-toolbar slot="toolbar">
    ...toolbar content
  </mdc-toolbar>
  <mdc-drawer slot="drawer">
    ...drawer content
  </mdc-drawer>

  <main>
    ...main content
  </main>

  ...other content such as footer etc
</mdc-app>`)

  template(slot="slots")
    tr
      td toolbar
      td Used to slot the mdc-toolbar component to be inserted correctly
    tr
      td drawer
      td Used to slot the mdc-drawer component to be inserted correctly

  template(slot="props")
    tr
      td flip
      td Boolean
      td false
      td Used to flip the positioning of the toolbar and the drawer.
    tr
      td drawer-hide-mobile
      td Boolean
      td false
      td Hide the drawer if the width is below 720px.
    tr
      td align-start
      td Boolean
      td false
      td Removes the center alignment on the main content.
</template>

<script>
import DemoTemplate from '../DemoTemplate.vue';

export default {
  name: 'DemoApp',
  components: { DemoTemplate }
};
</script>