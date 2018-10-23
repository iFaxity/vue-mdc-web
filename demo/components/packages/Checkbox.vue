<template lang="pug">
demo-template(link="input-controls/checkboxes", :details="details")
  mdc-form-field(slot="hero", label="Checkbox")
    mdc-checkbox
  mdc-form-field(slot="hero", label="Indeterminate")
    mdc-checkbox(indeterminate)

  template(slot="usage")
    demo-code(lang="markup", code=`<mdc-checkbox/>`)

    p The MDC Checkbox can also be used together with a MDC Form Field to add a label to it.
    p The checkbox can also use a v-model directive to reactivly bind the value.
    demo-code(code=`
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
</template>

<script>
import DemoTemplate from '../DemoTemplate.vue';

const DATA = {
  props: [
    { name: 'checked', type: 'Boolean', desc: 'Used to change the checked state of the checkbox.' },
    { name: 'disabled', type: 'Boolean', desc: 'Disables the checkbox from any input.' },
    { name: 'indeterminate', type: 'Boolean', desc: 'Used to change the indetermined state of the checkbox.' },
  ],
};

export default {
  name: 'DemoCheckbox',
  components: { DemoTemplate },
  data() {
    return {
      details: DATA,
    };
  },
};
</script>