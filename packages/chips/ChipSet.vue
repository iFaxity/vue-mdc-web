<template lang="pug">
transition-group.mdc-chip-set(v-if="input", :class="cssClasses", v-bind="$_transition")
  slot
.mdc-chip-set(v-else, :class="cssClasses")
  slot
</template>

<script>
import { MDCChipSetFoundation } from '@material/chips';
import { handleModel } from '../util';

export default {
  name: 'MDCChipSet',
  provide() {
    return {
      MDCChipSet: {
        filter: this.filter,
        choice: this.choice,
        select: value => {
          const newValue = handleModel(this.selected, value, { checked: false, value });
          this.$emit('select', newValue);
        },
        deselect: value => {
          const newValue = handleModel(this.selected, '', { checked: true, value });
          this.$emit('select', newValue);
        }
      }
    }
  },
  model: {
    prop: 'selected',
    event: 'select'
  },

  props: {
    input: Boolean,
    choice: Boolean,
    filter: Boolean,

    selected: [Array, String],
  },
  computed: {
    cssClasses() {
      return {
        'mdc-chip-set--input': this.input,
        'mdc-chip-set--choice': this.choice,
        'mdc-chip-set--filter': this.filter
      };
    },
    $_transition() {
      return {
        name: null,
        enterClass: null,
        enterActiveClass: null,
        enterToClass: null,
        leaveClass: null,
        leaveActiveClass: 'mdc-chip--exit',
        leaveToClass: null,
      };
    }
  },

  mounted() {
    const { $el } = this;

    this.foundation = new MDCChipSetFoundation({
      hasClass: className => $el.classList.contains(className),
      registerInteractionHandler: (type, handler) => $el.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => $el.removeEventListener(type, handler),
      appendChip: () => {},
      removeChip: () => {}
    });

    this.foundation.init();
  },
  beforeDestroy() {
    this.foundation.destroy();
  },
};
</script>