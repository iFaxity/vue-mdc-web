<template lang="pug">
.mdc-slider(role="slider", :class="cssClasses", :aria-label="label", :tabindex="0")
  .mdc-slider__track-container
    .mdc-slider__track(ref="track")
    .mdc-slider__track-marker-container(v-if="displayMarkers")
      .mdc-slider__track-marker(v-for="n in markers", :key="n")
  .mdc-slider__thumb-container(ref="thumbContainer")
    .mdc-slider__pin(v-if="discrete")
      span.mdc-slider__pin-value-marker {{ markerValue }}
    svg.mdc-slider__thumb(width="21" height="21")
      circle(cx="10.5" cy="10.5" r="7.875")
    .mdc-slider__focus-ring
</template>

<script>
import Foundation from '@material/slider/foundation';

const LAST_MARKER_SELECTOR = '.mdc-slider__track-marker:last-child';
function assertValue(value, fn) {
  if(typeof value === 'string') {
    value = parseFloat(value);

    if(isNaN(value)) return;
  }
  fn(value);
}

export default {
  name: 'MDCSlider',
  props: {
    label: String,
    disabled: Boolean,
    displayMarkers: Boolean,

    step: {
      type: [String, Number],
      default: 0,
      validator: value => value >= 0
    },
    value: {
      type: [String, Number],
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
  watch: {
    value(value) {
      assertValue(value, value => this.foundation.setValue(value));
    },
    min(value) {
      assertValue(value, value => this.foundation.setMin(value));
    },
    max(value) {
      assertValue(value, value => this.foundation.setMax(value));
    },
    step(value) {
      assertValue(value, value => this.foundation.setStep(value));
    },
    disabled(value) {
      this.foundation.setDisabled(value);
    }
  },
  data() {
    return { markerValue: 0, markers: 0 };
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  computed: {
    cssClasses() {
      return {
        'mdc-slider--discrete': this.discrete,
        'mdc-slider--display-markers': this.displayMarkers
      };
    },
    discrete() {
      return !!this.step;
    }
  },
  mounted() {
    const { $el } = this;
    const { track, thumbContainer } = this.$refs;
    const styles = getComputedStyle($el);

    this.foundation = new Foundation({
      hasClass: className => $el.classList.contains(className),
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      getAttribute: name => $el.getAttribute(name),
      setAttribute: (name, value) => $el.setAttribute(name, value),
      removeAttribute: name => $el.removeAttribute(name),
      computeBoundingRect: () => $el.getBoundingClientRect(),
      getTabIndex: () => $el.tabIndex,
      // Interactions
      registerInteractionHandler: (type, handler) => $el.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => $el.removeEventListener(type, handler),
      registerThumbContainerInteractionHandler: (type, handler) => thumbContainer.addEventListener(type, handler),
      deregisterThumbContainerInteractionHandler: (type, handler) => thumbContainer.removeEventListener(type, handler),
      registerBodyInteractionHandler: (type, handler) => document.body.addEventListener(type, handler),
      deregisterBodyInteractionHandler: (type, handler) => document.body.removeEventListener(type, handler),
      registerResizeHandler: handler => window.addEventListener('resize', handler),
      deregisterResizeHandler: handler => window.removeEventListener('resize', handler),
      notifyInput: () => this.$emit('input', this.foundation.getValue()),
      notifyChange: () => this.$emit('change', this.foundation.getValue()),

      setThumbContainerStyleProperty: (prop, value) => thumbContainer.style.setProperty(prop, value),
      setTrackStyleProperty: (prop, value) => track.style.setProperty(prop, value),
      setMarkerValue: value => {
        this.markerValue = value;
      },
      appendTrackMarkers: numMarkers => this.markers = numMarkers,
      removeTrackMarkers: () => this.markers = 0,
      setLastTrackMarkersStyleProperty: (prop, value) => {
        // We remove and append new nodes, thus, the last track marker must be dynamically found.
        const $marker = $el.querySelector(LAST_MARKER_SELECTOR);
        $marker.style.setProperty(prop, value);
      },
      isRTL: () => styles.direction === 'rtl',
    });

    this.foundation.init();
    assertValue(this.value, value => this.foundation.setValue(value));
    assertValue(this.min, value => this.foundation.setMin(value));
    assertValue(this.max, value => this.foundation.setMax(value));
    assertValue(this.step, value => this.foundation.setStep(value));
    this.foundation.setDisabled(this.disabled);
  },
  beforeDestroy() {
    this.foundation.destroy();
  }
};
</script>