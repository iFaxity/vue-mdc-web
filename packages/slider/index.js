import MDCSlider from './Slider.vue';
import '@material/slider/mdc-slider.scss';

export { MDCSlider };
export function install(Vue, register) {
  register(MDCSlider);
};