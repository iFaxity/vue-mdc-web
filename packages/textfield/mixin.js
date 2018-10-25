import { MDCTextFieldFoundation } from '@material/textfield';
import { MDCFloatingLabel } from '../floating-label';
import { MDCLineRipple } from '../line-ripple';
import { MDCNotchedOutline } from '../notched-outline';

// Foundations for HelperText and Icon
import { MDCTextFieldHelperTextFoundation, MDCTextFieldIconFoundation } from '@material/textfield';
function helperTextFactory(helperText) {
  // Check if helperText is really a helper text element
  const $el = helperText && helperText.classList.contains('mdc-text-field-helper-text') ? helperText : null;
  if (!$el) return; // return undefined if a valid helperText doesn't exist

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
    getAttr: attr => $el.getAttribute(attr),
    setAttr: (attr, value) => $el.setAttribute(attr, value),
    removeAttr: attr => $el.removeAttribute(attr),
    registerInteractionHandler: (tvtType, handler) => $el.addEventListener(type, handler),
    deregisterInteractionHandler: (type, handler) => $el.removeEventListener(type, handler),
    notifyIconAction
  });
}

// Creates a uuid for the labelFor attribute.
function uuid() {
  return '_mdtf_' + Math.random().toString(36).substr(2);
}

export default {
  components: {
    MdcFloatingLabel: MDCFloatingLabel,
    MdcLineRipple: MDCLineRipple,
    MdcNotchedOutline: MDCNotchedOutline,
  },
  props: {
    fullwidth: Boolean,
    dense: Boolean,
    disabled: Boolean,
    required: Boolean,

    id: String,
    value: String,
    label: String,
    name: String,

    // Validation
    pattern: String,
    minlength: [String, Number],
    maxlength: [String, Number],
  },
  computed: {
    hasIconListener() {
      return !!(this.$listeners && this.$listeners.icon);
    },
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    },
    inputAttrs() {
      const label = this.fullwidth && this.label;

      return {
        required: this.required,
        placeholder: label,
        ariaLabel: label,
        name: this.name,

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
  watch: {
    disabled(value) {
      this.foundation.setDisabled(value);
    },
    value(value) {
      const { floatingLabel } = this.$refs;

      if(value && floatingLabel) {
        this.$nextTick(() => {
          const { shouldFloat } = this.foundation;
          floatingLabel.float(shouldFloat);
          this.foundation.notchOutline(shouldFloat);
        });
      }
    },
  },
  data() {
    return { uuid: this.id || uuid() };
  },
  
  mounted() {
    const { $el } = this;
    const { input, lineRipple, notchedOutline, floatingLabel } = this.$refs;
    const styles = window.getComputedStyle($el);
    
    // Run each factory and save them into variables.
    this._helperText = helperTextFactory(this.$el.nextElementSibling);

    if(this.$refs.icon && this.hasIconListener) {
      this._icon = iconFactory(this.$refs.icon, () => this.$emit('icon'));
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
        observer.observe(input, { attributes: true });
        return observer;
      },
      deregisterValidationAttributeChangeHandler: observer => observer.disconnect(),
      
      getNativeInput: () => input,
      isFocused: () => document.activeElement === input,
      isRtl: () => styles.direction === 'rtl',
      
      // MDCLineRipple
      activateLineRipple: () => lineRipple && lineRipple.activate(),
      deactivateLineRipple: () => lineRipple && lineRipple.deactivate(),
      setLineRippleTransformOrigin: normalizedX => lineRipple && lineRipple.setRippleCenter(normalizedX),
      // MDCFloatingLabel
      shakeLabel: shouldShake => floatingLabel.shake(shouldShake),
      floatLabel: shouldFloat => floatingLabel.float(shouldFloat),
      hasLabel: () => !!floatingLabel,
      getLabelWidth: () => floatingLabel.getWidth(),
      // MDCNotchedOutline
      hasOutline: () => !!notchedOutline,
      notchOutline: (labelWidth, isRtl) => notchedOutline.notch(labelWidth, isRtl),
      closeOutline: () => notchedOutline.closeNotch(),
    }, { helperText: this._helperText, icon: this._icon });

    this.foundation.init();
    this.foundation.setDisabled(this.disabled);
  },
  beforeDestroy() {
    if(this._helperText) {
      this._helperText.destroy();
    }
    if(this._icon) {
      this._icon.destroy();
    }

    this.foundation.destroy();
  }
};
