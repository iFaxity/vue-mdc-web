import MDCRadio from "./Radio.vue";
import "@material/radio/mdc-radio.scss";

export { MDCRadio };
export function install(Vue, register) {
  register(MDCRadio);
}