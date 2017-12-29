import { default as MDCSelect } from "./select.vue";
export { MDCSelect };

export default {
  install(Vue) {
    Vue.component(MDCSelect.name, MDCSelect);
  }
};