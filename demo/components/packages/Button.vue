<template lang="pug">
demo-template(link="buttons", :details="details")
  template(slot="hero")
  mdc-button Flat
  mdc-button(raised) Raised
  mdc-button(icon="favorite") Icon

  template(slot="usage")
    demo-code(lang="markup", code=`<mdc-button>...text</mdc-button>`)
</template>

<script>
import DemoTemplate from '../DemoTemplate.vue';

const DATA = {
  slots: [
    { name: 'default', desc: '' },
  ],
  props: [
    { name: 'icon', type: 'String', desc: 'Add an icon according to the material-icons icon id.' },
    { name: 'link', type: 'String', desc: 'Creates a link button using an anchor tag.' },
    { name: 'raised', type: 'Boolean', desc: 'Setting the button to be elevated upon the surface.' },
    { name: 'unelevated', type: 'Boolean', desc: 'Setting the button to be flush upon the surface and has a visible border.' },
    { name: 'dense', type: 'Boolean', desc: 'Compressing the buttons text to be slightly smaller.' },
    { name: 'compact', type: 'Boolean', desc: 'Reduces the horizontal padding on the button.' },
  ],
  events: [
    { name: 'click', args: '', desc: 'Triggers when button is clicked' },
  ],
};

export default {
  name: 'DemoButton',
  components: { DemoTemplate },
  data() {
    return {
      details: DATA,
    };
  },
};
</script>
