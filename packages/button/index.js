import Button from "./Button.vue";
import "@material/button/mdc-button.scss";

export { Button };
export function install(Vue, register) {
  register(Button);
}