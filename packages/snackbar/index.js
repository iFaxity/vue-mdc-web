import { default as MDCSnackbar } from "./snackbar.vue";
export { MDCSnackbar };

export default {
  install(Vue) {
    Vue.component(MDCSnackbar.name, MDCSnackbar);
  }
};