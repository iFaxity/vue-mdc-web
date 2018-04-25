<template lang="pug">
.mdc-layout-grid__cell(:class="cssClasses")
  slot
</template>

<script>
const ALIGNMENTS = [ 'top', 'bottom', 'middle' ];
const spanValidator = value => value >= 1 && value <= 12;

export default {
  name: 'MDCLayoutCell',
  props: {
    span: {
      type: [Number, String],
      validator: spanValidator
    },
    desktop: {
      type: [Number, String],
      validator: spanValidator
    },
    tablet: {
      type: [Number, String],
      validator: spanValidator
    },
    phone: {
      type: [Number, String],
      validator: spanValidator
    },
    order: {
      type: [Number, String],
      validator: spanValidator
    },
    align: {
      type: String,
      validator: value => ALIGNMENTS.includes(value)
    }
  },
  computed: {
    cssClasses() {
      return [
        this.span && `mdc-layout-grid__cell--span-${this.span}`,
        this.desktop && `mdc-layout-grid__cell--span-${this.desktop}-desktop`,
        this.tablet && `mdc-layout-grid__cell--span-${this.tablet}-tablet`,
        this.phone && `mdc-layout-grid__cell--span-${this.phone}-phone`,
        this.order && `mdc-layout-grid__cell--order-${this.order}`,
        this.align && `mdc-layout-grid__cell--align-${this.align}`
      ];
    }
  }
};
</script>