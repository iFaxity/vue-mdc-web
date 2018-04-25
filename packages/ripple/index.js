import Foundation from '@material/ripple/foundation.js';
import { supportsCssVariables, getMatchesProperty, applyPassive } from '@material/ripple/util';

const matches = getMatchesProperty(HTMLElement.prototype);
const supportsCssVars = supportsCssVariables(window);

function createRipple(vm, adapter, { unbounded }) {
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
      return $el[matches](':active');
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
      window.addEventListener('resize', handler);
    },
    deregisterResizeHandler(handler) {
      window.removeEventListener('resize', handler);
    }
  };

  if(adapter != null && typeof adapter === 'object') {
    Object.assign(rippleAdapter, adapter);
  }

  // Bind all function to the VueComponent
  Object.keys(rippleAdapter).forEach(key => {
    const fn = rippleAdapter[key];
    rippleAdapter[key] = fn.bind(vm);
  });
  return new Foundation(rippleAdapter);
}

function getSize(el) {
  return {
    width: el.offsetWidth,
    height: el.offsetHeight
  };
}
function isSizeEqual(size1, size2) {
  return size1.width === size2.width && size1.height === size2.height;
}

// Exports the directive and the matches property
export { matches };
export function Ripple(adapter = null, opts = {}) {
  return {
    data() { return { _ripple: null, _rippleBounds: null } },
    beforeMount() {
      if(opts.surface) {
        if(this.$vnode.data.staticClass) {
          this.$vnode.data.staticClass += ' mdc-ripple-surface';
        } else {
          this.$vnode.data.staticClass = 'mdc-ripple-surface';
        }
        
        // Add unbounded attribute to element
        if(opts.unbounded) {
          if(this.$vnode.data.attrs) {
            this.$vnode.data.attrs = {};
          }
          this.$vnode.data.attrs['data-mdc-ripple-is-unbounded'] = true;
        }
      }
    },
    mounted() {
      this._ripple = createRipple(this, adapter, opts);
      this._ripple.init();

      this._rippleBounds = getSize(this.$el);
    },
    updated() {
      const newSize = getSize(this.$el);

      // When a components size changes then update the ripple
      if(isSizeEqual(this._rippleBounds, newSize)) {
        this._ripple.layout();
        this._rippleBounds = newSize;
      }
    },
    beforeDestroy() {
      this._ripple.destroy();
    }
  };
}