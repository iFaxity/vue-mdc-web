<template lang="pug">
.mdc-select(:class="cssClasses", role="listbox")
  .mdc-select__surface(ref="surface")
    .mdc-select__label(ref="label") {{ label }}
    .mdc-select__selected-text {{ selectedText }}
    .mdc-select__bottom-line(ref="bottomLine")

  mdc-menu.mdc-select__menu(ref="menu")
    slot
</template>

<script>
import Foundation from "@material/select/foundation";
import LabelFoundation from "@material/select/label/foundation";
import BottomLineFoundation from "@material/select/bottom-line/foundation";
import { Ripple } from "../ripple";

const getEventType = type => type.substr(type.indexOf(":") + 1);

//TODO: complete after created mdc-list and mdc-menu
export default {
  name: "MdcSelect",
  mixins: [ Ripple() ],
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    disabled: Boolean,
    value: String,
    label: {
      type: String,
      required: true
    },
    box: Boolean
  },

  watch: {
    value(value) {
      this.$_setIndexFromValue(value);
    },
    disabled(value) {
      this.foundation.setDisabled(value);
    }
  },
  computed: {
    cssClasses() {
      return this.box && "mdc-select--box";
    }
  },
  data() {
    return { selectedText: "" };
  },

  mounted() {
    const { $el } = this;
    const { surface, menu } = this.$refs;

    const bottomLine = new BottomLineFoundation({
      addClass: className => this.$refs.bottomLine.classList.add(className),
      removeClass: className => this.$refs.bottomLine.classList.remove(className)
    });
    const label = new LabelFoundation({
      addClass: className => this.$refs.label.classList.add(className),
      removeClass: className => this.$refs.label.classList.remove(className)
    });

    this.foundation = new Foundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      floatLabel: value => label && label.styleFloat(value),
      activateBottomLine: () => bottomLine.activate(),
      deactivateBottomLine: () => bottomLine.deactivate(),
      setAttr: (attr, value) => $el.setAttribute(attr, value),
      rmAttr: (attr, value) => $el.removeAttribute(attr, value),
      computeBoundingRect: () => surface.getBoundingClientRect(),
      registerInteractionHandler: (type, handler) => surface.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => surface.removeEventListener(type, handler),
      focus: () => surface.focus(),
      makeTabbable: () => {
        surface.tabIndex = 0;
      },
      makeUntabbable: () => {
        surface.tabIndex = -1;
      },
      getComputedStyleValue: prop => window.getComputedStyle(surface)[prop],
      setStyle: (prop, value) => surface.style[prop] = value,
      create2dRenderingContext: () => document.createElement("canvas").getContext("2d"),
      setMenuElStyle: (prop, value) => menu.$el.style[prop] = value,
      setMenuElAttr: (attr, value) => menu.$el.setAttribute(attr, value),
      rmMenuElAttr: attr => menu.$el.removeAttribute(attr),
      getMenuElOffsetHeight: () => menu.$el.offsetHeight,

      openMenu: index => menu.show(index),
      isMenuOpen: () => menu.open,
      setSelectedTextContent: text => {
        this.selectedText = text;
      },
      getNumberOfOptions: () => menu.items.length,
      getTextForOptionAtIndex: index => menu.items[index].textContent,
      getValueForOptionAtIndex: index => menu.items[index].dataset.value || menu.items[index].textContent,
      setAttrForOptionAtIndex: (index, attr, value) => menu.items[index].setAttribute(attr, value),
      rmAttrForOptionAtIndex: (index, attr) => menu.items[index].removeAttribute(attr),
      getOffsetTopForOptionAtIndex: index => menu.items[index].offsetTop,
      registerMenuInteractionHandler: (type, handler) => menu.$on(getEventType(type), handler), //menu.$el.addEventListener(type, handler),
      deregisterMenuInteractionHandler: (type, handler) => menu.$off(getEventType(type), handler), //menu.$el.removeEventListener(type, handler),
      notifyChange: () => this.$emit("change", this.foundation.getValue()),
      getWindowInnerHeight: () => window.innerHeight,
      addBodyClass: className => document.body.classList.add(className),
      removeBodyClass: className => document.body.classList.remove(className)
    });
    // Fix the selection handler before initializing
    const selectionHandler = this.foundation.selectionHandler_;
    this.foundation.selectionHandler_ = (index) => selectionHandler({ detail: { index } });

    this.foundation.init();
    this.foundation.setDisabled(this.disabled);
    this.value && this.$_setIndexFromValue(this.value, false);
  },
  beforeDestroy() {
    this.foundation.destroy();
  },
  methods: {
    $_setIndexFromValue(needle, emit = true) {
      const { menu, label } = this.$refs;

      const index = menu.items.findIndex(item => {
        const value = item.dataset.value || item.textContent;
        return value === needle;
      });
      if(index >= 0 && this.foundation.getSelectedIndex() !== index) {
        this.foundation.setSelectedIndex(index);
        emit && this.$emit("change", needle);
        // Fix the label so it floats correctly
        label.classList.add(Foundation.cssClasses.LABEL_FLOAT_ABOVE);
      }
    }
  }
};
</script>