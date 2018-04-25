<template lang="pug">
transition-group.mdc-chip-set(v-if="input", :class="cssClasses", enter-active-class="", leave-active-class="mdc-chip--exit")
  slot
.mdc-chip-set(v-else, :class="cssClasses")
  slot
</template>

<script>
import { MDCChipSetFoundation } from "@material/chips";

export default {
  name: "MDCChipSet",
  provide() {
    const $_vm = this;
    return {
      MDCChipSet: {
        filter: this.filter,
        choice: this.choice,
        select(value) {
          if(Array.isArray($_vm.selected)) {
            value = $_vm.selected.concat(value);
          }

          $_vm.$emit('select', value);
        },
        deselect(value) {
          if(Array.isArray($_vm.selected)) {
            const index = $_vm.selected.indexOf(value);
            $_vm.selected.splice(index, 1);
            value = $_vm.selected;
          } else {
            value = '';
          }
          
          $_vm.$emit('select', value);
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
  },

  mounted() {
    const { $el } = this;

    this.foundation = new MDCChipSetFoundation({
      hasClass: className => $el.classList.contains(className),
      registerInteractionHandler: (type, handler) => $el.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => $el.removeEventListener(type, handler),
      appendChip: () => {},
      removeChip: () => {},
      /*removeChip: chip => {
        this.$emit('remove', this.$_getIndexOfChip(chip));
      },*/
    });

    this.foundation.init();
  },
  beforeDestroy() {
    this.foundation.destroy();
  },
  methods: {
    $_getIndexOfChip(chip) {
      const chips = this.$slots.default.filter(vnode => !!vnode.tag);
      return chips.findIndex(vnode => vnode.componentInstance === chip);
    }
  }
};
</script>