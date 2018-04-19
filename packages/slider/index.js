import Slider from "./Slider.vue";
import "@material/slider/mdc-slider.scss";

export { Slider };
export function install(Vue, register) {
  register(Slider);
};