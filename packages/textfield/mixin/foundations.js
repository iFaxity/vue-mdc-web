/*vimport { MDCLineRippleFoundation } from '@material/line-ripple';
import { MDCFloatingLabelFoundation } from '@material/floating-label';
import { MDCNotchedOutlineFoundation } from '@material/notched-outline';*/
import { MDCTextFieldFoundation, MDCTextFieldHelperTextFoundation, MDCTextFieldIconFoundation } from '@material/textfield';

export function helperTextFactory(helperText) {
  // Check if helperText is really a helper text element
  const $el = helperText && helperText.classList.contains('mdc-text-field-helper-text') ? helperText : null;
  if(!$el) return; // return undefined if a valid helperText doesn't exist

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
export function iconFactory($el, notifyIconAction) {
  return new MDCTextFieldIconFoundation({
    getAttr: attr => $el.getAttribute(attr),
    setAttr: (attr, value) => $el.setAttribute(attr, value),
    removeAttr: attr => $el.removeAttribute(attr),
    registerInteractionHandler: (tvtType, handler) => $el.addEventListener(type, handler),
    deregisterInteractionHandler: (type, handler) => $el.removeEventListener(type, handler),
    notifyIconAction
  });
}

/*export function lineRippleFactory($el) {
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
export function labelFactory($el) {
  return new MDCFloatingLabelFoundation({
    addClass: className => $el.classList.add(className),
    removeClass: className => $el.classList.remove(className),
    getWidth: () => $el.offsetWidth,
    registerInteractionHandler: (evtType, handler) => $el.addEventListener(evtType, handler),
    deregisterInteractionHandler: (evtType, handler) => $el.removeEventListener(evtType, handler)
  });
}
export function outlineFactory($el, { outlinePath, idleOutline }) {
  const styles = idleOutline && window.getComputedStyle(idleOutline);
  
  return new MDCNotchedOutlineFoundation({
    getWidth: () => $el.offsetWidth,
    getHeight: () => $el.offsetHeight,
    addClass: className => $el.classList.add(className),
    removeClass: className => $el.classList.remove(className),
    setOutlinePathAttr: value => outlinePath.setAttribute('d', value),
    getIdleOutlineStyleValue: prop => styles && styles.getPropertyValue(prop)
  });
}*/