import { default as MDCIconToggle } from "./icon-toggle.vue";
export { MDCIconToggle };

export default {
  install(Vue) {
    Vue.component(MDCIconToggle.name, MDCIconToggle);
  }
};