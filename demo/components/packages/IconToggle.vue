<template lang="pug">
demo-template(link="buttons/icon-toggle-buttons", :details="details")
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
  name: 'DemoIconToggle',
  components: { DemoTemplate },
  data() {
    return {
      details: DATA,
    };
  }
};
</script>