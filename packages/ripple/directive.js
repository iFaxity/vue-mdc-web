import Foundation from "@material/ripple/foundation.js";
import { supportsCssVariables, getMatchesProperty, applyPassive } from "@material/ripple/util";

const matches = getMatchesProperty(HTMLElement.prototype);
const supportsCssVars = supportsCssVariables(window);

const DEFAULT_OPTS = {
  adapter: null,
  enabled: true,
  unbounded: false
};
function parseOpts({ modifiers, value }) {
  const opts = value.adapter || value;
  return Object.assign({}, DEFAULT_OPTS, modifiers, opts);
}

function createRipple(vm, { adapter, unbounded }) {
  const { $el } = vm;
  const { documentElement } = document;

  const rippleAdapter = {
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

  // Bind all adapter functions to the VueComponent
  Object.keys(rippleAdapter).forEach(key => {
    const fn = rippleAdapter[key];
    rippleAdapter[key] = fn.bind(vm);
  });
  return new Foundation(rippleAdapter);
}

// Exports the directive and the matches property
export { matches };
export default {
  inserted(el, binding) {
    const opts = parseOpts(binding);
    
    if(opts.enabled) {
      const ripple = createRipple(this, opts);
      ripple.init();
      el.__mdcRipple__ = ripple;
    }
  },
  unbind(el, binding) {
    el.__mdcRipple__.destroy();
    el.__mdcRipple__ = null;
  },
  componentUpdated(el, binding) {
    const opts = parseOpts(binding);

    // Removes ripple if it is not enabled
    if(opts.enabled && !el.__mdcRipple__) {
      const ripple = createRipple(this, opts);
      ripple.init();
      el.__mdcRipple__ = ripple;
    } else if(!opts.enabled && el.__mdcRipple__) {
      el.__mdcRipple__.destroy();
      el.__mdcRipple__ = null;
    }
  }
};
