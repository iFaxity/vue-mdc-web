(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['mdc-vue'] = factory());
}(this, (function () { 'use strict';

var button = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.link ? "a" : "button",_vm._g({tag:"component",class:_vm.cssClasses,attrs:{"href":_vm.link}},_vm.$listeners),[(_vm.icon)?_c('i',{staticClass:"material-icons mdc-button__icon"},[_vm._v(_vm._s(_vm.icon))]):_vm._e(),_vm._t("default")],2)},staticRenderFns: [],
  name: "MdcButton",
  props: {
    icon: String,
    raised: Boolean,
    unelevated: Boolean,
    stroked: Boolean,
    dense: Boolean,
    compact: Boolean,
    secondary: Boolean,
    ripple: {
      type: Boolean,
      default: true
    },

    link: String
  },
  computed: {
    cssClasses: function cssClasses() {
      return {
        "mdc-button": true,
        "mdc-button--raised": this.raised,
        "mdc-button--unelevated": this.unelevated,
        "mdc-button--stroked": this.stroked,
        "mdc-button--dense": this.dense,
        "mdc-button--compact": this.compact,
        "secondary-filled-button": this.secondary
      };
    }
  }
};

var fab = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{class:_vm.cssClasses,attrs:{"aria-label":_vm.label}},[_c('span',{staticClass:"mdc-fab__icon"},[_vm._v(_vm._s(_vm.icon))])])},staticRenderFns: [],
  name: "MdcFab",
  props: {
    mini: Boolean,
    exited: Boolean,

    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  computed: {
    cssClasses: function cssClasses() {
      return {
        "mdc-fab": true,
        "material-icons": true,
        "mdc-fab--mini": this.mini,
        "mdc-fab--exited": this.exited
      };
    }
  }
};

var iconToggle = {
  name: "MdcIconToggle",
  props: {},
  data: function data() {
    return {};
  },
  methods: {},
};



var Buttons = Object.freeze({
	Button: button,
	Fab: fab,
	IconToggle: iconToggle
});

var card = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.cssClasses},[_vm._t("default")],2)},staticRenderFns: [],
  name: "MdcCard",
  props: {
    dark: Boolean
  },
  computed: {
    cssClasses: function cssClasses() {
      return {
        "mdc-card": true,
        // TODO: move theming to a mixin
        "mdc-card--theme-dark": this.dark
      };
    }
  }
};



var Cards = Object.freeze({
	Card: card
});

var dialog = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('aside',{staticClass:"mdc-dialog",class:_vm.cssClasses,attrs:{"aria-labelledby":"","aria-describedby":""}},[_c('div',{staticClass:"mdc-dialog__surface",on:{"transitionend":function($event){_vm.animating = false;}}},[(_vm.$slots.header)?_c('header',{staticClass:"mdc-dialog__header"},[_vm._t("header")],2):_vm._e(),(_vm.$slots.default)?_c('section',{class:_vm.cssBodyClasses},[_vm._t("default")],2):_vm._e(),_c('footer',{staticClass:"mdc-dialog__footer"},[_vm._t("footer",[_c('mdc-button',{staticClass:"mdc-dialog__footer__button",on:{"click":_vm.decline}},[_vm._v("Cancel")]),_c('mdc-button',{staticClass:"mdc-dialog__footer__button",on:{"click":_vm.accept}},[_vm._v("Ok")])])],2)]),_c('div',{staticClass:"mdc-dialog__backdrop",on:{"click":_vm.decline}})])},staticRenderFns: [],
  name: "MdcDialog",
  props: {
    scrollable: Boolean
  },
  data: function data() {
    return { isOpen: false, animating: false };
  },
  computed: {
    cssBodyClasses: function cssBodyClasses() {
      return {
        "mdc-dialog__body": true,
        "mdc-dialog__body--scrollable": this.scrollable
      };
    },
    cssClasses: function cssClasses() {
      return {
        "mdc-dialog--open": this.isOpen,
        "mdc-dialog--animating": this.animating
      };
    }
  },
  methods: {
    open: function open() {
      if(this.isOpen) { return false; }

      document.body.classList.add("mdc-dialog-scroll-lock");
      this.animating = true;
      this.isOpen = true;
      return true;
    },
    close: function close() {
      if(!this.isOpen) { return false; }
      
      document.body.classList.remove("mdc-dialog-scroll-lock");
      this.animating = true;
      this.isOpen = false;
      return true;
    },
    accept: function accept(emit) {
      if ( emit === void 0 ) emit = true;

      if(this.close() && emit) {
        this.$emit("action", "accept");
        this.$emit("accept");
      }
    },
    decline: function decline(emit) {
      if ( emit === void 0 ) emit = true;

      if(this.close() && emit) {
        this.$emit("action", "decline");
        this.$emit("cancel");
      }
    }
  }
};

var title = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.tag,{tag:"component",staticClass:"mdc-dialog__header__title"},[_vm._t("default")],2)},staticRenderFns: [],
  name: "MdcDialogTitle",
  props: {
    level: {
      type: [Number, String],
      default: 2,
      validator: function (value) { return value >= 1 && value <= 6; }
    }
  },
  computed: {
    tag: function tag() {
      return "h" + this.level;
    }
  }
};



var Dialogs = Object.freeze({
	Dialog: dialog,
	DialogTitle: title
});

var checkbox = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-checkbox",class:_vm.cssClasses},[_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],ref:"input",staticClass:"mdc-checkbox__native-control",attrs:{"type":"checkbox","disabled":_vm.disabled},domProps:{"checked":Array.isArray(_vm.model)?_vm._i(_vm.model,null)>-1:(_vm.model)},on:{"change":function($event){var $$a=_vm.model,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.model=$$a.concat([$$v]));}else{$$i>-1&&(_vm.model=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.model=$$c;}}}},'input',_vm.$attrs,false)),_c('div',{staticClass:"mdc-checkbox__background"},[_c('svg',{staticClass:"mdc-checkbox__checkmark",attrs:{"viewBox":"0 0 24 24"}},[_c('path',{staticClass:"mdc-checkbox__checkmark__path",attrs:{"fill":"none","stroke":"white","d":"M1.73,12.91 8.1,19.28 22.79,4.59"}})]),_c('div',{staticClass:"mdc-checkbox__mixedmark"})])])},staticRenderFns: [],
  name: "MdcCheckbox",
  inheritAttrs: false,
  props: {
    disabled: Boolean,
    checked: Boolean,
    indeterminate: Boolean
  },
  model: {
    prop: "checked",
    event: "change"
  },
  watch: {
    indeterminate: {
      immediate: true,
      handler: function handler(value) {
        var this$1 = this;

        this.$nextTick(function () {
          var ref = this$1.$refs;
          var input = ref.input;
          if(input && input.indeterminate !== value) {
            input.indeterminate = value;
          }
        });
      }
    }
  },
  computed: {
    model: {
      get: function get() {
        return this.checked;
      },
      set: function set(value) {
        this.$emit("change", value);
      }
    },
    cssClasses: function cssClasses() {
      return {
        "mdc-checkbox--disabled": this.disabled
      };
    }
  }
};

var field = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-form-field",class:_vm.cssClasses},[_vm._t("default"),_c('label',[_vm._v(_vm._s(_vm.label))])],2)},staticRenderFns: [],
  name: "MdcField",
  props: {
    label: {
      type: String,
      required: true
    },
    alignEnd: Boolean
  },
  computed: {
    cssClasses: function cssClasses() {
      return {
        "mdc-form-field--align-end": this.alignEnd
      }
    }
  }
};

var radio = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-radio",class:_vm.cssClasses},[_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],staticClass:"mdc-radio__native-control",attrs:{"type":"radio","disabled":_vm.disabled},domProps:{"checked":_vm._q(_vm.model,null)},on:{"change":function($event){_vm.model=null;}}},'input',_vm.$attrs,false)),_vm._m(0,false,false)])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-radio__background"},[_c('div',{staticClass:"mdc-radio__outer-circle"}),_c('div',{staticClass:"mdc-radio__inner-circle"})])}],
  name: "MdcRadio",
  inheritAttrs: false,
  props: {
    disabled: Boolean,
    checked: Boolean
  },
  model: {
    prop: "checked",
    event: "change",
  },
  computed: {
    model: {
      get: function get() {
        return this.checked;
      },
      set: function set(value) {
        this.$emit("change", value);
      }
    },
    cssClasses: function cssClasses() {
      return {
        "mdc-radio--disabled": this.disabled
      };
    }
  }
};

var EVENTS = [
  /*{
    down: "pointerdown",
    up: "pointerup",
    move: "pointermove"
  },*/
  {
    down: "touchstart",
    up: "touchend",
    move: "touchmove"
  },
  {
    down: "mousedown",
    up: "mouseup",
    move: "mousemove"
  }
];
function checkEvent(type) {
  var $event = EVENTS.find(function (event) {
    var name = event[type];
    return ("on" + name) in document.documentElement;
  });
  return $event[type];
}

var supportsPassive = false;
// Test via a getter in the options object to see if the passive property is accessed
try {
  var opts = Object.defineProperty({}, "passive", {
    get: function get() { supportsPassive = true; }
  });
  window.addEventListener("testPassive", null, opts);
  window.removeEventListener("testPassive", null, opts);
} catch (e) {}


var downEvent = checkEvent("down");
var upEvent = checkEvent("up");
var moveEvent = checkEvent("move");

var supportsCssVars = window.CSS && window.CSS.supports && window.CSS.supports("--css-var", 0);
function passiveOpts() {
  return supportsPassive ? { passive: true } : null;
}

var KEYS = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  UP: "ArrowUp",
  DOWN: "ArrowDown",
  HOME: "Home",
  END: "End",
  PAGE_UP: "PageUp",
  PAGE_DOWN: "PageDown"
};
function getKey(ref) {
  var key = ref.key;
  var keyCode = ref.keyCode;

  if(key === KEYS.LEFT || keyCode === 37) {
    return KEYS.LEFT;
  }
  if(key === KEYS.RIGHT || keyCode === 39) {
    return KEYS.RIGHT;
  }
  if(key === KEYS.UP || keyCode === 38) {
    return KEYS.UP;
  }
  if(key === KEYS.DOWN || keyCode === 40) {
    return KEYS.DOWN;
  }
  if(key === KEYS.HOME || keyCode === 36) {
    return KEYS.HOME;
  }
  if(key === KEYS.END || keyCode === 35) {
    return KEYS.END;
  }
  if(key === KEYS.PAGE_UP || keyCode === 33) {
    return KEYS.PAGE_UP;
  }
  if(key === KEYS.LEFT || keyCode === 34) {
    return KEYS.PAGE_DOWN;
  }
  return null;
}
function clamp(min, max, value) {
  if(value < min) {
    return min;
  }
  return value > max ? max : value;
}
function quantize(value, step, decimals) {
  if(step <= 0) { return value; }

  var steps = Math.round(value / step);
  return steps * step;
}

var slider = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-slider",class:_vm.cssClasses,attrs:{"role":"slider","aria-label":_vm.label,"tabindex":_vm.disabled ? false : "0","aria-disabled":_vm.disabled,"aria-valuemin":_vm.min,"aria-valuemax":_vm.max,"aria-valuenow":_vm.value},on:{"blur":_vm.onBlur,"focus":_vm.onFocus,"keydown":_vm.keyDown,"mousedown":_vm.onDown,"pointerdown":_vm.onDown,"touchstart":_vm.onDown}},[_c('div',{staticClass:"mdc-slider__track-container"},[_c('div',{staticClass:"mdc-slider__track",style:(_vm.styleTrack)}),(_vm.discrete === "markers")?_c('div',{staticClass:"mdc-slider__track-marker-container"},_vm._l((_vm.markers),function(item){return _c('div',{staticClass:"mdc-slider__track-marker"})})):_vm._e()]),_c('div',{staticClass:"mdc-slider__thumb-container",style:(_vm.styleThumbContainer),on:{"transitionend":function($event){_vm.inTransit = false;}}},[(typeof _vm.discrete === "string")?_c('div',{staticClass:"mdc-slider__pin"},[_c('span',{staticClass:"mdc-slider__pin-value-marker"},[_vm._v(_vm._s(_vm.innerValue))])]):_vm._e(),_c('svg',{staticClass:"mdc-slider__thumb",attrs:{"width":"21","height":"21"}},[_c('circle',{attrs:{"cx":"10.5","cy":"10.5","r":"7.875"}})]),_c('div',{staticClass:"mdc-slider__focus-ring"})])])},staticRenderFns: [],
  name: "MdcSlider",
  props: {
    label: String,
    disabled: Boolean,
    discrete: {
      type: String,
      validator: function (value) { return value === "" || value === "markers"; }
    },

    step: {
      type: [String, Number],
      default: 0,
      validator: function (value) { return value >= 0; }
    },
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: [String, Number],
      default: 0
    },
    max: {
      type: [String, Number],
      default: 100
    }
  },
  data: function data() {
    return {
      sliding: false, active: false,
      focus: false, inTransit: false,
      rect: null, pctComplete: null, innerValue: null
    };
  },
  model: {
    prop: "value",
    event: "change"
  },
  mounted: function mounted() {
    var this$1 = this;

    // Set initial values please
    this.$nextTick(function () {
      window.addEventListener("resize", this$1.onResize);
      this$1.onResize();
      // do initial render
      this$1.setValue(this$1.value);
    });
  },
  destroyed: function destroyed() {
    window.removeEventListener("resize", this.onResize);
  },
  computed: {
    styleTrack: function styleTrack() {
      return ("transform: scaleX(" + (this.pctComplete) + ");");
    },
    styleThumbContainer: function styleThumbContainer() {
      return ("transform: translateX(" + (this.translatePx) + "px) translateX(-50%);");
    },
    cssClasses: function cssClasses() {
      return {
        "mdc-slider--disabled": this.disabled,
        "mdc-slider--discrete": typeof this.discrete === "string",
        "mdc-slider--display-markers": this.discrete === "markers",
        "mdc-slider--active": this.active,
        "mdc-slider--focus": this.focus,
        "mdc-slider--in-transit": this.inTransit
      };
    },
    markers: function markers(fixed) {
      if ( fixed === void 0 ) fixed = true;

      var range = this.max - this.min;
      var step = +this.step;

      if(this.discrete && step > 0) {
        range /= step;
      }

      // Get higher number if decimal
      return range % 1 ? range : Math.ceil(range);
    },
    translatePx: function translatePx() {
      var width = this.rect && this.rect.width;
      return this.pctComplete * width;
    },
    decimalCount: function decimalCount() {
      if(this.step > 0 && this.step % 1) {
        return this.step.toString().split(".")[1].length;
      }
      return 0;
    }
  },
  methods: {
    setValueFromEvent: function setValueFromEvent(e) {
      var pageX = e.targetTouches ? e.targetTouches[0].pageX : e.pageX;
      var xPos = pageX - this.rect.left;
      var pctComplete = clamp(0, 1, xPos / this.rect.width);
      /* TODO: Add RTL Support
      if(this.rtl) {
        pctComplete = 1 - pctComplete;
      }*/

      var value = +this.min + pctComplete * (this.max - this.min);
      this.setValue(value);
    },
    setValue: function setValue(value) {
      value = quantize(value, +this.step);
      value = clamp(this.min, this.max, value);
      if(this.decimalCount) {
        value = +value.toFixed(this.decimalCount);
      }

      if(this.innerValue !== value) {
        this.innerValue = value;
        this.pctComplete = (value - this.min) / (this.max - this.min);
        this.$emit("input", value);
      }
    },
    // TODO: change from computed transforms to referencing components
    onBlur: function onBlur() {
      if(this.disabled) { return; }
      this.focus = false;
    },
    onFocus: function onFocus() {
      if(this.disabled) { return; }
      this.focus = true;
    },
    onResize: function onResize() {
      this.rect = this.$el.getBoundingClientRect();
    },
    keyDown: function keyDown(e) {
      var key = getKey(e);

      if(key) {
        e.preventDefault();
        var value = this.value;
        var delta = +this.step || (this.max - this.min) / 100;
        /* TODO: Flip delta on rtl
        if(rtl && (key === KEYS.LEFT || key === KEYS.RIGHT)) {
          delta = -delta;
        }*/

        // Change value according to ARIA Slider spec
        switch(key) {
          case KEYS.LEFT:
          case KEYS.DOWN:
            value -= delta;
            break;
          case KEYS.RIGHT:
          case KEYS.UP:
            value += delta;
            break;
          case KEYS.HOME:
            value = this.min;
            break;
          case KEYS.END:
            value = this.max;
            break;
          case KEYS.PAGE_UP:
            value += delta * 4;
            break;
          case KEYS.PAGE_DOWN:
            value -= delta * 4;
            break;
        }

        value = clamp(this.min, this.max, value);
        this.setValue(value);
        this.$emit("change", this.innerValue);
      }
    },
    onMove: function onMove(e) {
      if(!this.disabled && this.active) {
        this.setValueFromEvent(e);
      }
    },
    onUp: function onUp(e) {
      if(!this.disabled) {
        document.body.removeEventListener(moveEvent, this.onMove);
        document.body.removeEventListener(upEvent, this.onUp);

        this.active = false;
        this.$emit("change", this.innerValue);
      }
    },
    onDown: function onDown(e) {
      if(!this.disabled) {
        document.body.addEventListener(moveEvent, this.onMove);
        document.body.addEventListener(upEvent, this.onUp);

        this.active = true;
        this.inTransit = true;
        this.setValueFromEvent(e);
      }
    }
  }
};

var _switch = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-switch",class:_vm.cssClasses},[_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],staticClass:"mdc-switch__native-control",attrs:{"type":"checkbox","disabled":_vm.disabled},domProps:{"checked":Array.isArray(_vm.model)?_vm._i(_vm.model,null)>-1:(_vm.model)},on:{"change":function($event){var $$a=_vm.model,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.model=$$a.concat([$$v]));}else{$$i>-1&&(_vm.model=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.model=$$c;}}}},'input',_vm.$attrs,false)),_vm._m(0,false,false)])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-switch__background"},[_c('div',{staticClass:"mdc-switch__knob"})])}],
  name: "MdcSwitch",
  inheritAttrs: false,
  props: {
    disabled: Boolean,
    checked: Boolean
  },
  model: {
    prop: "checked",
    event: "change"
  },
  computed: {
    model: {
      get: function get() {
        return this.checked;
      },
      set: function set(value) {
        this.$emit("change", value);
      }
    },
    cssClasses: function cssClasses() {
      return {
        "mdc-switch--disabled": this.disabled
      };
    }
  }
};

var textfield = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-text-field",class:_vm.cssClasses,on:{"touchstart":_vm.click,"mousedown":_vm.click,"keydown":_vm.click}},[(_vm.icon && !_vm.trailingIcon)?_c('i',{staticClass:"material-icons mdc-text-field__icon",attrs:{"tabindex":_vm.clickIcon && "0"}},[_vm._v(_vm._s(_vm.icon))]):_vm._e(),_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],ref:"input",staticClass:"mdc-text-field__input",attrs:{"disabled":_vm.disabled},domProps:{"value":(_vm.model)},on:{"focus":_vm.focus,"blur":_vm.blur,"input":function($event){if($event.target.composing){ return; }_vm.model=$event.target.value;}}},'input',_vm.$attrs,false)),_c('label',{staticClass:"mdc-text-field__label",class:_vm.cssLabelClasses},[_vm._t("default")],2),(_vm.icon && _vm.trailingIcon)?_c('i',{staticClass:"material-icons mdc-text-field__icon",attrs:{"tabindex":_vm.clickIcon && "0"}},[_vm._v(_vm._s(_vm.icon))]):_vm._e(),_c('div',{ref:"line",staticClass:"mdc-text-field__bottom-line",class:_vm.cssLineClasses})])},staticRenderFns: [],
  name: "MdcTextfield",
  inheritAttrs: false,
  props: {
    disabled: Boolean,
    box: Boolean,
    dense: Boolean,
    value: String,

    // Icon stuff
    icon: String,
    trailingIcon: Boolean,
    clickIcon: Boolean
  },
  data: function data() {
    return { active: false, invalid: false };
  },
  computed: {
    model: {
      get: function get() {
        return this.value;
      },
      set: function set(value) {
        this.$emit("input", value);
      }
    },
    cssLabelClasses: function cssLabelClasses() {
      return {
        "mdc-text-field__label--float-above": this.active || this.value,
        "mdc-text-field__label--shake": this.invalid
      };
    },
    cssLineClasses: function cssLineClasses() {
      return {
        "mdc-text-field__bottom-line--active": this.active
      };
    },
    cssClasses: function cssClasses() {
      return {
        "mdc-text-field--upgraded": true,
        "mdc-text-field--disabled": this.disabled,
        "mdc-text-field--focused": this.active,
        "mdc-text-field--invalid": this.invalid,
        "mdc-text-field--box": this.box,
        "mdc-text-field--dense": this.dense,
        "mdc-text-field--with-leading-icon": this.icon && !this.trailingIcon,
        "mdc-text-field--with-trailing-icon": this.icon && this.trailingIcon
      };
    }
  },
  methods: {
    click: function click(e) {
      var ref = this.$refs;
      var line = ref.line;
      var target = e.target;
      var type = e.type;

      if(this.clickIcon && target.classList.contains("mdc-text-field__icon")) {
        if(type === "click" || e.key === "Enter" || e.keyCode === 13) {
          this.$emit("icon");
        }
      }

      // Bottom line focus
      if(line) {
        var rect = e.target.getBoundingClientRect();
        var normalized = e.clientX - rect.left;
        line.style.transformOrigin = normalized + "px center";
      }
    },
    focus: function focus() {
      this.active = true;
    },
    blur: function blur() {
      this.active = false;
      this.checkValidity();
    },
    checkValidity: function checkValidity() {
      var ref = this.$refs;
      var input = ref.input;

      this.invalid = input && !input.checkValidity();
      if(this.invalid) {
        this.$emit("invalid", this.value);
      }
    }
  }
};

var textfieldHelptext = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',{staticClass:"mdc-text-field-helper-text",class:_vm.cssClasses,attrs:{"aria-hidden":"true"}},[_vm._t("default")],2)},staticRenderFns: [],
  name: "MdcTextfieldHelptext",
  props: {
    persistent: Boolean,
    validation: Boolean
  },
  computed: {
    cssClasses: function cssClasses() {
      return {
        "mdc-text-field-helper-text--persistent": this.persistent,
        "mdc-text-field-helper-text--validation-msg": this.validation
      };
    }
  }
};



var Inputs = Object.freeze({
	Checkbox: checkbox,
	Field: field,
	Radio: radio,
	Slider: slider,
	Switch: _switch,
	Textfield: textfield,
	TextfieldHelptext: textfieldHelptext
});

var icon = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.link ? "a" : "button",{tag:"component",staticClass:"material-icons mdc-toolbar__icon"},[_vm._t("default")],2)},staticRenderFns: [],
  name: "MdcToolbarIcon",
  props: {
    link: String
  }
};

var menuIcon = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.link ? "a" : "button",_vm._g({tag:"component",staticClass:"material-icons mdc-toolbar__menu-icon",attrs:{"href":_vm.link}},_vm.$listeners),[_vm._v("menu")])},staticRenderFns: [],
  name: "MdcToolbarMenuIcon",
  props: {
    link: String
  }
};

var row = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-toolbar__row"},[_vm._t("default")],2)},staticRenderFns: [],
  name: "MdcToolbarRow"
};

var ALIGNMENTS = ["start", "end"];

var section = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"mdc-toolbar__section",class:_vm.cssClasses,attrs:{"role":"toolbar"}},[_vm._t("default")],2)},staticRenderFns: [],
  name: "MdcToolbarSection",
  props: {
    align: {
      type: String,
      validator: function (value) { return ALIGNMENTS.includes(value); }
    },
    shrink: Boolean
  },
  computed: {
    cssClasses: function cssClasses() {
      var classes = { "mdc-toolbar__section--shrink-to-fit": this.shrink };
      if(this.align) {
        classes[("mdc-toolbar__section--align-" + (this.align))] = true;
      }
      return classes;
    }
  }
};

var title$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"mdc-toolbar__title"},[_vm._t("default")],2)},staticRenderFns: [],
  name: "MdcToolbarTitle"
};

// Taken from official MDC github
var MAX_TITLE_SIZE = 2.125;
var MIN_TITLE_SIZE = 1.25;
var TOOLBAR_ROW_HEIGHT = 64;
var TOOLBAR_ROW_MOBILE_HEIGHT = 56;
var TOOLBAR_MOBILE_BREAKPOINT = 600;
var DIFF_TITLE_SIZE = MAX_TITLE_SIZE - MIN_TITLE_SIZE;
// Class names
var MINIMIZED_CLASS = "mdc-toolbar--flexible-space-minimized";
var MAXIMISED_CLASS = "mdc-toolbar--flexible-space-maximized";
var FIXED_AT_LAST_ROW_CLASS = "mdc-toolbar--fixed-at-last-row";

// Helper function that don't need context
function clamp$1(min, max, value) {
  if(value < min) {
    return min;
  }
  return value > max ? max : value;
}
function removeStyle($el) {
  if($el) {
    $el.removeAttribute("style");
  }
}

var toolbar = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('header',{staticClass:"mdc-toolbar",class:_vm.cssClasses},[_vm._t("default")],2)},staticRenderFns: [],
  name: "MdcToolbar",
  props: {
    flexible: Boolean,
    waterfall: Boolean,
    fixed: {
      type: String,
      validator: function (value) { return value === "" || value === "lastrow"; }
    }
  },
  mounted: function mounted() {
    // Bind events
    this.windowBind();
  },
  destroy: function destroy() {
    this.windowUnbind(false);
  },
  data: function data() {
    return {
      ratio: null,
      toolbarHeight: null,
      adjustFrame: 0,
      bound: false,
      fixedAtLastRow: false
    };
  },
  watch: {
    flexible: function flexible(newVal, oldVal) {
      if(newValue && !this.bound) {
        this.windowBind();
      } else if(!newValue && this.bound) {
        this.windowBind();
      }
    },
    waterfall: function waterfall(newValue) {
      if(newValue && !this.bound) {
        this.windowBind();
      } else if(!newValue && this.bound) {
        this.windowBind();
      }
    }
  },
  computed: {
    cssClasses: function cssClasses() {
      //TODO: minimize flexible and fixed to a string
      return {
        "mdc-toolbar--waterfall": this.waterfall,
        "mdc-toolbar--fixed": typeof this.fixed === "string",
        "mdc-toolbar--fixed-lastrow-only": this.fixed === "lastrow",
        "mdc-toolbar--flexible": this.flexible,
        "mdc-toolbar--flexible-default-behavior": this.flexible
      };
    },
    rowHeight: function rowHeight() {
      return this.isMobile ? TOOLBAR_ROW_MOBILE_HEIGHT : TOOLBAR_ROW_HEIGHT;
    }
  },
  methods: {
    windowBind: function windowBind() {
      this.toolbarHeight = this.$el.clientHeight;
      if(typeof this.fixed === "string") {
        this.adjustSibling();
      }
      
      if(!this.bound && this.flexible || this.waterfall) {
        // Bind events
        window.addEventListener("scroll", this.windowScroll, passiveOpts());
        this.bound = true;

        if(this.flexible) {
          window.addEventListener("resize", this.windowResize);
          this.windowResize();
        }
      }
    },
    windowUnbind: function windowUnbind(clean) {
      if ( clean === void 0 ) clean = true;

      if(!this.bound) { return; }
      window.removeEventListener("scroll", this.windowScroll, passiveOpts());
      window.removeEventListener("resize", this.windowResize);
      this.bound = false;

      if(clean) {
        // Clean styles
        var ref = this;
        var $el = ref.$el;
        removeStyle($el.querySelector(".mdc-toolbar__title"));
        removeStyle($el.querySelector(".mdc-toolbar__row"));
      }
    },

    // Window events
    windowScroll: function windowScroll(e) {
      // Scroll and adjust if ratio changed
      var calc = this.calculate();
      if(this.ratio !== calc.ratio) {
        this.adjustHeight(calc);
      }

      if(this.fixed === "lastrow") {
        var height = this.toolbarHeight - calc.toolbarHeight;
        var y = clamp$1(0, calc.toolbarHeight, calc.scroll - height);
        this.$el.style.transform = "translateY(-" + y + "px)";

        // Fix the box-shadow
        if(y === calc.toolbarHeight) {
          if(!this.fixedAtLastRow) {
            this.$el.classList.add(FIXED_AT_LAST_ROW_CLASS);
            this.fixedAtLastRow = true;
          }
        } else if(this.fixedAtLastRow) {
          this.$el.classList.remove(FIXED_AT_LAST_ROW_CLASS);
          this.fixedAtLastRow = false;
        }
      }
    },
    windowResize: function windowResize(e) {
      // Adjust toolbar height if window resized to mobile width
      var width = window.innerWidth || document.body.clientWidth;
      var isMobile = width < TOOLBAR_MOBILE_BREAKPOINT;

      if(this.isMobile !== isMobile) {
        this.isMobile = isMobile;
        this.adjustHeight();
      }
    },
    
    // Helper functions
    calculate: function calculate() {
      var ref = this;
      var rowHeight = ref.rowHeight;
      var toolbarHeight = ref.toolbarHeight;
      var diffHeight = toolbarHeight - rowHeight;
      var scroll = this.scrollTop();
      var ratio = clamp$1(0, 1, 1 - (scroll / diffHeight));

      return {
        ratio: ratio, scroll: scroll,
        fontSize: MIN_TITLE_SIZE + (DIFF_TITLE_SIZE * ratio),
        toolbarHeight: rowHeight + (diffHeight * ratio)
      };
    },
    adjustHeight: function adjustHeight(calc) {
      var this$1 = this;

      cancelAnimationFrame(this.adjustFrame);
      this.adjustFrame = requestAnimationFrame(function () {
        var ref = calc || this$1.calculate();
        var ratio = ref.ratio;
        var fontSize = ref.fontSize;
        var toolbarHeight = ref.toolbarHeight;
        var scroll = ref.scroll;
        var prevRatio = this$1.ratio;

        if(this$1.flexible) {
          var $title = this$1.$el.querySelector(".mdc-toolbar__title");
          $title.style.fontSize = fontSize + "rem";

          var $row = this$1.$el.querySelector(".mdc-toolbar__row");
          $row.style.height = toolbarHeight + "px";
          this$1.ratio = ratio;
        } else if(this$1.waterfall) {
          this$1.ratio = scroll ? 0 : 1;
        }


        // Gain minimized if scrolled with waterfall
        // gain minimised if scrolled with waterfall flex
        // gain maximised if not scroll with waterfall flex
        if(ratio === 1) {
          // Maximized
          this$1.$el.classList.add(MAXIMISED_CLASS);
          this$1.$el.classList.remove(MINIMIZED_CLASS);
        } else if(ratio === 0) {
          // Minimized
          this$1.$el.classList.add(MINIMIZED_CLASS);
          this$1.$el.classList.remove(MAXIMISED_CLASS);
        } else if(prevRatio === 0 || prevRatio === 1) {
          // Clear minimized and maximized classes
          this$1.$el.classList.remove(MINIMIZED_CLASS);
          this$1.$el.classList.remove(MAXIMISED_CLASS);
        }
      });      
    },
    adjustSibling: function adjustSibling() {
      var ref = this;
      var $el = ref.$el;
      var rowHeight = ref.rowHeight;
      var toolbarHeight = ref.toolbarHeight;
      var sibling = $el.nextElementSibling;

      if(sibling) {
        var height = toolbarHeight;
        if($el.children.length) {
          height += ($el.children.length - 1) * rowHeight;
        }

        sibling.classList.add("mdc-toolbar-fixed-adjust");
        sibling.style.marginTop = height + "px";
      }
    },
    scrollTop: function scrollTop() {
      return window.pageYOffset || document.documentElement.scrollTop;
    }
  }
};



var Toolbars = Object.freeze({
	ToolbarIcon: icon,
	ToolbarMenuIcon: menuIcon,
	ToolbarRow: row,
	ToolbarSection: section,
	ToolbarTitle: title$1,
	Toolbar: toolbar
});

//TODO: make option manager in mixins and other stuff...instead of having options in components
//import Ripple from "./ripple";

var DEFAULT_OPTS = {
  theme: null,
  typography: true
};

var index = {
  install: function install(Vue, opts) {
    var body = document.body;
    opts = Object.assign({}, DEFAULT_OPTS, opts);

    var register = function (components) {
      Object.keys(components).forEach(function (key) {
        var component = components[key];
        Vue.component(component.name, component);
      });
    };

    register(Buttons);
    register(Cards);
    register(Dialogs);
    register(Inputs);
    register(Toolbars);


    // Add typography on body
    if(opts.typography) {
      body.classList.add("mdc-typography");
    }
    // Apply theme on body
    if(opts.theme) {
      body.classList.add(("mdc-theme--" + (opts.theme)));
    }
  }
};

return index;

})));
//# sourceMappingURL=mdc-vue.js.map
