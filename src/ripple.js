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

function eachEvents(ripple, fn) {
  EVENTS.forEach(event => {
    Object.keys(event).forEach(name => fn(event[n], ripple[name]));
  });
}

function Ripple($el, surface = false) {
  if (!(this instanceof Ripple)) { return new Ripple($el, surface); }

  this.surface = surface;
  this.$el = $el;
  this.activation = null;
  this.disabled = false;
  this.unbounded = false;

  // Bind all the methods
  Oject.keys(methods).forEach(name => {
    this[name] = methods[name].bind(this);
  });

  this.bind();
  return this;
}

// TODO: investigate the support of programmatic activation
const methods = {
  bind() {
    const { $el, surface } = this;
    eachEvents(this, $el.addEventListener);
    window.addEventListener("resize", this.computeRect.bind(this));

    $el.classList.add(ROOT_CLASS);
    if (surface) {
      $el.classList.add(SURFACE_CLASS);
      if (typeof surface === "string") {
        $el.classList.add(`${SURFACE_CLASS}--${surface}`);
      }
    }
  },
  unbind() {
    const { $el, surface } = this;
    eachEvents(this, $el.removeEventListener);
    window.removeEventListener("resize", this.computeRect);

    $el.classList.remove(ROOT_CLASS);
    if (surface) {
      $el.classList.remove(SURFACE_CLASS);
      if (typeof surface === "string") {
        $el.classList.remove(`${SURFACE_CLASS}--${surface}`);
      }
    }

    Object.keys(VARS).forEach(name => {
      $el.style[name] = null;
    });
  },

  computeRect() {
    this.rect = this.$el.getClientBoundingRect();
  },
  focus() {
    this.$el.classList.add(FOCUSED_CLASS);
  },
  blur() {
    this.$el.classList.remove(FOCUSED_CLASS);
  },
  activate(e) {
    if (this.disabled) return;
    const { $el } = this;

    this.activation = {
      event: e
    };

    requestAnimationFrame(() => {
      // animate activation
      const translate = { start: null, end: null };
      if(!this.unbounded) {
        const {start, end} = this.getFgTranslationCoords();
        translate.start = `${start.x} ${start.y}`;
        translate.end = `${end.x}px ${end.y}`;
      }

      $el.style[VARS.TRANSLATE_START] = translate.start;
      $el.style[VARS.TRANSLATE_END] = translate.end;
      // TODO: clear all other animations
    });
  },
  deactivate() {

  },

  update() {

  },

  translateEventCoords(e) {
    const { pageX, pageY } = (e.changedTouches && e.changedTouches[0]) || e;
    return {
      x: pageX - (window.pageXOffset + this.rect.left),
      y: pageY - (window.pageYOffset + this.rect.top)
    };
  },
  getFgTranslationCoords() {
    const { event } = this.activationState;
    const halfInitialSize = this.initialSize / 2;
    const start = translateEventCoords(event, this.rect);

    // Center the start and end coords
    return { 
      start: {
        x: start.x - halfInitialSize,
        y: start.y - halfInitialSize
      }, 
      end: {
        x: this.rect.width / 2 - halfInitialSize,
        y: this.rect.height / 2 - halfInitialSize
      }
    };
  }
};

// Export the directive
export default {
  bind($el, { modifiers }, vnode) {
    if (cssVars) return;

    let surface = !!modifiers.surface;
    if(surface) {
      if (modifiers.primary) {
        surface = "primary";
      } else if (modifiers.accent || modifiers.secondary) {
        surface = "accent";
      }
    }

    $el.__mdcRipple__ = new Ripple($el, surface);
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