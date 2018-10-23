<template lang="pug">
demo-template(:details="details")
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
</template>

<script>
import DemoTemplate from '../DemoTemplate.vue';

const DATA = {
  slots: [
    { name: 'toolbar', desc: 'Used to slot the MDCToolbar component into the correct position.' },
    { name: 'drawer', desc: 'Used to slot the MDCDrawer component into the correct position.' },
  ],
  props: [
    { name: 'flip', type: 'Boolean', desc: 'Used to flip the positioning of the toolbar and the drawer.' },
    { name: 'drawer-hide-mobile', type: 'Boolean', desc: 'Hide the drawer if the width is below 720px.' },
    { name: 'align-start', type: 'Boolean', desc: 'Removes the center alignment on the main content.' },
  ],
};

export default {
  name: 'DemoApp',
  components: { DemoTemplate },
  data() {
    return {
      details: DATA,
    };
  },
};
</script>