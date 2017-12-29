import { default as MDCButton } from "./button.vue";
export { MDCButton };

export default {
  install(Vue) {
    Vue.component(MDCButton.name, MDCButton);
  }
};