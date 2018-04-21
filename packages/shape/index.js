import MDCShape from "./Shape.vue";
import "@material/shape/mdc-shape.scss";

export { MDCShape };
export function install(Vue, register) {
  register(MDCShape);
}