import IconToggle from "./IconToggle.vue";
import "@material/icon-toggle/mdc-icon-toggle.scss";

export { IconToggle };
export function install(Vue, register) {
  register(IconToggle);
}