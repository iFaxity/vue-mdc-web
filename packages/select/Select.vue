<template lang="pug">
.mdc-select(:class="cssClasses")
  select.mdc-select__native-control(v-model="model", :disabled="disabled")
    slot
  label.mdc-floating-label(ref="label")
  .mdc-line-ripple(ref="lineRipple")
</template>

<script>
import { MDCSelectFoundation } from '@material/select';
import { MDCFloatingLabelFoundation } from '@material/floating-label';
import { MDCLineRippleFoundation } from '@material/line-ripple';

export default {
  name: 'MDCSelect',
  model: {
    prop: 'selected',
    event: 'select'
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
    }
  },

  mounted() {
    const { $el } = this;
    const { label, lineRipple } = this.$refs;

    // Initialize the foundations
    this._label = new MDCFloatingLabelFoundation({

    });
    this._lineRipple = new MDCLineRippleFoundation({

    });

    this.foundation = new MDCSelectFoundation({

    });

    this.foundation.init();
  },
  beforeDestroy() {
    this._label.destroy();
    this._lineRipple.destroy();
    this.foundation.destroy();
  }
};
</script>