<template lang="pug">
demo-template(link="input-controls/text-field", stacked)
  template(slot="hero")
    mdc-textfield(label="Basic Textfield")
    mdc-textfield(boxed, label="Boxed Textfield")
    mdc-textfield(outlined, label="Outlined Textfield")

  template(slot="usage")
    demo-code(lang="markup", code=`
<mdc-textfield v-model="model" label="My Textfield"/>
`)

  template(slot="props")
    tr
      th(colspan="4") Shared props
    tr
      th(colspan="4") MDCTextfield
    tr
      th(colspan="4") MDCTextarea
    tr
      td name
      td type
      td default
      td desc
</template>

<script>
import DemoTemplate from '../DemoTemplate.vue';

export default {
  name: 'DemoTextfield',
  components: { DemoTemplate }
};
</script>