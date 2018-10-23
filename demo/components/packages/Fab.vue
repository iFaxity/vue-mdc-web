<template lang="pug">
demo-template(link="buttons/floating-action-buttons", :details="details")
  template(slot="hero")
    mdc-fab(:exited="exited", icon="favorite_border", label="Like")
    mdc-fab(mini, :exited="exited", icon="favorite_border", label="Like")

    mdc-button(@click="exited = !exited") {{ buttonText }}

  template(slot="usage")
    demo-code(code=`<mdc-fab icon="icon" label="label"/>`)
</template>

<script>
import DemoTemplate from '../DemoTemplate.vue';

const DATA = {
  slots: [],
  props: [
    { name: 'icon*', type: 'String', desc: 'Material icons icon name.' },
    { name: 'label*', type: 'String', desc: 'Text used in popup title and ARIA label. Required because of screen readers.' },
    { name: 'mini', type: 'Boolean', desc: 'Decreases the size of the button.' },
    { name: 'exited', type: 'Boolean', desc: 'Hides the button. A transition also applies when the property is toggled.' },
  ],
  events: [
    { name: 'click', args: '', desc: 'Emitted when the button is clicked.' },
  ],
};

export default {
  name: 'DemoFab',
  components: { DemoTemplate },

  computed: {
    buttonText() {
      return this.exited ? 'Show FAB' : 'Hide FAB';
    }
  },
  data() {
    return {
      exited: false,
      details: DATA,
    };
  },
};
</script>