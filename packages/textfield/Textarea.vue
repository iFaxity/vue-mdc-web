<template lang="pug">
.mdc-text-field.mdc-text-field--textarea(:class="cssClasses")
  textarea.mdc-text-field__input(ref="input", v-model="model", v-bind="inputAttrs")
  mdc-floating-label(v-if="!fullwidth", ref="label", :label="label", :label-for="uuid")
</template>

<script>
import TextfieldMixin from './mixin';

export default {
  name: 'MDCTextarea',
  mixins: [ TextfieldMixin ],
  inheritAttrs: false,
  props: {
    rows: [String, Number],
    cols: [String, Number]
  },
  computed: {
    cssClasses() {
      return {
        'mdc-text-field--fullwidth': this.fullwidth,
        'mdc-text-field--dense': this.dense
      };
    },
  }
};
</script>