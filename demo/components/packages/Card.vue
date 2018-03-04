<template lang="pug">
main
  h2 Card not finished so no docs

  mdc-card
    mdc-card-media(image="kek.png")

    mdc-card-actions(full-bleed)
      mdc-button Kek
      mdc-button link
//demo-template
  h1 MdcCard
  p MdcCard is a simple card wrapper for the material.io card

  template(slot="usage")
    demo-code(lang="markup", code=`
  <mdc-card>...text</mdc-card>`)

  template(slot="props")
    tr
      td stroked
      td Boolean
      td false
      td Adds an stroke outlining the card
</template>

<script>
import DemoTemplate from "../DemoTemplate.vue";

export default {
  name: "DemoCard",
  components: { DemoTemplate }
};
</script>
