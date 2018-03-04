<template lang="pug">
.mdc-linear-progress(role="progressbar")
  .mdc-linear-progress__buffering-dots
  .mdc-linear-progress__buffer(ref="buffer")
  .mdc-linear-progress__bar.mdc-linear-progress__primary-bar(ref="primary")
    span.mdc-linear-progress__bar-inner
  .mdc-linear-progress__bar.mdc-linear-progress__secondary-bar
    span.mdc-linear-progress__bar-inner
</template>

<script>
import Foundation from "@material/linear-progress/foundation";

function assertNumber(value, fn) {
  if(typeof value === "string") {
    value = parseFloat(value);
    if(isNaN(value)) throw new Error("LinearProgress: value invalid!");
  }
  
  fn(value);
}

export default {
  name: "MdcLinearProgress",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    indeterminate: Boolean,
    reversed: Boolean,
    closed: Boolean,

    value: [String, Number],
    buffer: [String, Number]
  },
  watch: {
    indeterminate(value) {
      this.foundation.setDeterminate(!value);
    },
    reversed(value) {
      this.foundation.setReverse(value);
    },
    closed(value) {
      if(value) {
        this.foundation.close();
      } else {
        this.foundation.open();
      }
    },
    value(value) {
      assertNumber(value, value => this.foundation.setProgress(value));
    },
    buffer(value) {
      assertNumber(value, value => this.foundation.setBuffer(value));
    }
  },
  mounted() {
    const { $el } = this;
    const { primary, buffer } = this.$refs;

    this.foundation = new Foundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      hasClass: className => $el.classList.contains(className),
      getPrimaryBar: () => primary,
      getBuffer: () => buffer,
      setStyle: (el, prop, value) => el.style[prop] = value,
    });

    this.foundation.init();
    this.foundation.setDeterminate(!this.indeterminate);
    this.foundation.setReverse(this.reversed);
    this.closed && this.foundation.close();
    assertNumber(this.value, value => this.foundation.setProgress(value));
    assertNumber(this.buffer, value => this.foundation.setBuffer(value));
  },
  beforeDestroy() {
    this.foundation.destroy();
  }
};
</script>