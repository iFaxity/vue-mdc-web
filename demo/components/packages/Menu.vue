<template lang="pug">
demo-template(link="menus")
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
  name: "DemoMenu",
  components: { DemoTemplate }
};
</script>