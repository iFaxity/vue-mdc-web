import Elevation from "./elevation";
import "@material/elevation/mdc-elevation.scss";

export { Elevation };
export function install(Vue) {
  Vue.component(Elevation.name, Elevation);
}