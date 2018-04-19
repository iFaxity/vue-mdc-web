import Switch from "./Switch.vue";
import "@material/switch/mdc-switch.scss";

export { Switch };
export function install(Vue, register) {
  register(Switch);
}