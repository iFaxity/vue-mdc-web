<template lang="pug">
.mdc-text-field(:class="cssClasses")
  // Leading Icon
  mdc-icon(v-if="leadingIcon", ref="icon", name="text-field", :icon="leadingIcon")
  input.mdc-text-field__input(ref="input", v-model="model", v-bind="inputAttrs")
  mdc-floating-label(v-if="!fullwidth", ref="floatingLabel", :label="label", :label-for="uuid")

  // Trailing Icon
  mdc-icon(v-if="!leadingIcon && trailingIcon", ref="icon", name="text-field", :icon="trailingIcon")
  template(v-if="outlined")
    mdc-notched-outline(ref="notchedOutline")
    .mdc-notched-outline__idle
  mdc-line-ripple(v-else, ref="lineRipple")
</template>

<script>
import TextfieldMixin from './mixin';
import MDCIcon from '../icon';

export default {
  name: 'MDCTextfield',
  mixins: [ TextfieldMixin ],
  components: { MdcIcon: MDCIcon },
  props: {
    boxed: Boolean,
    outlined: Boolean,
    trailingIcon: String,
    leadingIcon: String,
  },
  computed: {
    cssClasses() {
      return {
        'mdc-text-field--box': this.boxed,
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