<template lang="pug">
aside.mdc-drawer.mdc-drawer--persistent
  nav.mdc-drawer__drawer(ref="drawer")
    .mdc-drawer__toolbar-spacer(v-if="spacer")
    header.mdc-drawer__header(v-if="header")
      .mdc-drawer__header-content {{ header }}
    nav.mdc-drawer__content.mdc-list
      slot
</template>

<script>
import { MDCPersistentDrawerFoundation, util } from '@material/drawer';
import DrawerMixin from './mixin';

export default {
  name: 'MDCPersistentDrawer',
  mixins: [ DrawerMixin ],

  mounted() {
    const { $el } = this;
    const { drawer } = this.$refs;
    
    const { FOCUSABLE_ELEMENTS } = MDCPersistentDrawerFoundation.strings;
    const styles = getComputedStyle($el);

    this.foundation = new MDCPersistentDrawerFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      hasClass: className => $el.classList.contains(className),

      hasNecessaryDom: () => !!drawer,
      registerInteractionHandler: (evt, handler) => $el.addEventListener(util.remapEvent(evt), handler, util.applyPassive()),
      deregisterInteractionHandler: (evt, handler) => $el.removeEventListener(util.remapEvent(evt), handler, util.applyPassive()),
      registerDrawerInteractionHandler: (evt, handler) => drawer.addEventListener(util.remapEvent(evt), handler),
      deregisterDrawerInteractionHandler: (evt, handler) => drawer.removeEventListener(util.remapEvent(evt), handler),
      registerTransitionEndHandler: handler => $el.addEventListener('transitionend', handler),
      deregisterTransitionEndHandler: handler => $el.removeEventListener('transitionend', handler),
      registerDocumentKeydownHandler: handler => document.addEventListener('keydown', handler),
      deregisterDocumentKeydownHandler: handler => document.removeEventListener('keydown', handler),

      getDrawerWidth: () => drawer.offsetWidth,
      setTranslateX: value => {
        const prop = util.getTransformPropertyName();
        drawer.style[prop] = value === null ? null : `translateX(${value}px)`;
      },
      getFocusableElements: () => drawer.querySelectorAll(FOCUSABLE_ELEMENTS),
      saveElementTabState: el => util.saveElementTabState(el),
      restoreElementTabState: el => util.restoreElementTabState(el),
      makeElementUntabbable: el => el.setAttribute('tabindex', -1),
      notifyOpen: () => this.$emit('open'),
      notifyClose: () => this.$emit('close'),
      isRtl: () => styles.direction === 'rtl',
      isDrawer: el => el === drawer
    });
    this.foundation.init();

    // Initial open state
    this.open && this.foundation.open();
  },
};
</script>
