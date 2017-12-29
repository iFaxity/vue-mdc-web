import Foundation from "@material/ripple/foundation.js";
import { supportsCssVariables, getMatchesProperty } from "@material/ripple/util";

const matches = getMatchesProperty(HTMLElement.prototype);
const supportsCssVars = supportsCssVariables(window);

function createRipple(vm, adapter, { unbounded }) {
  let rippleAdapter = {
    browserSupportsCssVars() {
      return supportsCssVars;
    },
    computeBoundingRect() {
      return this.$el.getBoundingClientRect();
    },
    getWindowPageOffset() {
      return { x: window.pageXOffset, y: window.pageYOffset };
    },
    isSurfaceActive() {
      return this.$el[matches](":active");
    },
    isSurfaceDisabled() {
      return !!this.disabled;
    },
    isUnbounded() {
      return !!unbounded;
    },
    updateCssVariable(name, value) {
      return this.$el.style.setProperty(name, value);
    },
    addClass(className) {
      this.$el.classList.add(className);
    },
    removeClass(className) {
      this.$el.classList.remove(className);
    },

    // Handlers
    registerResizeHandler(handler) {
      window.addEventListener("resize", handler);
    },
    deregisterResizeHandler(handler) {
      window.removeEventListener("resize", handler);
    },
    registerInteractionHandler(eventType, handler) {
      this.$el.addEventListener(eventType, handler);
    },
    deregisterInteractionHandler(eventType, handler) {
      this.$el.removeEventListener(eventType, handler);
    }
  };

  if(adapter != null && typeof adapter === "object") {
    Object.assign(rippleAdapter, adapter);
  }

  // Bind all function to the VueComponent
  Object.keys(rippleAdapter).forEach(key => {
    const fn = rippleAdapter[key];
    rippleAdapter[key] = fn.bind(vm);
  });
  return new Foundation(rippleAdapter);
}

// Exports the directive and the matches property
export { matches };
export default function install(adapter = null, opts = {}) {
  return {
    data() { return { _ripple: null } },
    mounted() {
      if (supportsCssVariables) {
        const ripple = createRipple(this, adapter, opts);
        ripple.init();
        this._ripple = ripple;
      } else {
        // no need to run if not supported
        console.log("Ripple cant be used. Browser doesn't support CSS variables.");
      }
    },
    beforeDestroy($el, binding, vnode) {
      this._ripple.destroy();
    }
  };
}