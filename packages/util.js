
/**
 * Handles v-model values from type [Array, String, Boolean, Number]
 * @param {Array | String | Boolean | Number} model - Model value from v-model.
 * @param {String | Boolean | Number} primitivevalue - Value used in model to check if it is needed to be set or not.
 */
export function handleModel(model, primitiveValue, { checked, value }) {
  let newModel = Array.isArray(model) ? Array.from(model) : model;

  if(Array.isArray(model)) {
    const index = newModel.indexOf(value);
    // Used to force a value if not an array. Used in only ChipSet v-model.
    const isChecked = typeof checked == 'boolean' ? checked : index >= 0;

    if(isChecked) {
      newModel.splice(index, 1);
    } else {
      newModel.push(value);
    }
  } else {
    newModel = primitiveValue;
  }

  return newModel;
};

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