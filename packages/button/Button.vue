<template lang="pug">
component.mdc-button(:is="link ? 'a' : 'button'", :class="cssClasses", :href="link", :disabled="disabled", v-on="$listeners")
  i.material-icons.mdc-button__icon(v-if="icon") {{ icon }}
  slot
</template>

<script>
import { Ripple } from '../ripple';

export default {
  name: 'MDCButton',
  mixins: [ Ripple() ],
  props: {
    icon: String,
    raised: Boolean,
    unelevated: Boolean,
    outlined: Boolean,
    dense: Boolean,
    compact: Boolean,
    disabled: Boolean,

    link: String
  },
  computed: {
    cssClasses() {
      return {
        'mdc-button--raised': this.raised,
        'mdc-button--unelevated': this.unelevated,
        'mdc-button--outlined': this.outlined,
        'mdc-button--dense': this.dense,
        'mdc-button--compact': this.compact
      };
    }
  }
};
</script>