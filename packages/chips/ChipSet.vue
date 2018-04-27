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
    const $_vm = this;
    return {
      MDCChipSet: {
        filter: this.filter,
        choice: this.choice,
        select(value) {
          const newValue = handleModel($_vm.selected, value, { checked: false, value });
          $_vm.$emit('select', newValue);
          /*if(Array.isArray($_vm.selected)) {
            value = $_vm.selected.concat(value);
          }
          $_vm.$emit('select', value);*/
        },
        deselect(value) {
          const newValue = handleModel($_vm.selected, '', { checked: true, value });
          $_vm.$emit('select', newValue);

          /*if(Array.isArray($_vm.selected)) {
            const index = $_vm.selected.indexOf(value);
            $_vm.selected.splice(index, 1);
            value = $_vm.selected;
          } else {
            value = '';
          }
          $_vm.$emit('select', value);*/
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