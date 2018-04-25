<template lang="pug">
demo-template(link="input-controls/checkboxes")
  mdc-form-field(slot="hero", label="Checkbox")
    mdc-checkbox
  mdc-form-field(slot="hero", label="Indeterminate")
    mdc-checkbox(indeterminate)

  template(slot="usage")
    demo-code(lang="markup", code=`
<mdc-checkbox/>`)

    p The MDC Checkbox can also be used together with a MDC Form Field to add a label to it.
    p The checkbox can also use a v-model directive to reactivly bind the value.
    demo-code(lang="markup", code=`
<mdc-form-field label="My Checkbox">
  <mdc-checkbox v-model="checked"/>
</mdc-form-field>`)

    p You also need to define the v-model value in your data on your parent component
    demo-code(lang="javascript", code=`
export default {
  data() {
    return { checked: false };
  };
}`)

  template(slot="props")
    tr
      td checked
      td Boolean
      td false
      td Used to change the checked state of the checkbox
    tr
      td disabled
      td Boolean
      td false
      td Disables the checkbox from any input
    tr
      td indeterminate
      td Boolean
      td false
      td Changes the indetermined state of the checkbox
</template>

<script>
import DemoTemplate from '../DemoTemplate.vue';

export default {
  name: 'DemoCheckbox',
  components: { DemoTemplate }
};
</script>