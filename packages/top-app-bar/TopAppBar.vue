<template lang="pug">
header.mdc-top-app-bar(:class="cssClasses")
  .mdc-top-app-bar__row
    mdc-top-app-bar-section(align-start)
      a.material-icons.mdc-top-app-bar__navigation-icon(ref="navIcon", href="#") menu
      span.mdc-top-app-bar__title(v-if="title") {{ title }}

    mdc-top-app-bar-section(v-if="hasSlot", align-end)
      slot
</template>

<script>
import Section from './TopAppBarSection.vue';
import { MDCTopAppBarFoundation, MDCFixedTopAppBarFoundation, MDCShortTopAppBarFoundation } from '@material/top-app-bar';

export default {
  name: 'MDCTopAppBar',
  components: { MdcTopAppBarSection: Section },
  props: {
    short: Boolean,
    shortCollapsed: Boolean,
    fixed: Boolean,
    prominent: Boolean
  },

  computed: {
    cssClasses() {
      // Don't allow options when the bar is of the type short
      if(this.short) {
        return {
          'mdc-top-app-bar--short': this.short,
          'mdc-top-app-bar--short-collapsed': this.shortCollapsed,
        }
      }

      return {
        'mdc-top-app-bar--dense': this.dense,
        'mdc-top-app-bar--fixed': this.fixed,
        'mdc-top-app-bar--prominent': this.prominent,
      };
    },
    hasSlot() {
      return !!this.$slots.default;
    }
  },

  mounted() {
    const { $el } = this;

    const adapter = {
      hasClass: className => $el.classList.contains(className),
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      setStyle: (prop, value) => $el.style.setProperty(prop, value),
      getTopAppBarHeight: () => $el.clientHeight,
      registerNavigationIconInteractionHandler: (type, handler) => {
        this.$refs.navIcon.addEventListener(type, handler);
      },
      deregisterNavigationIconInteractionHandler: (type, handler) => {
        this.$refs.navIcon.removeEventListener(type, handler);
      },
      notifyNavigationIconClicked: () => this.emit('nav'),
      registerScrollHandler: handler => window.addEventListener('scroll', handler),
      deregisterScrollHandler: handler => window.removeEventListener('scroll', handler),
      registerResizeHandler: handler => window.addEventListener('resize', handler),
      deregisterResizeHandler: handler => window.removeEventListener('resize', handler),
      getViewportScrollY: () => window.pageYOffset,
      
      // Check if this works with 'preserveWhitespace' to true
      getTotalActionItems: () => this.$slots.default.filter(n => !!n.tag).length,
    };

    // Create foundation instance
    if (this.short) {
      this.foundation = new MDCShortTopAppBarFoundation(adapter);
    } else if (this.fixed) {
      this.foundation = new MDCFixedTopAppBarFoundation(adapter);
    } else {
      this.foundation = new MDCTopAppBarFoundation(adapter);
    }

    this.foundation.init();
  },
  beforeDestroy() {
    this.foundation.destroy();
  }
};
</script>