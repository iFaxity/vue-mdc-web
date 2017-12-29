import { default as MDCSwitch } from "./switch.vue";
export { MDCSwitch };

export default {
  install(Vue) {
    Vue.component(MDCSwitch.name, MDCSwitch);
  }
};