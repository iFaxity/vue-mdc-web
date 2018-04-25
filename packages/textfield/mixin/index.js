import { lineRippleFactory, labelFactory, outlineFactory, iconFactory, helperTextFactory } from './foundations';

function getHelperText(helperText) {
  return helperText.classList.contains('mdc-text-field-helper-text') ? helperText : null;
}

export default {
  mounted() {
    const { $el } = this.$el;
    const { input } = this.$refs;
    const styles = getComputedStyle($el);
    
    // Run each factory and save them into variables.
    this._helperText = helperTextFactory(getHelperText(this.$el.nextElementSibling));

    if(this.$refs.lineRipple) {
      this._lineRipple = lineRippleFactory(this.$refs.lineRipple);
    }
    if(this.$refs.label) {
      this._label = labelFactory(this.$refs.label);
    }
    if(this.$refs.outline) {
      this._outline = outlineFactory(this.$refs.outline, this.$refs);
    }
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
        observer.observe(this.$refs.input, { attributes: true });
        return observer;
      },
      deregisterValidationAttributeChangeHandler: observer => observer.disconnect(),
      
      getNativeInput: () => input,
      isFocused: () => document.activeElement === input,
      isRtl: () => styles.direction === 'rtl',
  
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
    }, { helperText: this._helperText, icon: this._icon });

    this.foundation.init();
    this.foundation.setDisabled(this.disabled);
  },
  beforeDestroy() {
    this.foundation.destroy();
  }
};