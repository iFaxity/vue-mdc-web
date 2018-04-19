<template lang="pug">
aside.mdc-drawer.mdc-drawer--temporary
  nav.mdc-drawer__drawer(ref="drawer")
    header.mdc-drawer__header(v-if="header")
      .mdc-drawer__header-content {{ header }}
    nav.mdc-drawer__content.mdc-list
      slot
</template>

<script>
import Foundation from "@material/drawer/temporary/foundation";
import * as util from "@material/drawer/util";

export default {
  name: "MDCTemporaryDrawer",
  props: {
    open: Boolean,
    spacer: Boolean,
    header: String
  },
  mounted() {
    const { $el } = this;
    const { drawer } = this.$refs;

    const { FOCUSABLE_ELEMENTS, OPACITY_VAR_NAME } = Foundation.strings;
    const styles = getComputedStyle($el);

    this.foundation = new Foundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      hasClass: className => $el.classList.contains(className),
      addBodyClass: className => document.body.classList.add(className),
      removeBodyClass: className => document.body.classList.remove(className),
      eventTargetHasClass: (target, className) => target.classList.contains(className),

      hasNecessaryDom: () => !!drawer,
      registerInteractionHandler: (evt, handler) => $el.addEventListener(util.remapEvent(evt), handler, util.applyPassive()),
      deregisterInteractionHandler: (evt, handler) => $el.removeEventListener(util.remapEvent(evt), handler, util.applyPassive()),
      registerDrawerInteractionHandler: (evt, handler) => drawer.addEventListener(util.remapEvent(evt), handler),
      deregisterDrawerInteractionHandler: (evt, handler) => drawer.removeEventListener(util.remapEvent(evt), handler),
      registerTransitionEndHandler: handler => drawer.addEventListener("transitionend", handler),
      deregisterTransitionEndHandler: handler => drawer.removeEventListener("transitionend", handler),
      registerDocumentKeydownHandler: handler => document.addEventListener("keydown", handler),
      deregisterDocumentKeydownHandler: handler => document.removeEventListener("keydown", handler),

      getDrawerWidth: () => drawer.offsetWidth,
      setTranslateX: (value) => {
        const prop = util.getTransformPropertyName();
        drawer.style[prop] = value === null ? null : `translateX(${value}px)`;
      },
      updateCssVariable: value => {
        if (util.supportsCssCustomProperties()) {
          $el.style.setProperty(OPACITY_VAR_NAME, value);
        }
      },
      getFocusableElements: () => drawer.querySelectorAll(FOCUSABLE_ELEMENTS),
      saveElementTabState: el => util.saveElementTabState(el),
      restoreElementTabState: el => util.restoreElementTabState(el),
      makeElementUntabbable: el => el.setAttribute("tabindex", -1),
      notifyOpen: () => this.$emit("open"),
      notifyClose: () => this.$emit("close"),
      isRtl: () => styles.direction === "rtl",
      isDrawer: (el) => el === drawer
    });
    this.foundation.init();

    // Initial open state
    this.open && this.foundation.open();
  },
  methods: {
    toggle() {
      if (this.foundation.isOpen()) {
        this.foundation.close();
      } else {
        this.foundation.open();
      }
    }
  }
};
</script>