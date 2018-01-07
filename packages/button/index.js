import Button from "./button.vue";
import "@material/button/mdc-button.scss";

export { Button };
export function install(Vue) {
  Vue.component(Button.name, Button);
}