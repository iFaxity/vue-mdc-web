<template lang="pug">
.mdc-line-ripple
</template>

<script>
import { MDCLineRippleFoundation } from '@material/line-ripple';

export default {
  name: 'MDCLineRipple',

  mounted() {
    const { $el } = this;

    this.foundation = new MDCLineRippleFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      hasClass: className => $el.classList.contains(className),
      setStyle: (prop, value) => $el.style.setProperty(prop, value),
      registerEventHandler: (type, handler) => $el.addEventListener(type, handler),
      deregisterEventHandler: (type, handler) => $el.removeEventListener(type, handler)
    });
    this.foundation.init();
  },
  beforeDestroy() {
    this.foundation.destroy();
  },
  methods: {
    activate() {
      this.foundation.activate();
    },
    deactivate(){
      this.foundation.deactivate();
    },
    setRippleCenter(normalizedX) {
      this.foundation.setRippleCenter(normalizedX);
    },
  },
};
</script>