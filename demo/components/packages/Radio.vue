<template lang="pug">
demo-template(link="input-controls/radio-buttons")
  mdc(slot="hero")

  template(slot="usage")
    demo-code(lang="markup", code=`
<mdc/>
`)

  template(slot="props")
    tr
      td name
      td type
      td default
      td desc
</template>

<script>
import DemoTemplate from "../DemoTemplate.vue";

export default {
  name: "DemoRadio",
  components: { DemoTemplate }
};
</script>