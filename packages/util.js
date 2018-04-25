export function handleModel() {

}

// Basically taken from material-components-web repo under component.js
export function emitCustomEvent(el, type, data, shouldBubble = false) {
  let evt;
  if (typeof CustomEvent === 'function') {
    evt = new CustomEvent(type, {
      detail: data,
      bubbles: shouldBubble,
    });
  } else {
    evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(type, shouldBubble, false, data);
  }

  el.dispatchEvent(evt);
}