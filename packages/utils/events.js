/*
  General events check
*/

const EVENTS = [
  /*{
    down: "pointerdown",
    up: "pointerup",
    move: "pointermove"
  },*/
  {
    down: "touchstart",
    up: "touchend",
    move: "touchmove"
  },
  {
    down: "mousedown",
    up: "mouseup",
    move: "mousemove"
  }
];
function checkEvent(type) {
  const $event = EVENTS.find(event => {
    const name = event[type];
    return `on${name}` in document.documentElement;
  });
  return $event[type];
}

export const downEvent = checkEvent("down");
export const upEvent = checkEvent("up");
export const moveEvent = checkEvent("move");

/*
  Passive events check
*/

let supportsPassive = false;
// Test via a getter in the options object to see if the passive property is accessed
try {
  const opts = Object.defineProperty({}, "passive", {
    get() { supportsPassive = true; }
  });
  window.addEventListener("testPassive", null, opts);
  window.removeEventListener("testPassive", null, opts);
} catch (e) { }

export function passiveOpts() {
  return supportsPassive ? { passive: true } : null;
};