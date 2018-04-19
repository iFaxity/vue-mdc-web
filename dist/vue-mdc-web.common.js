'use strict';

var App = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-app mdc-typography",class:_vm.cssClasses},[_vm._t(_vm.headerSlot),_c('div',{staticClass:"mdc-app__content",class:_vm.contentCssClasses},[_vm._t(_vm.contentSlot),_vm._t("default")],2)],2)},staticRenderFns: [],
  name: "MdcApp",
  props: {
    flip: Boolean, // flips the drawer & toolbar slot
    drawerHideMobile: Boolean,
    alignStart: Boolean
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
        "mdc-app--flipped": this.flip,
        "mdc-app--align-start": this.alignStart,
        "mdc-app--drawer-hide-mobile": this.drawerHideMobile
      };
    },
    contentCssClasses() {
      return this.alignStart && "mdc-app__content--align-start";
    }
  },
  methods: {}
};

function install(Vue) {
  Vue.component(App.name, App);
}

var App$1 = /*#__PURE__*/Object.freeze({
  App: App,
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
  TAP_DELAY_MS: 300, // Delay between touch and simulated mouse events on touch devices
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

// Tracks activations that have occurred on the current frame, to avoid simultaneous nested activations
/** @type {!Array<!EventTarget>} */
let activatedTargets = [];

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
      containsEventTarget: (/* target: !EventTarget */) => {},
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

    const activationState = this.activationState_;
    if (activationState.isActivated) {
      return;
    }

    // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
    const previousActivationEvent = this.previousActivationEvent_;
    const isSameInteraction = previousActivationEvent && e && previousActivationEvent.type !== e.type;
    if (isSameInteraction) {
      return;
    }

    activationState.isActivated = true;
    activationState.isProgrammatic = e === null;
    activationState.activationEvent = e;
    activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : (
      e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown'
    );

    const hasActivatedChild =
      e && activatedTargets.length > 0 && activatedTargets.some((target) => this.adapter_.containsEventTarget(target));
    if (hasActivatedChild) {
      // Immediately reset activation state, while preserving logic that prevents touch follow-on events
      this.resetActivationState_();
      return;
    }

    if (e) {
      activatedTargets.push(/** @type {!EventTarget} */ (e.target));
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

      // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
      activatedTargets = [];
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
    const {activationEvent, wasActivatedByPointer} = this.activationState_;

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
    setTimeout(() => this.previousActivationEvent_ = null, MDCRippleFoundation.numbers.TAP_DELAY_MS);
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

    // Surface diameter is treated differently for unbounded vs. bounded ripples.
    // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
    // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
    // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
    // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
    // `overflow: hidden`.
    const getBoundedRadius = () => {
      const hypotenuse = Math.sqrt(Math.pow(this.frame_.width, 2) + Math.pow(this.frame_.height, 2));
      return hypotenuse + MDCRippleFoundation.numbers.PADDING;
    };

    this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius();

    // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
    this.initialSize_ = maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE;
    this.fgScale_ = this.maxRadius_ / this.initialSize_;

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
function Ripple(adapter = null, opts = {}) {
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

var MdcButton = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.link ? "a" : "button",_vm._g({tag:"component",staticClass:"mdc-button",class:_vm.cssClasses,attrs:{"href":_vm.link,"disabled":_vm.disabled}},_vm.$listeners),[(_vm.icon)?_c('i',{staticClass:"material-icons mdc-button__icon"},[_vm._v(_vm._s(_vm.icon))]):_vm._e(),_vm._t("default")],2)},staticRenderFns: [],
  name: "MdcButton",
  mixins: [ Ripple() ],
  props: {
    icon: String,
    raised: Boolean,
    unelevated: Boolean,
    stroked: Boolean,
    dense: Boolean,
    compact: Boolean,
    disabled: Boolean,

    link: String
  },
  computed: {
    cssClasses() {
      return {
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
  Vue.component(MdcButton.name, MdcButton);
}

var Button = /*#__PURE__*/Object.freeze({
  Button: MdcButton,
  install: install$1
});

var Card = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-card",class:_vm.cssClasses},[_vm._t("default")],2)},staticRenderFns: [],
  name: "MdcCard",
  props: {
    stroked: Boolean
  },
  computed: {
    cssClasses() {
      return this.stroked && "mdc-card--stroked";
    }
  }
};

var CardActions = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-card__actions",class:_vm.cssClasses},[_vm._t("default"),(_vm.hasButtons)?_c('div',{staticClass:"mdc-card__action-buttons"},[_vm._t("button")],2):_vm._e(),(_vm.hasIcons)?_c('div',{staticClass:"mdc-card__action-icons"},[_vm._t("icon")],2):_vm._e()],2)},staticRenderFns: [],
  name: "MdcCardActions",
  props: {
    fullBleed: Boolean
  },
  computed: {
    cssClasses() {
      return this.fullBleed && "mdc-card__actions--full-bleed";
    },
    hasButtons() {
      return !!this.$slots.button;
    },
    hasIcons() {
      return !!this.$slots.icon;
    }
  },
  beforeMount() {
    const addClass = ({ data }, className) => {
      if(data.staticClass) {
        data.staticClass += ` ${className}`;
      } else {
        data.staticClass = className;
      }
    };
    this.$slots.button && this.$slots.button.forEach(button => addClass(button, "mdc-card__action mdc-card__action--button"));
    this.$slots.icon && this.$slots.icon.forEach(icon => addClass(icon, "mdc-card__action mdc-card__action--icon"));
  }
};

var CardMedia = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-card__media",class:_vm.cssClasses,style:(_vm.cssStyles)},[(_vm.hasContent)?_c('div',{staticClass:"mdc-card__media-content"},[_vm._t("default")],2):_vm._e()])},staticRenderFns: [],
  name: "MdcCardMedia",
  props: {
    square: Boolean,
    image: String
  },
  computed: {
    cssStyles() {
      return this.image && `background-image: url(${this.image});`;
    },
    cssClasses() {
      return this.square ? "mdc-card__media--square" : "mdc-card__media--16-9";
    },
    hasContent() {
      return !!this.$slots.default;
    }
  }
};

function install$2 (Vue) {
  Vue.component(Card.name, Card);
  Vue.component(CardActions.name, CardActions);
  Vue.component(CardMedia.name, CardMedia);
}

var Card$1 = /*#__PURE__*/Object.freeze({
  Card: Card,
  CardActions: CardActions,
  CardMedia: CardMedia,
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
 * See Material Design spec for more details on when to use ripples.
 * https://material.io/guidelines/motion/choreography.html#choreography-creation
 * @record
 */
class RippleCapableSurface {}

/** @protected {!Element} */
RippleCapableSurface.prototype.root_;

/**
 * Whether or not the ripple bleeds out of the bounds of the element.
 * @type {boolean|undefined}
 */
RippleCapableSurface.prototype.unbounded;

/**
 * Whether or not the ripple is attached to a disabled component.
 * @type {boolean|undefined}
 */
RippleCapableSurface.prototype.disabled;

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
  ANIM_END_LATCH_MS: 250,
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

    this.animEndHandler_ = /** @private {!EventListener} */ (
      () => this.handleAnimationEnd());

    this.changeHandler_ = /** @private {!EventListener} */ (
      () => this.handleChange());
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

  /**
   * Handles the animationend event for the checkbox
   */
  handleAnimationEnd() {
    clearTimeout(this.animEndLatchTimer_);
    this.animEndLatchTimer_ = setTimeout(() => {
      this.adapter_.removeClass(this.currentAnimationClass_);
      this.adapter_.deregisterAnimationEndHandler(this.animEndHandler_);
    }, numbers$1.ANIM_END_LATCH_MS);
  }

  /**
   * Handles the change event for the checkbox
   */
  handleChange() {
    this.transitionCheckState_();
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
  isSurfaceActive() {
    return this.$refs.input[matches](":active");
  },
  registerInteractionHandler(typeName, handler) {
    this.$refs.input.addEventListener(typeName, handler);
  },
  deregisterInteractionHandler(typeName, handler) {
    this.$refs.input.removeEventListener(typeName, handler);
  }
};

var Checkbox = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-checkbox"},[_c('input',_vm._b({ref:"input",staticClass:"mdc-checkbox__native-control",attrs:{"type":"checkbox"},domProps:{"value":_vm.value},on:{"change":_vm.onChange}},'input',_vm.$attrs,false)),_c('div',{staticClass:"mdc-checkbox__background"},[_c('svg',{staticClass:"mdc-checkbox__checkmark",attrs:{"viewBox":"0 0 24 24"}},[_c('path',{staticClass:"mdc-checkbox__checkmark-path",attrs:{"fill":"none","stroke":"white","d":"M1.73,12.91 8.1,19.28 22.79,4.59"}})]),_c('div',{staticClass:"mdc-checkbox__mixedmark"})])])},staticRenderFns: [],
  name: "MdcCheckbox",
  mixins: [ Ripple(rippleAdapter, { unbounded: true }) ],
  inheritAttrs: false,
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    checked: [Boolean, Array],
    disabled: Boolean,
    indeterminate: Boolean,
    value: [String, Number, Boolean]
  },
  watch: {
    checked(value) {
      if(Array.isArray(value)) {
        value = value.includes(this.value);
      }
      this.foundation.setChecked(value);
    },
    disabled(value) {
      this.foundation.setDisabled(value);
    },
    indeterminate(value) {
      this.foundation.setIndeterminate(value);
    }
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
    this.foundation.setDisabled(this.disabled);
    this.foundation.setIndeterminate(this.indeterminate);

    if(Array.isArray(this.checked)) {
      this.foundation.setChecked(this.checked.includes(this.value));
    } else {
      this.foundation.setChecked(this.checked);
    }
  },
  beforeDestroy() {
    this.foundation.destroy();
  },
  methods: {
    onChange(e) {
      let value = e.target.checked;
      this.$emit("update:indeterminate", this.foundation.isIndeterminate());

      if(Array.isArray(this.checked)) {
        const arr = this.checked;
        if(value) {
          arr.push(this.value);
        } else {
          const index = arr.indexOf(this.value);
          arr.splice(index, 1);
        }
        
        value = arr;
      } else if(this.value) {
        value = this.value;
      }

      this.$emit("change", value);
    }
  }
};

function install$3(Vue) {
  Vue.component(Checkbox.name, Checkbox);
}

var Checkbox$1 = /*#__PURE__*/Object.freeze({
  Checkbox: Checkbox,
  install: install$3
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
const strings$2 = {
  INTERACTION_EVENT: 'MDCChip:interaction',
  TRAILING_ICON_INTERACTION_EVENT: 'MDCChip:trailingIconInteraction',
  TRAILING_ICON_SELECTOR: '.mdc-chip__icon--trailing',
};

/** @enum {string} */
const cssClasses$2 = {
  SELECTED: 'mdc-chip--selected',
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
 * @extends {MDCFoundation<!MDCChipAdapter>}
 * @final
 */
class MDCChipFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get strings() {
    return strings$2;
  }

  /** @return enum {string} */
  static get cssClasses() {
    return cssClasses$2;
  }

  /**
   * {@see MDCChipAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCChipAdapter}
   */
  static get defaultAdapter() {
    return /** @type {!MDCChipAdapter} */ ({
      addClass: () => {},
      removeClass: () => {},
      hasClass: () => {},
      registerInteractionHandler: () => {},
      deregisterInteractionHandler: () => {},
      registerTrailingIconInteractionHandler: () => {},
      deregisterTrailingIconInteractionHandler: () => {},
      notifyInteraction: () => {},
      notifyTrailingIconInteraction: () => {},
    });
  }

  /**
   * @param {!MDCChipAdapter} adapter
   */
  constructor(adapter) {
    super(Object.assign(MDCChipFoundation.defaultAdapter, adapter));

    /** @private {function(!Event): undefined} */
    this.interactionHandler_ = (evt) => this.handleInteraction_(evt);
    /** @private {function(!Event): undefined} */
    this.trailingIconInteractionHandler_ = (evt) => this.handleTrailingIconInteraction_(evt);
  }

  init() {
    ['click', 'keydown'].forEach((evtType) => {
      this.adapter_.registerInteractionHandler(evtType, this.interactionHandler_);
      this.adapter_.registerTrailingIconInteractionHandler(evtType, this.trailingIconInteractionHandler_);
    });
    ['touchstart', 'pointerdown', 'mousedown'].forEach((evtType) => {
      this.adapter_.registerTrailingIconInteractionHandler(evtType, this.trailingIconInteractionHandler_);
    });
  }

  destroy() {
    ['click', 'keydown'].forEach((evtType) => {
      this.adapter_.deregisterInteractionHandler(evtType, this.interactionHandler_);
      this.adapter_.deregisterTrailingIconInteractionHandler(evtType, this.trailingIconInteractionHandler_);
    });
    ['touchstart', 'pointerdown', 'mousedown'].forEach((evtType) => {
      this.adapter_.deregisterTrailingIconInteractionHandler(evtType, this.trailingIconInteractionHandler_);
    });
  }

  /**
   * Toggles the selected class on the chip element.
   */
  toggleSelected() {
    if (this.adapter_.hasClass(cssClasses$2.SELECTED)) {
      this.adapter_.removeClass(cssClasses$2.SELECTED);
    } else {
      this.adapter_.addClass(cssClasses$2.SELECTED);
    }
  }

  /**
   * Handles an interaction event on the root element.
   * @param {!Event} evt
   */
  handleInteraction_(evt) {
    if (evt.type === 'click' || evt.key === 'Enter' || evt.keyCode === 13) {
      this.adapter_.notifyInteraction();
    }
  }

  /**
   * Handles an interaction event on the trailing icon element. This is used to
   * prevent the ripple from activating on interaction with the trailing icon.
   * @param {!Event} evt
   */
  handleTrailingIconInteraction_(evt) {
    evt.stopPropagation();
    if (evt.type === 'click' || evt.key === 'Enter' || evt.keyCode === 13) {
      this.adapter_.notifyTrailingIconInteraction();
    }
  }
}

var MdcIcon = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.tag,{tag:"component",staticClass:"material-icons",class:_vm.cssClasses,attrs:{"tabindex":_vm.action && '0',"role":_vm.action && 'button',"aria-hidden":!_vm.action && 'true',"aria-label":_vm.label}},[_vm._v(_vm._s(_vm.icon))])},staticRenderFns: [],
  name: "MdcIcon",
  mixins: [ Ripple(null, { unbounded: true, surface: true }) ],
  props: {
    icon: {
      type: String,
      required: true
    },
    name: String,
    label: String,
    tag: {
      type: String,
      default: "i"
    },
    
    ripple: Boolean,
    action: Boolean
  },
  computed: {
    cssClasses() {
      return !!this.name && `mdc-${this.name}__icon`;
    }
  },
  mounted() {
    if(!this.ripple) {
      this._ripple.destroy();
    }
  }
};

var Chip = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-chip"},[(_vm.leadingIcon)?_c('mdc-icon',_vm._b({staticClass:"mdc-chip__icon--leading"},'mdc-icon',_vm.leadingIcon,false)):_vm._e(),_c('div',{staticClass:"mdc-chip__text"},[_vm._v(_vm._s(_vm.text))]),(_vm.trailingIcon)?_c('mdc-icon',_vm._b({staticClass:"mdc-chip__icon--trailing"},'mdc-icon',_vm.trailingIcon,false)):_vm._e()],1)},staticRenderFns: [],
  name: "MdcChip",
  mixins: [ Ripple() ],
  components: { MdcIcon },
  props: {
    text: {
      type: String,
      required: true
    },
    entry: Boolean,
    filter: Boolean,
    action: String,
  },
  computed: {
    leadingIcon() {
      if(this.entry) {
        return {
          name: "chip",
          icon: "face"
        };
      } else if(this.filter) {
        return null;
      } else if(this.action) {
        return {
          name: "chip",
          icon: this.action
        };
      }
    },
    trailingIcon() {
      if(this.entry) {
        return {
          name: "chip",
          icon: "more_vert",
          label: "More options",
          action: true
        };
      } else if(this.filter) {
        return {
          name: "chip",
          icon: "cancel",
          action: true
        };
      } else if(this.action) {
        return null;
      }
    }
  },
  mounted() {
    this.foundation = new MDCChipFoundation({
      registerInteractionHandler: (type, handler) => this.$el.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => this.$el.removeEventListener(type, handler),
      notifyInteraction: () => this.$emit("click")
    });
    this.foundation.init();
  },
  beforeDestroy() {
    this.foundation.destroy();
  }
};

var ChipSet = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-chip-set"},[_vm._t("default")],2)},staticRenderFns: [],
  name: "MdcChipSet",
};

function install$4 (Vue) {
  Vue.component(Chip.name, Chip);
  Vue.component(ChipSet.name, ChipSet);
}

var Chips = /*#__PURE__*/Object.freeze({
  Chip: Chip,
  ChipSet: ChipSet,
  install: install$4
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

const cssClasses$3 = {
  ROOT: 'mdc-dialog',
  OPEN: 'mdc-dialog--open',
  ANIMATING: 'mdc-dialog--animating',
  BACKDROP: 'mdc-dialog__backdrop',
  SCROLL_LOCK: 'mdc-dialog-scroll-lock',
  ACCEPT_BTN: 'mdc-dialog__footer__button--accept',
  CANCEL_BTN: 'mdc-dialog__footer__button--cancel',
};

const strings$3 = {
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
    return cssClasses$3;
  }

  static get strings() {
    return strings$3;
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
      if (this.adapter_.eventTargetHasClass(evt.target, cssClasses$3.BACKDROP)) {
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
    if (this.adapter_.eventTargetHasClass(target, cssClasses$3.ACCEPT_BTN)) {
      this.accept(true);
    } else if (this.adapter_.eventTargetHasClass(target, cssClasses$3.CANCEL_BTN)) {
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
      }    }  };

  disableScroll_() {
    this.adapter_.addBodyClass(cssClasses$3.SCROLL_LOCK);
  }

  enableScroll_() {
    this.adapter_.removeBodyClass(cssClasses$3.SCROLL_LOCK);
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

var Dialog = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('aside',{staticClass:"mdc-dialog",attrs:{"role":"alertdialog"}},[_c('div',{ref:"surface",staticClass:"mdc-dialog__surface"},[(_vm.header)?_c('header',{staticClass:"mdc-dialog__header"},[_c('h2',{staticClass:"mdc-dialog__header__title"},[_vm._v(_vm._s(_vm.header))])]):_vm._e(),(_vm.hasContent)?_c('section',{staticClass:"mdc-dialog__body",class:_vm.cssBodyClasses},[_vm._t("default")],2):_vm._e(),_c('footer',{staticClass:"mdc-dialog__footer"},[_c('mdc-button',{ref:"cancel",staticClass:"mdc-dialog__footer__button mdc-dialog__footer__button--cancel"},[_vm._v(_vm._s(_vm.cancelText))]),_c('mdc-button',{ref:"accept",staticClass:"mdc-dialog__footer__button mdc-dialog__footer__button--accept",attrs:{"disabled":!_vm.valid}},[_vm._v(_vm._s(_vm.acceptText))])],1)]),_c('div',{staticClass:"mdc-dialog__backdrop"})])},staticRenderFns: [],
  name: "MdcDialog",
  components: { MdcButton },
  props: {
    header: String,
    scroll: Boolean,
    valid: {
      type: Boolean,
      default: true
    },
    acceptText: {
      type: String,
      default: "Ok"
    },
    cancelText: {
      type: String,
      default: "Cancel"
    }
  },
  computed: {
    cssBodyClasses() {
      return this.scroll && "mdc-dialog__body--scrollable";
    },
    hasContent() {
      return !!this.$slots.default;
    }
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
      if(!this.foundation.isOpen()) {
        this.foundation.open();
        return true;
      }
      return false;
    },
    close() {
      if(this.foundation.isOpen()) {
        this.foundation.close();
        return true;
      }
      return false;
    }
  }
};

function install$5(Vue) {
  Vue.component(Dialog.name, Dialog);
}

var Dialog$1 = /*#__PURE__*/Object.freeze({
  Dialog: Dialog,
  install: install$5
});

const TYPES = ["temporary", "permanent", "persistent"];

var Drawer = {
  name: "MdcDrawer",
  functional: true,
  inheritAttrs: true,

  props: {
    type: {
      type: String,
      validator: value => TYPES.includes(value)
    },
    temporary: Boolean,
    permanent: Boolean,
    persistent: Boolean
  },

  render(h, ctx) {
    const { props } = ctx;
    let type = props.type || TYPES.find(n => props[n] === true);

    if(!TYPES.includes(type)) {
      throw new Error("MDC Drawer: a valid type was not specified");
    }
    return h(`mdc-${type}-drawer`, ctx.data, ctx.children)
  }
}

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

const cssClasses$4 = {
  ROOT: 'mdc-drawer--persistent',
  OPEN: 'mdc-drawer--open',
  ANIMATING: 'mdc-drawer--animating',
};

const strings$4 = {
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
    return cssClasses$4;
  }

  static get strings() {
    return strings$4;
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

var PersistentDrawer = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('aside',{staticClass:"mdc-drawer mdc-drawer--persistent"},[_c('nav',{ref:"drawer",staticClass:"mdc-drawer__drawer"},[(_vm.spacer)?_c('div',{staticClass:"mdc-drawer__toolbar-spacer"}):_vm._e(),(_vm.header)?_c('header',{staticClass:"mdc-drawer__header"},[_c('div',{staticClass:"mdc-drawer__header-content"},[_vm._v(_vm._s(_vm.header))])]):_vm._e(),_c('nav',{staticClass:"mdc-drawer__content mdc-list"},[_vm._t("default")],2)])])},staticRenderFns: [],
  name: "MdcPersistentDrawer",
  props: {
    open: Boolean,
    spacer: Boolean,
    header: String
  },
  mounted() {
    const { $el } = this;
    const { drawer } = this.$refs;
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
      if (this.foundation.isOpen()) {
        this.foundation.close();
      } else {
        this.foundation.open();
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

const cssClasses$5 = {
  ROOT: 'mdc-drawer--temporary',
  OPEN: 'mdc-drawer--open',
  ANIMATING: 'mdc-drawer--animating',
  SCROLL_LOCK: 'mdc-drawer-scroll-lock',
};

const strings$5 = {
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
    return cssClasses$5;
  }

  static get strings() {
    return strings$5;
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
      if (this.adapter_.eventTargetHasClass(evt.target, cssClasses$5.ROOT)) {
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
    this.adapter_.addBodyClass(cssClasses$5.SCROLL_LOCK);
  }

  enableScroll_() {
    this.adapter_.removeBodyClass(cssClasses$5.SCROLL_LOCK);
  }
}

var TemporaryDrawer = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('aside',{staticClass:"mdc-drawer mdc-drawer--temporary"},[_c('nav',{ref:"drawer",staticClass:"mdc-drawer__drawer"},[(_vm.header)?_c('header',{staticClass:"mdc-drawer__header"},[_c('div',{staticClass:"mdc-drawer__header-content"},[_vm._v(_vm._s(_vm.header))])]):_vm._e(),_c('nav',{staticClass:"mdc-drawer__content mdc-list"},[_vm._t("default")],2)])])},staticRenderFns: [],
  name: "MdcTemporaryDrawer",
  props: {
    open: Boolean,
    spacer: Boolean,
    header: String
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
        this.foundation.close();
      } else {
        this.foundation.open();
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
    const { data, props } = ctx;
    let tag = props.tag;

    if(props.to) {
      tag = "router-link";
      // remove the link
      data.props = Object.assign({}, props, { link: undefined });
    } else {
      if(tag === "a") {
        data.attrs.href = props.link;
      }
    }

    return h(tag, data, ctx.children);
  }
};

function install$6(activeClass, exactActiveClass) {
  return {
    components: { MdcLink: MdcLink },
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

var DrawerItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('mdc-link',_vm._g(_vm._b({staticClass:"mdc-list-item",attrs:{"tag":"a","link":_vm.link}},'mdc-link',_vm.$_link,false),_vm.$listeners),[_vm._t("graphic"),_vm._v(_vm._s(_vm.text))],2)},staticRenderFns: [],
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

function install$7(Vue) {
  Vue.component(Drawer.name, Drawer);
  Vue.component(PermanentDrawer.name, PermanentDrawer);
  Vue.component(PersistentDrawer.name, PersistentDrawer);
  Vue.component(TemporaryDrawer.name, TemporaryDrawer);
  Vue.component(DrawerItem.name, DrawerItem);
  Vue.component(DrawerDivider.name, DrawerDivider);
}

var Drawer$1 = /*#__PURE__*/Object.freeze({
  PermanentDrawer: PermanentDrawer,
  PersistentDrawer: PersistentDrawer,
  TemporaryDrawer: TemporaryDrawer,
  DrawerItem: DrawerItem,
  DrawerDivider: DrawerDivider,
  install: install$7
});

var Fab = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"mdc-fab material-icons",class:_vm.cssClasses,attrs:{"aria-label":_vm.label}},[_c('span',{staticClass:"mdc-fab__icon"},[_vm._v(_vm._s(_vm.icon))])])},staticRenderFns: [],
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

function install$8(Vue) {
  Vue.component(Fab.name, Fab);
}

var Fab$1 = /*#__PURE__*/Object.freeze({
  Fab: Fab,
  install: install$8
});

var FormField = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-form-field",class:_vm.cssClasses},[_vm._t("default"),_c('label',[_vm._v(_vm._s(_vm.label))])],2)},staticRenderFns: [],
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
      return this.alignEnd && "mdc-form-field--align-end";
    }
  }
};

function install$9(Vue) {
  Vue.component(FormField.name, FormField);
}

var FormField$1 = /*#__PURE__*/Object.freeze({
  FormField: FormField,
  install: install$9
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
const strings$6 = {
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
    return strings$6;
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

const RATIOS = ["1x1", "16x9", "2x3", "3x2", "4x3", "3x4"];

var GridList = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-grid-list"},[_c('ul',{ref:"tiles",staticClass:"mdc-grid-list__tiles"},[_vm._t("default")],2)])},staticRenderFns: [],
  name: "MdcGridList",
  props: {
    headerCaption: Boolean,
    twoline: Boolean,
    iconAlignEnd: Boolean,
    iconAlignStart: Boolean,
    thinGutter: Boolean,
    ratio: {
      type: String,
      validator: value => RATIOS.includes(value)
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
        "mdc-grid-list--tile-gutter-1": this.thinGutter,
        "mdc-grid-list--header-caption": this.captions,
        "mdc-grid-list--twoline-caption": this.twoline,
        "mdc-grid-list--with-icon-align-start": this.iconAlignStart,
        "mdc-grid-list--with-icon-align-end": this.iconAlignEnd
      };

      if(this.aspect) {
        classes[`mdc-grid-list--tile-aspect-${this.ratio}`] = true;
      }
      return classes;
    }
  }
};

var GridTile = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"mdc-grid-tile"},[_c('div',{staticClass:"mdc-grid-tile__primary"},[(_vm.cover)?_c('div',{staticClass:"mdc-grid-tile__primary-content",style:(_vm.coverStyle)}):_c('img',{staticClass:"mdc-grid-tile__primary-content",attrs:{"src":_vm.src}})]),(_vm.hasSecondary)?_c('span',{staticClass:"mdc-grid-tile__secondary"},[(_vm.icon)?_c('mdc-icon',{attrs:{"name":"grid-tile","icon":_vm.icon}}):_vm._e(),(_vm.title)?_c('span',{staticClass:"mdc-grid-tile__title"},[_vm._v(_vm._s(_vm.title))]):_vm._e(),(_vm.text)?_c('span',{staticClass:"mdc-grid-tile__support-text"},[_vm._v(_vm._s(_vm.text))]):_vm._e()],1):_vm._e()])},staticRenderFns: [],
  name: "MdcGridTile",
  components: { MdcIcon },
  props: {
    cover: Boolean,
    title: String,
    text: String,
    icon: String,
    src: {
      type: String,
      required: true
    }
  },
  computed: {
    coverStyle() {
      return `background-image: url(${src})`;
    },
    hasSecondary() {
      return this.text || this.title || this.icon;
    }
  }
};

function install$10(Vue) {
  Vue.component(GridList.name, GridList);
  Vue.component(GridTile.name, GridTile);
}

var GridList$1 = /*#__PURE__*/Object.freeze({
  GridList: GridList,
  GridTile: GridTile,
  install: install$10
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
const cssClasses$6 = {
  ROOT: 'mdc-icon-toggle',
  DISABLED: 'mdc-icon-toggle--disabled',
};

/** @enum {string} */
const strings$7 = {
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

/**
 * @extends {MDCFoundation<!MDCIconToggleAdapter>}
 */
class MDCIconToggleFoundation extends MDCFoundation {
  static get cssClasses() {
    return cssClasses$6;
  }

  static get strings() {
    return strings$7;
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


/** @record */
class IconToggleState {}

/**
 * The aria-label value of the icon toggle, or undefined if there is no aria-label.
 * @export {string|undefined}
 */
IconToggleState.prototype.label;

/**
 * The text for the icon toggle, or undefined if there is no text.
 * @export {string|undefined}
 */
IconToggleState.prototype.content;

/**
 * The CSS class to add to the icon toggle, or undefined if there is no CSS class.
 * @export {string|undefined}
 */
IconToggleState.prototype.cssClass;

const rippleAdapter$1 = {
  isSurfaceActive() {
    return this.foundation.isKeyboardActivated();
  }
};

var IconToggle = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('i',{staticClass:"mdc-icon-toggle material-icons",attrs:{"role":"button","tabindex":"0"}})},staticRenderFns: [],
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

function install$11(Vue) {
  Vue.component(IconToggle.name, IconToggle);
}

var IconToggle$1 = /*#__PURE__*/Object.freeze({
  IconToggle: IconToggle,
  install: install$11
});

var LayoutGrid = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-layout-grid",class:_vm.cssClasses},[_c('div',{staticClass:"mdc-layout-grid__inner"},[_vm._t("default")],2)])},staticRenderFns: [],
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

const ALIGNMENTS = [ "top", "bottom", "middle" ];
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

function install$12(Vue) {
  Vue.component(LayoutGrid.name, LayoutGrid);
  Vue.component(LayoutCell.name, LayoutCell);
  Vue.component(LayoutInner.name, LayoutInner);
}

var LayoutGrid$1 = /*#__PURE__*/Object.freeze({
  LayoutGrid: LayoutGrid,
  LayoutCell: LayoutCell,
  LayoutInner: LayoutInner,
  install: install$12
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

const cssClasses$7 = {
  CLOSED_CLASS: 'mdc-linear-progress--closed',
  INDETERMINATE_CLASS: 'mdc-linear-progress--indeterminate',
  REVERSED_CLASS: 'mdc-linear-progress--reversed',
};

const strings$8 = {
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
    return cssClasses$7;
  }

  static get strings() {
    return strings$8;
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
    this.determinate_ = !this.adapter_.hasClass(cssClasses$7.INDETERMINATE_CLASS);
    this.reverse_ = this.adapter_.hasClass(cssClasses$7.REVERSED_CLASS);
    this.progress_ = 0;
  }

  setDeterminate(isDeterminate) {
    this.determinate_ = isDeterminate;
    if (this.determinate_) {
      this.adapter_.removeClass(cssClasses$7.INDETERMINATE_CLASS);
      this.setScale_(this.adapter_.getPrimaryBar(), this.progress_);
    } else {
      this.adapter_.addClass(cssClasses$7.INDETERMINATE_CLASS);
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
      this.adapter_.addClass(cssClasses$7.REVERSED_CLASS);
    } else {
      this.adapter_.removeClass(cssClasses$7.REVERSED_CLASS);
    }
  }

  open() {
    this.adapter_.removeClass(cssClasses$7.CLOSED_CLASS);
  }

  close() {
    this.adapter_.addClass(cssClasses$7.CLOSED_CLASS);
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

var LinearProgress = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-linear-progress",attrs:{"role":"progressbar"}},[_c('div',{staticClass:"mdc-linear-progress__buffering-dots"}),_c('div',{ref:"buffer",staticClass:"mdc-linear-progress__buffer"}),_c('div',{ref:"primary",staticClass:"mdc-linear-progress__bar mdc-linear-progress__primary-bar"},[_c('span',{staticClass:"mdc-linear-progress__bar-inner"})]),_vm._m(0)])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-linear-progress__bar mdc-linear-progress__secondary-bar"},[_c('span',{staticClass:"mdc-linear-progress__bar-inner"})])}],
  name: "MdcLinearProgress",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    indeterminate: Boolean,
    reversed: Boolean,
    closed: Boolean,

    value: [String, Number],
    buffer: [String, Number]
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

function install$13(Vue) {
  Vue.component(LinearProgress.name, LinearProgress);
}

var LinearProgress$1 = /*#__PURE__*/Object.freeze({
  LinearProgress: LinearProgress,
  install: install$13
});

var List = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"mdc-list",class:_vm.cssClasses},[_vm._t("default")],2)},staticRenderFns: [],
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

var ListItemMeta = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.tag,{tag:"mdc-link",staticClass:"mdc-list-item__meta",class:_vm.cssClasses,attrs:{"aria-label":_vm.icon && _vm.label,"aria-hidden":_vm.icon && 'true',"href":_vm.link}},[_vm._v(_vm._s(_vm.content))])},staticRenderFns: [],
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

var ListGroupSubheader = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('h3',{staticClass:"mdc-list-group__subheader"},[_vm._v(_vm._s(_vm.text))])},staticRenderFns: [],
  name: "MdcListGroupSubheader",
  props: {
    text: {
      type: String,
      required: true
    }
  }
};

function install$14(Vue) {
  Vue.component(List.name, List);
  Vue.component(ListItem.name, ListItem);
  Vue.component(ListDivider.name, ListDivider);
  Vue.component(ListItemGraphic.name, ListItemGraphic);
  Vue.component(ListItemMeta.name, ListItemMeta);
  // List groups
  Vue.component(ListGroup.name, ListGroup);
  Vue.component(ListGroupDivider.name, ListGroupDivider);
  Vue.component(ListGroupSubheader.name, ListGroupSubheader);
}

var List$1 = /*#__PURE__*/Object.freeze({
  List: List,
  ListItem: ListItem,
  ListDivider: ListDivider,
  ListItemGraphic: ListItemGraphic,
  ListItemMeta: ListItemMeta,
  ListGroup: ListGroup,
  ListGroupDivider: ListGroupDivider,
  ListGroupSubheader: ListGroupSubheader,
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
const cssClasses$8 = {
  ROOT: 'mdc-menu',
  OPEN: 'mdc-menu--open',
  ANIMATING_OPEN: 'mdc-menu--animating-open',
  ANIMATING_CLOSED: 'mdc-menu--animating-closed',
  SELECTED_LIST_ITEM: 'mdc-list-item--selected',
};

/** @enum {string} */
const strings$9 = {
  ITEMS_SELECTOR: '.mdc-menu__items',
  SELECTED_EVENT: 'MDCMenu:selected',
  CANCEL_EVENT: 'MDCMenu:cancel',
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
 * @extends {MDCFoundation<!MDCMenuAdapter>}
 */
class MDCMenuFoundation extends MDCFoundation {
  /** @return enum{cssClasses} */
  static get cssClasses() {
    return cssClasses$8;
  }

  /** @return enum{strings} */
  static get strings() {
    return strings$9;
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
   * {@see MDCMenuAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCMenuAdapter}
   */
  static get defaultAdapter() {
    return /** @type {!MDCMenuAdapter} */ ({
      addClass: () => {},
      removeClass: () => {},
      hasClass: () => false,
      hasNecessaryDom: () => false,
      getAttributeForEventTarget: () => {},
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
      setAttrForOptionAtIndex: () => {},
      rmAttrForOptionAtIndex: () => {},
      addClassForOptionAtIndex: () => {},
      rmClassForOptionAtIndex: () => {},
    });
  }

  /** @param {!MDCMenuAdapter} adapter */
  constructor(adapter) {
    super(Object.assign(MDCMenuFoundation.defaultAdapter, adapter));

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
    /** @private {number} */
    this.selectedIndex_ = -1;
    /** @private {boolean} */
    this.rememberSelection_ = false;
    /** @private {boolean} */
    this.quickOpen_ = false;

    // A keyup event on the menu needs to have a corresponding keydown
    // event on the menu. If the user opens the menu with a keydown event on a
    // button, the menu will only get the key up event causing buggy behavior with selected elements.
    /** @private {boolean} */
    this.keyDownWithinMenu_ = false;
  }

  init() {
    const {ROOT, OPEN} = MDCMenuFoundation.cssClasses;

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

  /** @param {boolean} rememberSelection */
  setRememberSelection(rememberSelection) {
    this.rememberSelection_ = rememberSelection;
    this.setSelectedIndex(-1);
  }

  /** @param {boolean} quickOpen */
  setQuickOpen(quickOpen) {
    this.quickOpen_ = quickOpen;
  }

  /**
   * @param {?number} focusIndex
   * @private
   */
  focusOnOpen_(focusIndex) {
    if (focusIndex === null) {
      // If this instance of MDCMenu remembers selections, and the user has
      // made a selection, then focus the last selected item
      if (this.rememberSelection_ && this.selectedIndex_ >= 0) {
        this.adapter_.focusItemAtIndex(this.selectedIndex_);
        return;
      }

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
   * Handle clicks and cancel the menu if not a child list-item
   * @param {!Event} evt
   * @private
   */
  handleDocumentClick_(evt) {
    let el = evt.target;

    while (el && el !== document.documentElement) {
      if (this.adapter_.getIndexForEventTarget(el) !== -1) {
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
    const isEnter = key === 'Enter' || keyCode === 13;
    // The menu needs to know if the keydown event was triggered on the menu
    this.keyDownWithinMenu_ = isEnter || isSpace;

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
      // If the keydown event didn't occur on the menu, then it should
      // disregard the possible selected event.
      if (this.keyDownWithinMenu_) {
        this.handlePossibleSelected_(evt);
      }
      this.keyDownWithinMenu_ = false;
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
    if (this.adapter_.getAttributeForEventTarget(evt.target, strings$9.ARIA_DISABLED_ATTR) === 'true') {
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
      if (this.rememberSelection_) {
        this.setSelectedIndex(targetIndex);
      }
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
    const {MARGIN_TO_EDGE} = MDCMenuFoundation.numbers;
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

    if (!this.quickOpen_) {
      this.adapter_.addClass(MDCMenuFoundation.cssClasses.ANIMATING_OPEN);
    }

    this.animationRequestId_ = requestAnimationFrame(() => {
      this.dimensions_ = this.adapter_.getInnerDimensions();
      this.autoPosition_();
      this.adapter_.addClass(MDCMenuFoundation.cssClasses.OPEN);
      this.focusOnOpen_(focusIndex);
      this.adapter_.registerBodyClickHandler(this.documentClickHandler_);
      if (!this.quickOpen_) {
        this.openAnimationEndTimerId_ = setTimeout(() => {
          this.openAnimationEndTimerId_ = 0;
          this.adapter_.removeClass(MDCMenuFoundation.cssClasses.ANIMATING_OPEN);
        }, numbers$2.TRANSITION_OPEN_DURATION);
      }
    });
    this.isOpen_ = true;
  }

  /**
   * Closes the menu.
   * @param {Event=} evt
   */
  close(evt = null) {
    const targetIsDisabled = evt ?
      this.adapter_.getAttributeForEventTarget(evt.target, strings$9.ARIA_DISABLED_ATTR) === 'true' :
      false;

    if (targetIsDisabled) {
      return;
    }

    this.adapter_.deregisterBodyClickHandler(this.documentClickHandler_);

    if (!this.quickOpen_) {
      this.adapter_.addClass(MDCMenuFoundation.cssClasses.ANIMATING_CLOSED);
    }

    requestAnimationFrame(() => {
      this.adapter_.removeClass(MDCMenuFoundation.cssClasses.OPEN);
      if (!this.quickOpen_) {
        this.closeAnimationEndTimerId_ = setTimeout(() => {
          this.closeAnimationEndTimerId_ = 0;
          this.adapter_.removeClass(MDCMenuFoundation.cssClasses.ANIMATING_CLOSED);
        }, numbers$2.TRANSITION_CLOSE_DURATION);
      }
    });
    this.isOpen_ = false;
    this.adapter_.restoreFocus();
  }

  /** @return {boolean} */
  isOpen() {
    return this.isOpen_;
  }

  /** @return {number} */
  getSelectedIndex() {
    return this.selectedIndex_;
  }

  /**
   * @param {number} index Index of the item to set as selected.
   */
  setSelectedIndex(index) {
    if (index === this.selectedIndex_) {
      return;
    }

    const prevSelectedIndex = this.selectedIndex_;
    if (prevSelectedIndex >= 0) {
      this.adapter_.rmAttrForOptionAtIndex(prevSelectedIndex, 'aria-selected');
      this.adapter_.rmClassForOptionAtIndex(prevSelectedIndex, cssClasses$8.SELECTED_LIST_ITEM);
    }

    this.selectedIndex_ = index >= 0 && index < this.adapter_.getNumberOfItems() ? index : -1;
    if (this.selectedIndex_ >= 0) {
      this.adapter_.setAttrForOptionAtIndex(this.selectedIndex_, 'aria-selected', 'true');
      this.adapter_.addClassForOptionAtIndex(this.selectedIndex_, cssClasses$8.SELECTED_LIST_ITEM);
    }
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

var Menu = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-menu",class:_vm.cssClasses,attrs:{"tabindex":"-1"}},[_c('div',{ref:"itemsContainer",staticClass:"mdc-list mdc-menu__items",attrs:{"role":"menu"}},[_vm._t("default")],2)])},staticRenderFns: [],
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
    const $styles = getComputedStyle($el);
    let $anchor, prevFocus;
    
    if(this.anchor) {
      $anchor = $el.parentElement;
      $anchor.classList.add("mdc-menu-anchor");
    }

    this.foundation = new MDCMenuFoundation({
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
      getNumberOfItems: () => this.items.length,
      registerInteractionHandler: (type, handler) => $el.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => $el.removeEventListener(type, handler),
      registerBodyClickHandler: handler => document.body.addEventListener("click", handler),
      deregisterBodyClickHandler: handler => document.body.removeEventListener("click", handler),
      getIndexForEventTarget: target => this.items.indexOf(target),
      notifySelected: data => this.$emit("selected", data.index, this.items[data.index]),
      notifyCancel: () => this.$emit("cancel"),
      saveFocus: () => {
        prevFocus = document.activeElement;
      },
      restoreFocus: () => prevFocus && prevFocus.focus(),
      isFocused: () => document.activeElement === $el,
      focus: () => $el.focus(),
      getFocusedItemIndex: () => this.items.indexOf(document.activeElement),
      focusItemAtIndex: index => this.items[index].focus(),
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
      setMaxHeight: height => $el.style.maxHeight = height,
      setAttrForOptionAtIndex: (index, attr, value) => this.items[index].setAttribute(attr, value),
      rmAttrForOptionAtIndex: (index, attr) => this.items[index].removeAttribute(attr),
      addClassForOptionAtIndex: (index, className) => this.items[index].classList.add(className),
      rmClassForOptionAtIndex: (index, className) => this.items[index].classList.remove(className),
    });
    this.items = this.$_findItems();
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

function install$15(Vue) {
  Vue.component(Menu.name, Menu);
  Vue.component(MenuItem.name, MenuItem);
}

var Menu$1 = /*#__PURE__*/Object.freeze({
  Menu: Menu,
  MenuItem: MenuItem,
  install: install$15
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
const strings$10 = {
  NATIVE_CONTROL_SELECTOR: '.mdc-radio__native-control',
};

/** @enum {string} */
const cssClasses$9 = {
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

/**
 * @extends {MDCFoundation<!MDCRadioAdapter>}
 */
class MDCRadioFoundation extends MDCFoundation {
  /** @return enum {cssClasses} */
  static get cssClasses() {
    return cssClasses$9;
  }

  /** @return enum {strings} */
  static get strings() {
    return strings$10;
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
  isSurfaceActive() {
    return false;
  },
  registerInteractionHandler(type, handler) {
    this.$refs.input.addEventListener(type, handler);
  },
  deregisterInteractionHandler(type, handler) {
    this.$refs.input.removeEventListener(type, handler);
  }
};

var Radio = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-radio",class:_vm.cssClasses},[_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],ref:"input",staticClass:"mdc-radio__native-control",attrs:{"type":"radio"},domProps:{"value":_vm.value,"checked":_vm._q(_vm.model,_vm.value)},on:{"change":function($event){_vm.model=_vm.value;}}},'input',_vm.$attrs,false)),_vm._m(0)])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-radio__background"},[_c('div',{staticClass:"mdc-radio__outer-circle"}),_c('div',{staticClass:"mdc-radio__inner-circle"})])}],
  name: "MdcRadio",
  mixins: [ Ripple(rippleAdapter$2, { unbounded: true }) ],
  inheritAttrs: false,
  model: {
    prop: "checked",
    event: "change",
  },

  props: {
    disabled: Boolean,
    checked: [Boolean, String],
    value: {
      type: String,
      required: true
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
  }
};

function install$16(Vue) {
  Vue.component(Radio.name, Radio);
}

var Radio$1 = /*#__PURE__*/Object.freeze({
  Radio: Radio,
  install: install$16
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
const cssClasses$10 = {
  BOX: 'mdc-select--box',
  DISABLED: 'mdc-select--disabled',
  OPEN: 'mdc-select--open',
  ROOT: 'mdc-select',
  SCROLL_LOCK: 'mdc-select-scroll-lock',
};

const strings$11 = {
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
    return cssClasses$10;
  }

  static get strings() {
    return strings$11;
  }

  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      floatLabel: (/* value: boolean */) => {},
      activateBottomLine: () => {},
      deactivateBottomLine: () => {},
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
        this.adapter_.floatLabel(false);
      }
    };
  }

  init() {
    this.ctx_ = this.adapter_.create2dRenderingContext();
    this.adapter_.registerInteractionHandler('click', this.displayHandler_);
    this.adapter_.registerInteractionHandler('keydown', this.displayViaKeyboardHandler_);
    this.adapter_.registerInteractionHandler('keyup', this.displayViaKeyboardHandler_);
    this.adapter_.registerMenuInteractionHandler(
      MDCMenuFoundation.strings.SELECTED_EVENT, this.selectionHandler_);
    this.adapter_.registerMenuInteractionHandler(
      MDCMenuFoundation.strings.CANCEL_EVENT, this.cancelHandler_);
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
      MDCMenuFoundation.strings.SELECTED_EVENT, this.selectionHandler_);
    this.adapter_.deregisterMenuInteractionHandler(
      MDCMenuFoundation.strings.CANCEL_EVENT, this.cancelHandler_);
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
      this.adapter_.floatLabel(true);
    } else {
      if (!this.adapter_.isMenuOpen()) {
        this.adapter_.floatLabel(false);
      }
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
    this.adapter_.floatLabel(true);
    this.adapter_.activateBottomLine();
    this.adapter_.addClass(OPEN);
    this.animationRequestId_ = requestAnimationFrame(() => {
      this.adapter_.openMenu(focusIndex);
      this.isFocused_ = true;
    });
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
    this.adapter_.deactivateBottomLine();
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
    this.adapter_.addBodyClass(cssClasses$10.SCROLL_LOCK);
  }

  enableScroll_() {
    this.adapter_.removeBodyClass(cssClasses$10.SCROLL_LOCK);
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

const cssClasses$11 = {
  LABEL_FLOAT_ABOVE: 'mdc-select__label--float-above',
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
 * @extends {MDCFoundation<!MDCSelectLabelAdapter>}
 * @final
 */
class MDCSelectLabelFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get cssClasses() {
    return cssClasses$11;
  }

  /**
   * {@see MDCSelectLabelAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCSelectLabelAdapter}
   */
  static get defaultAdapter() {
    return /** @type {!MDCSelectLabelAdapter} */ ({
      addClass: () => {},
      removeClass: () => {},
      getWidth: () => {},
    });
  }

  /**
   * @param {!MDCSelectLabelAdapter} adapter
   */
  constructor(adapter) {
    super(Object.assign(MDCSelectLabelFoundation.defaultAdapter, adapter));
  }

  /**
   * Styles the label to float or defloat as necessary.
   * @param {string} value The value of the input.
   */
  styleFloat(value) {
    const {LABEL_FLOAT_ABOVE} = MDCSelectLabelFoundation.cssClasses;
    if (!!value) {
      this.adapter_.addClass(LABEL_FLOAT_ABOVE);
    } else {
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

const cssClasses$12 = {
  BOTTOM_LINE_ACTIVE: 'mdc-select__bottom-line--active',
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
 * @extends {MDCFoundation<!MDCSelectBottomLineAdapter>}
 * @final
 */
class MDCSelectBottomLineFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get cssClasses() {
    return cssClasses$12;
  }

  /**
   * {@see MDCSelectBottomLineAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCSelectBottomLineAdapter}
   */
  static get defaultAdapter() {
    return /** @type {!MDCSelectBottomLineAdapter} */ ({
      addClass: () => {},
      removeClass: () => {},
    });
  }

  /**
   * Adds the active class to bottom line
   */
  activate() {
    this.adapter_.addClass(cssClasses$12.BOTTOM_LINE_ACTIVE);
  }

  /**
   * Removes the active class from the bottom line
   */
  deactivate() {
    this.adapter_.removeClass(cssClasses$12.BOTTOM_LINE_ACTIVE);
  }

  /**
   * @param {!MDCSelectBottomLineAdapter} adapter
   */
  constructor(adapter) {
    super(Object.assign(MDCSelectBottomLineFoundation.defaultAdapter, adapter));
  }
}

const getEventType = type => type.substr(type.indexOf(":") + 1);

//TODO: complete after created mdc-list and mdc-menu
var Select = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-select",class:_vm.cssClasses,attrs:{"role":"listbox"}},[_c('div',{ref:"surface",staticClass:"mdc-select__surface"},[_c('div',{ref:"label",staticClass:"mdc-select__label"},[_vm._v(_vm._s(_vm.label))]),_c('div',{staticClass:"mdc-select__selected-text"},[_vm._v(_vm._s(_vm.selectedText))]),_c('div',{ref:"bottomLine",staticClass:"mdc-select__bottom-line"})]),_c('mdc-menu',{ref:"menu",staticClass:"mdc-select__menu"},[_vm._t("default")],2)],1)},staticRenderFns: [],
  name: "MdcSelect",
  mixins: [ Ripple() ],
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    disabled: Boolean,
    value: String,
    label: {
      type: String,
      required: true
    },
    box: Boolean
  },

  watch: {
    value(value) {
      this.$_setIndexFromValue(value);
    },
    disabled(value) {
      this.foundation.setDisabled(value);
    }
  },
  computed: {
    cssClasses() {
      return this.box && "mdc-select--box";
    }
  },
  data() {
    return { selectedText: "" };
  },

  mounted() {
    const { $el } = this;
    const { surface, menu } = this.$refs;

    const bottomLine = new MDCSelectBottomLineFoundation({
      addClass: className => this.$refs.bottomLine.classList.add(className),
      removeClass: className => this.$refs.bottomLine.classList.remove(className)
    });
    const label = new MDCSelectLabelFoundation({
      addClass: className => this.$refs.label.classList.add(className),
      removeClass: className => this.$refs.label.classList.remove(className)
    });

    this.foundation = new MDCSelectFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      floatLabel: value => label && label.styleFloat(value),
      activateBottomLine: () => bottomLine.activate(),
      deactivateBottomLine: () => bottomLine.deactivate(),
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
      getWindowInnerHeight: () => window.innerHeight,
      addBodyClass: className => document.body.classList.add(className),
      removeBodyClass: className => document.body.classList.remove(className)
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

function install$17(Vue) {
  Vue.component(Select.name, Select);
  Vue.component(SelectItem.name, SelectItem);
}

var Select$1 = /*#__PURE__*/Object.freeze({
  Select: Select,
  SelectItem: SelectItem,
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
const cssClasses$13 = {
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

const numbers$3 = {
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
    return cssClasses$13;
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
        setTimeout(this.cleanup_.bind(this), this.snackbarData_.timeout || numbers$3.MESSAGE_TIMEOUT);
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
      this.timeoutId_ = setTimeout(this.cleanup_.bind(this), this.snackbarData_.timeout || numbers$3.MESSAGE_TIMEOUT);
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

    const {ACTIVE, MULTILINE, ACTION_ON_BOTTOM} = cssClasses$13;

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

    this.timeoutId_ = setTimeout(this.cleanup_.bind(this), this.snackbarData_.timeout || numbers$3.MESSAGE_TIMEOUT);
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
      const {ACTIVE, MULTILINE, ACTION_ON_BOTTOM} = cssClasses$13;

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
var Snackbar = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-snackbar",class:_vm.cssClasses,attrs:{"aria-live":"assertive","aria-atomic":"true","aria-hidden":_vm.hidden && 'true'}},[_c('div',{staticClass:"mdc-snackbar__text"},[_vm._v(_vm._s(_vm.messageText))]),_c('div',{staticClass:"mdc-snackbar__action__wrapper"},[_c('button',{ref:"actionButton",staticClass:"mdc-snackbar__action-button",attrs:{"type":"button","aria-hidden":_vm.actionHidden && 'true'}},[_vm._v(_vm._s(_vm.actionText))])])])},staticRenderFns: [],
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
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
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
  Vue.component(Snackbar.name, Snackbar);
}

var Snackbar$1 = /*#__PURE__*/Object.freeze({
  Snackbar: Snackbar,
  install: install$18
});

var Switch = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-switch",class:_vm.cssClasses},[_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],staticClass:"mdc-switch__native-control",attrs:{"type":"checkbox","disabled":_vm.disabled},domProps:{"checked":Array.isArray(_vm.model)?_vm._i(_vm.model,null)>-1:(_vm.model)},on:{"change":function($event){var $$a=_vm.model,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.model=$$a.concat([$$v]));}else{$$i>-1&&(_vm.model=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.model=$$c;}}}},'input',_vm.$attrs,false)),_vm._m(0)])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-switch__background"},[_c('div',{staticClass:"mdc-switch__knob"})])}],
  name: "MdcSwitch",
  inheritAttrs: false,
  model: {
    prop: "checked",
    event: "change"
  },
  
  props: {
    disabled: Boolean,
    checked: [Boolean, Array]
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
  Vue.component(Switch.name, Switch);
}

var Switch$1 = /*#__PURE__*/Object.freeze({
  Switch: Switch,
  install: install$19
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

const cssClasses$14 = {
  ACTIVE: 'mdc-tab--active',
};

const strings$13 = {
  SELECTED_EVENT: 'MDCTab:selected',
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

class MDCTabFoundation extends MDCFoundation {
  static get cssClasses() {
    return cssClasses$14;
  }

  static get strings() {
    return strings$13;
  }

  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      registerInteractionHandler: (/* type: string, handler: EventListener */) => {},
      deregisterInteractionHandler: (/* type: string, handler: EventListener */) => {},
      getOffsetWidth: () => /* number */ 0,
      getOffsetLeft: () => /* number */ 0,
      notifySelected: () => {},
    };
  }

  constructor(adapter = {}) {
    super(Object.assign(MDCTabFoundation.defaultAdapter, adapter));

    this.computedWidth_ = 0;
    this.computedLeft_ = 0;
    this.isActive_ = false;
    this.preventDefaultOnClick_ = false;

    this.clickHandler_ = (evt) => {
      if (this.preventDefaultOnClick_) {
        evt.preventDefault();
      }
      this.adapter_.notifySelected();
    };

    this.keydownHandler_ = (evt) => {
      if (evt.key && evt.key === 'Enter' || evt.keyCode === 13) {
        this.adapter_.notifySelected();
      }
    };
  }

  init() {
    this.adapter_.registerInteractionHandler('click', this.clickHandler_);
    this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
  }

  destroy() {
    this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
    this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
  }

  getComputedWidth() {
    return this.computedWidth_;
  }

  getComputedLeft() {
    return this.computedLeft_;
  }

  isActive() {
    return this.isActive_;
  }

  setActive(isActive) {
    this.isActive_ = isActive;
    if (this.isActive_) {
      this.adapter_.addClass(cssClasses$14.ACTIVE);
    } else {
      this.adapter_.removeClass(cssClasses$14.ACTIVE);
    }
  }

  preventsDefaultOnClick() {
    return this.preventDefaultOnClick_;
  }

  setPreventDefaultOnClick(preventDefaultOnClick) {
    this.preventDefaultOnClick_ = preventDefaultOnClick;
  }

  measureSelf() {
    this.computedWidth_ = this.adapter_.getOffsetWidth();
    this.computedLeft_ = this.adapter_.getOffsetLeft();
  }
}

var Tab = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('mdc-link',_vm._b({staticClass:"mdc-tab",attrs:{"role":"tab","link":_vm.link}},'mdc-link',_vm.$_link,false),[(_vm.icon)?[_c('mdc-icon',{attrs:{"name":"tab","icon":_vm.icon}}),(_vm.text)?_c('span',{staticClass:"mdc-tab__icon-text"},[_vm._v(_vm._s(_vm.text))]):_vm._e()]:[_vm._v(_vm._s(_vm.text))]],2)},staticRenderFns: [],
  name: "MdcTab",
  mixins: [ Ripple(), install$6("mdc-tab--active") ],
  components: { MdcIcon },
  props: {
    link: String,
    icon: String,
    text: String
  },

  mounted() {
    const { $el } = this;

    this.foundation = new MDCTabFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      registerInteractionHandler: (type, handler) => $el.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => $el.removeEventListener(type, handler),
      getOffsetWidth: () => $el.offsetWidth,
      getOffsetLeft: () => $el.offsetLeft,
      notifySelected: () => this.$parent.$emit("selected", this),
    });
    this.foundation.init();
  },
  beforeDestroy() {
    this.foundation.destroy();
  },
  methods: {
    computedWidth() {
      return this.foundation.getComputedWidth();
    },
    computedLeft() {
      return this.foundation.getComputedLeft();
    },
    setActive(value) {
      this.foundation.setActive(value);
    },
    isActive() {
      return this.foundation.isActive();
    },
    preventsDefaultOnClick() {
      return this.foundation.preventsDefaultOnClick();
    },
    preventDefaultOnClick(preventDefaultOnClick) {
      this.foundation.setPreventDefaultOnClick(preventDefaultOnClick);
    },
    measureSelf() {
      this.foundation.measureSelf();
    }
  }
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

const cssClasses$15 = {
  UPGRADED: 'mdc-tab-bar-upgraded',
};

const strings$14 = {
  TAB_SELECTOR: '.mdc-tab',
  INDICATOR_SELECTOR: '.mdc-tab-bar__indicator',
  CHANGE_EVENT: 'MDCTabBar:change',
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

class MDCTabBarFoundation extends MDCFoundation {
  static get cssClasses() {
    return cssClasses$15;
  }

  static get strings() {
    return strings$14;
  }

  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      bindOnMDCTabSelectedEvent: () => {},
      unbindOnMDCTabSelectedEvent: () => {},
      registerResizeHandler: (/* handler: EventListener */) => {},
      deregisterResizeHandler: (/* handler: EventListener */) => {},
      getOffsetWidth: () => /* number */ 0,
      setStyleForIndicator: (/* propertyName: string, value: string */) => {},
      getOffsetWidthForIndicator: () => /* number */ 0,
      notifyChange: (/* evtData: {activeTabIndex: number} */) => {},
      getNumberOfTabs: () => /* number */ 0,
      isTabActiveAtIndex: (/* index: number */) => /* boolean */ false,
      setTabActiveAtIndex: (/* index: number, isActive: true */) => {},
      isDefaultPreventedOnClickForTabAtIndex: (/* index: number */) => /* boolean */ false,
      setPreventDefaultOnClickForTabAtIndex: (/* index: number, preventDefaultOnClick: boolean */) => {},
      measureTabAtIndex: (/* index: number */) => {},
      getComputedWidthForTabAtIndex: (/* index: number */) => /* number */ 0,
      getComputedLeftForTabAtIndex: (/* index: number */) => /* number */ 0,
    };
  }

  constructor(adapter) {
    super(Object.assign(MDCTabBarFoundation.defaultAdapter, adapter));

    this.isIndicatorShown_ = false;
    this.computedWidth_ = 0;
    this.computedLeft_ = 0;
    this.activeTabIndex_ = 0;
    this.layoutFrame_ = 0;
    this.resizeHandler_ = () => this.layout();
  }

  init() {
    this.adapter_.addClass(cssClasses$15.UPGRADED);
    this.adapter_.bindOnMDCTabSelectedEvent();
    this.adapter_.registerResizeHandler(this.resizeHandler_);
    const activeTabIndex = this.findActiveTabIndex_();
    if (activeTabIndex >= 0) {
      this.activeTabIndex_ = activeTabIndex;
    }
    this.layout();
  }

  destroy() {
    this.adapter_.removeClass(cssClasses$15.UPGRADED);
    this.adapter_.unbindOnMDCTabSelectedEvent();
    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
  }

  layoutInternal_() {
    this.forEachTabIndex_((index) => this.adapter_.measureTabAtIndex(index));
    this.computedWidth_ = this.adapter_.getOffsetWidth();
    this.layoutIndicator_();
  }

  layoutIndicator_() {
    const isIndicatorFirstRender = !this.isIndicatorShown_;

    // Ensure that indicator appears in the right position immediately for correct first render.
    if (isIndicatorFirstRender) {
      this.adapter_.setStyleForIndicator('transition', 'none');
    }

    const translateAmtForActiveTabLeft = this.adapter_.getComputedLeftForTabAtIndex(this.activeTabIndex_);
    const scaleAmtForActiveTabWidth =
      this.adapter_.getComputedWidthForTabAtIndex(this.activeTabIndex_) / this.adapter_.getOffsetWidth();

    const transformValue = `translateX(${translateAmtForActiveTabLeft}px) scale(${scaleAmtForActiveTabWidth}, 1)`;
    this.adapter_.setStyleForIndicator(getCorrectPropertyName(window, 'transform'), transformValue);

    if (isIndicatorFirstRender) {
      // Force layout so that transform styles to take effect.
      this.adapter_.getOffsetWidthForIndicator();
      this.adapter_.setStyleForIndicator('transition', '');
      this.adapter_.setStyleForIndicator('visibility', 'visible');
      this.isIndicatorShown_ = true;
    }
  }

  findActiveTabIndex_() {
    let activeTabIndex = -1;
    this.forEachTabIndex_((index) => {
      if (this.adapter_.isTabActiveAtIndex(index)) {
        activeTabIndex = index;
        return true;
      }
    });
    return activeTabIndex;
  }

  forEachTabIndex_(iterator) {
    const numTabs = this.adapter_.getNumberOfTabs();
    for (let index = 0; index < numTabs; index++) {
      const shouldBreak = iterator(index);
      if (shouldBreak) {
        break;
      }
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

  switchToTabAtIndex(index, shouldNotify) {
    if (index === this.activeTabIndex_) {
      return;
    }

    if (index < 0 || index >= this.adapter_.getNumberOfTabs()) {
      throw new Error(`Out of bounds index specified for tab: ${index}`);
    }

    const prevActiveTabIndex = this.activeTabIndex_;
    this.activeTabIndex_ = index;
    requestAnimationFrame(() => {
      if (prevActiveTabIndex >= 0) {
        this.adapter_.setTabActiveAtIndex(prevActiveTabIndex, false);
      }
      this.adapter_.setTabActiveAtIndex(this.activeTabIndex_, true);
      this.layoutIndicator_();
      if (shouldNotify) {
        this.adapter_.notifyChange({activeTabIndex: this.activeTabIndex_});
      }
    });
  }

  getActiveTabIndex() {
    return this.findActiveTabIndex_();
  }
}

var MdcTabBar = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{staticClass:"mdc-tab-bar",class:_vm.cssClasses},[_vm._t("default"),_c('span',{ref:"indicator",staticClass:"mdc-tab-bar__indicator",style:(_vm.getIndicatorStyle)})],2)},staticRenderFns: [],
  name: "MdcTabBar",
  props: {
    icons: Boolean,
    iconsWithText: Boolean,
    primary: Boolean,
    secondary: Boolean
  },
  data() {
    return { index: -1, tabs: [] };
  },
  computed: {
    cssClasses() {
      return {
        "mdc-tab-bar--upgraded": true,
        "mdc-tab-bar--icon-tab-bar": this.icons,
        "mdc-tab-bar--icons-with-text": this.iconsWithText
      };
    }
  },
  mounted() {
    const { $el } = this;
    const { indicator } = this.$refs;

    this.tabs = this.$children;

    this.foundation = new MDCTabBarFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      bindOnMDCTabSelectedEvent: () => this.$on("selected", this.onSelected),
      unbindOnMDCTabSelectedEvent: () => this.$off("selected", this.onSelected),
      registerResizeHandler: handler => window.addEventListener("resize", handler),
      deregisterResizeHandler: handler => window.removeEventListener("resize", handler),
      getOffsetWidth: () => $el.offsetWidth,
      setStyleForIndicator: (prop, value) => {
        indicator.style[prop] = value;
      },
      getOffsetWidthForIndicator: () => indicator.offsetWidth,
      notifyChange: data => this.$emit("change", data),
      getNumberOfTabs: () => this.tabs.length,
      isTabActiveAtIndex: index => this.tabs[index].isActive(),
      setTabActiveAtIndex: (index, active) => this.tabs[index].setActive(active),
      isDefaultPreventedOnClickForTabAtIndex: index => this.tabs[index].preventsDefaultOnClick(),
      setPreventDefaultOnClickForTabAtIndex: (index, value) => this.tabs[index].preventDefaultOnClick(value),
      measureTabAtIndex: index => this.tabs[index].measureSelf(),
      getComputedWidthForTabAtIndex: index => this.tabs[index].computedWidth(),
      getComputedLeftForTabAtIndex: index => this.tabs[index].computedLeft(),
    });
    this.foundation.init();
  },
  beforeDestroy() {
    this.foundation.destroy();
  },
  methods: {
    onSelected(tab) {
      const index = this.tabs.indexOf(tab);

      if(index < 0) {
        throw new Error("Invalid tab?");
      }
      this.foundation.switchToTabAtIndex(index, true);
    }
  }
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

const cssClasses$16 = {
  INDICATOR_FORWARD: 'mdc-tab-bar-scroller__indicator--forward',
  INDICATOR_BACK: 'mdc-tab-bar-scroller__indicator--back',
  INDICATOR_ENABLED: 'mdc-tab-bar-scroller__indicator--enabled',
  TAB: 'mdc-tab',
};

const strings$15 = {
  FRAME_SELECTOR: '.mdc-tab-bar-scroller__scroll-frame',
  TABS_SELECTOR: '.mdc-tab-bar-scroller__scroll-frame__tabs',
  TAB_SELECTOR: '.mdc-tab',
  INDICATOR_FORWARD_SELECTOR: '.mdc-tab-bar-scroller__indicator--forward',
  INDICATOR_BACK_SELECTOR: '.mdc-tab-bar-scroller__indicator--back',
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

class MDCTabBarScrollerFoundation extends MDCFoundation {
  static get cssClasses() {
    return cssClasses$16;
  }

  static get strings() {
    return strings$15;
  }

  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      eventTargetHasClass: (/* target: EventTarget, className: string */) => /* boolean */ false,
      addClassToForwardIndicator: (/* className: string */) => {},
      removeClassFromForwardIndicator: (/* className: string */) => {},
      addClassToBackIndicator: (/* className: string */) => {},
      removeClassFromBackIndicator: (/* className: string */) => {},
      isRTL: () => /* boolean */ false,
      registerBackIndicatorClickHandler: (/* handler: EventListener */) => {},
      deregisterBackIndicatorClickHandler: (/* handler: EventListener */) => {},
      registerForwardIndicatorClickHandler: (/* handler: EventListener */) => {},
      deregisterForwardIndicatorClickHandler: (/* handler: EventListener */) => {},
      registerCapturedInteractionHandler: (/* evt: string, handler: EventListener */) => {},
      deregisterCapturedInteractionHandler: (/* evt: string, handler: EventListener */) => {},
      registerWindowResizeHandler: (/* handler: EventListener */) => {},
      deregisterWindowResizeHandler: (/* handler: EventListener */) => {},
      getNumberOfTabs: () => /* number */ 0,
      getComputedWidthForTabAtIndex: () => /* number */ 0,
      getComputedLeftForTabAtIndex: () => /* number */ 0,
      getOffsetWidthForScrollFrame: () => /* number */ 0,
      getScrollLeftForScrollFrame: () => /* number */ 0,
      setScrollLeftForScrollFrame: (/* scrollLeftAmount: number */) => {},
      getOffsetWidthForTabBar: () => /* number */ 0,
      setTransformStyleForTabBar: (/* value: string */) => {},
      getOffsetLeftForEventTarget: (/* target: EventTarget */) => /* number */ 0,
      getOffsetWidthForEventTarget: (/* target: EventTarget */) => /* number */ 0,
    };
  }

  constructor(adapter) {
    super(Object.assign(MDCTabBarScrollerFoundation.defaultAdapter, adapter));

    this.pointerDownRecognized_ = false;
    this.currentTranslateOffset_ = 0;
    this.focusedTarget_ = null;
    this.layoutFrame_ = 0;
    this.scrollFrameScrollLeft_ = 0;
    this.forwardIndicatorClickHandler_ = (evt) => this.scrollForward(evt);
    this.backIndicatorClickHandler_ = (evt) => this.scrollBack(evt);
    this.resizeHandler_ = () => this.layout();
    this.interactionHandler_ = (evt) => {
      if (evt.type == 'touchstart' || evt.type == 'mousedown') {
        this.pointerDownRecognized_ = true;
      }
      this.handlePossibleTabKeyboardFocus_(evt);

      if (evt.type == 'focus') {
        this.pointerDownRecognized_ = false;
      }
    };
  }

  init() {
    this.adapter_.registerBackIndicatorClickHandler(this.backIndicatorClickHandler_);
    this.adapter_.registerForwardIndicatorClickHandler(this.forwardIndicatorClickHandler_);
    this.adapter_.registerWindowResizeHandler(this.resizeHandler_);
    ['touchstart', 'mousedown', 'focus'].forEach((evtType) => {
      this.adapter_.registerCapturedInteractionHandler(evtType, this.interactionHandler_);
    });
    this.layout();
  }

  destroy() {
    this.adapter_.deregisterBackIndicatorClickHandler(this.backIndicatorClickHandler_);
    this.adapter_.deregisterForwardIndicatorClickHandler(this.forwardIndicatorClickHandler_);
    this.adapter_.deregisterWindowResizeHandler(this.resizeHandler_);
    ['touchstart', 'mousedown', 'focus'].forEach((evtType) => {
      this.adapter_.deregisterCapturedInteractionHandler(evtType, this.interactionHandler_);
    });
  }

  scrollBack(evt = null) {
    if (evt) {
      evt.preventDefault();
    }

    let tabWidthAccumulator = 0;
    let scrollTargetIndex = 0;

    for (let i = this.adapter_.getNumberOfTabs() - 1; i > 0; i--) {
      const tabOffsetLeft = this.adapter_.getComputedLeftForTabAtIndex(i);
      const tabBarWidthLessTabOffsetLeft = this.adapter_.getOffsetWidthForTabBar() - tabOffsetLeft;

      let tabIsNotOccluded = tabOffsetLeft > this.currentTranslateOffset_;
      if (this.isRTL_()) {
        tabIsNotOccluded = tabBarWidthLessTabOffsetLeft > this.currentTranslateOffset_;
      }

      if (tabIsNotOccluded) {
        continue;
      }

      tabWidthAccumulator += this.adapter_.getComputedWidthForTabAtIndex(i);

      const scrollTargetDetermined = tabWidthAccumulator > this.adapter_.getOffsetWidthForScrollFrame();
      if (scrollTargetDetermined) {
        scrollTargetIndex = this.isRTL_() ? i + 1 : i;
        break;
      }
    }

    this.scrollToTabAtIndex(scrollTargetIndex);
  }

  scrollForward(evt = null) {
    if (evt) {
      evt.preventDefault();
    }

    const scrollFrameOffsetWidth = this.adapter_.getOffsetWidthForScrollFrame() + this.currentTranslateOffset_;
    let scrollTargetIndex = 0;

    for (let i = 0; i < this.adapter_.getNumberOfTabs(); i++) {
      const tabOffsetLeftAndWidth =
        this.adapter_.getComputedLeftForTabAtIndex(i) + this.adapter_.getComputedWidthForTabAtIndex(i);
      let scrollTargetDetermined = tabOffsetLeftAndWidth > scrollFrameOffsetWidth;

      if (this.isRTL_()) {
        const frameOffsetAndTabWidth =
          scrollFrameOffsetWidth - this.adapter_.getComputedWidthForTabAtIndex(i);
        const tabOffsetLeftAndWidth =
          this.adapter_.getComputedLeftForTabAtIndex(i) + this.adapter_.getComputedWidthForTabAtIndex(i);
        const tabRightOffset =
          this.adapter_.getOffsetWidthForTabBar() - tabOffsetLeftAndWidth;

        scrollTargetDetermined = tabRightOffset > frameOffsetAndTabWidth;
      }

      if (scrollTargetDetermined) {
        scrollTargetIndex = i;
        break;
      }
    }

    this.scrollToTabAtIndex(scrollTargetIndex);
  }

  layout() {
    cancelAnimationFrame(this.layoutFrame_);
    this.scrollFrameScrollLeft_ = this.adapter_.getScrollLeftForScrollFrame();
    this.layoutFrame_ = requestAnimationFrame(() => this.layout_());
  }

  isRTL_() {
    return this.adapter_.isRTL();
  }

  handlePossibleTabKeyboardFocus_(evt) {
    if (!this.adapter_.eventTargetHasClass(evt.target, cssClasses$16.TAB) || this.pointerDownRecognized_) {
      return;
    }

    const resetAmt = this.isRTL_() ? this.scrollFrameScrollLeft_ : 0;
    this.adapter_.setScrollLeftForScrollFrame(resetAmt);

    this.focusedTarget_ = evt.target;
    const scrollFrameWidth = this.adapter_.getOffsetWidthForScrollFrame();
    const tabBarWidth = this.adapter_.getOffsetWidthForTabBar();
    const leftEdge = this.adapter_.getOffsetLeftForEventTarget(this.focusedTarget_);
    const rightEdge = leftEdge + this.adapter_.getOffsetWidthForEventTarget(this.focusedTarget_);

    let shouldScrollBack = rightEdge <= this.currentTranslateOffset_;
    let shouldScrollForward = rightEdge > this.currentTranslateOffset_ + scrollFrameWidth;

    if (this.isRTL_()) {
      const normalizedLeftOffset = tabBarWidth - leftEdge;
      shouldScrollBack = leftEdge >= tabBarWidth - this.currentTranslateOffset_;
      shouldScrollForward = normalizedLeftOffset > scrollFrameWidth + this.currentTranslateOffset_;
    }

    if (shouldScrollForward) {
      this.scrollForward();
    } else if (shouldScrollBack) {
      this.scrollBack();
    }

    this.pointerDownRecognized_ = false;
  }

  layout_() {
    const frameWidth = this.adapter_.getOffsetWidthForScrollFrame();
    const isOverflowing = this.adapter_.getOffsetWidthForTabBar() > frameWidth;

    if (!isOverflowing) {
      this.currentTranslateOffset_ = 0;
    }

    this.shiftFrame_();
    this.updateIndicatorEnabledStates_();
  }

  scrollToTabAtIndex(index) {
    const scrollTargetOffsetLeft = this.adapter_.getComputedLeftForTabAtIndex(index);
    const scrollTargetOffsetWidth = this.adapter_.getComputedWidthForTabAtIndex(index);

    this.currentTranslateOffset_ =
      this.normalizeForRTL_(scrollTargetOffsetLeft, scrollTargetOffsetWidth);

    requestAnimationFrame(() => this.shiftFrame_());
  }

  normalizeForRTL_(left, width) {
    return this.isRTL_() ? this.adapter_.getOffsetWidthForTabBar() - (left + width) : left;
  }

  shiftFrame_() {
    const shiftAmount = this.isRTL_() ?
      this.currentTranslateOffset_ : -this.currentTranslateOffset_;

    this.adapter_.setTransformStyleForTabBar(`translateX(${shiftAmount}px)`);
    this.updateIndicatorEnabledStates_();
  }

  updateIndicatorEnabledStates_() {
    const {INDICATOR_ENABLED} = cssClasses$16;
    if (this.currentTranslateOffset_ === 0) {
      this.adapter_.removeClassFromBackIndicator(INDICATOR_ENABLED);
    } else {
      this.adapter_.addClassToBackIndicator(INDICATOR_ENABLED);
    }

    const remainingTabBarWidth = this.adapter_.getOffsetWidthForTabBar() - this.currentTranslateOffset_;
    if (remainingTabBarWidth > this.adapter_.getOffsetWidthForScrollFrame()) {
      this.adapter_.addClassToForwardIndicator(INDICATOR_ENABLED);
    } else {
      this.adapter_.removeClassFromForwardIndicator(INDICATOR_ENABLED);
    }
  }
}

var TabScroller = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-tab-bar-scroller"},[_c('div',{staticClass:"mdc-tab-bar-scroller__indicator mdc-tab-bar-scroller__indicator--back"},[_c('a',{ref:"backIndicator",staticClass:"mdc-tab-bar-scroller__indicator__inner material-icons",attrs:{"href":"#","aria-label":"scroll back button"}},[_vm._v("navigate_before")])]),_c('div',{ref:"scrollFrame",staticClass:"mdc-tab-bar-scroller__scroll-frame"},[_c('mdc-tab-bar',{ref:"tabBar",staticClass:"mdc-tab-bar-scroller__scroll-frame__tabs"},[_vm._t("default")],2)],1),_c('div',{staticClass:"mdc-tab-bar-scroller__indicator mdc-tab-bar-scroller__indicator--forward"},[_c('a',{ref:"forwardIndicator",staticClass:"mdc-tab-bar-scroller__indicator__inner material-icons",attrs:{"href":"#","aria-label":"scroll forward button"}},[_vm._v("navigate_next")])])])},staticRenderFns: [],
  name: "MdcTabScroller",
  inheritAttrs: false,
  components: { MdcTabBar },
  computed: {},

  mounted() {
    const { $el } = this;
    const { backIndicator, forwardIndicator, scrollFrame, tabBar } = this.$refs;

    const styles = getComputedStyle($el);
    const transformProp = getCorrectPropertyName(window, "transform");

    this.foundation = new MDCTabBarScrollerFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      eventTargetHasClass: (target, className) => target.classList.contains(className),
      addClassToForwardIndicator: className => forwardIndicator.classList.add(className),
      removeClassFromForwardIndicator: className => forwardIndicator.classList.remove(className),
      addClassToBackIndicator: className => backIndicator.classList.add(className),
      removeClassFromBackIndicator: className => backIndicator.classList.remove(className),
      isRTL: () => styles.direction === "rtl",
      // Interaction handlers
      registerBackIndicatorClickHandler: (handler) => backIndicator.addEventListener("click", handler),
      deregisterBackIndicatorClickHandler: (handler) => backIndicator.removeEventListener("click", handler),
      registerForwardIndicatorClickHandler: (handler) => forwardIndicator.addEventListener("click", handler),
      deregisterForwardIndicatorClickHandler: (handler) => forwardIndicator.removeEventListener("click", handler),
      registerCapturedInteractionHandler: (evt, handler) => $el.addEventListener(evt, handler, true),
      deregisterCapturedInteractionHandler: (evt, handler) => $el.removeEventListener(evt, handler, true),
      registerWindowResizeHandler: (handler) => window.addEventListener("resize", handler),
      deregisterWindowResizeHandler: (handler) => window.removeEventListener("resize", handler),

      getNumberOfTabs: () => tabBar.tabs.length,
      getComputedWidthForTabAtIndex: index => tabBar.tabs[index].$el.computedWidth,
      getComputedLeftForTabAtIndex: index => tabBar.tabs[index].$el.computedLeft,
      getOffsetWidthForScrollFrame: () => scrollFrame.offsetWidth,
      getScrollLeftForScrollFrame: () => scrollFrame.scrollLeft,
      setScrollLeftForScrollFrame: value => {
        scrollFrame.scrollLeft = value;
      },
      getOffsetWidthForTabBar: () => tabBar.$el.offsetWidth,
      setTransformStyleForTabBar: value => {
        tabBar.$el.style[transformProp] = value;
      },
      getOffsetLeftForEventTarget: target => target.offsetLeft,
      getOffsetWidthForEventTarget: target => target.offsetWidth
    });
    this.foundation.init();
  },
  beforeDestroy() {
    this.foundation.destroy();
  }
};

var TabBar = {
  functional: true,
  props: {
    scroller: Boolean
  },
  render(h, ctx) {
    let tag = ctx.props.scroller ? TabScroller : MdcTabBar;
    return h(tag, ctx.data, ctx.children);
  }
};

function install$20(Vue) {
  Vue.component(Tab.name, Tab);
  Vue.component("mdc-tab-bar", TabBar);
}

var Tabs = /*#__PURE__*/Object.freeze({
  Tab: Tab,
  TabBar: TabBar,
  install: install$20
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
  ARIA_HIDDEN: 'aria-hidden',
  ROLE: 'role',
};

/** @enum {string} */
const cssClasses$17 = {
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
    return cssClasses$17;
  }

  /** @return enum {string} */
  static get strings() {
    return strings$16;
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
   * @param {!MDCTextFieldHelperTextAdapter} adapter
   */
  constructor(adapter) {
    super(Object.assign(MDCTextFieldHelperTextFoundation.defaultAdapter, adapter));
  }

  /**
   * Sets the content of the helper text field.
   * @param {string} content
   */
  setContent(content) {
    this.adapter_.setContent(content);
  }

  /** @param {boolean} isPersistent Sets the persistency of the helper text. */
  setPersistent(isPersistent) {
    if (isPersistent) {
      this.adapter_.addClass(cssClasses$17.HELPER_TEXT_PERSISTENT);
    } else {
      this.adapter_.removeClass(cssClasses$17.HELPER_TEXT_PERSISTENT);
    }
  }

  /**
   * @param {boolean} isValidation True to make the helper text act as an
   *   error validation message.
   */
  setValidation(isValidation) {
    if (isValidation) {
      this.adapter_.addClass(cssClasses$17.HELPER_TEXT_VALIDATION_MSG);
    } else {
      this.adapter_.removeClass(cssClasses$17.HELPER_TEXT_VALIDATION_MSG);
    }
  }

  /** Makes the helper text visible to the screen reader. */
  showToScreenReader() {
    this.adapter_.removeAttr(strings$16.ARIA_HIDDEN);
  }

  /**
   * Sets the validity of the helper text based on the input validity.
   * @param {boolean} inputIsValid
   */
  setValidity(inputIsValid) {
    const helperTextIsPersistent = this.adapter_.hasClass(cssClasses$17.HELPER_TEXT_PERSISTENT);
    const helperTextIsValidationMsg = this.adapter_.hasClass(cssClasses$17.HELPER_TEXT_VALIDATION_MSG);
    const validationMsgNeedsDisplay = helperTextIsValidationMsg && !inputIsValid;

    if (validationMsgNeedsDisplay) {
      this.adapter_.setAttr(strings$16.ROLE, 'alert');
    } else {
      this.adapter_.removeAttr(strings$16.ROLE);
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
    this.adapter_.setAttr(strings$16.ARIA_HIDDEN, 'true');
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
    return strings$17;
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
   * @param {!MDCTextFieldIconAdapter} adapter
   */
  constructor(adapter) {
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

/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
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
 * Copyright 2018 Google Inc. All Rights Reserved.
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
const cssClasses$18 = {
  LINE_RIPPLE_ACTIVE: 'mdc-line-ripple--active',
  LINE_RIPPLE_DEACTIVATING: 'mdc-line-ripple--deactivating',
};

/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
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
 * @extends {MDCFoundation<!MDCLineRippleAdapter>}
 * @final
 */
class MDCLineRippleFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get cssClasses() {
    return cssClasses$18;
  }

  /**
   * {@see MDCLineRippleAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCLineRippleAdapter}
   */
  static get defaultAdapter() {
    return /** @type {!MDCLineRippleAdapter} */ ({
      addClass: () => {},
      removeClass: () => {},
      hasClass: () => {},
      setAttr: () => {},
      registerEventHandler: () => {},
      deregisterEventHandler: () => {},
    });
  }

  /**
   * @param {!MDCLineRippleAdapter=} adapter
   */
  constructor(adapter = /** @type {!MDCLineRippleAdapter} */ ({})) {
    super(Object.assign(MDCLineRippleFoundation.defaultAdapter, adapter));

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
   * Activates the line ripple
   */
  activate() {
    this.adapter_.removeClass(cssClasses$18.LINE_RIPPLE_DEACTIVATING);
    this.adapter_.addClass(cssClasses$18.LINE_RIPPLE_ACTIVE);
  }

  /**
   * Sets the center of the ripple animation to the given X coordinate.
   * @param {!number} xCoordinate
   */
  setRippleCenter(xCoordinate) {
    const attributeString =
        `transform-origin: ${xCoordinate}px center`;

    this.adapter_.setAttr('style', attributeString);
  }

  /**
   * Deactivates the line ripple
   */
  deactivate() {
    this.adapter_.addClass(cssClasses$18.LINE_RIPPLE_DEACTIVATING);
  }

  /**
   * Handles a transition end event
   * @param {!Event} evt
   */
  handleTransitionEnd(evt) {
    // Wait for the line ripple to be either transparent or opaque
    // before emitting the animation end event
    const isDeactivating = this.adapter_.hasClass(cssClasses$18.LINE_RIPPLE_DEACTIVATING);

    if (evt.propertyName === 'opacity') {
      if (isDeactivating) {
        this.adapter_.removeClass(cssClasses$18.LINE_RIPPLE_ACTIVE);
        this.adapter_.removeClass(cssClasses$18.LINE_RIPPLE_DEACTIVATING);
      }
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
const cssClasses$19 = {
  LABEL_FLOAT_ABOVE: 'mdc-floating-label--float-above',
  LABEL_SHAKE: 'mdc-floating-label--shake',
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
 * @extends {MDCFoundation<!MDCFloatingLabelAdapter>}
 * @final
 */
class MDCFloatingLabelFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get cssClasses() {
    return cssClasses$19;
  }

  /**
   * {@see MDCFloatingLabelAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCFloatingLabelAdapter}
   */
  static get defaultAdapter() {
    return /** @type {!MDCFloatingLabelAdapter} */ ({
      addClass: () => {},
      removeClass: () => {},
      getWidth: () => {},
      registerInteractionHandler: () => {},
      deregisterInteractionHandler: () => {},
    });
  }

  /**
   * @param {!MDCFloatingLabelAdapter} adapter
   */
  constructor(adapter) {
    super(Object.assign(MDCFloatingLabelFoundation.defaultAdapter, adapter));

    /** @private {function(!Event): undefined} */
    this.shakeAnimationEndHandler_ = () => this.handleShakeAnimationEnd_();
  }

  init() {
    this.adapter_.registerInteractionHandler('animationend', this.shakeAnimationEndHandler_);
  }

  destroy() {
    this.adapter_.deregisterInteractionHandler('animationend', this.shakeAnimationEndHandler_);
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
   * @param {boolean} shouldShake adds shake class if true,
   * otherwise removes shake class.
   */
  shake(shouldShake) {
    const {LABEL_SHAKE} = MDCFloatingLabelFoundation.cssClasses;
    if (shouldShake) {
      this.adapter_.addClass(LABEL_SHAKE);
    } else {
      this.adapter_.removeClass(LABEL_SHAKE);
    }
  }

  /**
   * Styles the label to float or dock.
   * @param {boolean} shouldFloat adds float class if true, otherwise remove
   * float and shake class to dock label.
   */
  float(shouldFloat) {
    const {LABEL_FLOAT_ABOVE, LABEL_SHAKE} = MDCFloatingLabelFoundation.cssClasses;
    if (shouldFloat) {
      this.adapter_.addClass(LABEL_FLOAT_ABOVE);
    } else {
      this.adapter_.removeClass(LABEL_FLOAT_ABOVE);
      this.adapter_.removeClass(LABEL_SHAKE);
    }
  }

  /**
   * Handles an interaction event on the root element.
   */
  handleShakeAnimationEnd_() {
    const {LABEL_SHAKE} = MDCFloatingLabelFoundation.cssClasses;
    this.adapter_.removeClass(LABEL_SHAKE);
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

/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
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
const strings$18 = {
  PATH_SELECTOR: '.mdc-notched-outline__path',
  IDLE_OUTLINE_SELECTOR: '.mdc-notched-outline__idle',
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
 * @extends {MDCFoundation<!MDCNotchedOutlineAdapter>}
 * @final
 */
class MDCNotchedOutlineFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get strings() {
    return strings$18;
  }

  /**
   * {@see MDCNotchedOutlineAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCNotchedOutlineAdapter}
   */
  static get defaultAdapter() {
    return /** @type {!MDCNotchedOutlineAdapter} */ ({
      getWidth: () => {},
      getHeight: () => {},
      setOutlinePathAttr: () => {},
      getIdleOutlineStyleValue: () => {},
    });
  }

  /**
   * @param {!MDCNotchedOutlineAdapter} adapter
   */
  constructor(adapter) {
    super(Object.assign(MDCNotchedOutlineFoundation.defaultAdapter, adapter));
  }

  /**
   * Updates the SVG path of the focus outline element based on the notchWidth
   * and the RTL context.
   * @param {number} notchWidth
   * @param {boolean=} isRtl
   */
  updateSvgPath(notchWidth, isRtl = false) {
    // Fall back to reading a specific corner's style because Firefox doesn't report the style on border-radius.
    const radiusStyleValue = this.adapter_.getIdleOutlineStyleValue('border-radius') ||
        this.adapter_.getIdleOutlineStyleValue('border-top-left-radius');
    const radius = parseFloat(radiusStyleValue);
    const width = this.adapter_.getWidth();
    const height = this.adapter_.getHeight();
    const cornerWidth = radius + 1.2;
    const leadingStrokeLength = Math.abs(11 - cornerWidth);
    const paddedNotchWidth = notchWidth + 8;

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
      path = 'M' + (cornerWidth + leadingStrokeLength + paddedNotchWidth) + ',' + 1
        + 'h' + (width - (2 * cornerWidth) - paddedNotchWidth - leadingStrokeLength)
        + pathMiddle
        + 'h' + leadingStrokeLength;
    } else {
      path = 'M' + (width - cornerWidth - leadingStrokeLength) + ',' + 1
        + 'h' + leadingStrokeLength
        + pathMiddle
        + 'h' + (width - (2 * cornerWidth) - paddedNotchWidth - leadingStrokeLength);
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
const strings$19 = {
  ARIA_CONTROLS: 'aria-controls',
  INPUT_SELECTOR: '.mdc-text-field__input',
  LABEL_SELECTOR: '.mdc-floating-label',
  ICON_SELECTOR: '.mdc-text-field__icon',
  OUTLINE_SELECTOR: '.mdc-notched-outline',
  BOTTOM_LINE_SELECTOR: '.mdc-line-ripple',
};

/** @enum {string} */
const cssClasses$20 = {
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
const numbers$4 = {
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


// whitelist based off of https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
// under section: `Validation-related attributes`
const VALIDATION_ATTR_WHITELIST = [
  'pattern', 'min', 'max', 'required', 'step', 'minlength', 'maxlength',
];

/**
 * @extends {MDCFoundation<!MDCTextFieldAdapter>}
 * @final
 */
class MDCTextFieldFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get cssClasses() {
    return cssClasses$20;
  }

  /** @return enum {string} */
  static get strings() {
    return strings$19;
  }

  /** @return enum {string} */
  static get numbers() {
    return numbers$4;
  }

  /** @return {boolean} */
  get shouldShake() {
    return !this.isValid() && !this.isFocused_;
  }

  /** @return {boolean} */
  get shouldFloat() {
    return !this.isBadInput_() && (!!this.getValue() || this.isFocused_);
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
      registerValidationAttributeChangeHandler: () => {},
      deregisterValidationAttributeChangeHandler: () => {},
      getNativeInput: () => {},
      isFocused: () => {},
      isRtl: () => {},
      activateLineRipple: () => {},
      deactivateLineRipple: () => {},
      setLineRippleTransformOrigin: () => {},
      shakeLabel: () => {},
      floatLabel: () => {},
      hasLabel: () => {},
      getLabelWidth: () => {},
      hasOutline: () => {},
      updateOutlinePath: () => {},
    });
  }

  /**
   * @param {!MDCTextFieldAdapter} adapter
   * @param {!FoundationMapType=} foundationMap Map from subcomponent names to their subfoundations.
   */
  constructor(adapter, foundationMap = /** @type {!FoundationMapType} */ ({})) {
    super(Object.assign(MDCTextFieldFoundation.defaultAdapter, adapter));

    /** @type {!MDCTextFieldHelperTextFoundation|undefined} */
    this.helperText_ = foundationMap.helperText;
    /** @type {!MDCTextFieldIconFoundation|undefined} */
    this.icon_ = foundationMap.icon;

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
    this.setPointerXOffset_ = (evt) => this.setTransformOrigin(evt);
    /** @private {function(!Event): undefined} */
    this.textFieldInteractionHandler_ = () => this.handleTextFieldInteraction();
    /** @private {function(!Array): undefined} */
    this.validationAttributeChangeHandler_ = (mutations) => this.handleValidationAttributeMutation_(mutations);
    /** @private {!MutationObserver} */
    this.validationObserver_;
  }

  init() {
    this.adapter_.addClass(MDCTextFieldFoundation.cssClasses.UPGRADED);
    // Ensure label does not collide with any pre-filled value.
    if (this.adapter_.hasLabel() && this.getValue()) {
      this.adapter_.floatLabel(this.shouldFloat);
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
    this.validationObserver_ = this.adapter_.registerValidationAttributeChangeHandler(
      this.validationAttributeChangeHandler_);
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
    this.adapter_.deregisterValidationAttributeChangeHandler(this.validationObserver_);
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
   * Handles validation attribute changes
   * @param {Array<MutationRecord>} mutationsList
   * @private
   */
  handleValidationAttributeMutation_(mutationsList) {
    mutationsList.some((mutation) => {
      if (VALIDATION_ATTR_WHITELIST.indexOf(mutation.attributeName) > -1) {
        this.styleValidity_(true);
        return true;
      }
    });
  }

  /**
   * Updates the focus outline for outlined text fields.
   */
  updateOutline() {
    if (!this.adapter_.hasOutline() || !this.adapter_.hasLabel()) {
      return;
    }

    const isDense = this.adapter_.hasClass(cssClasses$20.DENSE);
    const labelScale = isDense ? numbers$4.DENSE_LABEL_SCALE : numbers$4.LABEL_SCALE;
    const labelWidth = this.adapter_.getLabelWidth() * labelScale;
    const isRtl = this.adapter_.isRtl();
    this.adapter_.updateOutlinePath(labelWidth, isRtl);
  }

  /**
   * Activates the text field focus state.
   */
  activateFocus() {
    this.isFocused_ = true;
    this.styleFocused_(this.isFocused_);
    this.adapter_.activateLineRipple();
    this.updateOutline();
    if (this.adapter_.hasLabel()) {
      this.adapter_.shakeLabel(this.shouldShake);
      this.adapter_.floatLabel(this.shouldFloat);
    }
    if (this.helperText_) {
      this.helperText_.showToScreenReader();
    }
  }

  /**
   * Sets the line ripple's transform origin, so that the line ripple activate
   * animation will animate out from the user's click location.
   * @param {!Event} evt
   */
  setTransformOrigin(evt) {
    const targetClientRect = evt.target.getBoundingClientRect();
    const evtCoords = {x: evt.clientX, y: evt.clientY};
    const normalizedX = evtCoords.x - targetClientRect.left;
    this.adapter_.setLineRippleTransformOrigin(normalizedX);
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
   * Deactivates the Text Field's focus state.
   */
  deactivateFocus() {
    this.isFocused_ = false;
    this.adapter_.deactivateLineRipple();
    const input = this.getNativeInput_();
    const shouldRemoveLabelFloat = !input.value && !this.isBadInput_();
    const isValid = this.isValid();
    this.styleValidity_(isValid);
    this.styleFocused_(this.isFocused_);
    if (this.adapter_.hasLabel()) {
      this.adapter_.shakeLabel(this.shouldShake);
      this.adapter_.floatLabel(this.shouldFloat);
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
    if (this.adapter_.hasLabel()) {
      this.adapter_.shakeLabel(this.shouldShake);
      this.adapter_.floatLabel(this.shouldFloat);
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
    if (this.adapter_.hasLabel()) {
      this.adapter_.shakeLabel(this.shouldShake);
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

function lineRippleFactory($el) {
  return new MDCLineRippleFoundation({
    addClass: className => $el.classList.add(className),
    removeClass: className => $el.classList.remove(className),
    hasClass: className => $el.classList.contains(className),
    setStyle: (prop, value) => {
      $el.style[prop] = value;
    },
    registerEventHandler: (type, handler) => $el.addEventListener(type, handler),
    deregisterEventHandler: (type, handler) => $el.removeEventListener(type, handler)
  });
}
function helperTextFactory($el) {
  return new MDCTextFieldHelperTextFoundation({
    addClass: className => $el.classList.add(className),
    removeClass: className => $el.classList.remove(className),
    hasClass: className => $el.classList.contains(className),
    setAttr: (attr, value) => $el.setAttribute(attr, value),
    removeAttr: attr => $el.removeAttribute(attr),
    setContent: content => {
      $el.textContent = content;
    }
  });
}
function iconFactory($el, notifyIconAction) {
  return new MDCTextFieldIconFoundation({
    setAttr: (attr, value) => $el.setAttribute(attr, value),
    registerInteractionHandler: (tvtType, handler) => $el.addEventListener(type, handler),
    deregisterInteractionHandler: (type, handler) => $el.removeEventListener(type, handler),
    notifyIconAction
  });
}
function labelFactory($el) {
  return new MDCFloatingLabelFoundation({
    addClass: className => $el.classList.add(className),
    removeClass: className => $el.classList.remove(className),
    getWidth: () => $el.offsetWidth,
    registerInteractionHandler: (evtType, handler) => $el.addEventListener(evtType, handler),
    deregisterInteractionHandler: (evtType, handler) => $el.removeEventListener(evtType, handler)
  });
}
function outlineFactory($el, { outlinePath, idleOutline }) {
  const styles = idleOutline && window.getComputedStyle(idleOutline);
  
  return new MDCNotchedOutlineFoundation({
    getWidth: () => $el.offsetWidth,
    getHeight: () => $el.offsetHeight,
    addClass: className => $el.classList.add(className),
    removeClass: className => $el.classList.remove(className),
    setOutlinePathAttr: value => outlinePath.setAttribute("d", value),
    getIdleOutlineStyleValue: prop => styles && styles.getPropertyValue(prop)
  });
}

function getHelperText(helperText) {
  return helperText.classList.contains("mdc-text-field-helper-text") ? helperText : null;
}
function uuid() {
  return "_mdtf_" + Math.random().toString(36).substr(2);
}

var Textfield = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-text-field",class:_vm.cssClasses},[(_vm.leadingIcon)?_c('mdc-icon',{ref:"icon",attrs:{"name":"text-field","icon":_vm.leadingIcon}}):_vm._e(),_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],ref:"input",staticClass:"mdc-text-field__input",domProps:{"value":(_vm.model)},on:{"input":function($event){if($event.target.composing){ return; }_vm.model=$event.target.value;}}},'input',_vm.inputAttrs,false)),(!_vm.fullwidth)?_c('label',{ref:"label",staticClass:"mdc-floating-label",attrs:{"for":_vm.uuid}},[_vm._v(_vm._s(_vm.label))]):_vm._e(),(!_vm.leadingIcon && _vm.trailingIcon)?_c('mdc-icon',{ref:"icon",attrs:{"name":"text-field","icon":_vm.trailingIcon}}):_vm._e(),(!_vm.outlined)?_c('div',{ref:"lineRipple",staticClass:"mdc-line-ripple"}):[_c('div',{ref:"outline",staticClass:"mdc-text-field__outline"},[_c('svg',[_c('path',{ref:"outlinePath",staticClass:"mdc-text-field__outline-path"})])]),_c('div',{ref:"idleOutline",staticClass:"mdc-text-field__idle-outline"})]],2)},staticRenderFns: [],
  name: "MdcTextfield",
  components: { MdcIcon },
  props: {
    box: Boolean,
    outlined: Boolean,
    fullwidth: Boolean,
    dense: Boolean,
    required: Boolean,
    disabled: Boolean,

    id: String,
    type: String,
    value: String,
    label: String,

    // Validation
    pattern: String,
    min: Number,
    max: Number,
    step: Number,
    minlength: Number,
    maxlength: Number,

    // Icon definitions
    trailingIcon: String,
    leadingIcon: String
  },
  watch: {
    disabled(value) {
      this.foundation.setDisabled(value);
    }
  },
  computed: {
    cssClasses() {
      return {
        "mdc-text-field--box": this.box,
        "mdc-text-field--outlined": this.outlined,
        "mdc-text-field--fullwidth": this.fullwidth,
        "mdc-text-field--dense": this.dense,
        "mdc-text-field--with-leading-icon": this.leadingIcon,
        "mdc-text-field--with-trailing-icon": !this.leadingIcon && this.trailingIcon
      };
    },
    hasIconListener() {
      return !!(this.$listeners && this.$listeners.icon);
    },
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    inputAttrs() {
      const label = this.fullwidth && this.label;

      return {
        required: this.required,
        placeholder: label,
        ariaLabel: label,

        // Validation
        id: this.uuid,
        type: this.type,
        pattern: this.pattern,
        min: this.min,
        max: this.max,
        step: this.step,
        minlength: this.minlength,
        maxlength: this.maxlength,
      };
    }
  },
  data() {
    return { uuid: this.id || uuid()  };
  },

  mounted() {
    const { $el } = this;
    const { input } = this.$refs;

    const styles = getComputedStyle($el);
    this.foundationMap = this.$_getFoundationMap();

    if(this.$refs.lineRipple) {
      this._lineRipple = lineRippleFactory(this.$refs.lineRipple);
    }
    if(this.$refs.label) {
      this._label = labelFactory(this.$refs.label);
    }
    if(this.$refs.outline) {
      this._outline = outlineFactory(this.$refs.outline, this.$refs);
    }

    this.foundation = new MDCTextFieldFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      hasClass: className => $el.classList.contains(className),
      // Interactions
      registerTextFieldInteractionHandler: (type, handler) => $el.addEventListener(type, handler),
      deregisterTextFieldInteractionHandler: (type, handler) => $el.removeEventListener(type, handler),
      registerInputInteractionHandler: (type, handler) => input.addEventListener(type, handler),
      deregisterInputInteractionHandler: (type, handler) => input.removeEventListener(type, handler),
      registerValidationAttributeChangeHandler: handler => {
        const observer = new MutationObserver(handler);
        observer.observe(this.$refs.input, { attributes: true });
        return observer;
      },
      deregisterValidationAttributeChangeHandler: observer => observer.disconnect(),
      
      getNativeInput: () => input,
      isFocused: () => document.activeElement === input,
      isRtl: () => styles.direction === "rtl",

      // Line Ripple methods
      activateLineRipple: () => this._lineRipple && this._lineRipple.activate(),
      deactivateLineRipple: () => this._lineRipple && this._lineRipple.deactivate(),
      setLineRippleTransformOrigin: normalizedX => this._lineRipple && this._lineRipple.setRippleCenter(normalizedX),
      // Label methods
      shakeLabel: shouldShake => this._label.shake(shouldShake),
      floatLabel: shouldFloat => this._label.float(shouldFloat),
      hasLabel: () => !!this._label,
      getLabelWidth: () => this._label.getWidth(),
      // Outline methods
      hasOutline: () => !!this._outline,
      notchOutline: (labelWidth, isRtl) => this._outline.notch(labelWidth, isRtl),
      closeOutline: () => this._outline.closeNotch(),
    }, this.foundationMap);

    this.foundation.init();
    this.foundation.setDisabled(this.disabled);
  },
  beforeDestroy() {
    this.foundation.destroy();

    if(this.foundationMap.helperText) {
      this.foundationMap.helperText.destroy();
    }
    if(this.foundationMap.icon) {
      this.foundationMap.icon.destroy();
    }
    if(this._lineRipple) {
      this._lineRipple.destroy();
    }
    if(this._label) {
      this._label.destroy();
    }
    if(this._outline) {
      this._outline.destroy();
    }
  },
  methods: {
    $_getFoundationMap() {
      const { icon } = this.$refs;
      const helperText = getHelperText(this.$el.nextElementSibling);

      return {
        helperText: helperText && helperTextFactory(helperText),
        icon: icon && this.hasIconListener && iconFactory(icon.$el, () => this.$emit("icon")),
      };
    }
  }
};

function getHelperText$1(helperText) {
  return helperText.classList.contains("mdc-text-field-helper-text") ? helperText : null;
}

var Textarea = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mdc-text-field mdc-text-field--textarea",class:_vm.cssClasses},[_c('textarea',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],ref:"input",staticClass:"mdc-text-field__input",attrs:{"label":_vm.fullwidth && _vm.label},domProps:{"value":(_vm.model)},on:{"input":function($event){if($event.target.composing){ return; }_vm.model=$event.target.value;}}},'textarea',_vm.$attrs,false)),(!_vm.fullwidth)?_c('label',{ref:"label",staticClass:"mdc-floating-label"},[_vm._v(_vm._s(_vm.label))]):_vm._e()])},staticRenderFns: [],
  name: "MdcTextarea",
  inheritAttrs: false,
  props: {
    fullwidth: Boolean,
    disabled: Boolean,
    dense: Boolean,
    required: Boolean,
    // For v-model
    value: String,
    label: String
  },
  watch: {
    disabled(value) {
      this.foundation.setDisabled(value);
    },
    required(value) {
      this.foundation.setRequired(value);
    }
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
        "mdc-text-field--fullwidth": this.fullwidth,
        "mdc-text-field--dense": this.dense
      };
    }
  },
  mounted() {
    const { $el } = this;
    const { input } = this.$refs;

    const styles = getComputedStyle($el);
    const foundationMap = this.$_getFoundationMap();

    this.foundation = new MDCTextFieldFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      hasClass: className => $el.classList.contains(className),
      // Interactions
      registerTextFieldInteractionHandler: (evtType, handler) => $el.addEventListener(evtType, handler),
      deregisterTextFieldInteractionHandler: (evtType, handler) => $el.removeEventListener(evtType, handler),
      registerInputInteractionHandler: (evtType, handler) => input.addEventListener(evtType, handler),
      deregisterInputInteractionHandler: (evtType, handler) => input.removeEventListener(evtType, handler),
      
      getNativeInput: () => input,
      isFocused: () => document.activeElement === input,
      isRtl: () => styles.direction === "rtl",

      activateLineRipple: () => {},
      deactivateLineRipple: () => {},
      setLineRippleTransformOrigin: () => {},
    }, foundationMap);

    this.foundation.init();
    this.foundation.setDisabled(this.disabled);
    this.foundation.setRequired(this.required);
    this.foundation.setValue(this.value);
  },
  beforeDestroy() {
    this.foundation.destroy();
  },
  methods: {
    $_getFoundationMap(vm) {
      const { lineRipple, icon, label, outline, outlinePath, idleOutline } = this.$refs;
      let helperText = getHelperText$1(this.$el.nextElementSibling);

      return {
        lineRipple: lineRipple && lineRippleFactory(lineRipple),
        helperText: helperText && helperTextFactory(helperText),
        icon: icon && iconFactory(icon, () => this.$emit("icon")),
        label: label && labelFactory(label),
        outline: outline && outlineFactory(outline, outlinePath, idleOutline),
      };
    }
  }
};

var Textfield$1 = {
  functional: true,
  props: {
    textarea: Boolean
  },
  render(h, ctx) {
    let tag = ctx.props.textarea ? Textarea : Textfield;
    return h(tag, ctx.data, ctx.children);
  }
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

function install$21(Vue) {
  Vue.component("mdc-textfield", Textfield$1);
  Vue.component(TextfieldHelpertext.name, TextfieldHelpertext);
}

var Textfield$2 = /*#__PURE__*/Object.freeze({
  Textfield: Textfield$1,
  TextfieldHelpertext: TextfieldHelpertext,
  install: install$21
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

const cssClasses$21 = {
  FIXED: 'mdc-toolbar--fixed',
  FIXED_LASTROW: 'mdc-toolbar--fixed-lastrow-only',
  FIXED_AT_LAST_ROW: 'mdc-toolbar--fixed-at-last-row',
  TOOLBAR_ROW_FLEXIBLE: 'mdc-toolbar--flexible',
  FLEXIBLE_DEFAULT_BEHAVIOR: 'mdc-toolbar--flexible-default-behavior',
  FLEXIBLE_MAX: 'mdc-toolbar--flexible-space-maximized',
  FLEXIBLE_MIN: 'mdc-toolbar--flexible-space-minimized',
};

const strings$20 = {
  TITLE_SELECTOR: '.mdc-toolbar__title',
  FIRST_ROW_SELECTOR: '.mdc-toolbar__row:first-child',
  CHANGE_EVENT: 'MDCToolbar:change',
};

const numbers$5 = {
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
    return cssClasses$21;
  }

  static get strings() {
    return strings$20;
  }

  static get numbers() {
    return numbers$5;
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

var Toolbar = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('header',{staticClass:"mdc-toolbar",class:_vm.cssClasses},[_vm._t("default")],2)},staticRenderFns: [],
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
    shrinkToFit: Boolean
  },
  computed: {
    cssClasses() {
      return {
        "mdc-toolbar__section--align-start": this.alignStart,
        "mdc-toolbar__section--align-end": this.alignEnd,
        "mdc-toolbar__section--shrink-to-fit": this.shrinkToFit,
      };
    }
  }
};

var ToolbarTitle = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"mdc-toolbar__title"},[_vm._t("default")],2)},staticRenderFns: [],
  name: "MdcToolbarTitle"
};

var ToolbarIcon = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('mdc-icon',{attrs:{"tag":_vm.tag,"name":"toolbar","icon":_vm.icon,"label":_vm.label,"href":_vm.link}},[_vm._v(_vm._s(_vm.icon))])},staticRenderFns: [],
  name: "MdcToolbarIcon",
  components: { MdcIcon },
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

function install$22(Vue) {
  Vue.component(Toolbar.name, Toolbar);
  Vue.component(ToolbarRow.name, ToolbarRow);
  Vue.component(ToolbarSection.name, ToolbarSection);
  Vue.component(ToolbarTitle.name, ToolbarTitle);
  Vue.component(ToolbarIcon.name, ToolbarIcon);
  Vue.component(ToolbarMenuIcon.name, ToolbarMenuIcon);
}

var Toolbar$1 = /*#__PURE__*/Object.freeze({
  Toolbar: Toolbar,
  ToolbarRow: ToolbarRow,
  ToolbarSection: ToolbarSection,
  ToolbarTitle: ToolbarTitle,
  ToolbarIcon: ToolbarIcon,
  ToolbarMenuIcon: ToolbarMenuIcon,
  install: install$22
});

const DEFAULT_OPTS = {
  theme: "",
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
      body.classList.add(`mdc-theme--${opts.theme}`);
    }
    
    // Add all the packages as global components
    Vue.use(App$1);
    Vue.use(Button);
    Vue.use(Card$1);
    Vue.use(Checkbox$1);
    Vue.use(Chips);
    Vue.use(Dialog$1);
    Vue.use(Drawer$1);
    Vue.use(Fab$1);
    Vue.use(FormField$1);
    Vue.use(GridList$1);
    Vue.use(IconToggle$1);
    Vue.use(LayoutGrid$1);
    Vue.use(LinearProgress$1);
    Vue.use(List$1);
    Vue.use(Menu$1);
    Vue.use(Radio$1);
    Vue.use(Select$1);
    //Vue.use(Slider);
    Vue.use(Snackbar$1);
    Vue.use(Switch$1);
    Vue.use(Tabs);
    Vue.use(Textfield$2);
    Vue.use(Toolbar$1);
  }
};

module.exports = index;
