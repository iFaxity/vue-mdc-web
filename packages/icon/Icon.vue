<template lang="pug">
component.material-icons(:is="tag", :class="cssClasses", :tabindex="button && '0'", :role="button && 'button'", :aria-hidden="!button && 'true'", :aria-label="label", title="label") {{ icon }}
</template>

<script>
import { Ripple } from '../ripple';

export default {
  name: 'MDCIcon',
  mixins: [ Ripple(null, { unbounded: true, surface: true }) ],
  props: {
    icon: {
      type: String,
      required: true
    },
    name: String,
    label: String,
    tag: {
      type: String,
      default: 'i'
    },
    
    ripple: Boolean,
    button: Boolean
  },
  computed: {
    cssClasses() {
      return !!this.name && `mdc-${this.name}__icon`;
    }
  },
  mounted() {
    if(!this.ripple) {
      this._ripple.destroy();
    }
  }
};
</script>