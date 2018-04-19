import Shape from "./Shape.vue";
import "@material/shape/mdc-shape.scss";

export { Shape };
export function install(Vue, register) {
  register(Shape);
}