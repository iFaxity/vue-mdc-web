export * from "./events";

export function childIndex(child) {
  let index = 0;
  while ((child = child.previousElementSibling) != null) {
    index++;
  }
  return index;
}

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const supportsCssVars = window.CSS && window.CSS.supports && window.CSS.supports("--css-var", 0);