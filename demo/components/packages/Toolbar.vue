<template lang="pug">
demo-template(link="toolbar")
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
  name: "DemoToolbar",
  components: { DemoTemplate }
};
</script>