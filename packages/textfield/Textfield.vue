<template lang="pug">
.mdc-text-field(:class="cssClasses")
  // Leading Icon
  mdc-icon(v-if="leadingIcon", ref="icon", name="text-field", :icon="leadingIcon")
  input.mdc-text-field__input(ref="input", v-model="model", v-bind="inputAttrs")
  mdc-floating-label(v-if="!fullwidth", ref="floatingLabel", :label="label", :label-for="uuid")

  // Trailing Icon
  mdc-icon(v-if="!leadingIcon && trailingIcon", ref="icon", name="text-field", :icon="trailingIcon")
  mdc-notched-outline(v-if="!outlined", ref="notchedOutline")
  mdc-line-ripple(v-else, ref="lineRipple")
</template>

<script>
/*
<template lang="pug">
.mdc-text-field(:class="cssClasses")
  // Leading Icon
  mdc-icon(v-if="leadingIcon", ref="icon", name="text-field", :icon="leadingIcon")
  input.mdc-text-field__input(ref="input", v-model="model", v-bind="inputAttrs")
  label.mdc-floating-label(v-if="!fullwidth", ref="label", :for="uuid") {{ label }}
  // Trailing Icon
  mdc-icon(v-if="!leadingIcon && trailingIcon", ref="icon", name="text-field", :icon="trailingIcon")
  
  .mdc-line-ripple(v-if="!outlined", ref="lineRipple")
  template(v-else)
    .mdc-text-field__outline(ref="outline")
      svg
        path.mdc-text-field__outline-path(ref="outlinePath")
    .mdc-text-field__idle-outline(ref="idleOutline")
</template>
*/

import TextfieldMixin from './mixin';
import MDCIcon from '../icon';

export default {
  name: 'MDCTextfield',
  mixins: [ TextfieldMixin ],
  components: { MdcIcon: MDCIcon },
  props: {
    box: Boolean,
    outlined: Boolean,
    trailingIcon: String,
    leadingIcon: String,
  },
  computed: {
    cssClasses() {
      return {
        'mdc-text-field--box': this.box,
        'mdc-text-field--outlined': this.outlined,
        'mdc-text-field--fullwidth': this.fullwidth,
        'mdc-text-field--dense': this.dense,
        'mdc-text-field--with-leading-icon': this.leadingIcon,
        'mdc-text-field--with-trailing-icon': !this.leadingIcon && this.trailingIcon
      };
    },
  },
};
</script>