import { default as MDCElevation } from "./elevation";
export { MDCElevation };

export default {
  install(Vue) {
    Vue.component(MDCElevation.name, MDCElevation);
  }
};