<template lang="pug">
demo-template(link="buttons/floating-action-buttons")
  template(slot="hero")
    mdc-fab(:exited="exited", icon="favorite_border", label="Like")
    mdc-fab(mini, :exited="exited", icon="favorite_border", label="Like")

    mdc-button(@click="exited = !exited") {{ buttonText }}

  template(slot="usage")
    demo-code(lang="markup", code=`<mdc-fab icon="icon" label="label"/>`)

  template(slot="props")
    tr
      td icon*
      td String
      td
      td Material icons icon name
    tr
      td label*
      td String
      td
      td Text used in popup title and ARIA label. Required because of screen readers.
    tr
      td mini
      td Boolean
      td false
      td Decreases the size of the button.
    tr
      td exited
      td Boolean
      td false
      td Hides the button. A transition also applies when the property is toggled.
</template>

<script>
import DemoTemplate from '../DemoTemplate.vue';

export default {
  name: 'DemoFab',
  components: { DemoTemplate },

  computed: {
    buttonText() {
      return this.exited ? 'Show FAB' : 'Hide FAB';
    }
  },
  data() {
    return { exited: false };
  },
};
</script>