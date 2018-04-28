<template lang="pug">
.mdc-select(:class="cssClasses")
  select.mdc-select__native-control(v-model="model", ref="select", :disabled="disabled")
    slot
  mdc-floating-label(ref="floatingLabel")
  mdc-line-ripple(ref="lineRipple")
</template>

<script>
import { MDCSelectFoundation } from '@material/select';
import { MDCFloatingLabel } from '../floating-label';
import { MDCLineRipple } from '../line-ripple';

export default {
  // Component Properties
  name: 'MDCSelect',
  components: {
    MdcFloatingLabel: MDCFloatingLabel,
    MdcLineRipple: MDCLineRipple,
  },
  model: {
    prop: 'selected',
    event: 'select',
  },
  props: {
    box: Boolean,
    disabled: Boolean,
    selected: String,
    label: {
      type: String,
      required: true
    },
  },

  // Reactive Properties
  computed: {
    cssClasses() {
      return this.box && 'mdc-select--box';
    },
    model: {
      get() {
        return this.selected;
      },
      set(value) {
        this.$emit('select', value);
      }
    },
  },

  // Component Methods
  mounted() {
    const { $el } = this;
    const { select, floatingLabel, lineRipple } = this.$refs;

    this.foundation = new MDCSelectFoundation({
      addClass: className => this.root_.classList.add(className),
      removeClass: className => this.root_.classList.remove(className),
      floatLabel: value => floatingLabel.float(value),
      activateBottomLine: () => lineRipple.activate(),
      deactivateBottomLine: () => lineRipple.deactivate(),
      setDisabled: disabled => select.disabled = disabled,
      registerInteractionHandler: (type, handler) => select.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => select.removeEventListener(type, handler),
      getSelectedIndex: () => select.selectedIndex,
      setSelectedIndex: index => {
        select.selectedIndex = index;
      },
      getValue: () => select.value,
      setValue: value => {
        select.value = value
      },
    });
    this.foundation.init();
  },
  beforeDestroy() {
    this.foundation.destroy();
  },
};
</script>