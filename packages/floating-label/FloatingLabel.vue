<template lang="pug">
label.mdc-floating-label(:for="labelFor") {{ label }}
</template>

<script>
import { MDCFloatingLabelFoundation } from '@material/floating-label';

export default {
  name: "MDCFloatingLabel",
  props: {
    label: {
      type: String,
      required: true
    },
    labelFor: String
  },

  mounted() {
    const { $el } = this;

    this.foundation = new MDCFloatingLabelFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      getWidth: () => $el.offsetWidth,
      registerInteractionHandler: (evtType, handler) => $el.addEventListener(evtType, handler),
      deregisterInteractionHandler: (evtType, handler) => $el.removeEventListener(evtType, handler)
    });

    this.foundation.init();
  },
  beforeDestroy() {
    this.foundation.destroy();
  },
  methods: {
    shake(shouldShake) {
      this.foundation.shake(shouldShake);
    },
    float(shouldFloat) {
      this.foundation.float(shouldFloat);
    },
    getWidth() {
      return this.foundation.getWidth();
    },
  }
};
</script>