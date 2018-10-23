<template lang="pug">
demo-template(link="drawers", :details="details")
  template(slot="hero")

  template(slot="usage")
    demo-code(code=`<mdc-drawer type=""/>`)
</template>

<script>
import DemoTemplate from '../DemoTemplate.vue';

const DATA = {
  slots: [],
  props: [],
  events: [],
};

export default {
  name: 'DemoDrawer',
  components: { DemoTemplate },
  data() {
    return {
      details: DATA,
    };
  },
};
</script>