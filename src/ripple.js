import { upEvent, downEvent, moveEvent, supportsCssVars } from "../util";

// ClassList
const SURFACE_CLASS = "mdc-ripple-surface";
const ROOT_CLASS = "mdc-ripple-upgraded";
const UNBOUNDED_CLASS = "mdc-ripple-upgraded--unbounded";
const FOCUSED_CLASS = "mdc-ripple-upgraded--background-focused";
const ACTIVE_FILL_CLASS = "mdc-ripple-upgraded--background-active-fill";
const ACTIVATION_CLASS = "mdc-ripple-upgraded--foreground-activation";
const DEACTIVATION_CLASS = "mdc-ripple-upgraded--foreground-deactivation";

// Constants
const PADDING = 10;
const INITIAL_SCALE = 0.6;
const DEACTIVATION_MS = 225;
const FG_DEACTIVATION_MS = 150;
// CSS Variables
const VARS = {
  SIZE: "--mdc-ripple-fg-size",
  LEFT: "--mdc-ripple-left",
  TOP: "--mdc-ripple-top",
  SCALE: "--mdc-ripple-fg-scale",
  TRANSLATE_START: "--mdc-ripple-fg-translate-start",
  TRANSLATE_END: "--mdc-ripple-fg-translate-end",
};
// Available events
const EVENTS = [
  //{ activate: "touchstart", deactivate: "touchend" },
  //{ activate: "pointerdown", deactivate: "pointerup" },
  //{ activate: "mousedown", deactivate: "mouseup" },
  { activate: downEvent, deactivate: upEvent },
  { activate: "keydown", deactivate: "keyup" },
  { focus: "focus", blur: "blur" }
];

const bindings = {
  activate(e) {
    const $el = e.currentTarget;
  },
  deactivate(e) {
    const $el = e.currentTarget;
  },
  focus(e) {
    const $el = e.currentTarget;
    $el.classList.add(FOCUSED_CLASS);
  },
  blur(e) {
    const $el = e.currentTarget;
    $el.classList.remove(FOCUSED_CLASS);
  }
};
function eachEvent(fn) {
  EVENTS.forEach(event => {
    Object.keys(event).forEach(name => fn(event[n], bindings[name]));
  });
}

class MDCRipple {
  constructor($el, surface = false) {
    this.$el = $el;
    this.surface = surface;
    this.unbound = false;
    this.updateFrame = null;

    this.bind();
  }
  unbind() {
    const { $el } = this;
    // Remove listeners
    eachEvent($el.removeEventListener);
    window.removeEventListener("resize", this.update);

    $el.classList.remove(ROOT_CLASS);
    $el.classList.remove(UNBOUNDED_CLASS);

    Object.keys(VARS).forEach(key => {
      const name = VARS[key];
      this.$el.style[name] = null;
    });
  }
  bind() {
    const { $el } = this;
    // Add listeners
    eachEvent($el.addEventListener);
    window.addEventListener("resize", this.update);

    $el.classList.add(ROOT_CLASS);
    this.update();
  }

  activate(e) {
    const { $el } = this;
    if (this.active) return;

    requestAnimationFrame(() => {
      // Wrap in rAF because web browser inconsistent behaviour
      const activated = (e && e.type === "keydown") ? $el.matches(":active") : true;
      if(activated) {
        this.animateActivation(); 
      }
    });
  }
  animateActivation() {
    const { $el } = this;
    const translate = {
      start: null, end: null
    };

    if(!this.unbound) {
      // set translate stuff
    }

    $el.style[VARS.TRANSLATE_START] = translate.start;
    $el.style[VARS.TRANSLATE_END] = translate.end;

    $el.classList.remove(DEACTIVATION_CLASS);

    this.rect = $el.getBoundingClientRect();
    $el.classList.add(ACTIVE_FILL_CLASS);
    $el.classList.add(ACTIVATION_CLASS);
    //callback?
    const activationTimer = setTimeout(() => {
      const activationHasEnded = true;
      
    }, DEACTIVATION_MS)
  }

  deactivate(e) {
    if(!this.activated) return;

    // TODO: add programmatic

    Object.keys(EVENTS).some(event => {
      if (event.deactivate === e.type) {
        pair = event.activate;
        return true;
      }
    });

    requestAnimationFrame(() => {
      //if(e.type === kek) {}
      this.$el.classList.remove(FOCUSED_CLASS);
    });
  }
  animateDeactivation() {

  }
  
  focus(e) {
    this.$el.classList.add(FOCUSED_CLASS);
  }
  blur(e) {
    this.$el.classList.remove(FOCUSED_CLASS);
  }

  update() {
    if (this.updateFrame) {
      cancelAnimationFrame(this.update);
    }

    this.updateFrame = requestAnimationFrame(() => {
      const { $el } = this;
      this.rect = $el.getBoundingClientRect();

      const { width, height } = this.rect;
      const max = Math.max(height, width);
      const diameter = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

      const initialSize = max * 0.6;
      const maxRadius = diameter + 10;
      const fgScale = maxRadius / initialSize;
      const xfDuration = 1000 * Math.sqrt(maxRadius / 1024);

      // Update css vars
      $el.style[VARS.SIZE] = `${initialSize}px`;
      $el.style[VARS.SCALE] = fgScale;

      if (this.unbound) {
        const halfSize = (initialSize / 2);
        const left = Math.round(width / 2 - halfSize);
        const top = Math.round(height / 2 - halfSize);

        $el.style[VARS.LEFT] = `${left}px`;
        $el.style[VARS.TOP] = `${top}px`;
      }

      this.updateFrame = null;
    });
  }
}

// Export the directive
export default {
  bind($el, binding, vnode) {
    const { modifiers } = binding;
    if (cssVars) return;

    const ripple = new MDCRipple($el, !!modifiers.surface);
    $el.__mdcRipple__ = ripple;
  },
  componentUpdated($el, binding, vnode) {
    if(!vnode.functionalContext) return;

    $el.__mdcRipple__.unbind();
    $el.__mdcRipple__.bind();
  },
  unbind($el, binding, vnode) {
    if ($el.__mdcRipple__) {
      $el.__mdcRipple__.unbind();
      delete $el.__mdcRipple__;
    }
  }
};