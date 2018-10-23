<template lang="pug">
.mdc-select(:class="cssClasses")
  select.mdc-select__native-control(ref="select", v-model="model", :disabled="disabled")
    slot
  mdc-floating-label(ref="floatingLabel", :label="label")
  mdc-line-ripple(ref="lineRipple")
</template>

<script>
import { MDCSelectFoundation } from '@material/select';
import { MDCFloatingLabel } from '../floating-label';
import { MDCLineRipple } from '../line-ripple';

export default {
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
    label: {
      type: String,
      required: true
    },
    boxed: Boolean,
    disabled: Boolean,
    selected: [String, Number],
  },

  computed: {
    cssClasses() {
      return {
        'mdc-select--box': this.boxed,
        'mdc-select--disabled': this.disabled,
      };
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

  mounted() {
    const { $el } = this;
    const { select, floatingLabel, lineRipple } = this.$refs;

    this.foundation = new MDCSelectFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      floatLabel: shouldFloat => floatingLabel.float(shouldFloat),
      activateBottomLine: () => lineRipple.activate(),
      deactivateBottomLine: () => lineRipple.deactivate(),
      setDisabled: disabled => {
        select.disabled = disabled;
      },
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