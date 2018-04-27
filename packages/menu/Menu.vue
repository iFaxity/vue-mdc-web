<template lang="pug">
.mdc-menu(:class="cssClasses", tabindex="-1")
  .mdc-list.mdc-menu__items(ref="itemsContainer", role="menu")
    slot
</template>

<script>
import { MDCMenuFoundation, Corner } from '@material/menu';
import { getTransformPropertyName } from '@material/menu/util';

export default {
  name: 'MDCMenu',
  props: {
    anchor: Boolean,

    margin: {
      type: Object,
      default() {
        return {};
      }
    },
    corner: {
      type: String,
      default: 'top_left',
      validator: value => {
        let prop = value.toUpperCase();
        return typeof Corner[prop] !== 'undefined';
      }
    }
  },
  watch: {
    margin(value) {
      this.foundation.setAnchorMargin(value);
    },
    corner(value) {
      this.foundation.setAnchorCorner(value);
    }
  },
  data() {
    return { items: [] }
  },
  mounted() {
    const { $el } = this;
    const { itemsContainer } = this.$refs;
    const $styles = getComputedStyle($el);
    let $anchor, prevFocus;
    
    if(this.anchor) {
      $anchor = $el.parentElement;
      $anchor.classList.add('mdc-menu-anchor');
    }

    this.foundation = new MDCMenuFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      hasClass: className => $el.classList.contains(className),
      hasNecessaryDom: () => !!itemsContainer,
      getAttributeForEventTarget: (target, name) => target.getAttribute(name),
      eventTargetHasClass: (target, className) => target.classList.contains(className),
      getInnerDimensions: () => ({ width: itemsContainer.offsetWidth, height: itemsContainer.offsetHeight }),
      hasAnchor: () => !!$anchor,
      getAnchorDimensions: () => $el.parentElement.getBoundingClientRect(),
      getWindowDimensions: () => ({ width: window.innerWidth, height: window.innerHeight }),
      getNumberOfItems: () => this.items.length,
      registerInteractionHandler: (type, handler) => $el.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => $el.removeEventListener(type, handler),
      registerBodyClickHandler: handler => document.body.addEventListener('click', handler),
      deregisterBodyClickHandler: handler => document.body.removeEventListener('click', handler),
      getIndexForEventTarget: target => this.items.indexOf(target),
      notifySelected: data => this.$emit('selected', data.index, this.items[data.index]),
      notifyCancel: () => this.$emit('cancel'),
      saveFocus: () => {
        prevFocus = document.activeElement;
      },
      restoreFocus: () => prevFocus && prevFocus.focus(),
      isFocused: () => document.activeElement === $el,
      focus: () => $el.focus(),
      getFocusedItemIndex: () => this.items.indexOf(document.activeElement),
      focusItemAtIndex: index => this.items[index].focus(),
      isRtl: () => $styles.direction === 'rtl',
      setTransformOrigin: origin => {
        const prop = getTransformPropertyName(window);
        $el.style[`${prop}-origin`] = origin;
      },
      setPosition: pos => {
        $el.style.left = 'left' in pos ? pos.left : null;
        $el.style.right = 'right' in pos ? pos.right : null;
        $el.style.top = 'top' in pos ? pos.top : null;
        $el.style.bottom = 'bottom' in pos ? pos.bottom : null;
      },
      setMaxHeight: height => $el.style.maxHeight = height,
      setAttrForOptionAtIndex: (index, attr, value) => this.items[index].setAttribute(attr, value),
      rmAttrForOptionAtIndex: (index, attr) => this.items[index].removeAttribute(attr),
      addClassForOptionAtIndex: (index, className) => this.items[index].classList.add(className),
      rmClassForOptionAtIndex: (index, className) => this.items[index].classList.remove(className),
    });
    this.items = this.$_findItems();
    this.foundation.init();

    this.foundation.setAnchorCorner(this.corner.toUpperCase());
    this.foundation.setAnchorMargin(this.margin);
  },
  updated() {
    this.items = this.$_findItems();
  },
  computed: {
    open() {
      return this.foundation && this.foundation.isOpen();
    }
  },
  methods: {
    show(index = null) {
      this.foundation.open({ focusIndex: index });
    },
    hide() {
      this.foundation.close();
    },
    $_findItems() {
      return Array.prototype.slice.call(this.$refs.itemsContainer.querySelectorAll('.mdc-list-item[role]'));
    }
  }
};
</script>