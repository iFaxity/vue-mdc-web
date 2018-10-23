<template lang="pug">
.mdc-checkbox
  input.mdc-checkbox__native-control(ref="input", type="checkbox", v-bind="$attrs", :value="value", @change="onChange")
  .mdc-checkbox__background
    svg.mdc-checkbox__checkmark(viewBox="0 0 24 24")
      path.mdc-checkbox__checkmark-path(fill="none", stroke="white", d="M1.73,12.91 8.1,19.28 22.79,4.59")
    .mdc-checkbox__mixedmark
</template>

<script>
import { MDCCheckboxFoundation } from '@material/checkbox';
import { getCorrectEventName } from '@material/animation';
import { Ripple, matches } from '../ripple';
import { handleModel } from '../util';

const animationEnd = getCorrectEventName(window, 'animationend');
const rippleAdapter = {
  isSurfaceActive() {
    return this.$refs.input[matches](':active');
  },
  registerInteractionHandler(typeName, handler) {
    this.$refs.input.addEventListener(typeName, handler);
  },
  deregisterInteractionHandler(typeName, handler) {
    this.$refs.input.removeEventListener(typeName, handler);
  }
};

export default {
  name: 'MDCCheckbox',
  mixins: [ Ripple(rippleAdapter, { unbounded: true }) ],
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: [Boolean, Array],
    disabled: Boolean,
    indeterminate: Boolean,
    value: [String, Number, Boolean]
  },
  watch: {
    checked(value) {
      this.$_syncChecked(value);
    },
    disabled(value) {
      this.foundation.setDisabled(value);
    },
    indeterminate(value) {
      this.foundation.setIndeterminate(value);
    }
  },

  mounted() {
    const { $el } = this;
    const { input } = this.$refs;

    // Initialize the foundation
    this.foundation = new MDCCheckboxFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      setNativeControlAttr: (attr, value) => input.setAttribute(attr, value),
      removeNativeControlAttr: attr => input.removeAttribute(attr),
      registerAnimationEndHandler: handler => $el.removeEventListener(animationEnd, handler),
      deregisterAnimationEndHandler: handler => $el.removeEventListener(animationEnd, handler),
      registerChangeHandler: handler => input.addEventListener('change', handler),
      deregisterChangeHandler: handler => input.removeEventListener('change', handler),
      getNativeControl: () => input,
      forceLayout: () => this.$forceUpdate(),
      isAttachedToDOM: () => !!$el.parentNode,
    });
    this.foundation.init();
    this.foundation.setDisabled(this.disabled);
    this.foundation.setIndeterminate(this.indeterminate);

    // Check for initial checked
    this.$_syncChecked(this.checked);
  },
  beforeDestroy() {
    this.foundation.destroy();
  },
  methods: {
    $_syncChecked(checked) {
      if(Array.isArray(checked)) {
        checked = checked.includes(this.value);
      }
      this.foundation.setChecked(checked);
    },
    onChange(e) {
      const { value } = this;
      const { checked } = e.target;
      this.$emit('update:indeterminate', this.foundation.isIndeterminate());

      const newValue = handleModel(this.checked, checked, { checked, value });
      this.$emit('change', newValue);

      /*if(Array.isArray(this.checked)) {
        checked = this.checked;
        if(checked) {
          checked.push(this.value);
        } else {
          checked.splice(arr.indexOf(this.value), 1);
        }
      } else if(this.value) {
        checked = this.value;
      }

      this.$emit('change', checked);*/
    }
  }
};
</script>
