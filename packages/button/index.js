import { default as MDCButton } from "./button.vue";
import "@material/button/mdc-button.scss";

export { MDCButton };
export function install(Vue) {
  Vue.component(MDCButton.name, MDCButton);
}