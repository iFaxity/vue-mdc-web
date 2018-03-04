import LineRippleFoundation from "@material/line-ripple/foundation";
import HelperTextFoundation from "@material/textfield/helper-text/foundation";
import IconFoundation from "@material/textfield/icon/foundation";
import LabelFoundation from "@material/textfield/label/foundation";
import OutlineFoundation from "@material/textfield/outline/foundation";

export function lineRippleFactory($el) {
  return new LineRippleFoundation({
    addClass: className => $el.classList.add(className),
    removeClass: className => $el.classList.remove(className),
    hasClass: className => $el.classList.contains(className),
    setAttr: (attr, value) => $el.setAttribute(attr, value),
    registerEventHandler: (type, handler) => $el.addEventListener(type, handler),
    deregisterEventHandler: (type, handler) => $el.removeEventListener(type, handler)
  });
};

export function helperTextFactory($el) {
  return new HelperTextFoundation({
    addClass: className => $el.classList.add(className),
    removeClass: className => $el.classList.remove(className),
    hasClass: className => $el.classList.contains(className),
    setAttr: (attr, value) => $el.setAttribute(attr, value),
    removeAttr: attr => $el.removeAttribute(attr),
    setContent: content => $el.textContent = content
  });
};

export function iconFactory($el, notifyIconAction) {
  return new IconFoundation({
    setAttr: (attr, value) => $el.setAttribute(attr, value),
    registerInteractionHandler: (tvtType, handler) => $el.addEventListener(type, handler),
    deregisterInteractionHandler: (type, handler) => $el.removeEventListener(type, handler),
    notifyIconAction
  });
};

export function labelFactory($el) {
  return new LabelFoundation({
    addClass: className => $el.classList.add(className),
    removeClass: className => $el.classList.remove(className),
    getWidth: () => $el.offsetWidth
  });
};

export function outlineFactory($el, $outlinePath, $idleOutline) {
  const styles = $idleOutline && window.getComputedStyle($idleOutline);
  return new OutlineFoundation({
    getWidth: () => $el.offsetWidth,
    getHeight: () => $el.offsetHeight,
    setOutlinePathAttr: value => $outlinePath.setAttribute("d", value),
    getIdleOutlineStyleValue: prop => $idleOutline && styles.getPropertyValue(prop)
  });
};