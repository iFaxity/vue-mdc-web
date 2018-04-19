import Radio from "./Radio.vue";
import "@material/radio/mdc-radio.scss";

export { Radio };
export function install(Vue, register) {
  register(Radio);
}