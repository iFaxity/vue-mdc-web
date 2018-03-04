'use strict';

var App$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-app mdc-typography",class:_vm.cssClasses},[_vm._t(_vm.headerSlot),_c('div',{staticClass:"mdc-app__content"},[_vm._t(_vm.contentSlot),_vm._t("default")],2)],2)},staticRenderFns: [],
  name: "MdcApp",
  props: {
    flip: Boolean // flips the drawer & toolbar slot
  },
  computed: {
    headerSlot() {
      return this.flip ? "drawer" : "toolbar";
    },
    contentSlot() {
      return this.flip ? "toolbar" : "drawer";
    },
    cssClasses() {
      return {
        "mdc-app--flipped": this.flip
      };
    }
  },
  methods: {}
};

function install(Vue) {
  Vue.component(App$1.name, App$1);
}

var App = Object.freeze({
	App: App$1,
	install: install
});

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @template A
 */
class MDCFoundation {
  /** @return enum{cssClasses} */
  static get cssClasses() {
    // Classes extending MDCFoundation should implement this method to return an object which exports every
    // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
    return {};
  }

  /** @return enum{strings} */
  static get strings() {
    // Classes extending MDCFoundation should implement this method to return an object which exports all
    // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
    return {};
  }

  /** @return enum{numbers} */
  static get numbers() {
    // Classes extending MDCFoundation should implement this method to return an object which exports all
    // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
    return {};
  }

  /** @return {!Object} */
  static get defaultAdapter() {
    // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
    // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
    // validation.
    return {};
  }

  /**
   * @param {A=} adapter
   */
  constructor(adapter = {}) {
    /** @protected {!A} */
    this.adapter_ = adapter;
  }

  init() {
    // Subclasses should override this method to perform initialization routines (registering events, etc.)
  }

  destroy() {
    // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
  }
}

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Ripple. Provides an interface for managing
 * - classes
 * - dom
 * - CSS variables
 * - position
 * - dimensions
 * - scroll position
 * - event handlers
 * - unbounded, active and disabled states
 *
 * Additionally, provides type information for the adapter to the Closure
 * compiler.
 *
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
 *
 * @record
 */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const cssClasses = {
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  ROOT: 'mdc-ripple-upgraded',
  UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
  BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
  FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
  FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation',
};

const strings = {
  VAR_LEFT: '--mdc-ripple-left',
  VAR_TOP: '--mdc-ripple-top',
  VAR_FG_SIZE: '--mdc-ripple-fg-size',
  VAR_FG_SCALE: '--mdc-ripple-fg-scale',
  VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
  VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end',
};

const numbers = {
  PADDING: 10,
  INITIAL_ORIGIN_SCALE: 0.6,
  DEACTIVATION_TIMEOUT_MS: 225, // Corresponds to $mdc-ripple-translate-duration (i.e. activation animation duration)
  FG_DEACTIVATION_MS: 150, // Corresponds to $mdc-ripple-fade-out-duration (i.e. deactivation animation duration)
};

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Stores result from supportsCssVariables to avoid redundant processing to detect CSS custom variable support.
 * @private {boolean|undefined}
 */
let supportsCssVariables_;

/**
 * Stores result from applyPassive to avoid redundant processing to detect passive event listener support.
 * @private {boolean|undefined}
 */
let supportsPassive_;

/**
 * @param {!Window} windowObj
 * @return {boolean}
 */
function detectEdgePseudoVarBug(windowObj) {
  // Detect versions of Edge with buggy var() support
  // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
  const document = windowObj.document;
  const node = document.createElement('div');
  node.className = 'mdc-ripple-surface--test-edge-var-bug';
  document.body.appendChild(node);

  // The bug exists if ::before style ends up propagating to the parent element.
  // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
  // but Firefox is known to support CSS custom properties correctly.
  // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  const computedStyle = windowObj.getComputedStyle(node);
  const hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
  node.remove();
  return hasPseudoVarBug;
}

/**
 * @param {!Window} windowObj
 * @param {boolean=} forceRefresh
 * @return {boolean|undefined}
 */

function supportsCssVariables(windowObj, forceRefresh = false) {
  if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
    return supportsCssVariables_;
  }

  const supportsFunctionPresent = windowObj.CSS && typeof windowObj.CSS.supports === 'function';
  if (!supportsFunctionPresent) {
    return;
  }

  const explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes');
  // See: https://bugs.webkit.org/show_bug.cgi?id=154669
  // See: README section on Safari
  const weAreFeatureDetectingSafari10plus = (
    windowObj.CSS.supports('(--css-vars: yes)') &&
    windowObj.CSS.supports('color', '#00000000')
  );

  if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
    supportsCssVariables_ = !detectEdgePseudoVarBug(windowObj);
  } else {
    supportsCssVariables_ = false;
  }
  return supportsCssVariables_;
}

//
/**
 * Determine whether the current browser supports passive event listeners, and if so, use them.
 * @param {!Window=} globalObj
 * @param {boolean=} forceRefresh
 * @return {boolean|{passive: boolean}}
 */
function applyPassive(globalObj = window, forceRefresh = false) {
  if (supportsPassive_ === undefined || forceRefresh) {
    let isSupported = false;
    try {
      globalObj.document.addEventListener('test', null, {get passive() {
        isSupported = true;
      }});
    } catch (e) { }

    supportsPassive_ = isSupported;
  }

  return supportsPassive_ ? {passive: true} : false;
}

/**
 * @param {!Object} HTMLElementPrototype
 * @return {!Array<string>}
 */
function getMatchesProperty(HTMLElementPrototype) {
  return [
    'webkitMatchesSelector', 'msMatchesSelector', 'matches',
  ].filter((p) => p in HTMLElementPrototype).pop();
}

/**
 * @param {!Event} ev
 * @param {!{x: number, y: number}} pageOffset
 * @param {!ClientRect} clientRect
 * @return {!{x: number, y: number}}
 */
function getNormalizedEventCoords(ev, pageOffset, clientRect) {
  const {x, y} = pageOffset;
  const documentX = x + clientRect.left;
  const documentY = y + clientRect.top;

  let normalizedX;
  let normalizedY;
  // Determine touch point relative to the ripple container.
  if (ev.type === 'touchstart') {
    normalizedX = ev.changedTouches[0].pageX - documentX;
    normalizedY = ev.changedTouches[0].pageY - documentY;
  } else {
    normalizedX = ev.pageX - documentX;
    normalizedY = ev.pageY - documentY;
  }

  return {x: normalizedX, y: normalizedY};
}

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Activation events registered on the root element of each instance for activation
const ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown'];

// Deactivation events registered on documentElement when a pointer-related down event occurs
const POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup'];

/**
 * @extends {MDCFoundation<!MDCRippleAdapter>}
 */
class MDCRippleFoundation extends MDCFoundation {
  static get cssClasses() {
    return cssClasses;
  }

  static get strings() {
    return strings;
  }

  static get numbers() {
    return numbers;
  }

  static get defaultAdapter() {
    return {
      browserSupportsCssVars: () => /* boolean - cached */ {},
      isUnbounded: () => /* boolean */ {},
      isSurfaceActive: () => /* boolean */ {},
      isSurfaceDisabled: () => /* boolean */ {},
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      registerInteractionHandler: (/* evtType: string, handler: EventListener */) => {},
      deregisterInteractionHandler: (/* evtType: string, handler: EventListener */) => {},
      registerDocumentInteractionHandler: (/* evtType: string, handler: EventListener */) => {},
      deregisterDocumentInteractionHandler: (/* evtType: string, handler: EventListener */) => {},
      registerResizeHandler: (/* handler: EventListener */) => {},
      deregisterResizeHandler: (/* handler: EventListener */) => {},
      updateCssVariable: (/* varName: string, value: string */) => {},
      computeBoundingRect: () => /* ClientRect */ {},
      getWindowPageOffset: () => /* {x: number, y: number} */ {},
    };
  }

  constructor(adapter) {
    super(Object.assign(MDCRippleFoundation.defaultAdapter, adapter));

    /** @private {number} */
    this.layoutFrame_ = 0;

    /** @private {!ClientRect} */
    this.frame_ = /** @type {!ClientRect} */ ({width: 0, height: 0});

    /** @private {!ActivationStateType} */
    this.activationState_ = this.defaultActivationState_();

    /** @private {number} */
    this.xfDuration_ = 0;

    /** @private {number} */
    this.initialSize_ = 0;

    /** @private {number} */
    this.maxRadius_ = 0;

    /** @private {function(!Event)} */
    this.activateHandler_ = (e) => this.activate_(e);

    /** @private {function(!Event)} */
    this.deactivateHandler_ = (e) => this.deactivate_(e);

    /** @private {function(?Event=)} */
    this.focusHandler_ = () => requestAnimationFrame(
      () => this.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED)
    );

    /** @private {function(?Event=)} */
    this.blurHandler_ = () => requestAnimationFrame(
      () => this.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED)
    );

    /** @private {!Function} */
    this.resizeHandler_ = () => this.layout();

    /** @private {!{left: number, top:number}} */
    this.unboundedCoords_ = {
      left: 0,
      top: 0,
    };

    /** @private {number} */
    this.fgScale_ = 0;

    /** @private {number} */
    this.activationTimer_ = 0;

    /** @private {number} */
    this.fgDeactivationRemovalTimer_ = 0;

    /** @private {boolean} */
    this.activationAnimationHasEnded_ = false;

    /** @private {!Function} */
    this.activationTimerCallback_ = () => {
      this.activationAnimationHasEnded_ = true;
      this.runDeactivationUXLogicIfReady_();
    };

    /** @private {?Event} */
    this.previousActivationEvent_ = null;
  }

  /**
   * We compute this property so that we are not querying information about the client
   * until the point in time where the foundation requests it. This prevents scenarios where
   * client-side feature-detection may happen too early, such as when components are rendered on the server
   * and then initialized at mount time on the client.
   * @return {boolean}
   * @private
   */
  isSupported_() {
    return this.adapter_.browserSupportsCssVars();
  }

  /**
   * @return {!ActivationStateType}
   */
  defaultActivationState_() {
    return {
      isActivated: false,
      hasDeactivationUXRun: false,
      wasActivatedByPointer: false,
      wasElementMadeActive: false,
      activationEvent: null,
      isProgrammatic: false,
    };
  }

  init() {
    if (!this.isSupported_()) {
      return;
    }
    this.registerRootHandlers_();

    const {ROOT, UNBOUNDED} = MDCRippleFoundation.cssClasses;
    requestAnimationFrame(() => {
      this.adapter_.addClass(ROOT);
      if (this.adapter_.isUnbounded()) {
        this.adapter_.addClass(UNBOUNDED);
      }
      this.layoutInternal_();
    });
  }

  destroy() {
    if (!this.isSupported_()) {
      return;
    }
    this.deregisterRootHandlers_();
    this.deregisterDeactivationHandlers_();

    const {ROOT, UNBOUNDED} = MDCRippleFoundation.cssClasses;
    requestAnimationFrame(() => {
      this.adapter_.removeClass(ROOT);
      this.adapter_.removeClass(UNBOUNDED);
      this.removeCssVars_();
    });
  }

  /** @private */
  registerRootHandlers_() {
    ACTIVATION_EVENT_TYPES.forEach((type) => {
      this.adapter_.registerInteractionHandler(type, this.activateHandler_);
    });
    this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
    this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
    this.adapter_.registerResizeHandler(this.resizeHandler_);
  }

  /**
   * @param {!Event} e
   * @private
   */
  registerDeactivationHandlers_(e) {
    if (e.type === 'keydown') {
      this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
    } else {
      POINTER_DEACTIVATION_EVENT_TYPES.forEach((type) => {
        this.adapter_.registerDocumentInteractionHandler(type, this.deactivateHandler_);
      });
    }
  }

  /** @private */
  deregisterRootHandlers_() {
    ACTIVATION_EVENT_TYPES.forEach((type) => {
      this.adapter_.deregisterInteractionHandler(type, this.activateHandler_);
    });
    this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
    this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);
    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
  }

  /** @private */
  deregisterDeactivationHandlers_() {
    this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
    POINTER_DEACTIVATION_EVENT_TYPES.forEach((type) => {
      this.adapter_.deregisterDocumentInteractionHandler(type, this.deactivateHandler_);
    });
  }

  /** @private */
  removeCssVars_() {
    const {strings: strings$$1} = MDCRippleFoundation;
    Object.keys(strings$$1).forEach((k) => {
      if (k.indexOf('VAR_') === 0) {
        this.adapter_.updateCssVariable(strings$$1[k], null);
      }
    });
  }

  /**
   * @param {?Event} e
   * @private
   */
  activate_(e) {
    if (this.adapter_.isSurfaceDisabled()) {
      return;
    }

    const {activationState_: activationState} = this;
    if (activationState.isActivated) {
      return;
    }

    // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
    const previousActivationEvent = this.previousActivationEvent_;
    const isSameInteraction = previousActivationEvent && e && previousActivationEvent.type !== e.type &&
      previousActivationEvent.clientX === e.clientX && previousActivationEvent.clientY === e.clientY;
    if (isSameInteraction) {
      return;
    }

    activationState.isActivated = true;
    activationState.isProgrammatic = e === null;
    activationState.activationEvent = e;
    activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : (
      e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown'
    );

    if (e) {
      this.registerDeactivationHandlers_(e);
    }

    requestAnimationFrame(() => {
      // This needs to be wrapped in an rAF call b/c web browsers
      // report active states inconsistently when they're called within
      // event handling code:
      // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
      // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
      activationState.wasElementMadeActive = (e && e.type === 'keydown') ? this.adapter_.isSurfaceActive() : true;
      if (activationState.wasElementMadeActive) {
        this.animateActivation_();
      } else {
        // Reset activation state immediately if element was not made active.
        this.activationState_ = this.defaultActivationState_();
      }
    });
  }

  /**
   * @param {?Event=} event Optional event containing position information.
   */
  activate(event = null) {
    this.activate_(event);
  }

  /** @private */
  animateActivation_() {
    const {VAR_FG_TRANSLATE_START, VAR_FG_TRANSLATE_END} = MDCRippleFoundation.strings;
    const {FG_DEACTIVATION, FG_ACTIVATION} = MDCRippleFoundation.cssClasses;
    const {DEACTIVATION_TIMEOUT_MS} = MDCRippleFoundation.numbers;

    let translateStart = '';
    let translateEnd = '';

    if (!this.adapter_.isUnbounded()) {
      const {startPoint, endPoint} = this.getFgTranslationCoordinates_();
      translateStart = `${startPoint.x}px, ${startPoint.y}px`;
      translateEnd = `${endPoint.x}px, ${endPoint.y}px`;
    }

    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
    // Cancel any ongoing activation/deactivation animations
    clearTimeout(this.activationTimer_);
    clearTimeout(this.fgDeactivationRemovalTimer_);
    this.rmBoundedActivationClasses_();
    this.adapter_.removeClass(FG_DEACTIVATION);

    // Force layout in order to re-trigger the animation.
    this.adapter_.computeBoundingRect();
    this.adapter_.addClass(FG_ACTIVATION);
    this.activationTimer_ = setTimeout(() => this.activationTimerCallback_(), DEACTIVATION_TIMEOUT_MS);
  }

  /**
   * @private
   * @return {{startPoint: PointType, endPoint: PointType}}
   */
  getFgTranslationCoordinates_() {
    const {activationState_: activationState} = this;
    const {activationEvent, wasActivatedByPointer} = activationState;

    let startPoint;
    if (wasActivatedByPointer) {
      startPoint = getNormalizedEventCoords(
        /** @type {!Event} */ (activationEvent),
        this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect()
      );
    } else {
      startPoint = {
        x: this.frame_.width / 2,
        y: this.frame_.height / 2,
      };
    }
    // Center the element around the start point.
    startPoint = {
      x: startPoint.x - (this.initialSize_ / 2),
      y: startPoint.y - (this.initialSize_ / 2),
    };

    const endPoint = {
      x: (this.frame_.width / 2) - (this.initialSize_ / 2),
      y: (this.frame_.height / 2) - (this.initialSize_ / 2),
    };

    return {startPoint, endPoint};
  }

  /** @private */
  runDeactivationUXLogicIfReady_() {
    // This method is called both when a pointing device is released, and when the activation animation ends.
    // The deactivation animation should only run after both of those occur.
    const {FG_DEACTIVATION} = MDCRippleFoundation.cssClasses;
    const {hasDeactivationUXRun, isActivated} = this.activationState_;
    const activationHasEnded = hasDeactivationUXRun || !isActivated;

    if (activationHasEnded && this.activationAnimationHasEnded_) {
      this.rmBoundedActivationClasses_();
      this.adapter_.addClass(FG_DEACTIVATION);
      this.fgDeactivationRemovalTimer_ = setTimeout(() => {
        this.adapter_.removeClass(FG_DEACTIVATION);
      }, numbers.FG_DEACTIVATION_MS);
    }
  }

  /** @private */
  rmBoundedActivationClasses_() {
    const {FG_ACTIVATION} = MDCRippleFoundation.cssClasses;
    this.adapter_.removeClass(FG_ACTIVATION);
    this.activationAnimationHasEnded_ = false;
    this.adapter_.computeBoundingRect();
  }

  resetActivationState_() {
    this.previousActivationEvent_ = this.activationState_.activationEvent;
    this.activationState_ = this.defaultActivationState_();
    // Touch devices may fire additional events for the same interaction within a short time.
    // Store the previous event until it's safe to assume that subsequent events are for new interactions.
    setTimeout(() => this.previousActivationEvent_ = null, 100);
  }

  /**
   * @param {?Event} e
   * @private
   */
  deactivate_(e) {
    const activationState = this.activationState_;
    // This can happen in scenarios such as when you have a keyup event that blurs the element.
    if (!activationState.isActivated) {
      return;
    }

    const state = /** @type {!ActivationStateType} */ (Object.assign({}, activationState));

    if (activationState.isProgrammatic) {
      const evtObject = null;
      requestAnimationFrame(() => this.animateDeactivation_(evtObject, state));
      this.resetActivationState_();
    } else {
      this.deregisterDeactivationHandlers_();
      requestAnimationFrame(() => {
        this.activationState_.hasDeactivationUXRun = true;
        this.animateDeactivation_(e, state);
        this.resetActivationState_();
      });
    }
  }

  /**
   * @param {?Event=} event Optional event containing position information.
   */
  deactivate(event = null) {
    this.deactivate_(event);
  }

  /**
   * @param {Event} e
   * @param {!ActivationStateType} options
   * @private
   */
  animateDeactivation_(e, {wasActivatedByPointer, wasElementMadeActive}) {
    if (wasActivatedByPointer || wasElementMadeActive) {
      this.runDeactivationUXLogicIfReady_();
    }
  }

  layout() {
    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
    }
    this.layoutFrame_ = requestAnimationFrame(() => {
      this.layoutInternal_();
      this.layoutFrame_ = 0;
    });
  }

  /** @private */
  layoutInternal_() {
    this.frame_ = this.adapter_.computeBoundingRect();

    const maxDim = Math.max(this.frame_.height, this.frame_.width);
    const surfaceDiameter = Math.sqrt(Math.pow(this.frame_.width, 2) + Math.pow(this.frame_.height, 2));

    // 60% of the largest dimension of the surface
    this.initialSize_ = maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE;

    // Diameter of the surface + 10px
    this.maxRadius_ = surfaceDiameter + MDCRippleFoundation.numbers.PADDING;
    this.fgScale_ = this.maxRadius_ / this.initialSize_;
    this.xfDuration_ = 1000 * Math.sqrt(this.maxRadius_ / 1024);
    this.updateLayoutCssVars_();
  }

  /** @private */
  updateLayoutCssVars_() {
    const {
      VAR_FG_SIZE, VAR_LEFT, VAR_TOP, VAR_FG_SCALE,
    } = MDCRippleFoundation.strings;

    this.adapter_.updateCssVariable(VAR_FG_SIZE, `${this.initialSize_}px`);
    this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

    if (this.adapter_.isUnbounded()) {
      this.unboundedCoords_ = {
        left: Math.round((this.frame_.width / 2) - (this.initialSize_ / 2)),
        top: Math.round((this.frame_.height / 2) - (this.initialSize_ / 2)),
      };

      this.adapter_.updateCssVariable(VAR_LEFT, `${this.unboundedCoords_.left}px`);
      this.adapter_.updateCssVariable(VAR_TOP, `${this.unboundedCoords_.top}px`);
    }
  }

  /** @param {boolean} unbounded */
  setUnbounded(unbounded) {
    const {UNBOUNDED} = MDCRippleFoundation.cssClasses;
    if (unbounded) {
      this.adapter_.addClass(UNBOUNDED);
    } else {
      this.adapter_.removeClass(UNBOUNDED);
    }
  }
}

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
  return new MDCRippleFoundation(rippleAdapter);
}

function Ripple(adapter = null, opts = {}, assert) {
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

var Button$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.link ? "a" : "button",_vm._g({tag:"component",class:_vm.cssClasses,attrs:{"href":_vm.link}},_vm.$listeners),[(_vm.icon)?_c('i',{staticClass:"material-icons mdc-button__icon"},[_vm._v(_vm._s(_vm.icon))]):_vm._e(),_vm._t("default")],2)},staticRenderFns: [],
  name: "MdcButton",
  mixins: [ Ripple() ],
  props: {
    icon: String,
    raised: Boolean,
    unelevated: Boolean,
    stroked: Boolean,
    dense: Boolean,
    compact: Boolean,

    link: String
  },
  computed: {
    cssClasses() {
      return {
        "mdc-button": true,
        "mdc-button--raised": this.raised,
        "mdc-button--unelevated": this.unelevated,
        "mdc-button--stroked": this.stroked,
        "mdc-button--dense": this.dense,
        "mdc-button--compact": this.compact
      };
    }
  }
};

function install$1(Vue) {
  Vue.component(Button$1.name, Button$1);
}

var Button = Object.freeze({
	Button: Button$1,
	install: install$1
});

var Card$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-card",class:_vm.cssClasses},[_vm._t("default")],2)},staticRenderFns: [],
  name: "MdcCard",
  props: {
    dark: Boolean
  },
  computed: {
    cssClasses() {
      return {
        // TODO: move theming to a mixin
        "mdc-card--theme-dark": this.dark
      };
    }
  }
};

function install$2 (Vue) {
  Vue.component(Card$1.name, Card$1);
}



var Card = Object.freeze({
	Card: Card$1,
	install: install$2
});

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-unused-vars */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-unused-vars */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @const {string} */
const ROOT = 'mdc-checkbox';

/** @enum {string} */
const cssClasses$1 = {
  UPGRADED: 'mdc-checkbox--upgraded',
  CHECKED: 'mdc-checkbox--checked',
  INDETERMINATE: 'mdc-checkbox--indeterminate',
  DISABLED: 'mdc-checkbox--disabled',
  ANIM_UNCHECKED_CHECKED: 'mdc-checkbox--anim-unchecked-checked',
  ANIM_UNCHECKED_INDETERMINATE: 'mdc-checkbox--anim-unchecked-indeterminate',
  ANIM_CHECKED_UNCHECKED: 'mdc-checkbox--anim-checked-unchecked',
  ANIM_CHECKED_INDETERMINATE: 'mdc-checkbox--anim-checked-indeterminate',
  ANIM_INDETERMINATE_CHECKED: 'mdc-checkbox--anim-indeterminate-checked',
  ANIM_INDETERMINATE_UNCHECKED: 'mdc-checkbox--anim-indeterminate-unchecked',
};

/** @enum {string} */
const strings$1 = {
  NATIVE_CONTROL_SELECTOR: `.${ROOT}__native-control`,
  TRANSITION_STATE_INIT: 'init',
  TRANSITION_STATE_CHECKED: 'checked',
  TRANSITION_STATE_UNCHECKED: 'unchecked',
  TRANSITION_STATE_INDETERMINATE: 'indeterminate',
};

/** @enum {number} */
const numbers$1 = {
  ANIM_END_LATCH_MS: 100,
};

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
/** @const {!Array<string>} */
const CB_PROTO_PROPS = ['checked', 'indeterminate'];

/**
 * @extends {MDCFoundation<!MDCCheckboxAdapter>}
 */
class MDCCheckboxFoundation extends MDCFoundation {
  /** @return enum {cssClasses} */
  static get cssClasses() {
    return cssClasses$1;
  }

  /** @return enum {strings} */
  static get strings() {
    return strings$1;
  }

  /** @return enum {numbers} */
  static get numbers() {
    return numbers$1;
  }

  /** @return {!MDCCheckboxAdapter} */
  static get defaultAdapter() {
    return /** @type {!MDCCheckboxAdapter} */ ({
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      registerAnimationEndHandler: (/* handler: EventListener */) => {},
      deregisterAnimationEndHandler: (/* handler: EventListener */) => {},
      registerChangeHandler: (/* handler: EventListener */) => {},
      deregisterChangeHandler: (/* handler: EventListener */) => {},
      getNativeControl: () => /* !MDCSelectionControlState */ {},
      forceLayout: () => {},
      isAttachedToDOM: () => /* boolean */ {},
    });
  }

  constructor(adapter) {
    super(Object.assign(MDCCheckboxFoundation.defaultAdapter, adapter));

    /** @private {string} */
    this.currentCheckState_ = strings$1.TRANSITION_STATE_INIT;

    /** @private {string} */
    this.currentAnimationClass_ = '';

    /** @private {number} */
    this.animEndLatchTimer_ = 0;

    this.animEndHandler_ = /** @private {!EventListener} */ (() => {
      clearTimeout(this.animEndLatchTimer_);
      this.animEndLatchTimer_ = setTimeout(() => {
        this.adapter_.removeClass(this.currentAnimationClass_);
        this.adapter_.deregisterAnimationEndHandler(this.animEndHandler_);
      }, numbers$1.ANIM_END_LATCH_MS);
    });

    this.changeHandler_ = /** @private {!EventListener} */ (
      () => this.transitionCheckState_());
  }

  init() {
    this.currentCheckState_ = this.determineCheckState_(this.getNativeControl_());
    this.adapter_.addClass(cssClasses$1.UPGRADED);
    this.adapter_.registerChangeHandler(this.changeHandler_);
    this.installPropertyChangeHooks_();
  }

  destroy() {
    this.adapter_.deregisterChangeHandler(this.changeHandler_);
    this.uninstallPropertyChangeHooks_();
  }

  /** @return {boolean} */
  isChecked() {
    return this.getNativeControl_().checked;
  }

  /** @param {boolean} checked */
  setChecked(checked) {
    this.getNativeControl_().checked = checked;
  }

  /** @return {boolean} */
  isIndeterminate() {
    return this.getNativeControl_().indeterminate;
  }

  /** @param {boolean} indeterminate */
  setIndeterminate(indeterminate) {
    this.getNativeControl_().indeterminate = indeterminate;
  }

  /** @return {boolean} */
  isDisabled() {
    return this.getNativeControl_().disabled;
  }

  /** @param {boolean} disabled */
  setDisabled(disabled) {
    this.getNativeControl_().disabled = disabled;
    if (disabled) {
      this.adapter_.addClass(cssClasses$1.DISABLED);
    } else {
      this.adapter_.removeClass(cssClasses$1.DISABLED);
    }
  }

  /** @return {?string} */
  getValue() {
    return this.getNativeControl_().value;
  }

  /** @param {?string} value */
  setValue(value) {
    this.getNativeControl_().value = value;
  }

  /** @private */
  installPropertyChangeHooks_() {
    const nativeCb = this.getNativeControl_();
    const cbProto = Object.getPrototypeOf(nativeCb);

    CB_PROTO_PROPS.forEach((controlState) => {
      const desc = Object.getOwnPropertyDescriptor(cbProto, controlState);
      // We have to check for this descriptor, since some browsers (Safari) don't support its return.
      // See: https://bugs.webkit.org/show_bug.cgi?id=49739
      if (validDescriptor(desc)) {
        const nativeCbDesc = /** @type {!ObjectPropertyDescriptor} */ ({
          get: desc.get,
          set: (state) => {
            desc.set.call(nativeCb, state);
            this.transitionCheckState_();
          },
          configurable: desc.configurable,
          enumerable: desc.enumerable,
        });
        Object.defineProperty(nativeCb, controlState, nativeCbDesc);
      }
    });
  }

  /** @private */
  uninstallPropertyChangeHooks_() {
    const nativeCb = this.getNativeControl_();
    const cbProto = Object.getPrototypeOf(nativeCb);

    CB_PROTO_PROPS.forEach((controlState) => {
      const desc = /** @type {!ObjectPropertyDescriptor} */ (
        Object.getOwnPropertyDescriptor(cbProto, controlState));
      if (validDescriptor(desc)) {
        Object.defineProperty(nativeCb, controlState, desc);
      }
    });
  }

  /** @private */
  transitionCheckState_() {
    const nativeCb = this.adapter_.getNativeControl();
    if (!nativeCb) {
      return;
    }
    const oldState = this.currentCheckState_;
    const newState = this.determineCheckState_(nativeCb);
    if (oldState === newState) {
      return;
    }

    // Check to ensure that there isn't a previously existing animation class, in case for example
    // the user interacted with the checkbox before the animation was finished.
    if (this.currentAnimationClass_.length > 0) {
      clearTimeout(this.animEndLatchTimer_);
      this.adapter_.forceLayout();
      this.adapter_.removeClass(this.currentAnimationClass_);
    }

    this.currentAnimationClass_ = this.getTransitionAnimationClass_(oldState, newState);
    this.currentCheckState_ = newState;

    // Check for parentNode so that animations are only run when the element is attached
    // to the DOM.
    if (this.adapter_.isAttachedToDOM() && this.currentAnimationClass_.length > 0) {
      this.adapter_.addClass(this.currentAnimationClass_);
      this.adapter_.registerAnimationEndHandler(this.animEndHandler_);
    }
  }

  /**
   * @param {!MDCSelectionControlState} nativeCb
   * @return {string}
   * @private
   */
  determineCheckState_(nativeCb) {
    const {
      TRANSITION_STATE_INDETERMINATE,
      TRANSITION_STATE_CHECKED,
      TRANSITION_STATE_UNCHECKED,
    } = strings$1;

    if (nativeCb.indeterminate) {
      return TRANSITION_STATE_INDETERMINATE;
    }
    return nativeCb.checked ? TRANSITION_STATE_CHECKED : TRANSITION_STATE_UNCHECKED;
  }

  /**
   * @param {string} oldState
   * @param {string} newState
   * @return {string}
   */
  getTransitionAnimationClass_(oldState, newState) {
    const {
      TRANSITION_STATE_INIT,
      TRANSITION_STATE_CHECKED,
      TRANSITION_STATE_UNCHECKED,
    } = strings$1;

    const {
      ANIM_UNCHECKED_CHECKED,
      ANIM_UNCHECKED_INDETERMINATE,
      ANIM_CHECKED_UNCHECKED,
      ANIM_CHECKED_INDETERMINATE,
      ANIM_INDETERMINATE_CHECKED,
      ANIM_INDETERMINATE_UNCHECKED,
    } = MDCCheckboxFoundation.cssClasses;

    switch (oldState) {
    case TRANSITION_STATE_INIT:
      if (newState === TRANSITION_STATE_UNCHECKED) {
        return '';
      }
    // fallthrough
    case TRANSITION_STATE_UNCHECKED:
      return newState === TRANSITION_STATE_CHECKED ? ANIM_UNCHECKED_CHECKED : ANIM_UNCHECKED_INDETERMINATE;
    case TRANSITION_STATE_CHECKED:
      return newState === TRANSITION_STATE_UNCHECKED ? ANIM_CHECKED_UNCHECKED : ANIM_CHECKED_INDETERMINATE;
    // TRANSITION_STATE_INDETERMINATE
    default:
      return newState === TRANSITION_STATE_CHECKED ?
        ANIM_INDETERMINATE_CHECKED : ANIM_INDETERMINATE_UNCHECKED;
    }
  }

  /**
   * @return {!MDCSelectionControlState}
   * @private
   */
  getNativeControl_() {
    return this.adapter_.getNativeControl() || {
      checked: false,
      indeterminate: false,
      disabled: false,
      value: null,
    };
  }
}

/**
 * @param {ObjectPropertyDescriptor|undefined} inputPropDesc
 * @return {boolean}
 */
function validDescriptor(inputPropDesc) {
  return !!inputPropDesc && typeof inputPropDesc.set === 'function';
}

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @typedef {{
 *   noPrefix: string,
 *   webkitPrefix: string,
 *   styleProperty: string
 * }}
 */
/** @const {Object<string, !VendorPropertyMapType>} */
const eventTypeMap = {
  'animationstart': {
    noPrefix: 'animationstart',
    webkitPrefix: 'webkitAnimationStart',
    styleProperty: 'animation',
  },
  'animationend': {
    noPrefix: 'animationend',
    webkitPrefix: 'webkitAnimationEnd',
    styleProperty: 'animation',
  },
  'animationiteration': {
    noPrefix: 'animationiteration',
    webkitPrefix: 'webkitAnimationIteration',
    styleProperty: 'animation',
  },
  'transitionend': {
    noPrefix: 'transitionend',
    webkitPrefix: 'webkitTransitionEnd',
    styleProperty: 'transition',
  },
};

/** @const {Object<string, !VendorPropertyMapType>} */
const cssPropertyMap = {
  'animation': {
    noPrefix: 'animation',
    webkitPrefix: '-webkit-animation',
  },
  'transform': {
    noPrefix: 'transform',
    webkitPrefix: '-webkit-transform',
  },
  'transition': {
    noPrefix: 'transition',
    webkitPrefix: '-webkit-transition',
  },
};

/**
 * @param {!Object} windowObj
 * @return {boolean}
 */
function hasProperShape(windowObj) {
  return (windowObj['document'] !== undefined && typeof windowObj['document']['createElement'] === 'function');
}

/**
 * @param {string} eventType
 * @return {boolean}
 */
function eventFoundInMaps(eventType) {
  return (eventType in eventTypeMap || eventType in cssPropertyMap);
}

/**
 * @param {string} eventType
 * @param {!Object<string, !VendorPropertyMapType>} map
 * @param {!Element} el
 * @return {string}
 */
function getJavaScriptEventName(eventType, map, el) {
  return map[eventType].styleProperty in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
}

/**
 * Helper function to determine browser prefix for CSS3 animation events
 * and property names.
 * @param {!Object} windowObj
 * @param {string} eventType
 * @return {string}
 */
function getAnimationName(windowObj, eventType) {
  if (!hasProperShape(windowObj) || !eventFoundInMaps(eventType)) {
    return eventType;
  }

  const map = /** @type {!Object<string, !VendorPropertyMapType>} */ (
    eventType in eventTypeMap ? eventTypeMap : cssPropertyMap
  );
  const el = windowObj['document']['createElement']('div');
  let eventName = '';

  if (map === eventTypeMap) {
    eventName = getJavaScriptEventName(eventType, map, el);
  } else {
    eventName = map[eventType].noPrefix in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
  }

  return eventName;
}

// Public functions to access getAnimationName() for JavaScript events or CSS
// property names.

const transformStyleProperties = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'MSTransform'];

/**
 * @param {!Object} windowObj
 * @param {string} eventType
 * @return {string}
 */
function getCorrectEventName(windowObj, eventType) {
  return getAnimationName(windowObj, eventType);
}

/**
 * @param {!Object} windowObj
 * @param {string} eventType
 * @return {string}
 */
function getCorrectPropertyName(windowObj, eventType) {
  return getAnimationName(windowObj, eventType);
}

const animationEnd = getCorrectEventName(window, "animationend");
const rippleAdapter = {
  registerInteractionHandler(typeName, handler) {
    const { input } = this.$refs;
    input.addEventListener(typeName, handler);
  },
  deregisterInteractionHandler(typeName, handler) {
    const { input } = this.$refs;
    input.removeEventListener(typeName, handler);
  },
  computeBoundingRect() {
    const { left, top } = this.$el.getBoundingClientRect();
    const DIM = 40;
    return {
      top, left,
      right: left + DIM,
      bottom: top + DIM,
      width: DIM,
      height: DIM,
    };
  }
};

var MDCCheckbox = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-checkbox"},[_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],ref:"input",staticClass:"mdc-checkbox__native-control",attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.model)?_vm._i(_vm.model,null)>-1:(_vm.model)},on:{"change":function($event){var $$a=_vm.model,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.model=$$a.concat([$$v]));}else{$$i>-1&&(_vm.model=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.model=$$c;}}}},'input',_vm.$attrs,false)),_c('div',{staticClass:"mdc-checkbox__background"},[_c('svg',{staticClass:"mdc-checkbox__checkmark",attrs:{"viewBox":"0 0 24 24"}},[_c('path',{staticClass:"mdc-checkbox__checkmark__path",attrs:{"fill":"none","stroke":"white","d":"M1.73,12.91 8.1,19.28 22.79,4.59"}})]),_c('div',{staticClass:"mdc-checkbox__mixedmark"})])])},staticRenderFns: [],
  name: "MdcCheckbox",
  inheritAttrs: false,
  mixins: [ Ripple(rippleAdapter, { unbounded: true }) ],
  props: {
    disabled: Boolean,
    checked: Boolean,
    indeterminate: Boolean,
  },
  mounted() {
    const { $el } = this;
    const { input } = this.$refs;

    // Initialize the foundation
    this.foundation = new MDCCheckboxFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      registerAnimationEndHandler: handler => $el.removeEventListener(animationEnd, handler),
      deregisterAnimationEndHandler: handler => $el.removeEventListener(animationEnd, handler),
      registerChangeHandler: handler => input.addEventListener("change", handler),
      deregisterChangeHandler: handler => input.removeEventListener("change", handler),
      getNativeControl: () => input,
      forceLayout: () => this.$forceUpdate(),
      isAttachedToDOM: () => !!$el.parentNode
    });
    this.foundation.init();
    this.foundation.setChecked(this.checked);
    this.foundation.setDisabled(this.disabled);
    this.foundation.setIndeterminate(this.indeterminate);
  },
  beforeDestroy() {
    this.foundation.destroy();
  },
  model: {
    prop: "checked",
    event: "change"
  },
  watch: {
    disabled(value) {
      this.foundation.setDisabled(value);
    },
    indeterminate(value) {
      this.foundation.setIndeterminate(value);
    }
  },
  computed: {
    model: {
      get() {
        return this.checked;
      },
      set(value) {
        this.$emit("change", value);
      }
    }
  }
};

function install$3(Vue) {
  Vue.component(MDCCheckbox.name, MDCCheckbox);
}


var Checkbox = Object.freeze({
	MDCCheckbox: MDCCheckbox,
	install: install$3
});

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const cssClasses$2 = {
  ROOT: 'mdc-dialog',
  OPEN: 'mdc-dialog--open',
  ANIMATING: 'mdc-dialog--animating',
  BACKDROP: 'mdc-dialog__backdrop',
  SCROLL_LOCK: 'mdc-dialog-scroll-lock',
  ACCEPT_BTN: 'mdc-dialog__footer__button--accept',
  CANCEL_BTN: 'mdc-dialog__footer__button--cancel',
};

const strings$2 = {
  OPEN_DIALOG_SELECTOR: '.mdc-dialog--open',
  DIALOG_SURFACE_SELECTOR: '.mdc-dialog__surface',
  ACCEPT_SELECTOR: '.mdc-dialog__footer__button--accept',
  ACCEPT_EVENT: 'MDCDialog:accept',
  CANCEL_EVENT: 'MDCDialog:cancel',
};

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class MDCDialogFoundation extends MDCFoundation {
  static get cssClasses() {
    return cssClasses$2;
  }

  static get strings() {
    return strings$2;
  }

  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      addBodyClass: (/* className: string */) => {},
      removeBodyClass: (/* className: string */) => {},
      eventTargetHasClass: (/* target: EventTarget, className: string */) => /* boolean */ false,
      registerInteractionHandler: (/* evt: string, handler: EventListener */) => {},
      deregisterInteractionHandler: (/* evt: string, handler: EventListener */) => {},
      registerSurfaceInteractionHandler: (/* evt: string, handler: EventListener */) => {},
      deregisterSurfaceInteractionHandler: (/* evt: string, handler: EventListener */) => {},
      registerDocumentKeydownHandler: (/* handler: EventListener */) => {},
      deregisterDocumentKeydownHandler: (/* handler: EventListener */) => {},
      registerTransitionEndHandler: (/* handler: EventListener */) => {},
      deregisterTransitionEndHandler: (/* handler: EventListener */) => {},
      notifyAccept: () => {},
      notifyCancel: () => {},
      trapFocusOnSurface: () => {},
      untrapFocusOnSurface: () => {},
      isDialog: (/* el: Element */) => /* boolean */ false,
      layoutFooterRipples: () => {},
    };
  }

  constructor(adapter) {
    super(Object.assign(MDCDialogFoundation.defaultAdapter, adapter));
    this.isOpen_ = false;
    this.componentClickHandler_ = (evt) => {
      if (this.adapter_.eventTargetHasClass(evt.target, cssClasses$2.BACKDROP)) {
        this.cancel(true);
      }
    };
    this.dialogClickHandler_ = (evt) => this.handleDialogClick_(evt);
    this.documentKeydownHandler_ = (evt) => {
      if (evt.key && evt.key === 'Escape' || evt.keyCode === 27) {
        this.cancel(true);
      }
    };
    this.transitionEndHandler_ = (evt) => this.handleTransitionEnd_(evt);
  };

  destroy() {
    // Ensure that dialog is cleaned up when destroyed
    if (this.isOpen_) {
      this.adapter_.deregisterSurfaceInteractionHandler('click', this.dialogClickHandler_);
      this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
      this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
      this.adapter_.untrapFocusOnSurface();
      this.adapter_.deregisterTransitionEndHandler(this.transitionEndHandler_);
      this.adapter_.removeClass(MDCDialogFoundation.cssClasses.ANIMATING);
      this.adapter_.removeClass(MDCDialogFoundation.cssClasses.OPEN);
      this.enableScroll_();
    }
  }

  open() {
    this.isOpen_ = true;
    this.disableScroll_();
    this.adapter_.registerDocumentKeydownHandler(this.documentKeydownHandler_);
    this.adapter_.registerSurfaceInteractionHandler('click', this.dialogClickHandler_);
    this.adapter_.registerInteractionHandler('click', this.componentClickHandler_);
    this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
    this.adapter_.addClass(MDCDialogFoundation.cssClasses.ANIMATING);
    this.adapter_.addClass(MDCDialogFoundation.cssClasses.OPEN);
  }

  close() {
    this.isOpen_ = false;
    this.adapter_.deregisterSurfaceInteractionHandler('click', this.dialogClickHandler_);
    this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
    this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
    this.adapter_.untrapFocusOnSurface();
    this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
    this.adapter_.addClass(MDCDialogFoundation.cssClasses.ANIMATING);
    this.adapter_.removeClass(MDCDialogFoundation.cssClasses.OPEN);
  }

  isOpen() {
    return this.isOpen_;
  }

  accept(shouldNotify) {
    if (shouldNotify) {
      this.adapter_.notifyAccept();
    }

    this.close();
  }

  cancel(shouldNotify) {
    if (shouldNotify) {
      this.adapter_.notifyCancel();
    }

    this.close();
  }

  handleDialogClick_(evt) {
    const {target} = evt;
    if (this.adapter_.eventTargetHasClass(target, cssClasses$2.ACCEPT_BTN)) {
      this.accept(true);
    } else if (this.adapter_.eventTargetHasClass(target, cssClasses$2.CANCEL_BTN)) {
      this.cancel(true);
    }
  }

  handleTransitionEnd_(evt) {
    if (this.adapter_.isDialog(evt.target)) {
      this.adapter_.deregisterTransitionEndHandler(this.transitionEndHandler_);
      this.adapter_.removeClass(MDCDialogFoundation.cssClasses.ANIMATING);
      if (this.isOpen_) {
        this.adapter_.trapFocusOnSurface();
        this.adapter_.layoutFooterRipples();
      } else {
        this.enableScroll_();
      }
    }
  };

  disableScroll_() {
    this.adapter_.addBodyClass(cssClasses$2.SCROLL_LOCK);
  }

  enableScroll_() {
    this.adapter_.removeBodyClass(cssClasses$2.SCROLL_LOCK);
  }
}

var tabbable = function(el, options) {
  options = options || {};

  var elementDocument = el.ownerDocument || el;
  var basicTabbables = [];
  var orderedTabbables = [];

  // A node is "available" if
  // - it's computed style
  var isUnavailable = createIsUnavailable(elementDocument);

  var candidateSelectors = [
    'input',
    'select',
    'a[href]',
    'textarea',
    'button',
    '[tabindex]',
  ];

  var candidates = el.querySelectorAll(candidateSelectors.join(','));

  if (options.includeContainer) {
    var matches = Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

    if (
      candidateSelectors.some(function(candidateSelector) {
        return matches.call(el, candidateSelector);
      })
    ) {
      candidates = Array.prototype.slice.apply(candidates);
      candidates.unshift(el);
    }
  }

  var candidate, candidateIndex;
  for (var i = 0, l = candidates.length; i < l; i++) {
    candidate = candidates[i];
    candidateIndex = parseInt(candidate.getAttribute('tabindex'), 10) || candidate.tabIndex;

    if (
      candidateIndex < 0
      || (candidate.tagName === 'INPUT' && candidate.type === 'hidden')
      || candidate.disabled
      || isUnavailable(candidate, elementDocument)
    ) {
      continue;
    }

    if (candidateIndex === 0) {
      basicTabbables.push(candidate);
    } else {
      orderedTabbables.push({
        index: i,
        tabIndex: candidateIndex,
        node: candidate,
      });
    }
  }

  var tabbableNodes = orderedTabbables
    .sort(function(a, b) {
      return a.tabIndex === b.tabIndex ? a.index - b.index : a.tabIndex - b.tabIndex;
    })
    .map(function(a) {
      return a.node
    });

  Array.prototype.push.apply(tabbableNodes, basicTabbables);

  return tabbableNodes;
};

function createIsUnavailable(elementDocument) {
  // Node cache must be refreshed on every check, in case
  // the content of the element has changed
  var isOffCache = [];

  // "off" means `display: none;`, as opposed to "hidden",
  // which means `visibility: hidden;`. getComputedStyle
  // accurately reflects visiblity in context but not
  // "off" state, so we need to recursively check parents.

  function isOff(node, nodeComputedStyle) {
    if (node === elementDocument.documentElement) return false;

    // Find the cached node (Array.prototype.find not available in IE9)
    for (var i = 0, length = isOffCache.length; i < length; i++) {
      if (isOffCache[i][0] === node) return isOffCache[i][1];
    }

    nodeComputedStyle = nodeComputedStyle || elementDocument.defaultView.getComputedStyle(node);

    var result = false;

    if (nodeComputedStyle.display === 'none') {
      result = true;
    } else if (node.parentNode) {
      result = isOff(node.parentNode);
    }

    isOffCache.push([node, result]);

    return result;
  }

  return function isUnavailable(node) {
    if (node === elementDocument.documentElement) return false;

    var computedStyle = elementDocument.defaultView.getComputedStyle(node);

    if (isOff(node, computedStyle)) return true;

    return computedStyle.visibility === 'hidden';
  }
}

var listeningFocusTrap = null;

function focusTrap(element, userOptions) {
  var tabbableNodes = [];
  var firstTabbableNode = null;
  var lastTabbableNode = null;
  var nodeFocusedBeforeActivation = null;
  var active = false;
  var paused = false;
  var tabEvent = null;

  var container = (typeof element === 'string')
    ? document.querySelector(element)
    : element;

  var config = userOptions || {};
  config.returnFocusOnDeactivate = (userOptions && userOptions.returnFocusOnDeactivate !== undefined)
    ? userOptions.returnFocusOnDeactivate
    : true;
  config.escapeDeactivates = (userOptions && userOptions.escapeDeactivates !== undefined)
    ? userOptions.escapeDeactivates
    : true;

  var trap = {
    activate: activate,
    deactivate: deactivate,
    pause: pause,
    unpause: unpause,
  };

  return trap;

  function activate(activateOptions) {
    if (active) return;

    var defaultedActivateOptions = {
      onActivate: (activateOptions && activateOptions.onActivate !== undefined)
        ? activateOptions.onActivate
        : config.onActivate,
    };

    active = true;
    paused = false;
    nodeFocusedBeforeActivation = document.activeElement;

    if (defaultedActivateOptions.onActivate) {
      defaultedActivateOptions.onActivate();
    }

    addListeners();
    return trap;
  }

  function deactivate(deactivateOptions) {
    if (!active) return;

    var defaultedDeactivateOptions = {
      returnFocus: (deactivateOptions && deactivateOptions.returnFocus !== undefined)
        ? deactivateOptions.returnFocus
        : config.returnFocusOnDeactivate,
      onDeactivate: (deactivateOptions && deactivateOptions.onDeactivate !== undefined)
        ? deactivateOptions.onDeactivate
        : config.onDeactivate,
    };

    removeListeners();

    if (defaultedDeactivateOptions.onDeactivate) {
      defaultedDeactivateOptions.onDeactivate();
    }

    if (defaultedDeactivateOptions.returnFocus) {
      setTimeout(function () {
        tryFocus(nodeFocusedBeforeActivation);
      }, 0);
    }

    active = false;
    paused = false;
    return this;
  }

  function pause() {
    if (paused || !active) return;
    paused = true;
    removeListeners();
  }

  function unpause() {
    if (!paused || !active) return;
    paused = false;
    addListeners();
  }

  function addListeners() {
    if (!active) return;

    // There can be only one listening focus trap at a time
    if (listeningFocusTrap) {
      listeningFocusTrap.pause();
    }
    listeningFocusTrap = trap;

    updateTabbableNodes();
    tryFocus(firstFocusNode());
    document.addEventListener('focus', checkFocus, true);
    document.addEventListener('click', checkClick, true);
    document.addEventListener('mousedown', checkPointerDown, true);
    document.addEventListener('touchstart', checkPointerDown, true);
    document.addEventListener('keydown', checkKey, true);

    return trap;
  }

  function removeListeners() {
    if (!active || listeningFocusTrap !== trap) return;

    document.removeEventListener('focus', checkFocus, true);
    document.removeEventListener('click', checkClick, true);
    document.removeEventListener('mousedown', checkPointerDown, true);
    document.removeEventListener('touchstart', checkPointerDown, true);
    document.removeEventListener('keydown', checkKey, true);

    listeningFocusTrap = null;

    return trap;
  }

  function getNodeForOption(optionName) {
    var optionValue = config[optionName];
    var node = optionValue;
    if (!optionValue) {
      return null;
    }
    if (typeof optionValue === 'string') {
      node = document.querySelector(optionValue);
      if (!node) {
        throw new Error('`' + optionName + '` refers to no known node');
      }
    }
    if (typeof optionValue === 'function') {
      node = optionValue();
      if (!node) {
        throw new Error('`' + optionName + '` did not return a node');
      }
    }
    return node;
  }

  function firstFocusNode() {
    var node;
    if (getNodeForOption('initialFocus') !== null) {
      node = getNodeForOption('initialFocus');
    } else if (container.contains(document.activeElement)) {
      node = document.activeElement;
    } else {
      node = tabbableNodes[0] || getNodeForOption('fallbackFocus');
    }

    if (!node) {
      throw new Error('You can\'t have a focus-trap without at least one focusable element');
    }

    return node;
  }

  // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event
  function checkPointerDown(e) {
    if (config.clickOutsideDeactivates && !container.contains(e.target)) {
      deactivate({ returnFocus: false });
    }
  }

  function checkClick(e) {
    if (config.clickOutsideDeactivates) return;
    if (container.contains(e.target)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
  }

  function checkFocus(e) {
    if (container.contains(e.target)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    // Checking for a blur method here resolves a Firefox issue (#15)
    if (typeof e.target.blur === 'function') e.target.blur();

    if (tabEvent) {
      readjustFocus(tabEvent);
    }
  }

  function checkKey(e) {
    if (e.key === 'Tab' || e.keyCode === 9) {
      handleTab(e);
    }

    if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
      deactivate();
    }
  }

  function handleTab(e) {
    updateTabbableNodes();

    if (e.target.hasAttribute('tabindex') && Number(e.target.getAttribute('tabindex')) < 0) {
      return tabEvent = e;
    }

    e.preventDefault();
    var currentFocusIndex = tabbableNodes.indexOf(e.target);

    if (e.shiftKey) {
      if (e.target === firstTabbableNode || tabbableNodes.indexOf(e.target) === -1) {
        return tryFocus(lastTabbableNode);
      }
      return tryFocus(tabbableNodes[currentFocusIndex - 1]);
    }

    if (e.target === lastTabbableNode) return tryFocus(firstTabbableNode);

    tryFocus(tabbableNodes[currentFocusIndex + 1]);
  }

  function updateTabbableNodes() {
    tabbableNodes = tabbable(container);
    firstTabbableNode = tabbableNodes[0];
    lastTabbableNode = tabbableNodes[tabbableNodes.length - 1];
  }

  function readjustFocus(e) {
    if (e.shiftKey) return tryFocus(lastTabbableNode);

    tryFocus(firstTabbableNode);
  }
}

function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
}

function tryFocus(node) {
  if (!node || !node.focus) return;
  if (node === document.activeElement)  return;

  node.focus();
  if (node.tagName.toLowerCase() === 'input') {
    node.select();
  }
}

var focusTrap_1 = focusTrap;

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function createFocusTrapInstance(surfaceEl, acceptButtonEl, focusTrapFactory = focusTrap_1) {
  return focusTrapFactory(surfaceEl, {
    initialFocus: acceptButtonEl,
    clickOutsideDeactivates: true,
  });
}

const transitionEnd = getCorrectEventName(window, "transitionend");

var Dialog$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('aside',{staticClass:"mdc-dialog",attrs:{"aria-labelledby":"","aria-describedby":""}},[_c('div',{ref:"surface",staticClass:"mdc-dialog__surface"},[(_vm.$slots.header)?_c('header',{staticClass:"mdc-dialog__header"},[_vm._t("header")],2):_vm._e(),(_vm.$slots.default)?_c('section',{staticClass:"mdc-dialog__body",class:{"mdc-dialog__body--scrollable": _vm.scrollable}},[_vm._t("default")],2):_vm._e(),_c('footer',{staticClass:"mdc-dialog__footer"},[_c('mdc-button',{ref:"cancel",staticClass:"mdc-dialog__footer__button mdc-dialog__footer__button--cancel"},[_vm._v("Cancel")]),_c('mdc-button',{ref:"accept",staticClass:"mdc-dialog__footer__button mdc-dialog__footer__button--accept"},[_vm._v("Ok")])],1)]),_c('div',{staticClass:"mdc-dialog__backdrop"})])},staticRenderFns: [],
  name: "MdcDialog",
  props: {
    acceptText: {
      type: String,
      default: "Ok"
    },
    cancelText: {
      type: String,
      default: "Cancel"
    },
    scrollable: Boolean
  },
  mounted() {
    const { $el } = this;
    const { cancel, accept, surface } = this.$refs;
    const focusTrap = createFocusTrapInstance(surface, accept);

    this.foundation = new MDCDialogFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      addBodyClass: className => document.body.classList.add(className),
      removeBodyClass: className => document.body.classList.remove(className),
      eventTargetHasClass: (target, className) => target.classList.contains(className),

      registerInteractionHandler: (evt, handler) => $el.addEventListener(evt, handler),
      deregisterInteractionHandler: (evt, handler) => $el.removeEventListener(evt, handler),
      registerSurfaceInteractionHandler: (evt, handler) => surface.addEventListener(evt, handler),
      deregisterSurfaceInteractionHandler: (evt, handler) => surface.removeEventListener(evt, handler),
      registerDocumentKeydownHandler: handler => document.addEventListener("keydown", handler),
      deregisterDocumentKeydownHandler: handler => document.removeEventListener("keydown", handler),
      registerTransitionEndHandler: handler => surface.addEventListener(transitionEnd, handler),
      deregisterTransitionEndHandler: handler => surface.removeEventListener(transitionEnd, handler),

      notifyAccept: () => {
        this.$emit("action", "accept");
        this.$emit("accept");
      },
      notifyCancel: () => {
        this.$emit("action", "cancel");
        this.$emit("cancel");
      },
      trapFocusOnSurface: () => focusTrap.activate(),
      untrapFocusOnSurface: () => focusTrap.deactivate(),
      isDialog: el => el === surface,
      layoutFooterRipples: () => {
        accept._ripple.layout();
        cancel._ripple.layout();
      }
    });
    this.foundation.init();
  },
  beforeDestroy() {
    this.foundation.destroy();
  },
  methods: {
    open() {
      if(this.foundation.isOpen()) return false;
      this.foundation.open();
      return true;
    },
    close() {
      if(!this.foundation.isOpen()) return false;
      
      this.foundation.close();
      return true;
    }
  }
};

var DialogTitle = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c("h" + _vm.level,{tag:"component",staticClass:"mdc-dialog__header__title"},[_vm._t("default")],2)},staticRenderFns: [],
  name: "MdcDialogTitle",
  props: {
    level: {
      type: [Number, String],
      default: 2,
      validator: value => value >= 1 && value <= 6
    }
  }
};

function install$4(Vue) {
  Vue.component(Dialog$1.name, Dialog$1);
  Vue.component(DialogTitle.name, DialogTitle);
}

var Dialog = Object.freeze({
	Dialog: Dialog$1,
	DialogTitle: DialogTitle,
	install: install$4
});

var PermanentDrawer = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{staticClass:"mdc-drawer mdc-drawer--permanent mdc-typography"},[(_vm.spacer)?_c('div',{staticClass:"mdc-drawer__toolbar-spacer"}):_vm._e(),_c('div',{staticClass:"mdc-drawer__content"},[_c('nav',{staticClass:"mdc-list"},[_vm._t("default")],2)])])},staticRenderFns: [],
  name: "MdcPermanentDrawer",
  props: {
    spacer: Boolean
  }
};

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const FOCUSABLE_ELEMENTS =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), ' +
  'button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]';

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class MDCSlidableDrawerFoundation extends MDCFoundation {
  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      hasClass: (/* className: string */) => {},
      hasNecessaryDom: () => /* boolean */ false,
      registerInteractionHandler: (/* evt: string, handler: EventListener */) => {},
      deregisterInteractionHandler: (/* evt: string, handler: EventListener */) => {},
      registerDrawerInteractionHandler: (/* evt: string, handler: EventListener */) => {},
      deregisterDrawerInteractionHandler: (/* evt: string, handler: EventListener */) => {},
      registerTransitionEndHandler: (/* handler: EventListener */) => {},
      deregisterTransitionEndHandler: (/* handler: EventListener */) => {},
      registerDocumentKeydownHandler: (/* handler: EventListener */) => {},
      deregisterDocumentKeydownHandler: (/* handler: EventListener */) => {},
      setTranslateX: (/* value: number | null */) => {},
      getFocusableElements: () => /* NodeList */ {},
      saveElementTabState: (/* el: Element */) => {},
      restoreElementTabState: (/* el: Element */) => {},
      makeElementUntabbable: (/* el: Element */) => {},
      notifyOpen: () => {},
      notifyClose: () => {},
      isRtl: () => /* boolean */ false,
      getDrawerWidth: () => /* number */ 0,
    };
  }

  constructor(adapter, rootCssClass, animatingCssClass, openCssClass) {
    super(Object.assign(MDCSlidableDrawerFoundation.defaultAdapter, adapter));

    this.rootCssClass_ = rootCssClass;
    this.animatingCssClass_ = animatingCssClass;
    this.openCssClass_ = openCssClass;

    this.transitionEndHandler_ = (evt) => this.handleTransitionEnd_(evt);

    this.inert_ = false;

    this.componentTouchStartHandler_ = (evt) => this.handleTouchStart_(evt);
    this.componentTouchMoveHandler_ = (evt) => this.handleTouchMove_(evt);
    this.componentTouchEndHandler_ = (evt) => this.handleTouchEnd_(evt);
    this.documentKeydownHandler_ = (evt) => {
      if (evt.key && evt.key === 'Escape' || evt.keyCode === 27) {
        this.close();
      }
    };
  }

  init() {
    const ROOT = this.rootCssClass_;
    const OPEN = this.openCssClass_;

    if (!this.adapter_.hasClass(ROOT)) {
      throw new Error(`${ROOT} class required in root element.`);
    }

    if (!this.adapter_.hasNecessaryDom()) {
      throw new Error(`Required DOM nodes missing in ${ROOT} component.`);
    }

    if (this.adapter_.hasClass(OPEN)) {
      this.isOpen_ = true;
    } else {
      this.detabinate_();
      this.isOpen_ = false;
    }

    this.adapter_.registerDrawerInteractionHandler('touchstart', this.componentTouchStartHandler_);
    this.adapter_.registerInteractionHandler('touchmove', this.componentTouchMoveHandler_);
    this.adapter_.registerInteractionHandler('touchend', this.componentTouchEndHandler_);
  }

  destroy() {
    this.adapter_.deregisterDrawerInteractionHandler('touchstart', this.componentTouchStartHandler_);
    this.adapter_.deregisterInteractionHandler('touchmove', this.componentTouchMoveHandler_);
    this.adapter_.deregisterInteractionHandler('touchend', this.componentTouchEndHandler_);
    // Deregister the document keydown handler just in case the component is destroyed while the menu is open.
    this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
  }

  open() {
    this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
    this.adapter_.registerDocumentKeydownHandler(this.documentKeydownHandler_);
    this.adapter_.addClass(this.animatingCssClass_);
    this.adapter_.addClass(this.openCssClass_);
    this.retabinate_();
    // Debounce multiple calls
    if (!this.isOpen_) {
      this.adapter_.notifyOpen();
    }
    this.isOpen_ = true;
  }

  close() {
    this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
    this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
    this.adapter_.addClass(this.animatingCssClass_);
    this.adapter_.removeClass(this.openCssClass_);
    this.detabinate_();
    // Debounce multiple calls
    if (this.isOpen_) {
      this.adapter_.notifyClose();
    }
    this.isOpen_ = false;
  }

  isOpen() {
    return this.isOpen_;
  }

  /**
   *  Render all children of the drawer inert when it's closed.
   */
  detabinate_() {
    if (this.inert_) {
      return;
    }

    const elements = this.adapter_.getFocusableElements();
    if (elements) {
      for (let i = 0; i < elements.length; i++) {
        this.adapter_.saveElementTabState(elements[i]);
        this.adapter_.makeElementUntabbable(elements[i]);
      }
    }

    this.inert_ = true;
  }

  /**
   *  Make all children of the drawer tabbable again when it's open.
   */
  retabinate_() {
    if (!this.inert_) {
      return;
    }

    const elements = this.adapter_.getFocusableElements();
    if (elements) {
      for (let i = 0; i < elements.length; i++) {
        this.adapter_.restoreElementTabState(elements[i]);
      }
    }

    this.inert_ = false;
  }

  handleTouchStart_(evt) {
    if (!this.adapter_.hasClass(this.openCssClass_)) {
      return;
    }
    if (evt.pointerType && evt.pointerType !== 'touch') {
      return;
    }

    this.direction_ = this.adapter_.isRtl() ? -1 : 1;
    this.drawerWidth_ = this.adapter_.getDrawerWidth();
    this.startX_ = evt.touches ? evt.touches[0].pageX : evt.pageX;
    this.currentX_ = this.startX_;

    this.updateRaf_ = requestAnimationFrame(this.updateDrawer_.bind(this));
  }

  handleTouchMove_(evt) {
    if (evt.pointerType && evt.pointerType !== 'touch') {
      return;
    }

    this.currentX_ = evt.touches ? evt.touches[0].pageX : evt.pageX;
  }

  handleTouchEnd_(evt) {
    if (evt.pointerType && evt.pointerType !== 'touch') {
      return;
    }

    this.prepareForTouchEnd_();

    // Did the user close the drawer by more than 50%?
    if (Math.abs(this.newPosition_ / this.drawerWidth_) >= 0.5) {
      this.close();
    } else {
      // Triggering an open here means we'll get a nice animation back to the fully open state.
      this.open();
    }
  }

  prepareForTouchEnd_() {
    cancelAnimationFrame(this.updateRaf_);
    this.adapter_.setTranslateX(null);
  }

  updateDrawer_() {
    this.updateRaf_ = requestAnimationFrame(this.updateDrawer_.bind(this));
    this.adapter_.setTranslateX(this.newPosition_);
  }

  get newPosition_() {
    let newPos = null;

    if (this.direction_ === 1) {
      newPos = Math.min(0, this.currentX_ - this.startX_);
    } else {
      newPos = Math.max(0, this.currentX_ - this.startX_);
    }

    return newPos;
  }

  isRootTransitioningEventTarget_() {
    // Classes extending MDCSlidableDrawerFoundation should implement this method to return true or false
    // if the event target is the root event target currently transitioning.
    return false;
  }

  handleTransitionEnd_(evt) {
    if (this.isRootTransitioningEventTarget_(evt.target)) {
      this.adapter_.removeClass(this.animatingCssClass_);
      this.adapter_.deregisterTransitionEndHandler(this.transitionEndHandler_);
    }
  };
}

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const cssClasses$3 = {
  ROOT: 'mdc-drawer--persistent',
  OPEN: 'mdc-drawer--open',
  ANIMATING: 'mdc-drawer--animating',
};

const strings$3 = {
  DRAWER_SELECTOR: '.mdc-drawer--persistent .mdc-drawer__drawer',
  FOCUSABLE_ELEMENTS,
  OPEN_EVENT: 'MDCPersistentDrawer:open',
  CLOSE_EVENT: 'MDCPersistentDrawer:close',
};

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class MDCPersistentDrawerFoundation extends MDCSlidableDrawerFoundation {
  static get cssClasses() {
    return cssClasses$3;
  }

  static get strings() {
    return strings$3;
  }

  static get defaultAdapter() {
    return Object.assign(MDCSlidableDrawerFoundation.defaultAdapter, {
      isDrawer: () => false,
    });
  }

  constructor(adapter) {
    super(
      Object.assign(MDCPersistentDrawerFoundation.defaultAdapter, adapter),
      MDCPersistentDrawerFoundation.cssClasses.ROOT,
      MDCPersistentDrawerFoundation.cssClasses.ANIMATING,
      MDCPersistentDrawerFoundation.cssClasses.OPEN);
  }

  isRootTransitioningEventTarget_(el) {
    return this.adapter_.isDrawer(el);
  }
}

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const TAB_DATA = 'data-mdc-tabindex';
const TAB_DATA_HANDLED = 'data-mdc-tabindex-handled';

let storedTransformPropertyName_;
let supportsPassive_$1;

// Remap touch events to pointer events, if the browser doesn't support touch events.
function remapEvent(eventName, globalObj = window) {
  if (!('ontouchstart' in globalObj.document)) {
    switch (eventName) {
    case 'touchstart':
      return 'pointerdown';
    case 'touchmove':
      return 'pointermove';
    case 'touchend':
      return 'pointerup';
    default:
      return eventName;
    }
  }

  return eventName;
}

// Choose the correct transform property to use on the current browser.
function getTransformPropertyName(globalObj = window, forceRefresh = false) {
  if (storedTransformPropertyName_ === undefined || forceRefresh) {
    const el = globalObj.document.createElement('div');
    const transformPropertyName = ('transform' in el.style ? 'transform' : '-webkit-transform');
    storedTransformPropertyName_ = transformPropertyName;
  }

  return storedTransformPropertyName_;
}

// Determine whether the current browser supports CSS properties.
function supportsCssCustomProperties(globalObj = window) {
  if ('CSS' in globalObj) {
    return globalObj.CSS.supports('(--color: red)');
  }
  return false;
}

// Determine whether the current browser supports passive event listeners, and if so, use them.
function applyPassive$1(globalObj = window, forceRefresh = false) {
  if (supportsPassive_$1 === undefined || forceRefresh) {
    let isSupported = false;
    try {
      globalObj.document.addEventListener('test', null, {get passive() {
        isSupported = true;
      }});
    } catch (e) { }

    supportsPassive_$1 = isSupported;
  }

  return supportsPassive_$1 ? {passive: true} : false;
}

// Save the tab state for an element.
function saveElementTabState(el) {
  if (el.hasAttribute('tabindex')) {
    el.setAttribute(TAB_DATA, el.getAttribute('tabindex'));
  }
  el.setAttribute(TAB_DATA_HANDLED, true);
}

// Restore the tab state for an element, if it was saved.
function restoreElementTabState(el) {
  // Only modify elements we've already handled, in case anything was dynamically added since we saved state.
  if (el.hasAttribute(TAB_DATA_HANDLED)) {
    if (el.hasAttribute(TAB_DATA)) {
      el.setAttribute('tabindex', el.getAttribute(TAB_DATA));
      el.removeAttribute(TAB_DATA);
    } else {
      el.removeAttribute('tabindex');
    }
    el.removeAttribute(TAB_DATA_HANDLED);
  }
}

var PersistentDrawer = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('aside',{staticClass:"mdc-drawer mdc-drawer--persistent"},[_c('nav',{ref:"drawer",staticClass:"mdc-drawer__drawer"},[(_vm.spacer)?_c('div',{staticClass:"mdc-drawer__toolbar-spacer"}):_vm._e(),(_vm.header)?_c('header',{staticClass:"mdc-drawer__header"},[_c('div',{staticClass:"md-drawer__header-content"},[_vm._v(_vm._s(_vm.header))])]):_vm._e(),_c('nav',{staticClass:"mdc-drawer__content mdc-list"},[_vm._t("default")],2)])])},staticRenderFns: [],
  name: "MdcPersistentDrawer",
  props: {
    spacer: Boolean,
    header: String
  },
  mounted() {
    const { $el } = this;
    const { drawer } = this.$refs;
    
    const { FOCUSABLE_ELEMENTS } = MDCPersistentDrawerFoundation.strings;
    const styles = getComputedStyle($el);

    this.foundation = new MDCPersistentDrawerFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      hasClass: className => $el.classList.contains(className),

      hasNecessaryDom: () => !!drawer,
      registerInteractionHandler: (evt, handler) => $el.addEventListener(remapEvent(evt), handler, applyPassive$1()),
      deregisterInteractionHandler: (evt, handler) => $el.removeEventListener(remapEvent(evt), handler, applyPassive$1()),
      registerDrawerInteractionHandler: (evt, handler) => drawer.addEventListener(remapEvent(evt), handler),
      deregisterDrawerInteractionHandler: (evt, handler) => drawer.removeEventListener(remapEvent(evt), handler),
      registerTransitionEndHandler: handler => $el.addEventListener("transitionend", handler),
      deregisterTransitionEndHandler: handler => $el.removeEventListener("transitionend", handler),
      registerDocumentKeydownHandler: handler => document.addEventListener("keydown", handler),
      deregisterDocumentKeydownHandler: handler => document.removeEventListener("keydown", handler),

      getDrawerWidth: () => drawer.offsetWidth,
      setTranslateX: value => {
        const prop = getTransformPropertyName();
        drawer.style[prop] = value === null ? null : `translateX(${value}px)`;
      },
      getFocusableElements: () => drawer.querySelectorAll(MDCPersistentDrawerFoundation.strings.FOCUSABLE_ELEMENTS),
      saveElementTabState: el => saveElementTabState(el),
      restoreElementTabState: el => restoreElementTabState(el),
      makeElementUntabbable: el => el.setAttribute("tabindex", -1),
      notifyOpen: () => this.$emit("open"),
      notifyClose: () => this.$emit("close"),
      isRtl: () => styles.direction === "rtl",
      isDrawer: el => el === drawer
    });
    this.foundation.init();

    // Initial open state
    this.open && this.foundation.open();
  },
  methods: {
    toggle() {
      if (!this.foundation.isOpen()) {
        this.foundation.open();
      } else {
        this.foundation.close();
      }
    }
  }
};

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const cssClasses$4 = {
  ROOT: 'mdc-drawer--temporary',
  OPEN: 'mdc-drawer--open',
  ANIMATING: 'mdc-drawer--animating',
  SCROLL_LOCK: 'mdc-drawer-scroll-lock',
};

const strings$4 = {
  DRAWER_SELECTOR: '.mdc-drawer--temporary .mdc-drawer__drawer',
  OPACITY_VAR_NAME: '--mdc-temporary-drawer-opacity',
  FOCUSABLE_ELEMENTS,
  OPEN_EVENT: 'MDCTemporaryDrawer:open',
  CLOSE_EVENT: 'MDCTemporaryDrawer:close',
};

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class MDCTemporaryDrawerFoundation extends MDCSlidableDrawerFoundation {
  static get cssClasses() {
    return cssClasses$4;
  }

  static get strings() {
    return strings$4;
  }

  static get defaultAdapter() {
    return Object.assign(MDCSlidableDrawerFoundation.defaultAdapter, {
      addBodyClass: (/* className: string */) => {},
      removeBodyClass: (/* className: string */) => {},
      isDrawer: () => false,
      updateCssVariable: (/* value: string */) => {},
      eventTargetHasClass: (/* target: EventTarget, className: string */) => /* boolean */ false,
    });
  }

  constructor(adapter) {
    super(
      Object.assign(MDCTemporaryDrawerFoundation.defaultAdapter, adapter),
      MDCTemporaryDrawerFoundation.cssClasses.ROOT,
      MDCTemporaryDrawerFoundation.cssClasses.ANIMATING,
      MDCTemporaryDrawerFoundation.cssClasses.OPEN);

    this.componentClickHandler_ = (evt) => {
      if (this.adapter_.eventTargetHasClass(evt.target, cssClasses$4.ROOT)) {
        this.close(true);
      }
    };
  }

  init() {
    super.init();

    // Make browser aware of custom property being used in this element.
    // Workaround for certain types of hard-to-reproduce heisenbugs.
    this.adapter_.updateCssVariable(0);
    this.adapter_.registerInteractionHandler('click', this.componentClickHandler_);
  }

  destroy() {
    super.destroy();

    this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
    this.enableScroll_();
  }

  open() {
    this.disableScroll_();
    // Make sure custom property values are cleared before starting.
    this.adapter_.updateCssVariable('');

    super.open();
  }

  close() {
    // Make sure custom property values are cleared before making any changes.
    this.adapter_.updateCssVariable('');

    super.close();
  }

  prepareForTouchEnd_() {
    super.prepareForTouchEnd_();

    this.adapter_.updateCssVariable('');
  }

  updateDrawer_() {
    super.updateDrawer_();

    const newOpacity = Math.max(0, 1 + this.direction_ * (this.newPosition_ / this.drawerWidth_));
    this.adapter_.updateCssVariable(newOpacity);
  }

  isRootTransitioningEventTarget_(el) {
    return this.adapter_.isDrawer(el);
  }

  handleTransitionEnd_(evt) {
    super.handleTransitionEnd_(evt);
    if (!this.isOpen_) {
      this.enableScroll_();
    }
  };

  disableScroll_() {
    this.adapter_.addBodyClass(cssClasses$4.SCROLL_LOCK);
  }

  enableScroll_() {
    this.adapter_.removeBodyClass(cssClasses$4.SCROLL_LOCK);
  }
}

var TemporaryDrawer = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('aside',{staticClass:"mdc-drawer mdc-drawer--temporary"},[_c('nav',{ref:"drawer",staticClass:"mdc-drawer__drawer"},[(_vm.hasHeader)?_c('header',{staticClass:"mdc-drawer__header"},[_c('div',{staticClass:"mdc-drawer__header-content"},[_vm._t("header")],2)]):_vm._e(),_c('nav',{staticClass:"mdc-drawer__content mdc-list"},[_vm._t("default")],2)])])},staticRenderFns: [],
  name: "MdcTemporaryDrawer",
  props: {
    spacer: Boolean
  },
  computed: {
    hasHeader() {
      return !!this.$slots.header;
    }
  },
  mounted() {
    const { $el } = this;
    const { drawer } = this.$refs;

    const { FOCUSABLE_ELEMENTS, OPACITY_VAR_NAME } = MDCTemporaryDrawerFoundation.strings;
    const styles = getComputedStyle($el);

    this.foundation = new MDCTemporaryDrawerFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      hasClass: className => $el.classList.contains(className),
      addBodyClass: className => document.body.classList.add(className),
      removeBodyClass: className => document.body.classList.remove(className),
      eventTargetHasClass: (target, className) => target.classList.contains(className),

      hasNecessaryDom: () => !!drawer,
      registerInteractionHandler: (evt, handler) => $el.addEventListener(remapEvent(evt), handler, applyPassive$1()),
      deregisterInteractionHandler: (evt, handler) => $el.removeEventListener(remapEvent(evt), handler, applyPassive$1()),
      registerDrawerInteractionHandler: (evt, handler) => drawer.addEventListener(remapEvent(evt), handler),
      deregisterDrawerInteractionHandler: (evt, handler) => drawer.removeEventListener(remapEvent(evt), handler),
      registerTransitionEndHandler: handler => drawer.addEventListener("transitionend", handler),
      deregisterTransitionEndHandler: handler => drawer.removeEventListener("transitionend", handler),
      registerDocumentKeydownHandler: handler => document.addEventListener("keydown", handler),
      deregisterDocumentKeydownHandler: handler => document.removeEventListener("keydown", handler),

      getDrawerWidth: () => drawer.offsetWidth,
      setTranslateX: (value) => {
        const prop = getTransformPropertyName();
        drawer.style[prop] = value === null ? null : `translateX(${value}px)`;
      },
      updateCssVariable: value => {
        if (supportsCssCustomProperties()) {
          $el.style.setProperty(OPACITY_VAR_NAME, value);
        }
      },
      getFocusableElements: () => drawer.querySelectorAll(FOCUSABLE_ELEMENTS),
      saveElementTabState: el => saveElementTabState(el),
      restoreElementTabState: el => restoreElementTabState(el),
      makeElementUntabbable: el => el.setAttribute("tabindex", -1),
      notifyOpen: () => this.$emit("open"),
      notifyClose: () => this.$emit("close"),
      isRtl: () => styles.direction === "rtl",
      isDrawer: (el) => el === drawer
    });
    this.foundation.init();

    // Initial open state
    this.open && this.foundation.open();
  },
  methods: {
    toggle() {
      if (this.foundation.isOpen()) {
        this.foundation.open();        
      } else {
        this.foundation.close();
      }
    }
  }
};

const MdcLink = {
  functional: true,
  props: {
    tag: {
      type: String,
      default: "a"
    },
    link: String,
    to: String,
    replace: Boolean,
    append: Boolean,
    exact: Boolean
  },
  render(h, ctx) {
    const { data } = ctx;
    let props, tag = data.props.tag;

    if(data.props.to) {
      tag = "router-link";
      data.props.link = undefined;
    } else {
      if(tag === "a") {
        data.attrs = { href: data.props.link };
      }

      data.props = {};
    }

    return h(tag, data, ctx.children);
  }
};

function install$6(activeClass, exactActiveClass) {
  return {
    components: [ MdcLink ],
    props: {
      to: String,
      replace: Boolean,
      append: Boolean,
      exact: Boolean
    },
    computed: {
      $_link() {
        return this.to && {
          activeClass, exactActiveClass,
          to: this.to,
          replace: this.replace,
          append: this.append,
          exact: this.exact
        };
      }
    }
  };
}

var DrawerItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('mdc-link',_vm._b({staticClass:"mdc-list-item",attrs:{"tag":"a","link":_vm.link}},'mdc-link',_vm.$_link,false),[_vm._t("graphic"),_vm._v(_vm._s(_vm.text))],2)},staticRenderFns: [],
  name: "MdcDrawerItem",
  mixins: [ Ripple(), install$6("mdc-list-item--activated") ],
  props: {
    link: String,
    text: {
      type: String,
      required: true
    }
  }
};

var DrawerDivider = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('hr',{staticClass:"mdc-list-divider"})},staticRenderFns: [],
  name: "MdcDrawerDivider"
};

function install$5(Vue) {
  Vue.component(PermanentDrawer.name, PermanentDrawer);
  Vue.component(PersistentDrawer.name, PersistentDrawer);
  Vue.component(TemporaryDrawer.name, TemporaryDrawer);
  Vue.component(DrawerItem.name, DrawerItem);
  Vue.component(DrawerDivider.name, DrawerDivider);
}

var Drawer = Object.freeze({
	PermanentDrawer: PermanentDrawer,
	PersistentDrawer: PersistentDrawer,
	TemporaryDrawer: TemporaryDrawer,
	DrawerItem: DrawerItem,
	DrawerDivider: DrawerDivider,
	install: install$5
});

var Fab$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"mdc-fab material-icons",class:_vm.cssClasses,attrs:{"aria-label":_vm.label}},[_c('span',{staticClass:"mdc-fab__icon"},[_vm._v(_vm._s(_vm.icon))])])},staticRenderFns: [],
  name: "MdcFab",
  mixins: [ Ripple() ],
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
    cssClasses() {
      return {
        "mdc-fab--mini": this.mini,
        "mdc-fab--exited": this.exited
      };
    }
  }
};

function install$7(Vue) {
  Vue.component(Fab$1.name, Fab$1);
}

var Fab = Object.freeze({
	Fab: Fab$1,
	install: install$7
});

var FormField$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-form-field",class:_vm.cssClasses},[_vm._t("default"),_c('label',[_vm._v(_vm._s(_vm.label))])],2)},staticRenderFns: [],
  name: "MdcFormField",
  props: {
    label: {
      type: String,
      required: true
    },
    alignEnd: Boolean
  },
  computed: {
    cssClasses() {
      return {
        "mdc-form-field--align-end": this.alignEnd
      }
    }
  }
};

function install$8(Vue) {
  Vue.component(FormField$1.name, FormField$1);
}

var FormField = Object.freeze({
	FormField: FormField$1,
	install: install$8
});

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const strings$5 = {
  TILES_SELECTOR: '.mdc-grid-list__tiles',
  TILE_SELECTOR: '.mdc-grid-tile',
};

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class MDCGridListFoundation extends MDCFoundation {
  static get strings() {
    return strings$5;
  }

  static get defaultAdapter() {
    return {
      getOffsetWidth: () => /* number */ 0,
      getNumberOfTiles: () => /* number */ 0,
      getOffsetWidthForTileAtIndex: (/* index: number */) => /* number */ 0,
      setStyleForTilesElement: (/* property: string, value: string */) => {},
      registerResizeHandler: (/* handler: EventListener */) => {},
      deregisterResizeHandler: (/* handler: EventListener */) => {},
    };
  }
  constructor(adapter) {
    super(Object.assign(MDCGridListFoundation.defaultAdapter, adapter));
    this.resizeHandler_ = () => this.alignCenter();
    this.resizeFrame_ = 0;
  }
  init() {
    this.alignCenter();
    this.adapter_.registerResizeHandler(this.resizeHandler_);
  }
  destroy() {
    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
  }
  alignCenter() {
    if (this.resizeFrame_ !== 0) {
      cancelAnimationFrame(this.resizeFrame_);
    }
    this.resizeFrame_ = requestAnimationFrame(() => {
      this.alignCenter_();
      this.resizeFrame_ = 0;
    });
  }
  alignCenter_() {
    if (this.adapter_.getNumberOfTiles() == 0) {
      return;
    }
    const gridWidth = this.adapter_.getOffsetWidth();
    const itemWidth = this.adapter_.getOffsetWidthForTileAtIndex(0);
    const tilesWidth = itemWidth * Math.floor(gridWidth / itemWidth);
    this.adapter_.setStyleForTilesElement('width', `${tilesWidth}px`);
  }
}

const ASPECTS = ["1x1", "16x9", "2x3", "3x2", "4x3", "3x4"];

var GridList$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-grid-list"},[_c('ul',{ref:"tiles",staticClass:"mdc-grid-list__tiles"},[_vm._t("default")],2)])},staticRenderFns: [],
  name: "MdcGridList",
  props: {
    withHeader: Boolean,
    withText: Boolean,
    // Make this simpler
    iconAlignEnd: Boolean,
    iconAlignStart: Boolean,

    thinGutter: Boolean,

    aspectRatio: {
      type: String,
      validator: value => ASPECTS.includes(value)
    }
  },
  mounted() {
    const { $el } = this;
    const { tiles } = this.$refs;

    this.foundation = new MDCGridListFoundation({
      getOffsetWidth: () => $el.offsetWidth,
      getNumberOfTiles: () => tiles.children.length,
      getOffsetWidthForTileAtIndex: index => tiles.children[index].offsetWidth,
      setStyleForTilesElement: (prop, value) => tiles.style[prop] = value,
      registerResizeHandler: handler => window.addEventListener("resize", handler),
      deregisterResizeHandler: handler => window.removeEventListener("resize", handler)
    });
    this.foundation.init();
  },
  beforeDestroy() {
    this.foundation.destroy();
  },
  computed: {
    cssClasses() {
      const classes = {
        "mdc-grid-list--tile-gutter-1": this.tileGutter,
        "mdc-grid-list--header-caption": this.withHeader,
        "mdc-grid-list--twoline-caption": this.withText,
        "mdc-grid-list--with-icon-align-start": this.iconAlignStart,
        "mdc-grid-list--with-icon-align-end": this.iconAlignEnd
      };

      if(this.aspect) {
        classes[`mdc-grid-list--tile-aspect-${this.aspectRatio}`] = true;
      }

      return classes;
    }
  }
};

var GridTile = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"mdc-grid-tile"},[_c('div',{staticClass:"mdc-grid-tile__primary"},[(_vm.cover)?_c('div',{staticClass:"mdc-grid-tile__primary-content",style:(_vm.coverStyle)}):_c('img',{staticClass:"mdc-grid-tile__primary-content",attrs:{"src":_vm.src}})]),(_vm.text || _vm.title)?_c('span',{staticClass:"mdc-grid-tile__secondary"},[(_vm.icon)?_c('i',{staticClass:"mdc-grid-tile__icon material-icons"},[_vm._v(_vm._s(_vm.icon))]):_vm._e(),(_vm.title)?_c('span',{staticClass:"mdc-grid-tile__title"},[_vm._v(_vm._s(_vm.title))]):_vm._e(),(_vm.text)?_c('span',{staticClass:"mdc-grid-tile__support-text"},[_vm._v(_vm._s(_vm.text))]):_vm._e()]):_vm._e()])},staticRenderFns: [],
  name: "MdcGridTile",
  props: {
    cover: Boolean,

    src: {
      type: String,
      required: true
    },
    title: String,
    text: String,
    icon: String
  },
  computed: {
    coverStyle() {
      return `background-image: url(${src})`;
    }
  }
};

function install$9(Vue) {
  Vue.component(GridList$1.name, GridList$1);
  Vue.component(GridTile.name, GridTile);
}

var GridList = Object.freeze({
	GridList: GridList$1,
	GridTile: GridTile,
	install: install$9
});

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Icon Toggle. Provides an interface for managing
 * - classes
 * - dom
 * - inner text
 * - event handlers
 * - event dispatch
 *
 * Additionally, provides type information for the adapter to the Closure
 * compiler.
 *
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
 *
 * @record
 */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
const cssClasses$5 = {
  ROOT: 'mdc-icon-toggle',
  DISABLED: 'mdc-icon-toggle--disabled',
};

/** @enum {string} */
const strings$6 = {
  DATA_TOGGLE_ON: 'data-toggle-on',
  DATA_TOGGLE_OFF: 'data-toggle-off',
  ARIA_PRESSED: 'aria-pressed',
  ARIA_DISABLED: 'aria-disabled',
  ARIA_LABEL: 'aria-label',
  CHANGE_EVENT: 'MDCIconToggle:change',
};

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-unused-vars */
/**
 * @extends {MDCFoundation<!MDCIconToggleAdapter>}
 */
class MDCIconToggleFoundation extends MDCFoundation {
  static get cssClasses() {
    return cssClasses$5;
  }

  static get strings() {
    return strings$6;
  }

  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      registerInteractionHandler: (/* type: string, handler: EventListener */) => {},
      deregisterInteractionHandler: (/* type: string, handler: EventListener */) => {},
      setText: (/* text: string */) => {},
      getTabIndex: () => /* number */ 0,
      setTabIndex: (/* tabIndex: number */) => {},
      getAttr: (/* name: string */) => /* string */ '',
      setAttr: (/* name: string, value: string */) => {},
      rmAttr: (/* name: string */) => {},
      notifyChange: (/* evtData: IconToggleEvent */) => {},
    };
  }

  constructor(adapter) {
    super(Object.assign(MDCIconToggleFoundation.defaultAdapter, adapter));

    /** @private {boolean} */
    this.on_ = false;

    /** @private {boolean} */
    this.disabled_ = false;

    /** @private {number} */
    this.savedTabIndex_ = -1;

    /** @private {?IconToggleState} */
    this.toggleOnData_ = null;

    /** @private {?IconToggleState} */
    this.toggleOffData_ = null;

    this.clickHandler_ = /** @private {!EventListener} */ (
      () => this.toggleFromEvt_());

    /** @private {boolean} */
    this.isHandlingKeydown_ = false;

    this.keydownHandler_ = /** @private {!EventListener} */ ((/** @type {!KeyboardKey} */ evt) => {
      if (isSpace(evt)) {
        this.isHandlingKeydown_ = true;
        return evt.preventDefault();
      }
    });

    this.keyupHandler_ = /** @private {!EventListener} */ ((/** @type {!KeyboardKey} */ evt) => {
      if (isSpace(evt)) {
        this.isHandlingKeydown_ = false;
        this.toggleFromEvt_();
      }
    });
  }

  init() {
    this.refreshToggleData();
    this.savedTabIndex_ = this.adapter_.getTabIndex();
    this.adapter_.registerInteractionHandler('click', this.clickHandler_);
    this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
    this.adapter_.registerInteractionHandler('keyup', this.keyupHandler_);
  }

  refreshToggleData() {
    const {DATA_TOGGLE_ON, DATA_TOGGLE_OFF} = MDCIconToggleFoundation.strings;
    this.toggleOnData_ = this.parseJsonDataAttr_(DATA_TOGGLE_ON);
    this.toggleOffData_ = this.parseJsonDataAttr_(DATA_TOGGLE_OFF);
  }

  destroy() {
    this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
    this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
    this.adapter_.deregisterInteractionHandler('keyup', this.keyupHandler_);
  }

  /** @private */
  toggleFromEvt_() {
    this.toggle();
    const {on_: isOn} = this;
    this.adapter_.notifyChange(/** @type {!IconToggleEvent} */ ({isOn}));
  }

  /** @return {boolean} */
  isOn() {
    return this.on_;
  }

  /** @param {boolean=} isOn */
  toggle(isOn = !this.on_) {
    this.on_ = isOn;

    const {ARIA_LABEL, ARIA_PRESSED} = MDCIconToggleFoundation.strings;

    if (this.on_) {
      this.adapter_.setAttr(ARIA_PRESSED, 'true');
    } else {
      this.adapter_.setAttr(ARIA_PRESSED, 'false');
    }

    const {cssClass: classToRemove} =
        this.on_ ? this.toggleOffData_ : this.toggleOnData_;

    if (classToRemove) {
      this.adapter_.removeClass(classToRemove);
    }

    const {content, label, cssClass} = this.on_ ? this.toggleOnData_ : this.toggleOffData_;

    if (cssClass) {
      this.adapter_.addClass(cssClass);
    }
    if (content) {
      this.adapter_.setText(content);
    }
    if (label) {
      this.adapter_.setAttr(ARIA_LABEL, label);
    }
  }

  /**
   * @param {string} dataAttr
   * @return {!IconToggleState}
   */
  parseJsonDataAttr_(dataAttr) {
    const val = this.adapter_.getAttr(dataAttr);
    if (!val) {
      return {};
    }
    return /** @type {!IconToggleState} */ (JSON.parse(val));
  }

  /** @return {boolean} */
  isDisabled() {
    return this.disabled_;
  }

  /** @param {boolean} isDisabled */
  setDisabled(isDisabled) {
    this.disabled_ = isDisabled;

    const {DISABLED} = MDCIconToggleFoundation.cssClasses;
    const {ARIA_DISABLED} = MDCIconToggleFoundation.strings;

    if (this.disabled_) {
      this.savedTabIndex_ = this.adapter_.getTabIndex();
      this.adapter_.setTabIndex(-1);
      this.adapter_.setAttr(ARIA_DISABLED, 'true');
      this.adapter_.addClass(DISABLED);
    } else {
      this.adapter_.setTabIndex(this.savedTabIndex_);
      this.adapter_.rmAttr(ARIA_DISABLED);
      this.adapter_.removeClass(DISABLED);
    }
  }

  /** @return {boolean} */
  isKeyboardActivated() {
    return this.isHandlingKeydown_;
  }
}

/**
 * @param {!KeyboardKey} keyboardKey
 * @return {boolean}
 */
function isSpace(keyboardKey) {
  return keyboardKey.key === 'Space' || keyboardKey.keyCode === 32;
}

const rippleAdapter$1 = {
  isSurfaceActive() {
    return this.foundation.isKeyboardActivated();
  },
  computeBoundingRect() {
    const { left, top } = this.$el.getBoundingClientRect();
    const DIM = 48;
    return {
      top, left,
      right: left + DIM,
      bottom: left + DIM,
      width: DIM,
      height: DIM
    };
  }
};

var IconToggle$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('i',{staticClass:"mdc-icon-toggle material-icons",attrs:{"role":"button","tabindex":"0"}})},staticRenderFns: [],
  name: "MdcIconToggle",
  mixins: [ Ripple(rippleAdapter$1, { unbounded: true }) ],
  props: {
    active: Boolean,
    disabled: Boolean,
    on: {
      type: Object,
      required: true
    },
    off: {
      type: Object,
      required: true
    }
  },
  model: {
    prop: "active",
    event: "change"
  },
  watch: {
    active(value) {
      this.foundation.toggle(this.active);
    },
    disabled(value) {
      this.foundation.setDisabled(this.disabled);
    },
    on(value) {
      this.foundation.toggleOnData_ = this.on;
    },
    off(value) {
      this.foundation.toggleOffData_ = this.off;
    }
  },
  mounted() {
    const { $el } = this;
    const findIcon = () => {
      const selector = $el.dataset.iconInnerSelector;
      return selector ? $el.querySelector(selector) : $el; 
    };

    this.foundation = new MDCIconToggleFoundation({
      addClass: className => findIcon().classList.add(className),
      removeClass: className => findIcon().classList.remove(className),
      registerInteractionHandler: (type, handler) => $el.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => $el.removeEventListener(type, handler),
      setText: text => findIcon().textContent = text,
      getTabIndex: () => $el.tabIndex,
      setTabIndex: tabIndex => $el.tabIndex = tabIndex,
      getAttr: (name, value) => $el.getAttribute(name, value),
      setAttr: (name, value) => $el.setAttribute(name, value),
      rmAttr: name => $el.removeAttribute(name),
      notifyChange: data => this.$emit("change", data),
    });
    this.foundation.init();

    // Set data here instead of using the data attributes
    this.foundation.toggleOnData_ = this.on;
    this.foundation.toggleOffData_ = this.off;
    // Sync with dom here
    this.foundation.toggle(this.active);
    this.foundation.setDisabled(this.disabled);
  },
  beforeDestroy() {
    this.foundation.destroy();
  }
};

function install$10(Vue) {
  Vue.component(IconToggle$1.name, IconToggle$1);
}

var IconToggle = Object.freeze({
	IconToggle: IconToggle$1,
	install: install$10
});

var LayoutGrid$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-layout-grid",class:_vm.cssClasses},[_c('div',{staticClass:"mdc-layout-grid__inner"},[_vm._t("default")],2)])},staticRenderFns: [],
  name: "MdcLayoutGrid",
  props: {
    fixedColumnWidth: Boolean,
    alignLeft: Boolean,
    alignRight: Boolean
  },
  computed: {
    cssClasses() {
      return {
        "mdc-layout-grid--fixed-column-width": this.fixedColumnWidth,
        "mdc-layout-grid--align-left": this.alignLeft,
        "mdc-layout-grid--align-right": this.alignRight
      };
    }
  }
};

const ALIGNMENTS = ["top", "bottom", "middle"];
const spanValidator = value => value >= 1 && value <= 12; 

var LayoutCell = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-layout-grid__cell",class:_vm.cssClasses},[_vm._t("default")],2)},staticRenderFns: [],
  name: "MdcLayoutCell",
  props: {
    span: {
      type: [Number, String],
      validator: spanValidator
    },
    desktop: {
      type: [Number, String],
      validator: spanValidator
    },
    tablet: {
      type: [Number, String],
      validator: spanValidator
    },
    phone: {
      type: [Number, String],
      validator: spanValidator
    },
    order: {
      type: [Number, String],
      validator: spanValidator
    },
    align: {
      type: String,
      validator: value => ALIGNMENTS.includes(value)
    }
  },
  computed: {
    cssClasses() {
      return [
        this.span && `mdc-layout-grid__cell--span-${this.span}`,
        this.desktop && `mdc-layout-grid__cell--span-${this.desktop}-desktop`,
        this.tablet && `mdc-layout-grid__cell--span-${this.tablet}-tablet`,
        this.phone && `mdc-layout-grid__cell--span-${this.phone}-phone`,
        this.order && `mdc-layout-grid__cell--order-${this.order}`,
        this.align && `mdc-layout-grid__cell--align-${this.align}`
      ];
    }
  }
};

var LayoutInner = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-layout-grid__inner"},[_vm._t("default")],2)},staticRenderFns: [],
  name: "MdcLayoutInner"
};

function install$11(Vue) {
  Vue.component(LayoutGrid$1.name, LayoutGrid$1);
  Vue.component(LayoutCell.name, LayoutCell);
  Vue.component(LayoutInner.name, LayoutInner);
}

var LayoutGrid = Object.freeze({
	LayoutGrid: LayoutGrid$1,
	LayoutCell: LayoutCell,
	LayoutInner: LayoutInner,
	install: install$11
});

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const cssClasses$6 = {
  CLOSED_CLASS: 'mdc-linear-progress--closed',
  INDETERMINATE_CLASS: 'mdc-linear-progress--indeterminate',
  REVERSED_CLASS: 'mdc-linear-progress--reversed',
};

const strings$7 = {
  PRIMARY_BAR_SELECTOR: '.mdc-linear-progress__primary-bar',
  BUFFER_SELECTOR: '.mdc-linear-progress__buffer',
};

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class MDCLinearProgressFoundation extends MDCFoundation {
  static get cssClasses() {
    return cssClasses$6;
  }

  static get strings() {
    return strings$7;
  }

  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      getPrimaryBar: () => /* el: Element */ {},
      getBuffer: () => /* el: Element */ {},
      hasClass: (/* className: string */) => false,
      removeClass: (/* className: string */) => {},
      setStyle: (/* el: Element, styleProperty: string, value: string */) => {},
    };
  }

  constructor(adapter) {
    super(Object.assign(MDCLinearProgressFoundation.defaultAdapter, adapter));
  }

  init() {
    this.determinate_ = !this.adapter_.hasClass(cssClasses$6.INDETERMINATE_CLASS);
    this.reverse_ = this.adapter_.hasClass(cssClasses$6.REVERSED_CLASS);
    this.progress_ = 0;
  }

  setDeterminate(isDeterminate) {
    this.determinate_ = isDeterminate;
    if (this.determinate_) {
      this.adapter_.removeClass(cssClasses$6.INDETERMINATE_CLASS);
      this.setScale_(this.adapter_.getPrimaryBar(), this.progress_);
    } else {
      this.adapter_.addClass(cssClasses$6.INDETERMINATE_CLASS);
      this.setScale_(this.adapter_.getPrimaryBar(), 1);
      this.setScale_(this.adapter_.getBuffer(), 1);
    }
  }

  setProgress(value) {
    this.progress_ = value;
    if (this.determinate_) {
      this.setScale_(this.adapter_.getPrimaryBar(), value);
    }
  }

  setBuffer(value) {
    if (this.determinate_) {
      this.setScale_(this.adapter_.getBuffer(), value);
    }
  }

  setReverse(isReversed) {
    this.reverse_ = isReversed;
    if (this.reverse_) {
      this.adapter_.addClass(cssClasses$6.REVERSED_CLASS);
    } else {
      this.adapter_.removeClass(cssClasses$6.REVERSED_CLASS);
    }
  }

  open() {
    this.adapter_.removeClass(cssClasses$6.CLOSED_CLASS);
  }

  close() {
    this.adapter_.addClass(cssClasses$6.CLOSED_CLASS);
  }

  setScale_(el, scaleValue) {
    const value = 'scaleX(' + scaleValue + ')';
    transformStyleProperties.forEach((transformStyleProperty) => {
      this.adapter_.setStyle(el, transformStyleProperty, value);
    });
  }
}

function assertNumber(value, fn) {
  if(typeof value === "string") {
    value = parseFloat(value);
    if(isNaN(value)) throw new Error("LinearProgress: value invalid!");
  }
  
  fn(value);
}

var LinearProgress$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-linear-progress",attrs:{"role":"progressbar"}},[_c('div',{staticClass:"mdc-linear-progress__buffering-dots"}),_c('div',{ref:"buffer",staticClass:"mdc-linear-progress__buffer"}),_c('div',{ref:"primary",staticClass:"mdc-linear-progress__bar mdc-linear-progress__primary-bar"},[_c('span',{staticClass:"mdc-linear-progress__bar-inner"})]),_vm._m(0,false,false)])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-linear-progress__bar mdc-linear-progress__secondary-bar"},[_c('span',{staticClass:"mdc-linear-progress__bar-inner"})])}],
  name: "MdcLinearProgress",
  props: {
    indeterminate: Boolean,
    reversed: Boolean,
    closed: Boolean,

    value: [String, Number],
    buffer: [String, Number]
  },
  model: {
    prop: "value",
    event: "change"
  },
  watch: {
    indeterminate(value) {
      this.foundation.setDeterminate(!value);
    },
    reversed(value) {
      this.foundation.setReverse(value);
    },
    closed(value) {
      if(value) {
        this.foundation.close();
      } else {
        this.foundation.open();
      }
    },
    value(value) {
      assertNumber(value, value => this.foundation.setProgress(value));
    },
    buffer(value) {
      assertNumber(value, value => this.foundation.setBuffer(value));
    }
  },
  mounted() {
    const { $el } = this;
    const { primary, buffer } = this.$refs;

    this.foundation = new MDCLinearProgressFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      hasClass: className => $el.classList.contains(className),
      getPrimaryBar: () => primary,
      getBuffer: () => buffer,
      setStyle: (el, prop, value) => el.style[prop] = value,
    });

    this.foundation.init();
    this.foundation.setDeterminate(!this.indeterminate);
    this.foundation.setReverse(this.reversed);
    this.closed && this.foundation.close();
    assertNumber(this.value, value => this.foundation.setProgress(value));
    assertNumber(this.buffer, value => this.foundation.setBuffer(value));
  },
  beforeDestroy() {
    this.foundation.destroy();
  }
};

function install$12(Vue) {
  Vue.component(LinearProgress$1.name, LinearProgress$1);
}

var LinearProgress = Object.freeze({
	LinearProgress: LinearProgress$1,
	install: install$12
});

var List$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"mdc-list",class:_vm.cssClasses},[_vm._t("default")],2)},staticRenderFns: [],
  name: "MdcList",
  props: {
    dense: Boolean,
    avatar: Boolean,
    twoLine: Boolean,
  },
  computed: {
    cssClasses() {
      return {
        "mdc-list--dense": this.dense,
        "mdc-list--avatar-list": this.avatar,
        "mdc-list--two-line": this.twoLine
      };
    }
  }
};

//TODO: support router links?

var ListItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"mdc-list-item"},[_vm._t("graphic"),_c('span',{staticClass:"mdc-list-item__text"},[_vm._v(_vm._s(_vm.text)),(_vm.secondary)?_c('span',{staticClass:"mdc-list-item__secondary"},[_vm._v(_vm._s(_vm.secondary))]):_vm._e()]),_vm._t("meta")],2)},staticRenderFns: [],
  name: "MdcListItem",
  mixins: [ Ripple() ],
  props: {
    text: {
      type: String,
      required: true
    },
    secondary: String
  }
};

var ListDivider = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"mdc-list-divider",class:_vm.cssClasses,attrs:{"role":"separator"}})},staticRenderFns: [],
  name: "MdcListDivider",
  props: {
    inset: Boolean
  },
  computed: {
    cssClasses() {
      return {
        "mdc-list-divider--inset": this.inset
      };
    }
  }
};

var ListItemGraphic = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.tag,{tag:"component",staticClass:"mdc-list-item__graphic",class:_vm.cssClasses,attrs:{"aria-label":_vm.icon && _vm.label,"aria-hidden":_vm.icon && 'true',"src":_vm.src,"title":_vm.title}},[_vm._v(_vm._s(_vm.icon))])},staticRenderFns: [],
  name: "MdcListItemGraphic",
  props: {
    icon: String,
    label: String,
    src: String,
  },
  computed: {
    cssClasses() {
      return {
        "material-icons": this.icon
      };
    },
    tag() {
      return this.src ? "img" : "i";
    }
  }
};

var ListItemMeta = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.tag,{tag:"component",staticClass:"mdc-list-item__meta",class:_vm.cssClasses,attrs:{"aria-label":_vm.icon && _vm.label,"aria-hidden":_vm.icon && 'true',"href":_vm.link,"title":_vm.title}},[_vm._v(_vm._s(_vm.content))])},staticRenderFns: [],
  name: "MdcListItemMeta",
  props: {
    icon: String,
    label: String,
    link: String
  },
  computed: {
    cssClasses() {
      return {
        "material-icons": this.icon
      };
    },
    title() {
      return (this.icon || this.link) && this.label;
    },
    content() {
      return this.icon || this.label;
    },
    tag() {
      if(this.link) {
        return "a";
      }
      return this.icon ? "i" : "span";
    }
  }
};

var ListGroup = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-list-group"},[_vm._t("default")],2)},staticRenderFns: [],
  name: "MdcListGroup"
};

var ListGroupDivider = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('hr',{staticClass:"mdc-list-divider",class:_vm.cssClasses})},staticRenderFns: [],
  name: "MdcListGroupDivider",
  props: {
    inset: Boolean
  },
  computed: {
    cssClasses() {
      return {
        "mdc-list-divider--inset": this.inset
      };
    }
  }
};

var ListGroupSubheader = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('h3',{staticClass:"mdc-list-group__subheader"},[_vm._t("default")],2)},staticRenderFns: [],
  name: "MdcListGroupSubheader"
};

// List groups
function install$13(Vue) {
  Vue.component(List$1.name, List$1);
  Vue.component(ListItem.name, ListItem);
  Vue.component(ListDivider.name, ListDivider);
  Vue.component(ListItemGraphic.name, ListItemGraphic);
  Vue.component(ListItemMeta.name, ListItemMeta);
  // List groups
  Vue.component(ListGroup.name, ListGroup);
  Vue.component(ListGroupDivider.name, ListGroupDivider);
  Vue.component(ListGroupSubheader.name, ListGroupSubheader);
}

var List = Object.freeze({
	List: List$1,
	ListItem: ListItem,
	ListDivider: ListDivider,
	ListItemGraphic: ListItemGraphic,
	ListItemMeta: ListItemMeta,
	ListGroup: ListGroup,
	ListGroupDivider: ListGroupDivider,
	ListGroupSubheader: ListGroupSubheader,
	install: install$13
});

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Simple Menu. Provides an interface for managing
 * - classes
 * - dom
 * - focus
 * - position
 * - dimensions
 * - event handlers
 *
 * Additionally, provides type information for the adapter to the Closure
 * compiler.
 *
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
 *
 * @record
 */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
const cssClasses$7 = {
  ROOT: 'mdc-simple-menu',
  OPEN: 'mdc-simple-menu--open',
  ANIMATING_OPEN: 'mdc-simple-menu--animating-open',
  ANIMATING_CLOSED: 'mdc-simple-menu--animating-closed',
  TOP_RIGHT: 'mdc-simple-menu--open-from-top-right',
  BOTTOM_LEFT: 'mdc-simple-menu--open-from-bottom-left',
  BOTTOM_RIGHT: 'mdc-simple-menu--open-from-bottom-right',
  LIST_ITEM: 'mdc-list-item',
};

/** @enum {string} */
const strings$8 = {
  ITEMS_SELECTOR: '.mdc-simple-menu__items',
  SELECTED_EVENT: 'MDCSimpleMenu:selected',
  CANCEL_EVENT: 'MDCSimpleMenu:cancel',
  ARIA_DISABLED_ATTR: 'aria-disabled',
};

/** @enum {number} */
const numbers$2 = {
  // Amount of time to wait before triggering a selected event on the menu. Note that this time
  // will most likely be bumped up once interactive lists are supported to allow for the ripple to
  // animate before closing the menu
  SELECTED_TRIGGER_DELAY: 50,
  // Total duration of menu open animation.
  TRANSITION_OPEN_DURATION: 120,
  // Total duration of menu close animation.
  TRANSITION_CLOSE_DURATION: 75,
  // Margin left to the edge of the viewport when menu is at maximum possible height.
  MARGIN_TO_EDGE: 32,
  // Ratio of anchor width to menu width for switching from corner positioning to center positioning.
  ANCHOR_TO_MENU_WIDTH_RATIO: 0.67,
  // Ratio of vertical offset to menu height for switching from corner to mid-way origin positioning.
  OFFSET_TO_MENU_HEIGHT_RATIO: 0.1,
};

/**
 * Enum for bits in the {@see Corner) bitmap.
 * @enum {number}
 */
const CornerBit = {
  BOTTOM: 1,
  CENTER: 2,
  RIGHT: 4,
  FLIP_RTL: 8,
};

/**
 * Enum for representing an element corner for positioning the menu.
 *
 * The START constants map to LEFT if element directionality is left
 * to right and RIGHT if the directionality is right to left.
 * Likewise END maps to RIGHT or LEFT depending on the directionality.
 *
 * @enum {number}
 */
const Corner = {
  TOP_LEFT: 0,
  TOP_RIGHT: CornerBit.RIGHT,
  BOTTOM_LEFT: CornerBit.BOTTOM,
  BOTTOM_RIGHT: CornerBit.BOTTOM | CornerBit.RIGHT,
  TOP_START: CornerBit.FLIP_RTL,
  TOP_END: CornerBit.FLIP_RTL | CornerBit.RIGHT,
  BOTTOM_START: CornerBit.BOTTOM | CornerBit.FLIP_RTL,
  BOTTOM_END: CornerBit.BOTTOM | CornerBit.RIGHT | CornerBit.FLIP_RTL,
};

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @typedef {{
 *   top: number,
 *   right: number,
 *   bottom: number,
 *   left: number
 * }}
 */
/* eslint-enable no-unused-vars */

/**
 * @extends {MDCFoundation<!MDCSimpleMenuAdapter>}
 */
class MDCSimpleMenuFoundation extends MDCFoundation {
  /** @return enum{cssClasses} */
  static get cssClasses() {
    return cssClasses$7;
  }

  /** @return enum{strings} */
  static get strings() {
    return strings$8;
  }

  /** @return enum{numbers} */
  static get numbers() {
    return numbers$2;
  }

  /** @return enum{number} */
  static get Corner() {
    return Corner;
  }

  /**
   * {@see MDCSimpleMenuAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCSimpleMenuAdapter}
   */
  static get defaultAdapter() {
    return /** @type {!MDCSimpleMenuAdapter} */ ({
      addClass: () => {},
      removeClass: () => {},
      hasClass: () => false,
      hasNecessaryDom: () => false,
      getAttributeForEventTarget: () => {},
      eventTargetHasClass: () => {},
      getInnerDimensions: () => ({}),
      hasAnchor: () => false,
      getAnchorDimensions: () => ({}),
      getWindowDimensions: () => ({}),
      getNumberOfItems: () => 0,
      registerInteractionHandler: () => {},
      deregisterInteractionHandler: () => {},
      registerBodyClickHandler: () => {},
      deregisterBodyClickHandler: () => {},
      getIndexForEventTarget: () => 0,
      notifySelected: () => {},
      notifyCancel: () => {},
      saveFocus: () => {},
      restoreFocus: () => {},
      isFocused: () => false,
      focus: () => {},
      getFocusedItemIndex: () => -1,
      focusItemAtIndex: () => {},
      isRtl: () => false,
      setTransformOrigin: () => {},
      setPosition: () => {},
      setMaxHeight: () => {},
    });
  }

  /** @param {!MDCSimpleMenuAdapter} adapter */
  constructor(adapter) {
    super(Object.assign(MDCSimpleMenuFoundation.defaultAdapter, adapter));

    /** @private {function(!Event)} */
    this.clickHandler_ = (evt) => this.handlePossibleSelected_(evt);
    /** @private {function(!Event)} */
    this.keydownHandler_ = (evt) => this.handleKeyboardDown_(evt);
    /** @private {function(!Event)} */
    this.keyupHandler_ = (evt) => this.handleKeyboardUp_(evt);
    /** @private {function(!Event)} */
    this.documentClickHandler_ = (evt) => this.handleDocumentClick_(evt);
    /** @private {boolean} */
    this.isOpen_ = false;
    /** @private {number} */
    this.openAnimationEndTimerId_ = 0;
    /** @private {number} */
    this.closeAnimationEndTimerId_ = 0;
    /** @private {number} */
    this.selectedTriggerTimerId_ = 0;
    /** @private {number} */
    this.animationRequestId_ = 0;
    /** @private {!{ width: number, height: number }} */
    this.dimensions_;
    /** @private {number} */
    this.itemHeight_;
    /** @private {Corner} */
    this.anchorCorner_ = Corner.TOP_START;
    /** @private {AnchorMargin} */
    this.anchorMargin_ = {top: 0, right: 0, bottom: 0, left: 0};
    /** @private {?AutoLayoutMeasurements} */
    this.measures_ = null;
  }

  init() {
    const {ROOT, OPEN} = MDCSimpleMenuFoundation.cssClasses;

    if (!this.adapter_.hasClass(ROOT)) {
      throw new Error(`${ROOT} class required in root element.`);
    }

    if (!this.adapter_.hasNecessaryDom()) {
      throw new Error(`Required DOM nodes missing in ${ROOT} component.`);
    }

    if (this.adapter_.hasClass(OPEN)) {
      this.isOpen_ = true;
    }

    this.adapter_.registerInteractionHandler('click', this.clickHandler_);
    this.adapter_.registerInteractionHandler('keyup', this.keyupHandler_);
    this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
  }

  destroy() {
    clearTimeout(this.selectedTriggerTimerId_);
    clearTimeout(this.openAnimationEndTimerId_);
    clearTimeout(this.closeAnimationEndTimerId_);
    // Cancel any currently running animations.
    cancelAnimationFrame(this.animationRequestId_);
    this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
    this.adapter_.deregisterInteractionHandler('keyup', this.keyupHandler_);
    this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
    this.adapter_.deregisterBodyClickHandler(this.documentClickHandler_);
  }

  /**
   * @param {!Corner} corner Default anchor corner alignment of top-left menu corner.
   */
  setAnchorCorner(corner) {
    this.anchorCorner_ = corner;
  }

  /**
   * @param {!AnchorMargin} margin 4-plet of margins from anchor.
   */
  setAnchorMargin(margin) {
    this.anchorMargin_.top = typeof margin.top === 'number' ? margin.top : 0;
    this.anchorMargin_.right = typeof margin.right === 'number' ? margin.right : 0;
    this.anchorMargin_.bottom = typeof margin.bottom === 'number' ? margin.bottom : 0;
    this.anchorMargin_.left = typeof margin.left === 'number' ? margin.left : 0;
  }

  /**
   * @param {?number} focusIndex
   * @private
   */
  focusOnOpen_(focusIndex) {
    if (focusIndex === null) {
      // First, try focusing the menu.
      this.adapter_.focus();
      // If that doesn't work, focus first item instead.
      if (!this.adapter_.isFocused()) {
        this.adapter_.focusItemAtIndex(0);
      }
    } else {
      this.adapter_.focusItemAtIndex(focusIndex);
    }
  }

  /**
   * Handle clicks and cancel the menu if not a list item
   * @param {!Event} evt
   * @private
   */
  handleDocumentClick_(evt) {
    let el = evt.target;

    while (el && el !== document.documentElement) {
      if (this.adapter_.eventTargetHasClass(el, cssClasses$7.LIST_ITEM)) {
        return;
      }
      el = el.parentNode;
    }

    this.adapter_.notifyCancel();
    this.close(evt);
  };

  /**
   * Handle keys that we want to repeat on hold (tab and arrows).
   * @param {!Event} evt
   * @return {boolean}
   * @private
   */
  handleKeyboardDown_(evt) {
    // Do nothing if Alt, Ctrl or Meta are pressed.
    if (evt.altKey || evt.ctrlKey || evt.metaKey) {
      return true;
    }

    const {keyCode, key, shiftKey} = evt;
    const isTab = key === 'Tab' || keyCode === 9;
    const isArrowUp = key === 'ArrowUp' || keyCode === 38;
    const isArrowDown = key === 'ArrowDown' || keyCode === 40;
    const isSpace = key === 'Space' || keyCode === 32;

    const focusedItemIndex = this.adapter_.getFocusedItemIndex();
    const lastItemIndex = this.adapter_.getNumberOfItems() - 1;

    if (shiftKey && isTab && focusedItemIndex === 0) {
      this.adapter_.focusItemAtIndex(lastItemIndex);
      evt.preventDefault();
      return false;
    }

    if (!shiftKey && isTab && focusedItemIndex === lastItemIndex) {
      this.adapter_.focusItemAtIndex(0);
      evt.preventDefault();
      return false;
    }

    // Ensure Arrow{Up,Down} and space do not cause inadvertent scrolling
    if (isArrowUp || isArrowDown || isSpace) {
      evt.preventDefault();
    }

    if (isArrowUp) {
      if (focusedItemIndex === 0 || this.adapter_.isFocused()) {
        this.adapter_.focusItemAtIndex(lastItemIndex);
      } else {
        this.adapter_.focusItemAtIndex(focusedItemIndex - 1);
      }
    } else if (isArrowDown) {
      if (focusedItemIndex === lastItemIndex || this.adapter_.isFocused()) {
        this.adapter_.focusItemAtIndex(0);
      } else {
        this.adapter_.focusItemAtIndex(focusedItemIndex + 1);
      }
    }

    return true;
  }

  /**
   * Handle keys that we don't want to repeat on hold (Enter, Space, Escape).
   * @param {!Event} evt
   * @return {boolean}
   * @private
   */
  handleKeyboardUp_(evt) {
    // Do nothing if Alt, Ctrl or Meta are pressed.
    if (evt.altKey || evt.ctrlKey || evt.metaKey) {
      return true;
    }

    const {keyCode, key} = evt;
    const isEnter = key === 'Enter' || keyCode === 13;
    const isSpace = key === 'Space' || keyCode === 32;
    const isEscape = key === 'Escape' || keyCode === 27;

    if (isEnter || isSpace) {
      this.handlePossibleSelected_(evt);
    }

    if (isEscape) {
      this.adapter_.notifyCancel();
      this.close();
    }

    return true;
  }

  /**
   * @param {!Event} evt
   * @private
   */
  handlePossibleSelected_(evt) {
    if (this.adapter_.getAttributeForEventTarget(evt.target, strings$8.ARIA_DISABLED_ATTR) === 'true') {
      return;
    }
    const targetIndex = this.adapter_.getIndexForEventTarget(evt.target);
    if (targetIndex < 0) {
      return;
    }
    // Debounce multiple selections
    if (this.selectedTriggerTimerId_) {
      return;
    }
    this.selectedTriggerTimerId_ = setTimeout(() => {
      this.selectedTriggerTimerId_ = 0;
      this.close();
      this.adapter_.notifySelected({index: targetIndex});
    }, numbers$2.SELECTED_TRIGGER_DELAY);
  }

  /**
   * @return {AutoLayoutMeasurements} Measurements used to position menu popup.
   */
  getAutoLayoutMeasurements_() {
    const anchorRect = this.adapter_.getAnchorDimensions();
    const viewport = this.adapter_.getWindowDimensions();

    return {
      viewport: viewport,
      viewportDistance: {
        top: anchorRect.top,
        right: viewport.width - anchorRect.right,
        left: anchorRect.left,
        bottom: viewport.height - anchorRect.bottom,
      },
      anchorHeight: anchorRect.height,
      anchorWidth: anchorRect.width,
      menuHeight: this.dimensions_.height,
      menuWidth: this.dimensions_.width,
    };
  }

  /**
   * Computes the corner of the anchor from which to animate and position the menu.
   * @return {Corner}
   * @private
   */
  getOriginCorner_() {
    // Defaults: open from the top left.
    let corner = Corner.TOP_LEFT;

    const {viewportDistance, anchorHeight, anchorWidth, menuHeight, menuWidth} = this.measures_;
    const isBottomAligned = Boolean(this.anchorCorner_ & CornerBit.BOTTOM);
    const availableTop = isBottomAligned ? viewportDistance.top + anchorHeight + this.anchorMargin_.bottom
      : viewportDistance.top + this.anchorMargin_.top;
    const availableBottom = isBottomAligned ? viewportDistance.bottom - this.anchorMargin_.bottom
      : viewportDistance.bottom + anchorHeight - this.anchorMargin_.top;

    const topOverflow = menuHeight - availableTop;
    const bottomOverflow = menuHeight - availableBottom;
    if (bottomOverflow > 0 && topOverflow < bottomOverflow) {
      corner |= CornerBit.BOTTOM;
    }

    const isRtl = this.adapter_.isRtl();
    const isFlipRtl = Boolean(this.anchorCorner_ & CornerBit.FLIP_RTL);
    const avoidHorizontalOverlap = Boolean(this.anchorCorner_ & CornerBit.RIGHT);
    const isAlignedRight = (avoidHorizontalOverlap && !isRtl) ||
      (!avoidHorizontalOverlap && isFlipRtl && isRtl);
    const availableLeft = isAlignedRight ? viewportDistance.left + anchorWidth + this.anchorMargin_.right :
      viewportDistance.left + this.anchorMargin_.left;
    const availableRight = isAlignedRight ? viewportDistance.right - this.anchorMargin_.right :
      viewportDistance.right + anchorWidth - this.anchorMargin_.left;

    const leftOverflow = menuWidth - availableLeft;
    const rightOverflow = menuWidth - availableRight;

    if ((leftOverflow < 0 && isAlignedRight && isRtl) ||
        (avoidHorizontalOverlap && !isAlignedRight && leftOverflow < 0) ||
        (rightOverflow > 0 && leftOverflow < rightOverflow)) {
      corner |= CornerBit.RIGHT;
    }

    return corner;
  }

  /**
   * @param {Corner} corner Origin corner of the menu.
   * @return {number} Horizontal offset of menu origin corner from corresponding anchor corner.
   * @private
   */
  getHorizontalOriginOffset_(corner) {
    const {anchorWidth} = this.measures_;
    const isRightAligned = Boolean(corner & CornerBit.RIGHT);
    const avoidHorizontalOverlap = Boolean(this.anchorCorner_ & CornerBit.RIGHT);
    let x = 0;
    if (isRightAligned) {
      const rightOffset = avoidHorizontalOverlap ? anchorWidth - this.anchorMargin_.left : this.anchorMargin_.right;
      x = rightOffset;
    } else {
      const leftOffset = avoidHorizontalOverlap ? anchorWidth - this.anchorMargin_.right : this.anchorMargin_.left;
      x = leftOffset;
    }
    return x;
  }

  /**
   * @param {Corner} corner Origin corner of the menu.
   * @return {number} Vertical offset of menu origin corner from corresponding anchor corner.
   * @private
   */
  getVerticalOriginOffset_(corner) {
    const {viewport, viewportDistance, anchorHeight, menuHeight} = this.measures_;
    const isBottomAligned = Boolean(corner & CornerBit.BOTTOM);
    const {MARGIN_TO_EDGE} = MDCSimpleMenuFoundation.numbers;
    const avoidVerticalOverlap = Boolean(this.anchorCorner_ & CornerBit.BOTTOM);
    const canOverlapVertically = !avoidVerticalOverlap;
    let y = 0;

    if (isBottomAligned) {
      y = avoidVerticalOverlap ? anchorHeight - this.anchorMargin_.top : -this.anchorMargin_.bottom;
      // adjust for when menu can overlap anchor, but too tall to be aligned to bottom
      // anchor corner. Bottom margin is ignored in such cases.
      if (canOverlapVertically && menuHeight > viewportDistance.top + anchorHeight) {
        y = -(Math.min(menuHeight, viewport.height - MARGIN_TO_EDGE) - (viewportDistance.top + anchorHeight));
      }
    } else {
      y = avoidVerticalOverlap ? (anchorHeight + this.anchorMargin_.bottom) : this.anchorMargin_.top;
      // adjust for when menu can overlap anchor, but too tall to be aligned to top
      // anchor corners. Top margin is ignored in that case.
      if (canOverlapVertically && menuHeight > viewportDistance.bottom + anchorHeight) {
        y = -(Math.min(menuHeight, viewport.height - MARGIN_TO_EDGE) - (viewportDistance.bottom + anchorHeight));
      }
    }
    return y;
  }

  /**
   * @param {Corner} corner Origin corner of the menu.
   * @return {number} Maximum height of the menu, based on available space. 0 indicates should not be set.
   * @private
   */
  getMenuMaxHeight_(corner) {
    let maxHeight = 0;
    const {viewportDistance} = this.measures_;
    const isBottomAligned = Boolean(corner & CornerBit.BOTTOM);

    // When maximum height is not specified, it is handled from css.
    if (this.anchorCorner_ & CornerBit.BOTTOM) {
      if (isBottomAligned) {
        maxHeight = viewportDistance.top + this.anchorMargin_.top;
      } else {
        maxHeight = viewportDistance.bottom - this.anchorMargin_.bottom;
      }
    }

    return maxHeight;
  }

  /** @private */
  autoPosition_() {
    if (!this.adapter_.hasAnchor()) {
      return;
    }

    // Compute measurements for autoposition methods reuse.
    this.measures_ = this.getAutoLayoutMeasurements_();

    const corner = this.getOriginCorner_();
    const maxMenuHeight = this.getMenuMaxHeight_(corner);
    let verticalAlignment = (corner & CornerBit.BOTTOM) ? 'bottom' : 'top';
    let horizontalAlignment = (corner & CornerBit.RIGHT) ? 'right' : 'left';
    const horizontalOffset = this.getHorizontalOriginOffset_(corner);
    const verticalOffset = this.getVerticalOriginOffset_(corner);
    const position = {
      [horizontalAlignment]: horizontalOffset ? horizontalOffset + 'px' : '0',
      [verticalAlignment]: verticalOffset ? verticalOffset + 'px' : '0',
    };
    const {anchorWidth, menuHeight, menuWidth} = this.measures_;
    // Center align when anchor width is comparable or greater than menu, otherwise keep corner.
    if (anchorWidth / menuWidth > numbers$2.ANCHOR_TO_MENU_WIDTH_RATIO) {
      horizontalAlignment = 'center';
    }

    // Adjust vertical origin when menu is positioned with significant offset from anchor. This is done so that
    // scale animation is "anchored" on the anchor.
    if (!(this.anchorCorner_ & CornerBit.BOTTOM) &&
        Math.abs(verticalOffset / menuHeight) > numbers$2.OFFSET_TO_MENU_HEIGHT_RATIO) {
      const verticalOffsetPercent = Math.abs(verticalOffset / menuHeight) * 100;
      const originPercent = (corner & CornerBit.BOTTOM) ? 100 - verticalOffsetPercent : verticalOffsetPercent;
      verticalAlignment = Math.round(originPercent * 100) / 100 + '%';
    }

    this.adapter_.setTransformOrigin(`${horizontalAlignment} ${verticalAlignment}`);
    this.adapter_.setPosition(position);
    this.adapter_.setMaxHeight(maxMenuHeight ? maxMenuHeight + 'px' : '');

    // Clear measures after positioning is complete.
    this.measures_ = null;
  }

  /**
   * Open the menu.
   * @param {{focusIndex: ?number}=} options
   */
  open({focusIndex = null} = {}) {
    this.adapter_.saveFocus();
    this.adapter_.addClass(MDCSimpleMenuFoundation.cssClasses.ANIMATING_OPEN);

    this.animationRequestId_ = requestAnimationFrame(() => {
      this.dimensions_ = this.adapter_.getInnerDimensions();
      this.autoPosition_();
      this.adapter_.addClass(MDCSimpleMenuFoundation.cssClasses.OPEN);
      this.focusOnOpen_(focusIndex);
      this.adapter_.registerBodyClickHandler(this.documentClickHandler_);
      this.openAnimationEndTimerId_ = setTimeout(() => {
        this.openAnimationEndTimerId_ = 0;
        this.adapter_.removeClass(MDCSimpleMenuFoundation.cssClasses.ANIMATING_OPEN);
      }, numbers$2.TRANSITION_OPEN_DURATION);
    });
    this.isOpen_ = true;
  }

  /**
   * Closes the menu.
   * @param {Event=} evt
   */
  close(evt = null) {
    const targetIsDisabled = evt ?
      this.adapter_.getAttributeForEventTarget(evt.target, strings$8.ARIA_DISABLED_ATTR) === 'true' :
      false;

    if (targetIsDisabled) {
      return;
    }

    this.adapter_.deregisterBodyClickHandler(this.documentClickHandler_);
    this.adapter_.addClass(MDCSimpleMenuFoundation.cssClasses.ANIMATING_CLOSED);
    requestAnimationFrame(() => {
      this.adapter_.removeClass(MDCSimpleMenuFoundation.cssClasses.OPEN);
      this.closeAnimationEndTimerId_ = setTimeout(() => {
        this.closeAnimationEndTimerId_ = 0;
        this.adapter_.removeClass(MDCSimpleMenuFoundation.cssClasses.ANIMATING_CLOSED);
      }, numbers$2.TRANSITION_CLOSE_DURATION);
    });
    this.isOpen_ = false;
    this.adapter_.restoreFocus();
  }

  /** @return {boolean} */
  isOpen() {
    return this.isOpen_;
  }
}

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @type {string|undefined} */
let storedTransformPropertyName_$1;

/**
 * Returns the name of the correct transform property to use on the current browser.
 * @param {!Window} globalObj
 * @param {boolean=} forceRefresh
 * @return {string}
 */
function getTransformPropertyName$1(globalObj, forceRefresh = false) {
  if (storedTransformPropertyName_$1 === undefined || forceRefresh) {
    const el = globalObj.document.createElement('div');
    const transformPropertyName = ('transform' in el.style ? 'transform' : 'webkitTransform');
    storedTransformPropertyName_$1 = transformPropertyName;
  }

  return storedTransformPropertyName_$1;
}

var Menu$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-simple-menu",class:_vm.cssClasses,attrs:{"tabindex":"-1"}},[_c('div',{ref:"itemsContainer",staticClass:"mdc-list mdc-simple-menu__items",attrs:{"role":"menu"}},[_vm._t("default")],2)])},staticRenderFns: [],
  name: "MdcMenu",
  props: {
    anchor: Boolean,

    margin: {
      type: Object,
      default() {
        return {};
      }
    },
    corner: {
      type: String,
      default: "top_left",
      validator: value => {
        let prop = value.toUpperCase();
        return typeof Corner[prop] !== "undefined";
      }
    }
  },
  watch: {
    margin(value) {
      this.foundation.setAnchorMargin(value);
    },
    corner(value) {
      this.foundation.setAnchorCorner(value);
    }
  },
  data() {
    return { items: [] }
  },
  mounted() {
    const { $el } = this;
    const { itemsContainer } = this.$refs;

    const items = this.items = this.$_findItems();
    const $styles = getComputedStyle($el);
    let $anchor, prevFocus;

    if(this.anchor) {
      $anchor = $el.parentElement;
      $anchor.classList.add("mdc-menu-anchor");
    }

    this.foundation = new MDCSimpleMenuFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      hasClass: className => $el.classList.contains(className),
      hasNecessaryDom: () => !!itemsContainer,
      getAttributeForEventTarget: (target, name) => target.getAttribute(name),
      eventTargetHasClass: (target, className) => target.classList.contains(className),
      getInnerDimensions: () => ({ width: itemsContainer.offsetWidth, height: itemsContainer.offsetHeight }),
      hasAnchor: () => !!$anchor,
      getAnchorDimensions: () => $el.parentElement.getBoundingClientRect(),
      getWindowDimensions: () => ({ width: window.innerWidth, height: window.innerHeight }),
      getNumberOfItems: () => items.length,
      registerInteractionHandler: (type, handler) => $el.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => $el.removeEventListener(type, handler),
      registerBodyClickHandler: handler => document.body.addEventListener("click", handler),
      deregisterBodyClickHandler: handler => document.body.removeEventListener("click", handler),
      getIndexForEventTarget: target => items.indexOf(target),
      notifySelected: data => this.$emit("selected", data.index, items[data.index]),
      notifyCancel: () => this.$emit("cancel"),
      saveFocus: () => {
        prevFocus = document.activeElement;
      },
      restoreFocus: () => prevFocus && prevFocus.focus(),
      isFocused: () => document.activeElement === $el,
      focus: () => $el.focus(),
      getFocusedItemIndex: () => items.indexOf(document.activeElement),
      focusItemAtIndex: index => items[index].focus(),
      isRtl: () => $styles.direction === "rtl",
      setTransformOrigin: origin => {
        const prop = getTransformPropertyName$1(window);
        $el.style[`${prop}-origin`] = origin;
      },
      setPosition: pos => {
        $el.style.left = "left" in pos ? pos.left : null;
        $el.style.right = "right" in pos ? pos.right : null;
        $el.style.top = "top" in pos ? pos.top : null;
        $el.style.bottom = "bottom" in pos ? pos.bottom : null;
      },
      setMaxHeight: height => $el.style.maxHeight = height
    });
    this.foundation.init();

    this.foundation.setAnchorCorner(this.corner.toUpperCase());
    this.foundation.setAnchorMargin(this.margin);
  },
  updated() {
    this.items = this.$_findItems();
  },
  computed: {
    open() {
      return this.foundation && this.foundation.isOpen();
    }
  },
  methods: {
    show(index = null) {
      this.foundation.open({ focusIndex: index });
    },
    hide() {
      this.foundation.close();
    },
    $_findItems() {
      return Array.prototype.slice.call(this.$refs.itemsContainer.querySelectorAll(".mdc-list-item[role]"));
    }
  }
};

var MenuItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"mdc-list-item",attrs:{"role":"menuitem","tabindex":"0"}},[_vm._v(_vm._s(_vm.text))])},staticRenderFns: [],
  name: "MdcMenuItem",
  props: {
    text: {
      type: String,
      required: true
    }
  }
};

function install$14(Vue) {
  Vue.component(Menu$1.name, Menu$1);
  Vue.component(MenuItem.name, MenuItem);
}

var Menu = Object.freeze({
	Menu: Menu$1,
	MenuItem: MenuItem,
	install: install$14
});

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-unused-vars */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
const strings$9 = {
  NATIVE_CONTROL_SELECTOR: '.mdc-radio__native-control',
};

/** @enum {string} */
const cssClasses$8 = {
  ROOT: 'mdc-radio',
  DISABLED: 'mdc-radio--disabled',
};

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
/**
 * @extends {MDCFoundation<!MDCRadioAdapter>}
 */
class MDCRadioFoundation extends MDCFoundation {
  /** @return enum {cssClasses} */
  static get cssClasses() {
    return cssClasses$8;
  }

  /** @return enum {strings} */
  static get strings() {
    return strings$9;
  }

  /** @return {!MDCRadioAdapter} */
  static get defaultAdapter() {
    return /** @type {!MDCRadioAdapter} */ ({
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      getNativeControl: () => /* !MDCSelectionControlState */ {},
    });
  }

  /** @return {boolean} */
  isChecked() {
    return this.getNativeControl_().checked;
  }

  /** @param {boolean} checked */
  setChecked(checked) {
    this.getNativeControl_().checked = checked;
  }

  /** @return {boolean} */
  isDisabled() {
    return this.getNativeControl_().disabled;
  }

  /** @param {boolean} disabled */
  setDisabled(disabled) {
    const {DISABLED} = MDCRadioFoundation.cssClasses;
    this.getNativeControl_().disabled = disabled;
    if (disabled) {
      this.adapter_.addClass(DISABLED);
    } else {
      this.adapter_.removeClass(DISABLED);
    }
  }

  /** @return {?string} */
  getValue() {
    return this.getNativeControl_().value;
  }

  /** @param {?string} value */
  setValue(value) {
    this.getNativeControl_().value = value;
  }

  /**
   * @return {!MDCSelectionControlState}
   * @private
   */
  getNativeControl_() {
    return this.adapter_.getNativeControl() || {
      checked: false,
      disabled: false,
      value: null,
    };
  }
}

const rippleAdapter$2 = {
  isSurfaceActive: () => false,
  registerInteractionHandler(type, handler) {
    this.$refs.input.addEventListener(type, handler);
  },
  deregisterInteractionHandler(type, handler) {
    this.$refs.input.removeEventListener(type, handler);
  },
  computeBoundingRect() {
    const { left, top } = this.$el.getBoundingClientRect();
    const DIM = 40;
    return {
      top, left,
      right: left + DIM,
      bottom: top + DIM,
      width: DIM,
      height: DIM
    };
  }
};

var Radio$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-radio",class:_vm.cssClasses},[_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],ref:"input",staticClass:"mdc-radio__native-control",attrs:{"type":"radio"},domProps:{"value":_vm.value,"checked":_vm._q(_vm.model,_vm.value)},on:{"change":function($event){_vm.model=_vm.value;}}},'input',_vm.$attrs,false)),_vm._m(0,false,false)])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-radio__background"},[_c('div',{staticClass:"mdc-radio__outer-circle"}),_c('div',{staticClass:"mdc-radio__inner-circle"})])}],
  name: "MdcRadio",
  inheritAttrs: false,
  mixins: [ Ripple(rippleAdapter$2, { unbounded: true }) ],
  props: {
    disabled: Boolean,
    checked: [Boolean, String],
    value: {
      type: String,
      required: true
    }
  },
  model: {
    prop: "checked",
    event: "change",
  },
  watch: {
    disabled(value) {
      this.foundation.setDisabled(value);
    },
    value(value) {
      this.foundation.setValue(value);
    }
  },
  mounted() {
    const { $el } = this;

    this.foundation = new MDCRadioFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      getNativeControl: () => this.$refs.input
    });
    this.foundation.init();

    this.foundation.setDisabled(this.disabled);
    this.foundation.setValue(this.value);
  },
  beforeDestroy() {
    this.foundation.destroy();
  },
  computed: {
    model: {
      get() {
        return this.checked;
      },
      set(value) {
        this.$emit("change", value);
      }
    }
  }
};

function install$15(Vue) {
  Vue.component(Radio$1.name, Radio$1);
}

var Radio = Object.freeze({
	Radio: Radio$1,
	install: install$15
});

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const cssClasses$9 = {
  BOTTOM_LINE: 'mdc-select__bottom-line',
  BOTTOM_LINE_ACTIVE: 'mdc-select__bottom-line--active',
  BOX: 'mdc-select--box',
  DISABLED: 'mdc-select--disabled',
  LABEL_FLOAT_ABOVE: 'mdc-select__label--float-above',
  OPEN: 'mdc-select--open',
  ROOT: 'mdc-select',
  SCROLL_LOCK: 'mdc-select-scroll-lock',
};

const strings$10 = {
  CHANGE_EVENT: 'MDCSelect:change',
  BOTTOM_LINE_SELECTOR: '.mdc-select__bottom-line',
  LABEL_SELECTOR: '.mdc-select__label',
  MENU_SELECTOR: '.mdc-select__menu',
  SURFACE_SELECTOR: '.mdc-select__surface',
  SELECTED_TEXT_SELECTOR: '.mdc-select__selected-text',
};

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const OPENER_KEYS = [
  {key: 'ArrowUp', keyCode: 38, forType: 'keydown'},
  {key: 'ArrowDown', keyCode: 40, forType: 'keydown'},
  {key: 'Space', keyCode: 32, forType: 'keyup'},
];

class MDCSelectFoundation extends MDCFoundation {
  static get cssClasses() {
    return cssClasses$9;
  }

  static get strings() {
    return strings$10;
  }

  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      addClassToLabel: (/* className: string */) => {},
      removeClassFromLabel: (/* className: string */) => {},
      addClassToBottomLine: (/* className: string */) => {},
      removeClassFromBottomLine: (/* className: string */) => {},
      setBottomLineAttr: (/* attr: string, value: string */) => {},
      addBodyClass: (/* className: string */) => {},
      removeBodyClass: (/* className: string */) => {},
      setAttr: (/* attr: string, value: string */) => {},
      rmAttr: (/* attr: string */) => {},
      computeBoundingRect: () => /* {left: number, top: number} */ ({left: 0, top: 0}),
      registerInteractionHandler: (/* type: string, handler: EventListener */) => {},
      deregisterInteractionHandler: (/* type: string, handler: EventListener */) => {},
      focus: () => {},
      makeTabbable: () => {},
      makeUntabbable: () => {},
      getComputedStyleValue: (/* propertyName: string */) => /* string */ '',
      setStyle: (/* propertyName: string, value: string */) => {},
      create2dRenderingContext: () => /* {font: string, measureText: (string) => {width: number}} */ ({
        font: '',
        measureText: () => ({width: 0}),
      }),
      setMenuElStyle: (/* propertyName: string, value: string */) => {},
      setMenuElAttr: (/* attr: string, value: string */) => {},
      rmMenuElAttr: (/* attr: string */) => {},
      getMenuElOffsetHeight: () => /* number */ 0,
      openMenu: (/* focusIndex: number */) => {},
      isMenuOpen: () => /* boolean */ false,
      setSelectedTextContent: (/* textContent: string */) => {},
      getNumberOfOptions: () => /* number */ 0,
      getTextForOptionAtIndex: (/* index: number */) => /* string */ '',
      getValueForOptionAtIndex: (/* index: number */) => /* string */ '',
      setAttrForOptionAtIndex: (/* index: number, attr: string, value: string */) => {},
      rmAttrForOptionAtIndex: (/* index: number, attr: string */) => {},
      getOffsetTopForOptionAtIndex: (/* index: number */) => /* number */ 0,
      registerMenuInteractionHandler: (/* type: string, handler: EventListener */) => {},
      deregisterMenuInteractionHandler: (/* type: string, handler: EventListener */) => {},
      notifyChange: () => {},
      getWindowInnerHeight: () => /* number */ 0,
    };
  }

  constructor(adapter) {
    super(Object.assign(MDCSelectFoundation.defaultAdapter, adapter));
    this.ctx_ = null;
    this.selectedIndex_ = -1;
    this.disabled_ = false;
    this.isFocused_ = false;

    /** @private {number} */
    this.animationRequestId_ = 0;

    this.setPointerXOffset_ = (evt) => this.setBottomLineOrigin_(evt);
    this.displayHandler_ = (evt) => {
      evt.preventDefault();
      if (!this.adapter_.isMenuOpen()) {
        this.open_();
      }
    };
    this.displayViaKeyboardHandler_ = (evt) => this.handleDisplayViaKeyboard_(evt);
    this.selectionHandler_ = ({detail}) => {
      const {index} = detail;

      if (index !== this.selectedIndex_) {
        this.setSelectedIndex(index);
        this.adapter_.notifyChange();
      }
      this.close_();
    };
    this.cancelHandler_ = () => {
      this.close_();

      if (this.selectedIndex_ === -1) {
        this.adapter_.removeClassFromLabel(cssClasses$9.LABEL_FLOAT_ABOVE);
      }
    };
  }

  init() {
    this.ctx_ = this.adapter_.create2dRenderingContext();
    this.adapter_.registerInteractionHandler('click', this.displayHandler_);
    this.adapter_.registerInteractionHandler('keydown', this.displayViaKeyboardHandler_);
    this.adapter_.registerInteractionHandler('keyup', this.displayViaKeyboardHandler_);
    this.adapter_.registerMenuInteractionHandler(
      MDCSimpleMenuFoundation.strings.SELECTED_EVENT, this.selectionHandler_);
    this.adapter_.registerMenuInteractionHandler(
      MDCSimpleMenuFoundation.strings.CANCEL_EVENT, this.cancelHandler_);
    ['mousedown', 'touchstart'].forEach((evtType) => {
      this.adapter_.registerInteractionHandler(evtType, this.setPointerXOffset_);
    });
    this.resize();
  }

  destroy() {
    // Drop reference to context object to prevent potential leaks
    this.ctx_ = null;
    cancelAnimationFrame(this.animationRequestId_);
    this.adapter_.deregisterInteractionHandler('click', this.displayHandler_);
    this.adapter_.deregisterInteractionHandler('keydown', this.displayViaKeyboardHandler_);
    this.adapter_.deregisterInteractionHandler('keyup', this.displayViaKeyboardHandler_);
    this.adapter_.deregisterMenuInteractionHandler(
      MDCSimpleMenuFoundation.strings.SELECTED_EVENT, this.selectionHandler_);
    this.adapter_.deregisterMenuInteractionHandler(
      MDCSimpleMenuFoundation.strings.CANCEL_EVENT, this.cancelHandler_);
    ['mousedown', 'touchstart'].forEach((evtType) => {
      this.adapter_.deregisterInteractionHandler(evtType, this.setPointerXOffset_);
    });
  }

  getValue() {
    return this.selectedIndex_ >= 0 ? this.adapter_.getValueForOptionAtIndex(this.selectedIndex_) : '';
  }

  getSelectedIndex() {
    return this.selectedIndex_;
  }

  setSelectedIndex(index) {
    const prevSelectedIndex = this.selectedIndex_;
    if (prevSelectedIndex >= 0) {
      this.adapter_.rmAttrForOptionAtIndex(this.selectedIndex_, 'aria-selected');
    }

    this.selectedIndex_ = index >= 0 && index < this.adapter_.getNumberOfOptions() ? index : -1;
    let selectedTextContent = '';
    if (this.selectedIndex_ >= 0) {
      selectedTextContent = this.adapter_.getTextForOptionAtIndex(this.selectedIndex_).trim();
      this.adapter_.setAttrForOptionAtIndex(this.selectedIndex_, 'aria-selected', 'true');
    }
    this.adapter_.setSelectedTextContent(selectedTextContent);
  }

  isDisabled() {
    return this.disabled_;
  }

  setDisabled(disabled) {
    const {DISABLED} = MDCSelectFoundation.cssClasses;
    this.disabled_ = disabled;
    if (this.disabled_) {
      this.adapter_.addClass(DISABLED);
      this.adapter_.setAttr('aria-disabled', 'true');
      this.adapter_.makeUntabbable();
    } else {
      this.adapter_.removeClass(DISABLED);
      this.adapter_.rmAttr('aria-disabled');
      this.adapter_.makeTabbable();
    }
  }

  resize() {
    const font = this.adapter_.getComputedStyleValue('font');
    const letterSpacing = parseFloat(this.adapter_.getComputedStyleValue('letter-spacing'));

    if (font) {
      this.ctx_.font = font;
    } else {
      const primaryFontFamily = this.adapter_.getComputedStyleValue('font-family').split(',')[0];
      const fontSize = this.adapter_.getComputedStyleValue('font-size');
      this.ctx_.font = `${fontSize} ${primaryFontFamily}`;
    }

    let maxTextLength = 0;

    for (let i = 0, l = this.adapter_.getNumberOfOptions(); i < l; i++) {
      const surfacePaddingRight = parseInt(this.adapter_.getComputedStyleValue('padding-right'), 10);
      const surfacePaddingLeft = parseInt(this.adapter_.getComputedStyleValue('padding-left'), 10);
      const selectBoxAddedPadding = surfacePaddingRight + surfacePaddingLeft;
      const txt = this.adapter_.getTextForOptionAtIndex(i).trim();
      const {width} = this.ctx_.measureText(txt);
      const addedSpace = letterSpacing * txt.length;

      maxTextLength =
        Math.max(maxTextLength, Math.ceil(width + addedSpace + selectBoxAddedPadding));
    }

    this.adapter_.setStyle('width', `${maxTextLength}px`);
  }

  open_() {
    this.disableScroll_();
    const {OPEN} = MDCSelectFoundation.cssClasses;
    const focusIndex = this.selectedIndex_ < 0 ? 0 : this.selectedIndex_;

    this.setMenuStylesForOpenAtIndex_(focusIndex);
    this.adapter_.addClassToLabel(cssClasses$9.LABEL_FLOAT_ABOVE);
    this.adapter_.addClassToBottomLine(cssClasses$9.BOTTOM_LINE_ACTIVE);
    this.adapter_.addClass(OPEN);
    this.animationRequestId_ = requestAnimationFrame(() => {
      this.adapter_.openMenu(focusIndex);
      this.isFocused_ = true;
    });
  }

  setBottomLineOrigin_(evt) {
    const targetClientRect = evt.target.getBoundingClientRect();
    const evtCoords = {x: evt.clientX, y: evt.clientY};
    const normalizedX = evtCoords.x - targetClientRect.left;
    const attributeString =
      `transform-origin: ${normalizedX}px bottom`;

    this.adapter_.setBottomLineAttr('style', attributeString);
  }

  setMenuStylesForOpenAtIndex_(index) {
    const innerHeight = this.adapter_.getWindowInnerHeight();
    const {left, top} = this.adapter_.computeBoundingRect();

    this.adapter_.setMenuElAttr('aria-hidden', 'true');
    this.adapter_.setMenuElStyle('display', 'block');
    const menuHeight = this.adapter_.getMenuElOffsetHeight();
    const itemOffsetTop = this.adapter_.getOffsetTopForOptionAtIndex(index);
    this.adapter_.setMenuElStyle('display', '');
    this.adapter_.rmMenuElAttr('aria-hidden');

    let adjustedTop = top - itemOffsetTop;
    const overflowsTop = adjustedTop < 0;
    const overflowsBottom = adjustedTop + menuHeight > innerHeight;
    if (overflowsTop) {
      adjustedTop = 0;
    } else if (overflowsBottom) {
      adjustedTop = Math.max(0, innerHeight - menuHeight);
    }

    this.adapter_.setMenuElStyle('left', `${left}px`);
    this.adapter_.setMenuElStyle('top', `${adjustedTop}px`);
    this.adapter_.setMenuElStyle('transform-origin', `center ${itemOffsetTop}px`);
  }

  close_() {
    const {OPEN} = MDCSelectFoundation.cssClasses;
    this.adapter_.removeClass(OPEN);
    this.adapter_.removeClassFromBottomLine(cssClasses$9.BOTTOM_LINE_ACTIVE);
    this.adapter_.focus();
    this.enableScroll_();
  }

  handleDisplayViaKeyboard_(evt) {
    // We use a hard-coded 2 instead of Event.AT_TARGET to avoid having to reference a browser
    // global.
    const EVENT_PHASE_AT_TARGET = 2;
    if (evt.eventPhase !== EVENT_PHASE_AT_TARGET) {
      return;
    }

    // Prevent pressing space down from scrolling the page
    const isSpaceDown = evt.type === 'keydown' && (evt.key === 'Space' || evt.keyCode === 32);
    if (isSpaceDown) {
      evt.preventDefault();
    }

    const isOpenerKey = OPENER_KEYS.some(({key, keyCode, forType}) => {
      return evt.type === forType && (evt.key === key || evt.keyCode === keyCode);
    });

    if (isOpenerKey) {
      this.displayHandler_(evt);
    }
  }

  disableScroll_() {
    this.adapter_.addBodyClass(cssClasses$9.SCROLL_LOCK);
  }

  enableScroll_() {
    this.adapter_.removeBodyClass(cssClasses$9.SCROLL_LOCK);
  }
}

const getEventType = type => type.substr(type.indexOf(":") + 1);

//TODO: complete after created mdc-list and mdc-menu
var Select$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-select",attrs:{"role":"listbox"}},[_c('div',{ref:"surface",staticClass:"mdc-select__surface"},[_c('div',{ref:"label",staticClass:"mdc-select__label"},[_vm._v(_vm._s(_vm.label))]),_c('div',{staticClass:"mdc-select__selected-text"},[_vm._v(_vm._s(_vm.selectedText))]),_c('div',{ref:"bottomLine",staticClass:"mdc-select__bottom-line"})]),_c('mdc-menu',{ref:"menu",staticClass:"mdc-select__menu"},[_vm._t("default")],2)],1)},staticRenderFns: [],
  name: "MdcSelect",
  mixins: [ Ripple() ],
  props: {
    disabled: Boolean,
    value: String,
    label: {
      type: String,
      required: true
    }

    //TODO: multiple: Boolean
  },
  watch: {
    value(value) {
      this.$_setIndexFromValue(value);
    },
    disabled(value) {
      this.foundation.setDisabled(value);
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  data() {
    return { selectedText: "" };
  },
  mounted() {
    const { $el } = this;
    const { surface, label, bottomLine, menu } = this.$refs;

    this.foundation = new MDCSelectFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      addClassToLabel: className => label.classList.add(className),
      removeClassFromLabel: className => label.classList.remove(className),
      addClassToBottomLine: className => bottomLine.classList.add(className),
      removeClassFromBottomLine: className => bottomLine.classList.remove(className),
      addBodyClass: className => document.body.classList.add(className),
      removeBodyClass: className => document.body.classList.remove(className),

      setBottomLineAttr: (attr, value) => bottomLine.setAttribute(attr, value),
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
      getWindowInnerHeight: () => window.innerHeight
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
        label.classList.add(MDCSelectFoundation.cssClasses.LABEL_FLOAT_ABOVE);
      }
    }
  }
};

var SelectItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"mdc-list-item",attrs:{"role":"option","aria-disabled":_vm.disabled && 'true',"tabindex":_vm.disabled ? '-1' : '0',"data-value":_vm.value}},[_vm._v(_vm._s(_vm.label))])},staticRenderFns: [],
  name: "MdcSelectItem",
  props: {
    disabled: Boolean,
    value: String,
    label: {
      type: String,
      required: true
    }
  }
};

function install$16(Vue) {
  Vue.component(Select$1.name, Select$1);
  Vue.component(SelectItem.name, SelectItem);
}

var Select = Object.freeze({
	Select: Select$1,
	SelectItem: SelectItem,
	install: install$16
});

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
const cssClasses$10 = {
  ACTIVE: 'mdc-slider--active',
  DISABLED: 'mdc-slider--disabled',
  DISCRETE: 'mdc-slider--discrete',
  FOCUS: 'mdc-slider--focus',
  IN_TRANSIT: 'mdc-slider--in-transit',
  IS_DISCRETE: 'mdc-slider--discrete',
  HAS_TRACK_MARKER: 'mdc-slider--display-markers',
};

/** @enum {string} */
const strings$11 = {
  TRACK_SELECTOR: '.mdc-slider__track',
  TRACK_MARKER_CONTAINER_SELECTOR: '.mdc-slider__track-marker-container',
  LAST_TRACK_MARKER_SELECTOR: '.mdc-slider__track-marker:last-child',
  THUMB_CONTAINER_SELECTOR: '.mdc-slider__thumb-container',
  PIN_VALUE_MARKER_SELECTOR: '.mdc-slider__pin-value-marker',
  ARIA_VALUEMIN: 'aria-valuemin',
  ARIA_VALUEMAX: 'aria-valuemax',
  ARIA_VALUENOW: 'aria-valuenow',
  ARIA_DISABLED: 'aria-disabled',
  STEP_DATA_ATTR: 'data-step',
  CHANGE_EVENT: 'MDCSlider:change',
  INPUT_EVENT: 'MDCSlider:input',
};

/** @enum {number} */
const numbers$3 = {
  PAGE_FACTOR: 4,
};

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-unused-vars */

/**
 * Adapter for MDC Slider.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the Slider into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 *you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
const KEY_IDS = {
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
};

// Events that can constitute the user releasing drag on a slider
const UP_EVENTS = ['mouseup', 'pointerup', 'touchend'];

/**
 * @extends {MDCFoundation<!MDCSliderAdapter>}
 */
class MDCSliderFoundation extends MDCFoundation {
  /** @return enum {cssClasses} */
  static get cssClasses() {
    return cssClasses$10;
  }

  /** @return enum {strings} */
  static get strings() {
    return strings$11;
  }

  /** @return enum {numbers} */
  static get numbers() {
    return numbers$3;
  }

  /** @return {!MDCSliderAdapter} */
  static get defaultAdapter() {
    return /** @type {!MDCSliderAdapter} */ ({
      hasClass: (/* className: string */) => /* boolean */ false,
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      getAttribute: (/* name: string */) => /* string|null */ null,
      setAttribute: (/* name: string, value: string */) => {},
      removeAttribute: (/* name: string */) => {},
      computeBoundingRect: () => /* ClientRect */ ({
        top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0,
      }),
      getTabIndex: () => /* number */ 0,
      registerInteractionHandler: (/* type: string, handler: EventListener */) => {},
      deregisterInteractionHandler: (/* type: string, handler: EventListener */) => {},
      registerThumbContainerInteractionHandler: (/* type: string, handler: EventListener */) => {},
      deregisterThumbContainerInteractionHandler: (/* type: string, handler: EventListener */) => {},
      registerBodyInteractionHandler: (/* type: string, handler: EventListener */) => {},
      deregisterBodyInteractionHandler: (/* type: string, handler: EventListener */) => {},
      registerResizeHandler: (/* handler: EventListener */) => {},
      deregisterResizeHandler: (/* handler: EventListener */) => {},
      notifyInput: () => {},
      notifyChange: () => {},
      setThumbContainerStyleProperty: (/* propertyName: string, value: string */) => {},
      setTrackStyleProperty: (/* propertyName: string, value: string */) => {},
      setMarkerValue: (/* value: number */) => {},
      appendTrackMarkers: (/* numMarkers: number */) => {},
      removeTrackMarkers: () => {},
      setLastTrackMarkersStyleProperty: (/* propertyName: string, value: string */) => {},
      isRTL: () => /* boolean */ false,
    });
  }

  /**
   * Creates a new instance of MDCSliderFoundation
   * @param {?MDCSliderAdapter} adapter
   */
  constructor(adapter) {
    super(Object.assign(MDCSliderFoundation.defaultAdapter, adapter));
    /** @private {?ClientRect} */
    this.rect_ = null;
    // We set this to NaN since we want it to be a number, but we can't use '0' or '-1'
    // because those could be valid tabindices set by the client code.
    this.savedTabIndex_ = NaN;
    this.active_ = false;
    this.inTransit_ = false;
    this.isDiscrete_ = false;
    this.hasTrackMarker_ = false;
    this.handlingThumbTargetEvt_ = false;
    this.min_ = 0;
    this.max_ = 100;
    this.step_ = 0;
    this.value_ = 0;
    this.disabled_ = false;
    this.preventFocusState_ = false;
    this.updateUIFrame_ = 0;
    this.thumbContainerPointerHandler_ = () => {
      this.handlingThumbTargetEvt_ = true;
    };
    this.mousedownHandler_ = this.createDownHandler_('mousemove');
    this.pointerdownHandler_ = this.createDownHandler_('pointermove');
    this.touchstartHandler_ = this.createDownHandler_(
      'touchmove', ({targetTouches}) => targetTouches[0].pageX);
    this.keydownHandler_ = (evt) => this.handleKeydown_(evt);
    this.focusHandler_ = () => this.handleFocus_();
    this.blurHandler_ = () => this.handleBlur_();
    this.resizeHandler_ = () => this.layout();
  }

  init() {
    this.isDiscrete_ = this.adapter_.hasClass(cssClasses$10.IS_DISCRETE);
    this.hasTrackMarker_ = this.adapter_.hasClass(cssClasses$10.HAS_TRACK_MARKER);
    this.adapter_.registerInteractionHandler('mousedown', this.mousedownHandler_);
    this.adapter_.registerInteractionHandler('pointerdown', this.pointerdownHandler_);
    this.adapter_.registerInteractionHandler('touchstart', this.touchstartHandler_);
    this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
    this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
    this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
    ['mousedown', 'pointerdown', 'touchstart'].forEach((evtName) => {
      this.adapter_.registerThumbContainerInteractionHandler(evtName, this.thumbContainerPointerHandler_);
    });
    this.adapter_.registerResizeHandler(this.resizeHandler_);
    this.layout();
    // At last step, provide a reasonable default value to discrete slider
    if (this.isDiscrete_ && this.getStep() == 0) {
      this.step_ = 1;
    }
  }

  destroy() {
    this.adapter_.deregisterInteractionHandler('mousedown', this.mousedownHandler_);
    this.adapter_.deregisterInteractionHandler('pointerdown', this.pointerdownHandler_);
    this.adapter_.deregisterInteractionHandler('touchstart', this.touchstartHandler_);
    this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
    this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
    this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);
    ['mousedown', 'pointerdown', 'touchstart'].forEach((evtName) => {
      this.adapter_.deregisterThumbContainerInteractionHandler(evtName, this.thumbContainerPointerHandler_);
    });
    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
  }

  setupTrackMarker() {
    if (this.isDiscrete_ && this.hasTrackMarker_&& this.getStep() != 0) {
      const min = this.getMin();
      const max = this.getMax();
      const step = this.getStep();
      let numMarkers = (max - min) / step;

      // In case distance between max & min is indivisible to step,
      // we place the secondary to last marker proportionally at where thumb
      // could reach and place the last marker at max value
      const indivisible = Math.ceil(numMarkers) !== numMarkers;
      if (indivisible) {
        numMarkers = Math.ceil(numMarkers);
      }

      this.adapter_.removeTrackMarkers();
      this.adapter_.appendTrackMarkers(numMarkers);

      if (indivisible) {
        const lastStepRatio = (max - numMarkers * step) / step + 1;
        const flex = getCorrectPropertyName(window, 'flex');
        this.adapter_.setLastTrackMarkersStyleProperty(flex, String(lastStepRatio));
      }
    }
  }

  layout() {
    this.rect_ = this.adapter_.computeBoundingRect();
    this.updateUIForCurrentValue_();
  }

  /** @return {number} */
  getValue() {
    return this.value_;
  }

  /** @param {number} value */
  setValue(value) {
    this.setValue_(value, false);
  }

  /** @return {number} */
  getMax() {
    return this.max_;
  }

  /** @param {number} max */
  setMax(max) {
    if (max < this.min_) {
      throw new Error('Cannot set max to be less than the slider\'s minimum value');
    }
    this.max_ = max;
    this.setValue_(this.value_, false, true);
    this.adapter_.setAttribute(strings$11.ARIA_VALUEMAX, String(this.max_));
    this.setupTrackMarker();
  }

  /** @return {number} */
  getMin() {
    return this.min_;
  }

  /** @param {number} min */
  setMin(min) {
    if (min > this.max_) {
      throw new Error('Cannot set min to be greater than the slider\'s maximum value');
    }
    this.min_ = min;
    this.setValue_(this.value_, false, true);
    this.adapter_.setAttribute(strings$11.ARIA_VALUEMIN, String(this.min_));
    this.setupTrackMarker();
  }

  /** @return {number} */
  getStep() {
    return this.step_;
  }

  /** @param {number} step */
  setStep(step) {
    if (step < 0) {
      throw new Error('Step cannot be set to a negative number');
    }
    if (this.isDiscrete_ && (typeof(step) !== 'number' || step < 1)) {
      step = 1;
    }
    this.step_ = step;
    this.setValue_(this.value_, false, true);
    this.setupTrackMarker();
  }

  /** @return {boolean} */
  isDisabled() {
    return this.disabled_;
  }

  /** @param {boolean} disabled */
  setDisabled(disabled) {
    this.disabled_ = disabled;
    this.toggleClass_(cssClasses$10.DISABLED, this.disabled_);
    if (this.disabled_) {
      this.savedTabIndex_ = this.adapter_.getTabIndex();
      this.adapter_.setAttribute(strings$11.ARIA_DISABLED, 'true');
      this.adapter_.removeAttribute('tabindex');
    } else {
      this.adapter_.removeAttribute(strings$11.ARIA_DISABLED);
      if (!isNaN(this.savedTabIndex_)) {
        this.adapter_.setAttribute('tabindex', String(this.savedTabIndex_));
      }
    }
  }

  /**
   * Creates a handler for mouse/touch/pointer down events
   * @param {string} moveEvt
   * @param {(function(!Event): number)=} getPageX
   * @return {function(!Event): undefined}
   */
  createDownHandler_(moveEvt, getPageX = ({pageX}) => pageX) {
    const moveHandler = (evt) => {
      evt.preventDefault();
      this.setValueFromEvt_(evt, /** @type {function(!Event): number} */ (getPageX));
    };

    // Note: upHandler is [de]registered on ALL potential pointer-related release event types, since some browsers
    // do not always fire these consistently in pairs.
    // (See https://github.com/material-components/material-components-web/issues/1192)
    const upHandler = () => {
      this.setActive_(false);
      this.adapter_.deregisterBodyInteractionHandler(moveEvt, moveHandler);
      UP_EVENTS.forEach((type) => this.adapter_.deregisterBodyInteractionHandler(type, upHandler));
      this.adapter_.notifyChange();
    };

    const downHandler = (evt) => {
      if (this.disabled_) {
        return;
      }

      this.preventFocusState_ = true;
      this.setInTransit_(!this.handlingThumbTargetEvt_);
      this.handlingThumbTargetEvt_ = false;

      this.setActive_(true);

      this.adapter_.registerBodyInteractionHandler(moveEvt, moveHandler);
      UP_EVENTS.forEach((type) => this.adapter_.registerBodyInteractionHandler(type, upHandler));
      this.setValueFromEvt_(evt, /** @type {function(!Event): number} */ (getPageX));
    };

    return downHandler;
  }

  /**
   * Sets the slider value from an event
   * @param {!Event} evt
   * @param {function(!Event): number} getPageX
   */
  setValueFromEvt_(evt, getPageX) {
    const pageX = getPageX(evt);
    const value = this.computeValueFromPageX_(pageX);
    this.setValue_(value, true);
  }

  /**
   * Computes the new value from the pageX position
   * @param {number} pageX
   * @return {number}
   */
  computeValueFromPageX_(pageX) {
    const {max_: max, min_: min} = this;
    const xPos = pageX - this.rect_.left;
    let pctComplete = xPos / this.rect_.width;
    if (this.adapter_.isRTL()) {
      pctComplete = 1 - pctComplete;
    }
    // Fit the percentage complete between the range [min,max]
    // by remapping from [0, 1] to [min, min+(max-min)].
    return min + pctComplete * (max - min);
  }

  /**
   * Handles keydown events
   * @param {!Event} evt
   */
  handleKeydown_(evt) {
    const keyId = this.getKeyId_(evt);
    const value = this.getValueForKeyId_(keyId);
    if (isNaN(value)) {
      return;
    }

    // Prevent page from scrolling due to key presses that would normally scroll the page
    evt.preventDefault();
    this.adapter_.addClass(cssClasses$10.FOCUS);
    this.setValue_(value, true);
    this.adapter_.notifyChange();
  }

  /**
   * Returns the computed name of the event
   * @param {!Event} kbdEvt
   * @return {string}
   */
  getKeyId_(kbdEvt) {
    if (kbdEvt.key === KEY_IDS.ARROW_LEFT || kbdEvt.keyCode === 37) {
      return KEY_IDS.ARROW_LEFT;
    }
    if (kbdEvt.key === KEY_IDS.ARROW_RIGHT || kbdEvt.keyCode === 39) {
      return KEY_IDS.ARROW_RIGHT;
    }
    if (kbdEvt.key === KEY_IDS.ARROW_UP || kbdEvt.keyCode === 38) {
      return KEY_IDS.ARROW_UP;
    }
    if (kbdEvt.key === KEY_IDS.ARROW_DOWN || kbdEvt.keyCode === 40) {
      return KEY_IDS.ARROW_DOWN;
    }
    if (kbdEvt.key === KEY_IDS.HOME || kbdEvt.keyCode === 36) {
      return KEY_IDS.HOME;
    }
    if (kbdEvt.key === KEY_IDS.END || kbdEvt.keyCode === 35) {
      return KEY_IDS.END;
    }
    if (kbdEvt.key === KEY_IDS.PAGE_UP || kbdEvt.keyCode === 33) {
      return KEY_IDS.PAGE_UP;
    }
    if (kbdEvt.key === KEY_IDS.PAGE_DOWN || kbdEvt.keyCode === 34) {
      return KEY_IDS.PAGE_DOWN;
    }

    return '';
  }

  /**
   * Computes the value given a keyboard key ID
   * @param {string} keyId
   * @return {number}
   */
  getValueForKeyId_(keyId) {
    const {max_: max, min_: min, step_: step} = this;
    let delta = step || (max - min) / 100;
    const valueNeedsToBeFlipped = this.adapter_.isRTL() && (
      keyId === KEY_IDS.ARROW_LEFT || keyId === KEY_IDS.ARROW_RIGHT
    );
    if (valueNeedsToBeFlipped) {
      delta = -delta;
    }

    switch (keyId) {
    case KEY_IDS.ARROW_LEFT:
    case KEY_IDS.ARROW_DOWN:
      return this.value_ - delta;
    case KEY_IDS.ARROW_RIGHT:
    case KEY_IDS.ARROW_UP:
      return this.value_ + delta;
    case KEY_IDS.HOME:
      return this.min_;
    case KEY_IDS.END:
      return this.max_;
    case KEY_IDS.PAGE_UP:
      return this.value_ + delta * numbers$3.PAGE_FACTOR;
    case KEY_IDS.PAGE_DOWN:
      return this.value_ - delta * numbers$3.PAGE_FACTOR;
    default:
      return NaN;
    }
  }

  handleFocus_() {
    if (this.preventFocusState_) {
      return;
    }
    this.adapter_.addClass(cssClasses$10.FOCUS);
  }

  handleBlur_() {
    this.preventFocusState_ = false;
    this.adapter_.removeClass(cssClasses$10.FOCUS);
  }

  /**
   * Sets the value of the slider
   * @param {number} value
   * @param {boolean} shouldFireInput
   * @param {boolean=} force
   */
  setValue_(value, shouldFireInput, force = false) {
    if (value === this.value_ && !force) {
      return;
    }

    const {min_: min, max_: max} = this;
    const valueSetToBoundary = value === min || value === max;
    if (this.step_ && !valueSetToBoundary) {
      value = this.quantize_(value);
    }
    if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }
    this.value_ = value;
    this.adapter_.setAttribute(strings$11.ARIA_VALUENOW, String(this.value_));
    this.updateUIForCurrentValue_();

    if (shouldFireInput) {
      this.adapter_.notifyInput();
      if (this.isDiscrete_) {
        this.adapter_.setMarkerValue(value);
      }
    }
  }

  /**
   * Calculates the quantized value
   * @param {number} value
   * @return {number}
   */
  quantize_(value) {
    const numSteps = Math.round(value / this.step_);
    const quantizedVal = numSteps * this.step_;
    return quantizedVal;
  }

  updateUIForCurrentValue_() {
    const {max_: max, min_: min, value_: value} = this;
    const pctComplete = (value - min) / (max - min);
    let translatePx = pctComplete * this.rect_.width;
    if (this.adapter_.isRTL()) {
      translatePx = this.rect_.width - translatePx;
    }

    const transformProp = getCorrectPropertyName(window, 'transform');
    const transitionendEvtName = getCorrectEventName(window, 'transitionend');

    if (this.inTransit_) {
      const onTransitionEnd = () => {
        this.setInTransit_(false);
        this.adapter_.deregisterThumbContainerInteractionHandler(transitionendEvtName, onTransitionEnd);
      };
      this.adapter_.registerThumbContainerInteractionHandler(transitionendEvtName, onTransitionEnd);
    }

    this.updateUIFrame_ = requestAnimationFrame(() => {
      // NOTE(traviskaufman): It would be nice to use calc() here,
      // but IE cannot handle calcs in transforms correctly.
      // See: https://goo.gl/NC2itk
      // Also note that the -50% offset is used to center the slider thumb.
      this.adapter_.setThumbContainerStyleProperty(transformProp, `translateX(${translatePx}px) translateX(-50%)`);
      this.adapter_.setTrackStyleProperty(transformProp, `scaleX(${pctComplete})`);
    });
  }

  /**
   * Toggles the active state of the slider
   * @param {boolean} active
   */
  setActive_(active) {
    this.active_ = active;
    this.toggleClass_(cssClasses$10.ACTIVE, this.active_);
  }

  /**
   * Toggles the inTransit state of the slider
   * @param {boolean} inTransit
   */
  setInTransit_(inTransit) {
    this.inTransit_ = inTransit;
    this.toggleClass_(cssClasses$10.IN_TRANSIT, this.inTransit_);
  }

  /**
   * Conditionally adds or removes a class based on shouldBePresent
   * @param {string} className
   * @param {boolean} shouldBePresent
   */
  toggleClass_(className, shouldBePresent) {
    if (shouldBePresent) {
      this.adapter_.addClass(className);
    } else {
      this.adapter_.removeClass(className);
    }
  }
}

const LAST_MARKER_SELECTOR = ".mdc-slider__track-marker:last-child";
function assertValue(value, fn) {
  if(typeof value === "string") {
    value = parseFloat(value);

    if(isNaN(value)) return;
  }

  fn(value);
}

var Slider$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-slider",class:_vm.cssClasses,attrs:{"role":"slider","aria-label":_vm.label,"tabindex":0}},[_c('div',{staticClass:"mdc-slider__track-container"},[_c('div',{ref:"track",staticClass:"mdc-slider__track"}),(_vm.displayMarkers)?_c('div',{staticClass:"mdc-slider__track-marker-container"},_vm._l((_vm.markers),function(n){return _c('div',{key:n,staticClass:"mdc-slider__track-marker"})})):_vm._e()]),_c('div',{ref:"thumbContainer",staticClass:"mdc-slider__thumb-container"},[(_vm.discrete)?_c('div',{staticClass:"mdc-slider__pin"},[_c('span',{staticClass:"mdc-slider__pin-value-marker"},[_vm._v(_vm._s(_vm.markerValue))])]):_vm._e(),_c('svg',{staticClass:"mdc-slider__thumb",attrs:{"width":"21","height":"21"}},[_c('circle',{attrs:{"cx":"10.5","cy":"10.5","r":"7.875"}})]),_c('div',{staticClass:"mdc-slider__focus-ring"})])])},staticRenderFns: [],
  name: "MdcSlider",
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
    prop: "value",
    event: "change"
  },
  mounted() {
    const { $el } = this;
    const { track, thumbContainer } = this.$refs;
    const styles = getComputedStyle($el);

    this.foundation = new MDCSliderFoundation({
      hasClass: className => $el.classList.contains(className),
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      getAttribute: name => $el.getAttribute(name),
      setAttribute: (name, value) => $el.setAttribute(name, value),
      removeAttribute: name => $el.removeAttribute(name),
      computeBoundingRect: () => $el.getBoundingClientRect(),
      getTabIndex: () => $el.tabIndex,
      registerInteractionHandler: (type, handler) => $el.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => $el.removeEventListener(type, handler),
      registerThumbContainerInteractionHandler: (type, handler) => {
        thumbContainer.addEventListener(type, handler);
      },
      deregisterThumbContainerInteractionHandler: (type, handler) => {
        thumbContainer.removeEventListener(type, handler);
      },
      registerBodyInteractionHandler: (type, handler) => {
        document.body.addEventListener(type, handler);
      },
      deregisterBodyInteractionHandler: (type, handler) => {
        document.body.removeEventListener(type, handler);
      },
      registerResizeHandler: handler => window.addEventListener("resize", handler),
      deregisterResizeHandler: handler => window.removeEventListener("resize", handler),
      notifyInput: () => this.$emit("input", this.foundation.getValue()),
      notifyChange: () => this.$emit("change", this.foundation.getValue()),
      setThumbContainerStyleProperty: (prop, value) => thumbContainer.style.setProperty(prop, value),
      setTrackStyleProperty: (prop, value) => track.style.setProperty(prop, value),
      setMarkerValue: value => this.markerValue = value,
      appendTrackMarkers: numMarkers => this.markers = numMarkers,
      removeTrackMarkers: () => this.markers = 0,
      setLastTrackMarkersStyleProperty: (propertyName, value) => {
        // We remove and append new nodes, thus, the last track marker must be dynamically found.
        const $marker = $el.querySelector(LAST_MARKER_SELECTOR);
        $marker.style.setProperty(propertyName, value);
      },
      isRTL: () => styles.direction === "rtl",
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
  },
  computed: {
    cssClasses() {
      return {
        "mdc-slider--discrete": this.discrete,
        "mdc-slider--display-markers": this.displayMarkers
      };
    },
    discrete() {
      return !!this.step;
    }
  }
};

function install$17(Vue) {
  Vue.component(Slider$1.name, Slider$1);
}

var Slider = Object.freeze({
	Slider: Slider$1,
	install: install$17
});

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const cssClasses$11 = {
  ROOT: 'mdc-snackbar',
  TEXT: 'mdc-snackbar__text',
  ACTION_WRAPPER: 'mdc-snackbar__action-wrapper',
  ACTION_BUTTON: 'mdc-snackbar__action-button',
  ACTIVE: 'mdc-snackbar--active',
  MULTILINE: 'mdc-snackbar--multiline',
  ACTION_ON_BOTTOM: 'mdc-snackbar--action-on-bottom',
};

const strings$12 = {
  TEXT_SELECTOR: '.mdc-snackbar__text',
  ACTION_WRAPPER_SELECTOR: '.mdc-snackbar__action-wrapper',
  ACTION_BUTTON_SELECTOR: '.mdc-snackbar__action-button',
  SHOW_EVENT: 'MDCSnackbar:show',
  HIDE_EVENT: 'MDCSnackbar:hide',
};

const numbers$4 = {
  MESSAGE_TIMEOUT: 2750,
};

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class MDCSnackbarFoundation extends MDCFoundation {
  static get cssClasses() {
    return cssClasses$11;
  }

  static get strings() {
    return strings$12;
  }

  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      setAriaHidden: () => {},
      unsetAriaHidden: () => {},
      setActionAriaHidden: () => {},
      unsetActionAriaHidden: () => {},
      setActionText: (/* actionText: string */) => {},
      setMessageText: (/* message: string */) => {},
      setFocus: () => {},
      visibilityIsHidden: () => /* boolean */ false,
      registerCapturedBlurHandler: (/* handler: EventListener */) => {},
      deregisterCapturedBlurHandler: (/* handler: EventListener */) => {},
      registerVisibilityChangeHandler: (/* handler: EventListener */) => {},
      deregisterVisibilityChangeHandler: (/* handler: EventListener */) => {},
      registerCapturedInteractionHandler: (/* evtType: string, handler: EventListener */) => {},
      deregisterCapturedInteractionHandler: (/* evtType: string, handler: EventListener */) => {},
      registerActionClickHandler: (/* handler: EventListener */) => {},
      deregisterActionClickHandler: (/* handler: EventListener */) => {},
      registerTransitionEndHandler: (/* handler: EventListener */) => {},
      deregisterTransitionEndHandler: (/* handler: EventListener */) => {},
      notifyShow: () => {},
      notifyHide: () => {},
    };
  }

  get active() {
    return this.active_;
  }

  constructor(adapter) {
    super(Object.assign(MDCSnackbarFoundation.defaultAdapter, adapter));

    this.active_ = false;
    this.actionWasClicked_ = false;
    this.dismissOnAction_ = true;
    this.firstFocus_ = true;
    this.pointerDownRecognized_ = false;
    this.snackbarHasFocus_ = false;
    this.snackbarData_ = null;
    this.queue_ = [];
    this.actionClickHandler_ = () => {
      this.actionWasClicked_ = true;
      this.invokeAction_();
    };
    this.visibilitychangeHandler_ = () => {
      clearTimeout(this.timeoutId_);
      this.snackbarHasFocus_ = true;

      if (!this.adapter_.visibilityIsHidden()) {
        setTimeout(this.cleanup_.bind(this), this.snackbarData_.timeout || numbers$4.MESSAGE_TIMEOUT);
      }
    };
    this.interactionHandler_ = (evt) => {
      if (evt.type == 'touchstart' || evt.type == 'mousedown') {
        this.pointerDownRecognized_ = true;
      }
      this.handlePossibleTabKeyboardFocus_(evt);

      if (evt.type == 'focus') {
        this.pointerDownRecognized_ = false;
      }
    };
    this.blurHandler_ = () => {
      clearTimeout(this.timeoutId_);
      this.snackbarHasFocus_ = false;
      this.timeoutId_ = setTimeout(this.cleanup_.bind(this), this.snackbarData_.timeout || numbers$4.MESSAGE_TIMEOUT);
    };
  }

  init() {
    this.adapter_.registerActionClickHandler(this.actionClickHandler_);
    this.adapter_.setAriaHidden();
    this.adapter_.setActionAriaHidden();
  }

  destroy() {
    this.adapter_.deregisterActionClickHandler(this.actionClickHandler_);
    this.adapter_.deregisterCapturedBlurHandler(this.blurHandler_);
    this.adapter_.deregisterVisibilityChangeHandler(this.visibilitychangeHandler_);
    ['touchstart', 'mousedown', 'focus'].forEach((evtType) => {
      this.adapter_.deregisterCapturedInteractionHandler(evtType, this.interactionHandler_);
    });
  }

  dismissesOnAction() {
    return this.dismissOnAction_;
  }

  setDismissOnAction(dismissOnAction) {
    this.dismissOnAction_ = !!dismissOnAction;
  }

  show(data) {
    if (!data) {
      throw new Error(
        'Please provide a data object with at least a message to display.');
    }
    if (!data.message) {
      throw new Error('Please provide a message to be displayed.');
    }
    if (data.actionHandler && !data.actionText) {
      throw new Error('Please provide action text with the handler.');
    }
    if (this.active) {
      this.queue_.push(data);
      return;
    }
    clearTimeout(this.timeoutId_);
    this.snackbarData_ = data;
    this.firstFocus_ = true;
    this.adapter_.registerVisibilityChangeHandler(this.visibilitychangeHandler_);
    this.adapter_.registerCapturedBlurHandler(this.blurHandler_);
    ['touchstart', 'mousedown', 'focus'].forEach((evtType) => {
      this.adapter_.registerCapturedInteractionHandler(evtType, this.interactionHandler_);
    });

    const {ACTIVE, MULTILINE, ACTION_ON_BOTTOM} = cssClasses$11;

    this.adapter_.setMessageText(this.snackbarData_.message);

    if (this.snackbarData_.multiline) {
      this.adapter_.addClass(MULTILINE);
      if (this.snackbarData_.actionOnBottom) {
        this.adapter_.addClass(ACTION_ON_BOTTOM);
      }
    }

    if (this.snackbarData_.actionHandler) {
      this.adapter_.setActionText(this.snackbarData_.actionText);
      this.actionHandler_ = this.snackbarData_.actionHandler;
      this.setActionHidden_(false);
    } else {
      this.setActionHidden_(true);
      this.actionHandler_ = null;
      this.adapter_.setActionText(null);
    }

    this.active_ = true;
    this.adapter_.addClass(ACTIVE);
    this.adapter_.unsetAriaHidden();
    this.adapter_.notifyShow();

    this.timeoutId_ = setTimeout(this.cleanup_.bind(this), this.snackbarData_.timeout || numbers$4.MESSAGE_TIMEOUT);
  }

  handlePossibleTabKeyboardFocus_() {
    const hijackFocus =
      this.firstFocus_ && !this.pointerDownRecognized_;

    if (hijackFocus) {
      this.setFocusOnAction_();
    }

    this.firstFocus_ = false;
  }

  setFocusOnAction_() {
    this.adapter_.setFocus();
    this.snackbarHasFocus_ = true;
    this.firstFocus_ = false;
  }

  invokeAction_() {
    try {
      if (!this.actionHandler_) {
        return;
      }

      this.actionHandler_();
    } finally {
      if (this.dismissOnAction_) {
        this.cleanup_();
      }
    }
  }

  cleanup_() {
    const allowDismissal = !this.snackbarHasFocus_ || this.actionWasClicked_;

    if (allowDismissal) {
      const {ACTIVE, MULTILINE, ACTION_ON_BOTTOM} = cssClasses$11;

      this.adapter_.removeClass(ACTIVE);

      const handler = () => {
        clearTimeout(this.timeoutId_);
        this.adapter_.deregisterTransitionEndHandler(handler);
        this.adapter_.removeClass(MULTILINE);
        this.adapter_.removeClass(ACTION_ON_BOTTOM);
        this.setActionHidden_(true);
        this.adapter_.setAriaHidden();
        this.active_ = false;
        this.snackbarHasFocus_ = false;
        this.adapter_.notifyHide();
        this.showNext_();
      };

      this.adapter_.registerTransitionEndHandler(handler);
    }
  }

  showNext_() {
    if (!this.queue_.length) {
      return;
    }
    this.show(this.queue_.shift());
  }

  setActionHidden_(isHidden) {
    if (isHidden) {
      this.adapter_.setActionAriaHidden();
    } else {
      this.adapter_.unsetActionAriaHidden();
    }
  }
}

const transitionend = getCorrectEventName(window, "transitionend");
var Snackbar$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-snackbar",class:_vm.cssClasses,attrs:{"aria-live":"assertive","aria-atomic":"true","aria-hidden":_vm.hidden && 'true'}},[_c('div',{staticClass:"mdc-snackbar__text"},[_vm._v(_vm._s(_vm.messageText))]),_c('div',{staticClass:"mdc-snackbar__action__wrapper"},[_c('button',{ref:"actionButton",staticClass:"mdc-snackbar__action-button",attrs:{"type":"button","aria-hidden":_vm.actionHidden && 'true'}},[_vm._v(_vm._s(_vm.actionText))])])])},staticRenderFns: [],
  name: "MdcSnackbar",
  props: {
    alignStart: Boolean,
    dismissesOnAction: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    dismissesOnAction(value) {
      this.foundation.setDismissOnAction(value);
    }
  },
  data() {
    return { messageText: null, actionText: null, hidden: true, actionHidden: true };
  },
  mounted() {
    const { $el } = this;
    const { actionButton } = this.$refs;

    this.foundation = new MDCSnackbarFoundation({
      addClass: className => {
        $el.classList.add(className);
      },
      removeClass: className => {
        $el.classList.remove(className);
      },
      setAriaHidden: () => {
        this.hidden = true;
      },
      unsetAriaHidden: () => {
        this.hidden = false;
      },
      setActionAriaHidden: () => {
        this.actionHidden = true;
      },
      unsetActionAriaHidden: () => {
        this.actionHidden = false;
      },
      setActionText: text => {
        this.actionText = text;
      },
      setMessageText: text => {
        this.messageText = text;
      },
      setFocus: () => actionButton.focus(),
      visibilityIsHidden: () => document.hidden,
      // Interactions
      registerCapturedBlurHandler: handler => actionButton.addEventListener("blur", handler, true),
      deregisterCapturedBlurHandler: handler => actionButton.removeEventListener("blur", handler, true),
      registerVisibilityChangeHandler: handler => document.addEventListener("visibilitychange", handler),
      deregisterVisibilityChangeHandler: handler => document.removeEventListener("visibilitychange", handler),
      registerCapturedInteractionHandler: (evt, handler) => document.body.addEventListener(evt, handler, true),
      deregisterCapturedInteractionHandler: (evt, handler) => document.body.removeEventListener(evt, handler, true),
      registerActionClickHandler: handler => actionButton.addEventListener("click", handler),
      deregisterActionClickHandler: handler => actionButton.removeEventListener("click", handler),
      registerTransitionEndHandler: handler => $el.addEventListener(transitionend, handler),
      deregisterTransitionEndHandler: handler => $el.removeEventListener(transitionend, handler),
      // Events
      notifyShow: () => this.$emit("show"),
      notifyHide: () => this.$emit("hide"),
    });
    this.foundation.init();

    this.foundation.setDismissOnAction(this.dismissesOnAction);
  },
  beforeDestroy() {
    this.foundation.destroy();
  },
  computed: {
    cssClasses() {
      return {
        "mdc-snackbar--align-start": this.alignStart
      };
    }
  },
  methods: {
    show(data) {
      this.foundation.show(data);
    }
  }
};

function install$18(Vue) {
  Vue.component(Snackbar$1.name, Snackbar$1);
}

var Snackbar = Object.freeze({
	Snackbar: Snackbar$1,
	install: install$18
});

var Switch$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-switch",class:_vm.cssClasses},[_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],staticClass:"mdc-switch__native-control",attrs:{"type":"checkbox","disabled":_vm.disabled},domProps:{"checked":Array.isArray(_vm.model)?_vm._i(_vm.model,null)>-1:(_vm.model)},on:{"change":function($event){var $$a=_vm.model,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.model=$$a.concat([$$v]));}else{$$i>-1&&(_vm.model=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.model=$$c;}}}},'input',_vm.$attrs,false)),_vm._m(0,false,false)])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-switch__background"},[_c('div',{staticClass:"mdc-switch__knob"})])}],
  name: "MdcSwitch",
  inheritAttrs: false,
  props: {
    disabled: Boolean,
    checked: [Boolean, Array]
  },
  model: {
    prop: "checked",
    event: "change"
  },
  computed: {
    model: {
      get() {
        return this.checked;
      },
      set(value) {
        this.$emit("change", value);
      }
    },
    cssClasses() {
      return {
        "mdc-switch--disabled": this.disabled
      };
    }
  }
};

function install$19(Vue) {
  Vue.component(Switch$1.name, Switch$1);
}

var Switch = Object.freeze({
	Switch: Switch$1,
	install: install$19
});

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC TextField Bottom Line.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the TextField bottom line into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
const strings$13 = {
  ANIMATION_END_EVENT: 'MDCTextFieldBottomLine:animation-end',
};

/** @enum {string} */
const cssClasses$12 = {
  BOTTOM_LINE_ACTIVE: 'mdc-text-field__bottom-line--active',
};

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @extends {MDCFoundation<!MDCTextFieldBottomLineAdapter>}
 * @final
 */
class MDCTextFieldBottomLineFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get cssClasses() {
    return cssClasses$12;
  }

  /** @return enum {string} */
  static get strings() {
    return strings$13;
  }

  /**
   * {@see MDCTextFieldBottomLineAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCTextFieldBottomLineAdapter}
   */
  static get defaultAdapter() {
    return /** @type {!MDCTextFieldBottomLineAdapter} */ ({
      addClass: () => {},
      removeClass: () => {},
      setAttr: () => {},
      registerEventHandler: () => {},
      deregisterEventHandler: () => {},
      notifyAnimationEnd: () => {},
    });
  }

  /**
   * @param {!MDCTextFieldBottomLineAdapter=} adapter
   */
  constructor(adapter = /** @type {!MDCTextFieldBottomLineAdapter} */ ({})) {
    super(Object.assign(MDCTextFieldBottomLineFoundation.defaultAdapter, adapter));

    /** @private {function(!Event): undefined} */
    this.transitionEndHandler_ = (evt) => this.handleTransitionEnd(evt);
  }

  init() {
    this.adapter_.registerEventHandler('transitionend', this.transitionEndHandler_);
  }

  destroy() {
    this.adapter_.deregisterEventHandler('transitionend', this.transitionEndHandler_);
  }

  /**
   * Activates the bottom line
   */
  activate() {
    this.adapter_.addClass(cssClasses$12.BOTTOM_LINE_ACTIVE);
  }

  /**
   * Sets the transform origin given a user's click location.
   * @param {!Event} evt
   */
  setTransformOrigin(evt) {
    const targetClientRect = evt.target.getBoundingClientRect();
    const evtCoords = {x: evt.clientX, y: evt.clientY};
    const normalizedX = evtCoords.x - targetClientRect.left;
    const attributeString =
      `transform-origin: ${normalizedX}px center`;

    this.adapter_.setAttr('style', attributeString);
  }

  /**
   * Deactivates the bottom line
   */
  deactivate() {
    this.adapter_.removeClass(cssClasses$12.BOTTOM_LINE_ACTIVE);
  }

  /**
   * Handles a transition end event
   * @param {!Event} evt
   */
  handleTransitionEnd(evt) {
    // Wait for the bottom line to be either transparent or opaque
    // before emitting the animation end event
    if (evt.propertyName === 'opacity') {
      this.adapter_.notifyAnimationEnd();
    }
  }
}

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Text Field Helper Text.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the TextField helper text into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
const strings$14 = {
  ARIA_HIDDEN: 'aria-hidden',
  ROLE: 'role',
};

/** @enum {string} */
const cssClasses$13 = {
  HELPER_TEXT_PERSISTENT: 'mdc-text-field-helper-text--persistent',
  HELPER_TEXT_VALIDATION_MSG: 'mdc-text-field-helper-text--validation-msg',
};

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @extends {MDCFoundation<!MDCTextFieldHelperTextAdapter>}
 * @final
 */
class MDCTextFieldHelperTextFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get cssClasses() {
    return cssClasses$13;
  }

  /** @return enum {string} */
  static get strings() {
    return strings$14;
  }

  /**
   * {@see MDCTextFieldHelperTextAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCTextFieldHelperTextAdapter}
   */
  static get defaultAdapter() {
    return /** @type {!MDCTextFieldHelperTextAdapter} */ ({
      addClass: () => {},
      removeClass: () => {},
      hasClass: () => {},
      setAttr: () => {},
      removeAttr: () => {},
      setContent: () => {},
    });
  }

  /**
   * @param {!MDCTextFieldHelperTextAdapter=} adapter
   */
  constructor(adapter = /** @type {!MDCTextFieldHelperTextAdapter} */ ({})) {
    super(Object.assign(MDCTextFieldHelperTextFoundation.defaultAdapter, adapter));
  }

  /**
   * Sets the content of the helper text field.
   * @param {string} content
   */
  setContent(content) {
    this.adapter_.setContent(content);
  }

  /** Makes the helper text visible to the screen reader. */
  showToScreenReader() {
    this.adapter_.removeAttr(strings$14.ARIA_HIDDEN);
  }

  /**
   * Sets the validity of the helper text based on the input validity.
   * @param {boolean} inputIsValid
   */
  setValidity(inputIsValid) {
    const helperTextIsPersistent = this.adapter_.hasClass(cssClasses$13.HELPER_TEXT_PERSISTENT);
    const helperTextIsValidationMsg = this.adapter_.hasClass(cssClasses$13.HELPER_TEXT_VALIDATION_MSG);
    const validationMsgNeedsDisplay = helperTextIsValidationMsg && !inputIsValid;

    if (validationMsgNeedsDisplay) {
      this.adapter_.setAttr(strings$14.ROLE, 'alert');
    } else {
      this.adapter_.removeAttr(strings$14.ROLE);
    }

    if (!helperTextIsPersistent && !validationMsgNeedsDisplay) {
      this.hide_();
    }
  }

  /**
   * Hides the help text from screen readers.
   * @private
   */
  hide_() {
    this.adapter_.setAttr(strings$14.ARIA_HIDDEN, 'true');
  }
}

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Text Field Icon.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the text field icon into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
const strings$15 = {
  ICON_EVENT: 'MDCTextField:icon',
};

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @extends {MDCFoundation<!MDCTextFieldIconAdapter>}
 * @final
 */
class MDCTextFieldIconFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get strings() {
    return strings$15;
  }

  /**
   * {@see MDCTextFieldIconAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCTextFieldIconAdapter}
   */
  static get defaultAdapter() {
    return /** @type {!MDCTextFieldIconAdapter} */ ({
      setAttr: () => {},
      registerInteractionHandler: () => {},
      deregisterInteractionHandler: () => {},
      notifyIconAction: () => {},
    });
  }

  /**
   * @param {!MDCTextFieldIconAdapter=} adapter
   */
  constructor(adapter = /** @type {!MDCTextFieldIconAdapter} */ ({})) {
    super(Object.assign(MDCTextFieldIconFoundation.defaultAdapter, adapter));

    /** @private {function(!Event): undefined} */
    this.interactionHandler_ = (evt) => this.handleInteraction(evt);
  }

  init() {
    ['click', 'keydown'].forEach((evtType) => {
      this.adapter_.registerInteractionHandler(evtType, this.interactionHandler_);
    });
  }

  destroy() {
    ['click', 'keydown'].forEach((evtType) => {
      this.adapter_.deregisterInteractionHandler(evtType, this.interactionHandler_);
    });
  }

  /**
   * Sets the content of the helper text field.
   * @param {boolean} disabled
   */
  setDisabled(disabled) {
    if (disabled) {
      this.adapter_.setAttr('tabindex', '-1');
    } else {
      this.adapter_.setAttr('tabindex', '0');
    }
  }

  /**
   * Handles an interaction event
   * @param {!Event} evt
   */
  handleInteraction(evt) {
    if (evt.type === 'click' || evt.key === 'Enter' || evt.keyCode === 13) {
      this.adapter_.notifyIconAction();
    }
  }
}

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Text Field Label.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the Text Field label into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
const cssClasses$14 = {
  LABEL_FLOAT_ABOVE: 'mdc-text-field__label--float-above',
  LABEL_SHAKE: 'mdc-text-field__label--shake',
};

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @extends {MDCFoundation<!MDCTextFieldLabelAdapter>}
 * @final
 */
class MDCTextFieldLabelFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get cssClasses() {
    return cssClasses$14;
  }

  /**
   * {@see MDCTextFieldLabelAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCTextFieldLabelAdapter}
   */
  static get defaultAdapter() {
    return /** @type {!MDCTextFieldLabelAdapter} */ ({
      addClass: () => {},
      removeClass: () => {},
      getWidth: () => {},
    });
  }

  /**
   * @param {!MDCTextFieldLabelAdapter=} adapter
   */
  constructor(adapter = /** @type {!MDCTextFieldLabelAdapter} */ ({})) {
    super(Object.assign(MDCTextFieldLabelFoundation.defaultAdapter, adapter));
  }

  /**
   * Returns the width of the label element.
   * @return {number}
   */
  getWidth() {
    return this.adapter_.getWidth();
  }

  /**
   * Styles the label to produce the label shake for errors.
   * @param {boolean} isValid Whether the input's value is valid (passes all
   *     validity checks).
   * @param {boolean} isFocused Whether the input is focused.
   */
  styleShake(isValid, isFocused) {
    const {LABEL_SHAKE} = MDCTextFieldLabelFoundation.cssClasses;
    if (isValid || isFocused) {
      this.adapter_.removeClass(LABEL_SHAKE);
    } else {
      this.adapter_.addClass(LABEL_SHAKE);
    }
  }

  /**
   * Styles the label to float or defloat as necessary.
   * @param {string} value The value of the input.
   * @param {boolean} isFocused Whether the input is focused.
   * @param {boolean} isBadInput The input's `validity.badInput` value.
   */
  styleFloat(value, isFocused, isBadInput) {
    const {LABEL_FLOAT_ABOVE} = MDCTextFieldLabelFoundation.cssClasses;
    if (!!value || isFocused) {
      this.adapter_.addClass(LABEL_FLOAT_ABOVE);
    } else if (!isBadInput) {
      this.adapter_.removeClass(LABEL_FLOAT_ABOVE);
    }
  }
}

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-unused-vars */

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Text Field Outline.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the Text Field outline into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
const strings$16 = {
  PATH_SELECTOR: '.mdc-text-field__outline-path',
};

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @extends {MDCFoundation<!MDCTextFieldOutlineAdapter>}
 * @final
 */
class MDCTextFieldOutlineFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get strings() {
    return strings$16;
  }

  /**
   * {@see MDCTextFieldOutlineAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCTextFieldOutlineAdapter}
   */
  static get defaultAdapter() {
    return /** @type {!MDCTextFieldOutlineAdapter} */ ({
      getWidth: () => {},
      getHeight: () => {},
      setOutlinePathAttr: () => {},
    });
  }

  /**
   * @param {!MDCTextFieldOutlineAdapter=} adapter
   */
  constructor(adapter = /** @type {!MDCTextFieldOutlineAdapter} */ ({})) {
    super(Object.assign(MDCTextFieldOutlineFoundation.defaultAdapter, adapter));
  }

  /**
   * Updates the SVG path of the focus outline element based on the given width of the
   * label element, the corner radius, and the RTL context.
   * @param {number} labelWidth
   * @param {number} radius
   * @param {boolean=} isRtl
   */
  updateSvgPath(labelWidth, radius, isRtl = false) {
    const width = this.adapter_.getWidth();
    const height = this.adapter_.getHeight();
    const cornerWidth = radius + 1.2;
    const leadingStrokeLength = Math.abs(11 - cornerWidth);
    const paddedLabelWidth = labelWidth + 8;

    // The right, bottom, and left sides of the outline follow the same SVG path.
    const pathMiddle = 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + radius
      + 'v' + (height - (2 * cornerWidth))
      + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + radius
      + 'h' + (-width + (2 * cornerWidth))
      + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + -radius
      + 'v' + (-height + (2 * cornerWidth))
      + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius;

    let path;
    if (!isRtl) {
      path = 'M' + (cornerWidth + leadingStrokeLength + paddedLabelWidth) + ',' + 1
        + 'h' + (width - (2 * cornerWidth) - paddedLabelWidth - leadingStrokeLength)
        + pathMiddle
        + 'h' + leadingStrokeLength;
    } else {
      path = 'M' + (width - cornerWidth - leadingStrokeLength) + ',' + 1
        + 'h' + leadingStrokeLength
        + pathMiddle
        + 'h' + (width - (2 * cornerWidth) - paddedLabelWidth - leadingStrokeLength);
    }

    this.adapter_.setOutlinePathAttr(path);
  }
}

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
const strings$17 = {
  ARIA_CONTROLS: 'aria-controls',
  INPUT_SELECTOR: '.mdc-text-field__input',
  LABEL_SELECTOR: '.mdc-text-field__label',
  ICON_SELECTOR: '.mdc-text-field__icon',
  IDLE_OUTLINE_SELECTOR: '.mdc-text-field__idle-outline',
  OUTLINE_SELECTOR: '.mdc-text-field__outline',
  BOTTOM_LINE_SELECTOR: '.mdc-text-field__bottom-line',
};

/** @enum {string} */
const cssClasses$15 = {
  ROOT: 'mdc-text-field',
  UPGRADED: 'mdc-text-field--upgraded',
  DISABLED: 'mdc-text-field--disabled',
  DENSE: 'mdc-text-field--dense',
  FOCUSED: 'mdc-text-field--focused',
  INVALID: 'mdc-text-field--invalid',
  BOX: 'mdc-text-field--box',
  OUTLINED: 'mdc-text-field--outlined',
};

/** @enum {number} */
const numbers$5 = {
  LABEL_SCALE: 0.75,
  DENSE_LABEL_SCALE: 0.923,
};

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
/**
 * @extends {MDCFoundation<!MDCTextFieldAdapter>}
 * @final
 */
class MDCTextFieldFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get cssClasses() {
    return cssClasses$15;
  }

  /** @return enum {string} */
  static get strings() {
    return strings$17;
  }

  /** @return enum {string} */
  static get numbers() {
    return numbers$5;
  }

  /**
   * {@see MDCTextFieldAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCTextFieldAdapter}
   */
  static get defaultAdapter() {
    return /** @type {!MDCTextFieldAdapter} */ ({
      addClass: () => {},
      removeClass: () => {},
      hasClass: () => {},
      registerTextFieldInteractionHandler: () => {},
      deregisterTextFieldInteractionHandler: () => {},
      registerInputInteractionHandler: () => {},
      deregisterInputInteractionHandler: () => {},
      registerBottomLineEventHandler: () => {},
      deregisterBottomLineEventHandler: () => {},
      getNativeInput: () => {},
      getIdleOutlineStyleValue: () => {},
      isFocused: () => {},
      isRtl: () => {},
    });
  }

  /**
   * @param {!MDCTextFieldAdapter=} adapter
   * @param {!FoundationMapType=} foundationMap Map from subcomponent names to their subfoundations.
   */
  constructor(adapter = /** @type {!MDCTextFieldAdapter} */ ({}),
    foundationMap = /** @type {!FoundationMapType} */ ({})) {
    super(Object.assign(MDCTextFieldFoundation.defaultAdapter, adapter));

    /** @type {!MDCTextFieldBottomLineFoundation|undefined} */
    this.bottomLine_ = foundationMap.bottomLine;
    /** @type {!MDCTextFieldHelperTextFoundation|undefined} */
    this.helperText_ = foundationMap.helperText;
    /** @type {!MDCTextFieldIconFoundation|undefined} */
    this.icon_ = foundationMap.icon;
    /** @type {!MDCTextFieldLabelFoundation|undefined} */
    this.label_ = foundationMap.label;
    /** @type {!MDCTextFieldOutlineFoundation|undefined} */
    this.outline_ = foundationMap.outline;

    /** @private {boolean} */
    this.isFocused_ = false;
    /** @private {boolean} */
    this.receivedUserInput_ = false;
    /** @private {boolean} */
    this.useCustomValidityChecking_ = false;
    /** @private {boolean} */
    this.isValid_ = true;
    /** @private {function(): undefined} */
    this.inputFocusHandler_ = () => this.activateFocus();
    /** @private {function(): undefined} */
    this.inputBlurHandler_ = () => this.deactivateFocus();
    /** @private {function(): undefined} */
    this.inputInputHandler_ = () => this.autoCompleteFocus();
    /** @private {function(!Event): undefined} */
    this.setPointerXOffset_ = (evt) => this.setBottomLineTransformOrigin(evt);
    /** @private {function(!Event): undefined} */
    this.textFieldInteractionHandler_ = () => this.handleTextFieldInteraction();
    /** @private {function(!Event): undefined} */
    this.bottomLineAnimationEndHandler_ = () => this.handleBottomLineAnimationEnd();
  }

  init() {
    this.adapter_.addClass(MDCTextFieldFoundation.cssClasses.UPGRADED);
    // Ensure label does not collide with any pre-filled value.
    if (this.label_ && this.getValue()) {
      this.label_.styleFloat(
        this.getValue(), this.isFocused_, this.isBadInput_());
    }

    if (this.adapter_.isFocused()) {
      this.inputFocusHandler_();
    }

    this.adapter_.registerInputInteractionHandler('focus', this.inputFocusHandler_);
    this.adapter_.registerInputInteractionHandler('blur', this.inputBlurHandler_);
    this.adapter_.registerInputInteractionHandler('input', this.inputInputHandler_);
    ['mousedown', 'touchstart'].forEach((evtType) => {
      this.adapter_.registerInputInteractionHandler(evtType, this.setPointerXOffset_);
    });
    ['click', 'keydown'].forEach((evtType) => {
      this.adapter_.registerTextFieldInteractionHandler(evtType, this.textFieldInteractionHandler_);
    });
    this.adapter_.registerBottomLineEventHandler(
      MDCTextFieldBottomLineFoundation.strings.ANIMATION_END_EVENT, this.bottomLineAnimationEndHandler_);
  }

  destroy() {
    this.adapter_.removeClass(MDCTextFieldFoundation.cssClasses.UPGRADED);
    this.adapter_.deregisterInputInteractionHandler('focus', this.inputFocusHandler_);
    this.adapter_.deregisterInputInteractionHandler('blur', this.inputBlurHandler_);
    this.adapter_.deregisterInputInteractionHandler('input', this.inputInputHandler_);
    ['mousedown', 'touchstart'].forEach((evtType) => {
      this.adapter_.deregisterInputInteractionHandler(evtType, this.setPointerXOffset_);
    });
    ['click', 'keydown'].forEach((evtType) => {
      this.adapter_.deregisterTextFieldInteractionHandler(evtType, this.textFieldInteractionHandler_);
    });
    this.adapter_.deregisterBottomLineEventHandler(
      MDCTextFieldBottomLineFoundation.strings.ANIMATION_END_EVENT, this.bottomLineAnimationEndHandler_);
  }

  /**
   * Handles user interactions with the Text Field.
   */
  handleTextFieldInteraction() {
    if (this.adapter_.getNativeInput().disabled) {
      return;
    }
    this.receivedUserInput_ = true;
  }

  /**
   * Updates the focus outline for outlined text fields.
   */
  updateOutline() {
    if (!this.outline_ || !this.label_) {
      return;
    }

    const isDense = this.adapter_.hasClass(cssClasses$15.DENSE);
    const labelScale = isDense ? numbers$5.DENSE_LABEL_SCALE : numbers$5.LABEL_SCALE;
    const labelWidth = this.label_.getWidth() * labelScale;
    // Fall back to reading a specific corner's style because Firefox doesn't report the style on border-radius.
    const radiusStyleValue = this.adapter_.getIdleOutlineStyleValue('border-radius') ||
      this.adapter_.getIdleOutlineStyleValue('border-top-left-radius');
    const radius = parseFloat(radiusStyleValue);
    const isRtl = this.adapter_.isRtl();
    this.outline_.updateSvgPath(labelWidth, radius, isRtl);
  }

  /**
   * Activates the text field focus state.
   */
  activateFocus() {
    this.isFocused_ = true;
    this.styleFocused_(this.isFocused_);
    if (this.bottomLine_) {
      this.bottomLine_.activate();
    }
    if (this.outline_) {
      this.updateOutline();
    }
    if (this.label_) {
      this.label_.styleShake(this.isValid(), this.isFocused_);
      this.label_.styleFloat(
        this.getValue(), this.isFocused_, this.isBadInput_());
    }
    if (this.helperText_) {
      this.helperText_.showToScreenReader();
    }
  }

  /**
   * Sets the bottom line's transform origin, so that the bottom line activate
   * animation will animate out from the user's click location.
   * @param {!Event} evt
   */
  setBottomLineTransformOrigin(evt) {
    if (this.bottomLine_) {
      this.bottomLine_.setTransformOrigin(evt);
    }
  }

  /**
   * Activates the Text Field's focus state in cases when the input value
   * changes without user input (e.g. programatically).
   */
  autoCompleteFocus() {
    if (!this.receivedUserInput_) {
      this.activateFocus();
    }
  }

  /**
   * Handles when bottom line animation ends, performing actions that must wait
   * for animations to finish.
   */
  handleBottomLineAnimationEnd() {
    // We need to wait for the bottom line to be entirely transparent
    // before removing the class. If we do not, we see the line start to
    // scale down before disappearing
    if (!this.isFocused_ && this.bottomLine_) {
      this.bottomLine_.deactivate();
    }
  }

  /**
   * Deactivates the Text Field's focus state.
   */
  deactivateFocus() {
    this.isFocused_ = false;
    const input = this.getNativeInput_();
    const shouldRemoveLabelFloat = !input.value && !this.isBadInput_();
    const isValid = this.isValid();
    this.styleValidity_(isValid);
    this.styleFocused_(this.isFocused_);
    if (this.label_) {
      this.label_.styleShake(this.isValid(), this.isFocused_);
      this.label_.styleFloat(
        this.getValue(), this.isFocused_, this.isBadInput_());
    }
    if (shouldRemoveLabelFloat) {
      this.receivedUserInput_ = false;
    }
  }

  /**
   * @return {string} The value of the input Element.
   */
  getValue() {
    return this.getNativeInput_().value;
  }

  /**
   * @param {string} value The value to set on the input Element.
   */
  setValue(value) {
    this.getNativeInput_().value = value;
    const isValid = this.isValid();
    this.styleValidity_(isValid);
    if (this.label_) {
      this.label_.styleShake(isValid, this.isFocused_);
      this.label_.styleFloat(
        this.getValue(), this.isFocused_, this.isBadInput_());
    }
  }

  /**
   * @return {boolean} If a custom validity is set, returns that value.
   *     Otherwise, returns the result of native validity checks.
   */
  isValid() {
    return this.useCustomValidityChecking_
      ? this.isValid_ : this.isNativeInputValid_();
  }

  /**
   * @param {boolean} isValid Sets the validity state of the Text Field.
   */
  setValid(isValid) {
    this.useCustomValidityChecking_ = true;
    this.isValid_ = isValid;
    // Retrieve from the getter to ensure correct logic is applied.
    isValid = this.isValid();
    this.styleValidity_(isValid);
    if (this.label_) {
      this.label_.styleShake(isValid, this.isFocused_);
    }
  }

  /**
   * @return {boolean} True if the Text Field is disabled.
   */
  isDisabled() {
    return this.getNativeInput_().disabled;
  }

  /**
   * @param {boolean} disabled Sets the text-field disabled or enabled.
   */
  setDisabled(disabled) {
    this.getNativeInput_().disabled = disabled;
    this.styleDisabled_(disabled);
  }

  /**
   * @return {boolean} True if the Text Field is required.
   */
  isRequired() {
    return this.getNativeInput_().required;
  }

  /**
   * @param {boolean} isRequired Sets the text-field required or not.
   */
  setRequired(isRequired) {
    this.getNativeInput_().required = isRequired;
    // Addition of the asterisk is automatic based on CSS, but validity checking
    // needs to be manually run.
    this.styleValidity_(this.isValid());
  }

  /**
   * @param {string} content Sets the content of the helper text.
   */
  setHelperTextContent(content) {
    if (this.helperText_) {
      this.helperText_.setContent(content);
    }
  }

  /**
   * @return {boolean} True if the Text Field input fails in converting the
   *     user-supplied value.
   * @private
   */
  isBadInput_() {
    return this.getNativeInput_().validity.badInput;
  }

  /**
   * @return {boolean} The result of native validity checking
   *     (ValidityState.valid).
   */
  isNativeInputValid_() {
    return this.getNativeInput_().validity.valid;
  }

  /**
   * Styles the component based on the validity state.
   * @param {boolean} isValid
   * @private
   */
  styleValidity_(isValid) {
    const {INVALID} = MDCTextFieldFoundation.cssClasses;
    if (isValid) {
      this.adapter_.removeClass(INVALID);
    } else {
      this.adapter_.addClass(INVALID);
    }
    if (this.helperText_) {
      this.helperText_.setValidity(isValid);
    }
  }

  /**
   * Styles the component based on the focused state.
   * @param {boolean} isFocused
   * @private
   */
  styleFocused_(isFocused) {
    const {FOCUSED} = MDCTextFieldFoundation.cssClasses;
    if (isFocused) {
      this.adapter_.addClass(FOCUSED);
    } else {
      this.adapter_.removeClass(FOCUSED);
    }
  }

  /**
   * Styles the component based on the disabled state.
   * @param {boolean} isDisabled
   * @private
   */
  styleDisabled_(isDisabled) {
    const {DISABLED, INVALID} = MDCTextFieldFoundation.cssClasses;
    if (isDisabled) {
      this.adapter_.addClass(DISABLED);
      this.adapter_.removeClass(INVALID);
    } else {
      this.adapter_.removeClass(DISABLED);
    }
    if (this.icon_) {
      this.icon_.setDisabled(isDisabled);
    }
  }

  /**
   * @return {!Element|!NativeInputType} The native text input from the
   * host environment, or a dummy if none exists.
   * @private
   */
  getNativeInput_() {
    return this.adapter_.getNativeInput() ||
    /** @type {!NativeInputType} */ ({
      value: '',
      disabled: false,
      validity: {
        badInput: false,
        valid: true,
      },
    });
  }
}

function bottomLineFactory($el) {
  return new MDCTextFieldBottomLineFoundation({
    addClass: className => $el.classList.add(className),
    removeClass: className => $el.classList.remove(className),
    setAttr: (attr, value) => $el.setAttribute(attr, value),
    registerEventHandler: (evtType, handler) => $el.addEventListener(evtType, handler),
    deregisterEventHandler: (evtType, handler) => $el.removeEventListener(evtType, handler),
    notifyAnimationEnd: () => { console.log("Bottomline animationend"); }
  });
}

function helperTextFactory($el) {
  return new MDCTextFieldHelperTextFoundation({
    addClass: className => $el.classList.add(className),
    removeClass: className => $el.classList.remove(className),
    hasClass: className => $el.classList.contains(className),
    setAttr: (attr, value) => $el.setAttribute(attr, value),
    removeAttr: attr => $el.removeAttribute(attr),
    setContent: content => $el.textContent = content
  });
}

function iconFactory($el, notifyIconAction) {
  return new MDCTextFieldIconFoundation({
    setAttr: (attr, value) => $el.setAttribute(attr, value),
    registerInteractionHandler: (evtType, handler) => $el.addEventListener(evtType, handler),
    deregisterInteractionHandler: (evtType, handler) => $el.removeEventListener(evtType, handler),
    notifyIconAction
  });
}

function labelFactory($el) {
  return new MDCTextFieldLabelFoundation({
    addClass: className => $el.classList.add(className),
    removeClass: className => $el.classList.remove(className),
    getWidth: () => $el.offsetWidth
  });
}

function outlineFactory($el, $outlinePath) {
  return new MDCTextFieldOutlineFoundation({
    getWidth: () => $el.offsetWidth,
    getHeight: () => $el.offsetHeight,
    setOutlinePathAttr: value => $outlinePath.setAttribute("d", value)
  });
}

const rippleAdapter$3 = {
  isSurfaceActive() {
    return this.$refs.input[matches]("active");
  },
  registerInteractionHandler(type, handler) {
    this.$refs.input.addEventListener(type, handler);
  },
  deregisterInteractionHandler(type, handler) {
    this.$refs.input.removeEventListener(type, handler);
  }
};

function getFoundationMap(vm) {
  const { bottomLine, icon, label, outline } = vm.$refs;
  let helperText = getHelperText(vm.$el.nextElementSibling);

  return {
    bottomLine: bottomLine && bottomLineFactory(bottomLine),
    helperText: helperText && helperTextFactory(helperText),
    icon: icon && iconFactory(icon, () => vm.$emit("icon")),
    label: label && labelFactory(label),
    outline: outline && outlineFactory(outline),
  };
}
function getHelperText(helperText) {
  return helperText.classList.contains("mdc-text-field-helper-text") ? helperText : null;
}

//v-ripple="ripple && box && !fullwidth"
var Textfield$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-text-field",class:_vm.cssClasses},[(_vm.icon && !_vm.trailingIcon)?_c('i',{ref:"icon",staticClass:"material-icons mdc-text-field__icon",attrs:{"tabindex":_vm.clickIcon && '0'}},[_vm._v(_vm._s(_vm.icon))]):_vm._e(),_c('input',_vm._b({ref:"input",staticClass:"mdc-text-field__input",on:{"input":_vm.onInput}},'input',_vm.$attrs,false)),(!_vm.fullwidth)?_c('label',{ref:"label",staticClass:"mdc-text-field__label"},[_vm._t("default")],2):_vm._e(),(_vm.icon && _vm.trailingIcon)?_c('i',{ref:"icon",staticClass:"material-icons mdc-text-field__icon",attrs:{"tabindex":_vm.clickIcon && '0'}},[_vm._v(_vm._s(_vm.icon))]):_vm._e(),(!_vm.outline)?_c('div',{ref:"bottomLine",staticClass:"mdc-text-field__bottom-line"}):[_c('div',{ref:"outline",staticClass:"mdc-text-field__outline"}),_c('svg',[_c('path',{ref:"outlinePath",staticClass:"mdc-text-field__outline-path"})]),_c('div',{ref:"idleOutline",staticClass:"mdc-text-field__idle-outline"})]],2)},staticRenderFns: [],
  name: "MdcTextfield",
  inheritAttrs: false,
  mixins: [ Ripple(rippleAdapter$3) ],
  props: {
    disabled: Boolean,
    box: Boolean,
    dense: Boolean,
    fullwidth: Boolean,
    outline: Boolean,
    
    value: String,

    // Icon stuff
    icon: String,
    trailingIcon: Boolean,
    clickIcon: Boolean
  },
  watch: {
    value(value) {
      this.foundation.setValue(value);
    },
    disabled(value) {
      this.foundation.setDisabled(value);
    }
  },
  mounted() {
    const { $el } = this;
    const { input, idleOutline, bottomLine } = this.$refs;

    const styles = getComputedStyle($el);
    const idleOutlineStyles = idleOutline ? getComputedStyle(idleOutline) : undefined;

    if(!this.box || !this.outline) {
      this._ripple.destroy();
    }

    this.foundation = new MDCTextFieldFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      hasClass: className => $el.classList.contains(className),
      // Interactions
      registerTextFieldInteractionHandler: (evtType, handler) => $el.addEventListener(evtType, handler),
      deregisterTextFieldInteractionHandler: (evtType, handler) => $el.removeEventListener(evtType, handler),
      registerInputInteractionHandler: (evtType, handler) => input.addEventListener(evtType, handler),
      deregisterInputInteractionHandler: (evtType, handler) => input.removeEventListener(evtType, handler),
      registerBottomLineEventHandler: (evtType, handler) => bottomLine && bottomLine.addEventListener(evtType, handler),
      deregisterBottomLineEventHandler: (evtType, handler) => bottomLine && bottomLine.removeEventListener(evtType, handler),
      
      getIdleOutlineStyleValue: prop => idleOutlineStyles && idleOutlineStyles.getPropertyValue(prop),
      getNativeInput: () => input,
      isFocused: () => document.activeElement === input,
      isRtl: () => styles.direction === "rtl"
    }, getFoundationMap(this));

    this.foundation.init();
    this.foundation.setDisabled(this.disabled);
  },
  beforeDestroy() {
    this.foundation.destroy();
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    cssClasses() {
      return {
        "mdc-text-field--box": this.box,
        "mdc-text-field--dense": this.dense,
        "mdc-text-field--fullwidth": this.fullwidth,
        "mdc-text-field--with-leading-icon": this.icon && !this.trailingIcon,
        "mdc-text-field--with-trailing-icon": this.icon && this.trailingIcon
      };
    }
  },
  methods: {
    onInput(e) {
      this.$emit("input", e.target.value);
    }
  }
};

var textarea = {
  name: "MdcTextarea",
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {}
};

var TextfieldHelpertext = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',{staticClass:"mdc-text-field-helper-text",class:_vm.cssClasses,attrs:{"aria-hidden":"true"}},[_vm._t("default")],2)},staticRenderFns: [],
  name: "MdcTextfieldHelpertext",
  props: {
    persistent: Boolean,
    validation: Boolean
  },
  computed: {
    cssClasses() {
      return {
        "mdc-text-field-helper-text--persistent": this.persistent,
        "mdc-text-field-helper-text--validation-msg": this.validation
      };
    }
  }
};

function install$20(Vue) {
  Vue.component(Textfield$1.name, Textfield$1);
  //Vue.component(Textarea.name, Textarea);
  Vue.component(TextfieldHelpertext.name, TextfieldHelpertext);
}

var Textfield = Object.freeze({
	Textfield: Textfield$1,
	Textarea: textarea,
	TextfieldHelpertext: TextfieldHelpertext,
	install: install$20
});

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const cssClasses$16 = {
  FIXED: 'mdc-toolbar--fixed',
  FIXED_LASTROW: 'mdc-toolbar--fixed-lastrow-only',
  FIXED_AT_LAST_ROW: 'mdc-toolbar--fixed-at-last-row',
  TOOLBAR_ROW_FLEXIBLE: 'mdc-toolbar--flexible',
  FLEXIBLE_DEFAULT_BEHAVIOR: 'mdc-toolbar--flexible-default-behavior',
  FLEXIBLE_MAX: 'mdc-toolbar--flexible-space-maximized',
  FLEXIBLE_MIN: 'mdc-toolbar--flexible-space-minimized',
};

const strings$18 = {
  TITLE_SELECTOR: '.mdc-toolbar__title',
  FIRST_ROW_SELECTOR: '.mdc-toolbar__row:first-child',
  CHANGE_EVENT: 'MDCToolbar:change',
};

const numbers$6 = {
  MAX_TITLE_SIZE: 2.125,
  MIN_TITLE_SIZE: 1.25,
  TOOLBAR_ROW_HEIGHT: 64,
  TOOLBAR_ROW_MOBILE_HEIGHT: 56,
  TOOLBAR_MOBILE_BREAKPOINT: 600,
};

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class MDCToolbarFoundation extends MDCFoundation {
  static get cssClasses() {
    return cssClasses$16;
  }

  static get strings() {
    return strings$18;
  }

  static get numbers() {
    return numbers$6;
  }

  static get defaultAdapter() {
    return {
      hasClass: (/* className: string */) => /* boolean */ false,
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      registerScrollHandler: (/* handler: EventListener */) => {},
      deregisterScrollHandler: (/* handler: EventListener */) => {},
      registerResizeHandler: (/* handler: EventListener */) => {},
      deregisterResizeHandler: (/* handler: EventListener */) => {},
      getViewportWidth: () => /* number */ 0,
      getViewportScrollY: () => /* number */ 0,
      getOffsetHeight: () => /* number */ 0,
      getFirstRowElementOffsetHeight: () => /* number */ 0,
      notifyChange: (/* evtData: {flexibleExpansionRatio: number} */) => {},
      setStyle: (/* property: string, value: string */) => {},
      setStyleForTitleElement: (/* property: string, value: string */) => {},
      setStyleForFlexibleRowElement: (/* property: string, value: string */) => {},
      setStyleForFixedAdjustElement: (/* property: string, value: string */) => {},
    };
  }

  constructor(adapter) {
    super(Object.assign(MDCToolbarFoundation.defaultAdapter, adapter));
    this.resizeHandler_ = () => this.checkRowHeight_();
    this.scrollHandler_ = () => this.updateToolbarStyles_();
    this.checkRowHeightFrame_ = 0;
    this.scrollFrame_ = 0;
    this.executedLastChange_ = false;

    this.calculations_ = {
      toolbarRowHeight: 0,
      // Calculated Height ratio. We use ratio to calculate corresponding heights in resize event.
      toolbarRatio: 0, // The ratio of toolbar height to row height
      flexibleExpansionRatio: 0, // The ratio of flexible space height to row height
      maxTranslateYRatio: 0, // The ratio of max toolbar move up distance to row height
      scrollThresholdRatio: 0, // The ratio of max scrollTop that we should listen to to row height
      // Derived Heights based on the above key ratios.
      toolbarHeight: 0,
      flexibleExpansionHeight: 0, // Flexible row minus toolbar height (derived)
      maxTranslateYDistance: 0, // When toolbar only fix last row (derived)
      scrollThreshold: 0,
    };
    // Toolbar fixed behavior
    // If toolbar is fixed
    this.fixed_ = false;
    // If fixed is targeted only at the last row
    this.fixedLastrow_ = false;
    // Toolbar flexible behavior
    // If the first row is flexible
    this.hasFlexibleRow_ = false;
    // If use the default behavior
    this.useFlexDefaultBehavior_ = false;
  }

  init() {
    this.fixed_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FIXED);
    this.fixedLastrow_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FIXED_LASTROW) & this.fixed_;
    this.hasFlexibleRow_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.TOOLBAR_ROW_FLEXIBLE);
    if (this.hasFlexibleRow_) {
      this.useFlexDefaultBehavior_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_DEFAULT_BEHAVIOR);
    }
    this.initKeyRatio_();
    this.setKeyHeights_();
    this.adapter_.registerResizeHandler(this.resizeHandler_);
    this.adapter_.registerScrollHandler(this.scrollHandler_);
  }

  destroy() {
    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
    this.adapter_.deregisterScrollHandler(this.scrollHandler_);
  }

  updateAdjustElementStyles() {
    if (this.fixed_) {
      this.adapter_.setStyleForFixedAdjustElement('margin-top', `${this.calculations_.toolbarHeight}px`);
    }
  }

  getFlexibleExpansionRatio_(scrollTop) {
    // To prevent division by zero when there is no flexibleExpansionHeight
    const delta = 0.0001;
    return Math.max(0, 1 - scrollTop / (this.calculations_.flexibleExpansionHeight + delta));
  }

  checkRowHeight_() {
    cancelAnimationFrame(this.checkRowHeightFrame_);
    this.checkRowHeightFrame_ = requestAnimationFrame(() => this.setKeyHeights_());
  }

  setKeyHeights_() {
    const newToolbarRowHeight = this.getRowHeight_();
    if (newToolbarRowHeight !== this.calculations_.toolbarRowHeight) {
      this.calculations_.toolbarRowHeight = newToolbarRowHeight;
      this.calculations_.toolbarHeight = this.calculations_.toolbarRatio * this.calculations_.toolbarRowHeight;
      this.calculations_.flexibleExpansionHeight =
        this.calculations_.flexibleExpansionRatio * this.calculations_.toolbarRowHeight;
      this.calculations_.maxTranslateYDistance =
        this.calculations_.maxTranslateYRatio * this.calculations_.toolbarRowHeight;
      this.calculations_.scrollThreshold =
        this.calculations_.scrollThresholdRatio * this.calculations_.toolbarRowHeight;
      this.updateAdjustElementStyles();
      this.updateToolbarStyles_();
    }
  }

  updateToolbarStyles_() {
    cancelAnimationFrame(this.scrollFrame_);
    this.scrollFrame_ = requestAnimationFrame(() => {
      const scrollTop = this.adapter_.getViewportScrollY();
      const hasScrolledOutOfThreshold = this.scrolledOutOfThreshold_(scrollTop);

      if (hasScrolledOutOfThreshold && this.executedLastChange_) {
        return;
      }

      const flexibleExpansionRatio = this.getFlexibleExpansionRatio_(scrollTop);

      this.updateToolbarFlexibleState_(flexibleExpansionRatio);
      if (this.fixedLastrow_) {
        this.updateToolbarFixedState_(scrollTop);
      }
      if (this.hasFlexibleRow_) {
        this.updateFlexibleRowElementStyles_(flexibleExpansionRatio);
      }
      this.executedLastChange_ = hasScrolledOutOfThreshold;
      this.adapter_.notifyChange({flexibleExpansionRatio: flexibleExpansionRatio});
    });
  }

  scrolledOutOfThreshold_(scrollTop) {
    return scrollTop > this.calculations_.scrollThreshold;
  }

  initKeyRatio_() {
    const toolbarRowHeight = this.getRowHeight_();
    const firstRowMaxRatio = this.adapter_.getFirstRowElementOffsetHeight() / toolbarRowHeight;
    this.calculations_.toolbarRatio = this.adapter_.getOffsetHeight() / toolbarRowHeight;
    this.calculations_.flexibleExpansionRatio = firstRowMaxRatio - 1;
    this.calculations_.maxTranslateYRatio =
      this.fixedLastrow_ ? this.calculations_.toolbarRatio - firstRowMaxRatio : 0;
    this.calculations_.scrollThresholdRatio =
      (this.fixedLastrow_ ? this.calculations_.toolbarRatio : firstRowMaxRatio) - 1;
  }

  getRowHeight_() {
    const breakpoint = MDCToolbarFoundation.numbers.TOOLBAR_MOBILE_BREAKPOINT;
    return this.adapter_.getViewportWidth() < breakpoint ?
      MDCToolbarFoundation.numbers.TOOLBAR_ROW_MOBILE_HEIGHT : MDCToolbarFoundation.numbers.TOOLBAR_ROW_HEIGHT;
  }

  updateToolbarFlexibleState_(flexibleExpansionRatio) {
    this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MAX);
    this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MIN);
    if (flexibleExpansionRatio === 1) {
      this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MAX);
    } else if (flexibleExpansionRatio === 0) {
      this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MIN);
    }
  }

  updateToolbarFixedState_(scrollTop) {
    const translateDistance = Math.max(0, Math.min(
      scrollTop - this.calculations_.flexibleExpansionHeight,
      this.calculations_.maxTranslateYDistance));
    this.adapter_.setStyle('transform', `translateY(${-translateDistance}px)`);

    if (translateDistance === this.calculations_.maxTranslateYDistance) {
      this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FIXED_AT_LAST_ROW);
    } else {
      this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FIXED_AT_LAST_ROW);
    }
  }

  updateFlexibleRowElementStyles_(flexibleExpansionRatio) {
    if (this.fixed_) {
      const height = this.calculations_.flexibleExpansionHeight * flexibleExpansionRatio;
      this.adapter_.setStyleForFlexibleRowElement('height',
        `${height + this.calculations_.toolbarRowHeight}px`);
    }
    if (this.useFlexDefaultBehavior_) {
      this.updateElementStylesDefaultBehavior_(flexibleExpansionRatio);
    }
  }

  updateElementStylesDefaultBehavior_(flexibleExpansionRatio) {
    const maxTitleSize = MDCToolbarFoundation.numbers.MAX_TITLE_SIZE;
    const minTitleSize = MDCToolbarFoundation.numbers.MIN_TITLE_SIZE;
    const currentTitleSize = (maxTitleSize - minTitleSize) * flexibleExpansionRatio + minTitleSize;

    this.adapter_.setStyleForTitleElement('font-size', `${currentTitleSize}rem`);
  }
}

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

let supportsPassive_$2;

// Determine whether the current browser supports passive event listeners, and if so, use them.
function applyPassive$2(globalObj = window, forceRefresh = false) {
  if (supportsPassive_$2 === undefined || forceRefresh) {
    let isSupported = false;
    try {
      globalObj.document.addEventListener('test', null, {get passive() {
        isSupported = true;
      }});
    } catch (e) { }

    supportsPassive_$2 = isSupported;
  }

  return supportsPassive_$2 ? {passive: true} : false;
}

var Toolbar$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('header',{staticClass:"mdc-toolbar",class:_vm.cssClasses},[_vm._t("default")],2)},staticRenderFns: [],
  name: "MdcToolbar",
  props: {
    flexible: Boolean,
    waterfall: Boolean,
    fixed: Boolean,
    fixedLastrow: Boolean
  },
  watch: {
    flexible(value) {
      this.foundation.hasFlexibleRow_ = value;
      this.foundation.useFlexDefaultBehaviour_ = value;
    }
  },
  computed: {
    cssClasses() {
      //TODO: minimize flexible and fixed to a string
      return {
        "mdc-toolbar--waterfall": this.waterfall,
        "mdc-toolbar--fixed": this.isFixed,
        "mdc-toolbar--fixed-lastrow-only": this.fixedLastrow,
        "mdc-toolbar--flexible": this.flexible,
        "mdc-toolbar--flexible-default-behavior": this.flexible
      };
    },
    isFixed() {
      if(this.foundation) {
        this.foundation.fixed_ = this.fixed;
        this.foundation.fixedLastrow_ = this.fixedLastrow;
      }

      return this.fixed || this.fixedLastrow;
    }
  },
  mounted() {
    const { $el } = this;
    const findTitle = () => $el.querySelector(".mdc-toolbar__title");
    const findRow = () => $el.querySelector(".mdc-toolbar__row:first-child");

    this.foundation = new MDCToolbarFoundation({
      hasClass: className => $el.classList.contains(className),
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      registerScrollHandler: handler => window.addEventListener("scroll", handler, applyPassive$2()),
      deregisterScrollHandler: handler => window.removeEventListener("scroll", handler, applyPassive$2()),
      registerResizeHandler: handler => window.addEventListener("resize", handler),
      deregisterResizeHandler: handler => window.removeEventListener("resize", handler),
      getViewportWidth: () => window.innerWidth,
      getViewportScrollY: () => window.pageYOffset,
      getOffsetHeight: () => $el.offsetHeight,
      getFirstRowElementOffsetHeight: () => findRow().offsetHeight,
      notifyChange: data => this.$emit("change", data),
      setStyle: (prop, value) => $el.style.setProperty(prop, value),
      setStyleForTitleElement: (prop, value) => findTitle().style.setProperty(prop, value),
      setStyleForFlexibleRowElement: (prop, value) => findRow().style.setProperty(prop, value),
      setStyleForFixedAdjustElement: (prop, value) => {
        const $fixedAdjust = this.isFixed && $el.nextElementSibling;
        if ($fixedAdjust) {
          $fixedAdjust.style.setProperty(prop, value);
        }
      }
    });
    this.foundation.init();
  },
  beforeDestroy() {
    this.foundation.destroy();
  }
};

var ToolbarRow = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-toolbar__row"},[_vm._t("default")],2)},staticRenderFns: [],
  name: "MdcToolbarRow"
};

var ToolbarSection = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"mdc-toolbar__section",class:_vm.cssClasses,attrs:{"role":"toolbar"}},[_vm._t("default")],2)},staticRenderFns: [],
  name: "MdcToolbarSection",
  props: {
    alignStart: Boolean,
    alignEnd: Boolean,
    shrink: Boolean
  },
  computed: {
    cssClasses() {
      return {
        "mdc-toolbar__section--align-start": this.alignStart,
        "mdc-toolbar__section--align-end": this.alignEnd,
        "mdc-toolbar__section--shrink-to-fit": this.shrink,
      };
    }
  }
};

var ToolbarTitle = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"mdc-toolbar__title"},[_vm._t("default")],2)},staticRenderFns: [],
  name: "MdcToolbarTitle"
};

var ToolbarIcon = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.tag,{tag:"component",staticClass:"material-icons mdc-toolbar__icon",attrs:{"href":_vm.link,"aria-label":_vm.label,"alt":_vm.label}},[_vm._v(_vm._s(_vm.icon))])},staticRenderFns: [],
  name: "MdcToolbarIcon",
  props: {
    link: String,
    label: String,
    icon: {
      type: String,
      required: true
    }
  },
  computed: {
    tag() {
      return this.link ? "a" : "button";
    }
  }
};

var ToolbarMenuIcon = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.tag,_vm._g({tag:"component",staticClass:"material-icons mdc-toolbar__menu-icon",attrs:{"href":_vm.link}},_vm.$listeners),[_vm._v("menu")])},staticRenderFns: [],
  name: "MdcToolbarMenuIcon",
  props: {
    link: String
  },
  computed: {
    tag() {
      return this.link ? "a" : "button";
    }
  }
};

function install$21(Vue) {
  Vue.component(Toolbar$1.name, Toolbar$1);
  Vue.component(ToolbarRow.name, ToolbarRow);
  Vue.component(ToolbarSection.name, ToolbarSection);
  Vue.component(ToolbarTitle.name, ToolbarTitle);
  Vue.component(ToolbarIcon.name, ToolbarIcon);
  Vue.component(ToolbarMenuIcon.name, ToolbarMenuIcon);
}

var Toolbar = Object.freeze({
	Toolbar: Toolbar$1,
	ToolbarRow: ToolbarRow,
	ToolbarSection: ToolbarSection,
	ToolbarTitle: ToolbarTitle,
	ToolbarIcon: ToolbarIcon,
	ToolbarMenuIcon: ToolbarMenuIcon,
	install: install$21
});

//import { default as Toolbar } from "./toolbar.vue";



//export { };
/*export function install(Vue) {

}*/

//import * as Elevation from "./packages/elevation";
//import * as Tabs from "./packages/tabs";
const DEFAULT_OPTS = {
  theme: null,
  typography: false
};

//TODO: make option manager in mixins and other stuff...instead of having options in components
var index = {
  install(Vue, opts) {
    const { body } = document;
    opts = Object.assign({}, DEFAULT_OPTS, opts);
    // Add typography on body
    if (opts.typography) {
      body.classList.add("mdc-typography");
    }
    // Apply theme on body
    if (opts.theme) {
      body.classList.add(`theme--${opts.theme}`);
    }
    
    // Add all the packages as global components
    Vue.use(App);
    Vue.use(Button);
    Vue.use(Card);
    Vue.use(Checkbox);
    Vue.use(Dialog);
    Vue.use(Drawer);
    //Vue.use(Elevation);
    Vue.use(Fab);
    Vue.use(FormField);
    Vue.use(GridList);
    Vue.use(IconToggle);
    Vue.use(LayoutGrid);
    Vue.use(LinearProgress);
    Vue.use(List);
    Vue.use(Menu);
    Vue.use(Radio);
    Vue.use(Select);
    Vue.use(Slider);
    Vue.use(Snackbar);
    Vue.use(Switch);
    //Vue.use(Tabs);
    Vue.use(Textfield);
    Vue.use(Toolbar);
  }
};

module.exports = index;
//# sourceMappingURL=vue-mdc-web.common.js.map
