import Foundation from "@material/ripple/foundation.js";
import { supportsCssVariables, getMatchesProperty, applyPassive } from "@material/ripple/util";

const matches = getMatchesProperty(HTMLElement.prototype);
const supportsCssVars = supportsCssVariables(window);

function createRipple(vm, adapter, { unbounded }) {
  const { $el } = vm;
  const { documentElement } = document;

  let rippleAdapter = {
    browserSupportsCssVars() {
      return supportsCssVars;
    },
    computeBoundingRect() {
      return $el.getBoundingClientRect();
    },
    getWindowPageOffset() {
      return { x: window.pageXOffset, y: window.pageYOffset };
    },
    isSurfaceActive() {
      return $el[matches](":active");
    },
    isSurfaceDisabled() {
      return !!this.disabled;
    },
    isUnbounded() {
      return !!unbounded;
    },
    updateCssVariable(name, value) {
      return $el.style.setProperty(name, value);
    },
    addClass(className) {
      $el.classList.add(className);
    },
    removeClass(className) {
      $el.classList.remove(className);
    },

    // Handlers
    registerInteractionHandler(eventType, handler) {
      $el.addEventListener(eventType, handler, applyPassive());
    }, 
    deregisterInteractionHandler(eventType, handler) {
      $el.removeEventListener(eventType, handler, applyPassive());
    },
    registerDocumentInteractionHandler(evtType, handler) {
      documentElement.addEventListener(evtType, handler, applyPassive());
    },
    deregisterDocumentInteractionHandler(evtType, handler) {
      documentElement.removeEventListener(evtType, handler, applyPassive());
    },
    registerResizeHandler(handler) {
      window.addEventListener("resize", handler);
    },
    deregisterResizeHandler(handler) {
      window.removeEventListener("resize", handler);
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
export function Ripple(adapter = null, opts = {}) {
  return {
    data() { return { _ripple: null } },
    beforeMount() {
      if(opts.surface) {
        if(this.$vnode.data.staticClass) {
          this.$vnode.data.staticClass += " mdc-ripple-surface";
        } else {
          this.$vnode.data.staticClass = "mdc-ripple-surface";
        }
        
        if(opts.unbounded) {
          if(this.$vnode.data.attrs) {
            this.$vnode.data.attrs = {};
          }
          debugger;
          this.$vnode.data.attrs["data-mdc-ripple-is-unbounded"] = true;
        }
      }
    },
    mounted() {
      this._ripple = createRipple(this, adapter, opts);
      this._ripple.init();
    },
    updated() {
      this._ripple.layout();
    },
    beforeDestroy($el, binding, vnode) {
      this._ripple.destroy();
    }
  };
}