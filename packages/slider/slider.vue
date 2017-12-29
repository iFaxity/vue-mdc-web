<template lang="pug">
.mdc-slider(role="slider", :class="cssClasses", :aria-label="label"
  :tabindex=`disabled ? false : "0"`, :aria-disabled="disabled"
  :aria-valuemin="min", :aria-valuemax="max", :aria-valuenow="value"
  @blur="onBlur" @focus="onFocus" @keydown="keyDown"
  @mousedown="onDown" @pointerdown="onDown" @touchstart="onDown")
  .mdc-slider__track-container
    .mdc-slider__track(:style=`styleTrack`)
    .mdc-slider__track-marker-container(v-if=`discrete === "markers"`)
      .mdc-slider__track-marker(v-for="item in markers")
  .mdc-slider__thumb-container(:style=`styleThumbContainer` @transitionend="inTransit = false")
    .mdc-slider__pin(v-if=`typeof discrete === "string"`)
      span.mdc-slider__pin-value-marker {{innerValue}}
    svg.mdc-slider__thumb(width="21" height="21")
      circle(cx="10.5" cy="10.5" r="7.875")
    .mdc-slider__focus-ring
</template>

<script>
import { upEvent, moveEvent } from "./util";

const KEYS = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  UP: "ArrowUp",
  DOWN: "ArrowDown",
  HOME: "Home",
  END: "End",
  PAGE_UP: "PageUp",
  PAGE_DOWN: "PageDown"
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
function quantize(value, step, decimals) {
  if(step <= 0) return value;

  const steps = Math.round(value / step);
  return steps * step;
}

function getKey({ key, keyCode }) {
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

export default {
  name: "MdcSlider",
  props: {
    label: String,
    disabled: Boolean,
    discrete: {
      type: String,
      validator: value => value === "" || value === "markers"
    },

    step: {
      type: [String, Number],
      default: 0,
      validator: value => value >= 0
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
  data() {
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
  mounted() {
    // Set initial values please
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
      this.onResize();
      // do initial render
      this.setValue(this.value);
    });
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  },
  computed: {
    styleTrack() {
      return `transform: scaleX(${this.pctComplete});`;
    },
    styleThumbContainer() {
      return `transform: translateX(${this.translatePx}px) translateX(-50%);`;
    },
    cssClasses() {
      return {
        "mdc-slider--disabled": this.disabled,
        "mdc-slider--discrete": typeof this.discrete === "string",
        "mdc-slider--display-markers": this.discrete === "markers",
        "mdc-slider--active": this.active,
        "mdc-slider--focus": this.focus,
        "mdc-slider--in-transit": this.inTransit
      };
    },
    markers(fixed = true) {
      let range = this.max - this.min;
      const step = +this.step;

      if(this.discrete && step > 0) {
        range /= step;
      }

      // Get higher number if decimal
      return range % 1 ? range : Math.ceil(range);
    },
    translatePx() {
      const width = this.rect && this.rect.width;
      return this.pctComplete * width;
    },
    decimalCount() {
      if(this.step > 0 && this.step % 1) {
        return this.step.toString().split(".")[1].length;
      }
      return 0;
    }
  },
  methods: {
    setValueFromEvent(e) {
      const pageX = e.targetTouches ? e.targetTouches[0].pageX : e.pageX;
      const xPos = pageX - this.rect.left;
      let pctComplete = clamp(xPos / this.rect.width, 0, 1);
      /* TODO: Add RTL Support
      if(this.rtl) {
        pctComplete = 1 - pctComplete;
      }*/

      const value = +this.min + pctComplete * (this.max - this.min);
      this.setValue(value);
    },
    setValue(value) {
      value = quantize(value, +this.step);
      value = clamp(value, this.min, this.max);
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
    onBlur() {
      if(this.disabled) return;
      this.focus = false;
    },
    onFocus() {
      if(this.disabled) return;
      this.focus = true;
    },
    onResize() {
      this.rect = this.$el.getBoundingClientRect();
    },
    keyDown(e) {
      const key = getKey(e);

      if(key) {
        e.preventDefault();
        let value = this.value;
        let delta = +this.step || (this.max - this.min) / 100;
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

        value = clamp(value, this.min, this.max);
        this.setValue(value);
        this.$emit("change", this.innerValue);
      }
    },
    onMove(e) {
      if(!this.disabled && this.active) {
        this.setValueFromEvent(e);
      }
    },
    onUp(e) {
      if(!this.disabled) {
        document.body.removeEventListener(moveEvent, this.onMove);
        document.body.removeEventListener(upEvent, this.onUp);

        this.active = false;
        this.$emit("change", this.innerValue);
      }
    },
    onDown(e) {
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
</script>