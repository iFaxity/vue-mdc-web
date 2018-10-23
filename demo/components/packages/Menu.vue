<template lang="pug">
demo-template(link="menus", :details="details")
  template(slot="hero")

  template(slot="usage")
    demo-code(code=`<mdc/>`)
</template>

<script>
import DemoTemplate from '../DemoTemplate.vue';

const DATA = {
  slots: [],
  props: [],
  events: [],
};

export default {
  name: 'DemoMenu',
  components: { DemoTemplate },
  data() {
    return {
      details: DATA,
    };
  }
};
</script>