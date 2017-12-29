import { default as MDCSlider } from "./slider.vue";
export { MDCSlider };

export default {
  install(Vue) {
    Vue.component(MDCSlider.name, MDCSlider);
  }
};