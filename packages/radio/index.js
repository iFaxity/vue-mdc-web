import { default as MDCRadio } from "./radio.vue";
export { MDCRadio };

export default {
  install(Vue) {
    Vue.component(MDCRadio.name, MDCRadio);
  }
};