<template functional, lang="pug">
.mdc-notched-outline(ref="notchedOutline")
  svg
    path.mdc-notched-outline__path(ref="notchedOutlinePath")
.mdc-notched-outline__idle(ref="notchedOutlineIdle")
</template>

<script>
import { MDCNotchedOutlineFoundation } from '@material/notched-outline';

export default {
  name: "MDCNotchedOutline",

  mounted() {
    const { notchedOutline, notchedOutlinePath, notchedOutlineIdle } = this.$refs;
    const styles = window.getComputedStyle(notchedOutlineIdle);
  
    this.foundation = new MDCNotchedOutlineFoundation({
      getWidth: () => notchedOutline.offsetWidth,
      getHeight: () => notchedOutline.offsetHeight,
      addClass: className => notchedOutline.classList.add(className),
      removeClass: className => notchedOutline.classList.remove(className),
      setOutlinePathAttr: value => notchedOutlinePath.setAttribute('d', value),
      getIdleOutlineStyleValue: prop => styles && styles.getPropertyValue(prop)
    });
    this.foundation.init();
  },
  beforeDestroy() {
    this.foundation.destroy();
  },
  methods: {
    notchOutline(labelWidth, isRtl) {
      this.foundation.notch(labelWidth, isRtl);
    },
    closeOutline() {
      this.foundation.closeNotch();
    },
  },
};
</script>