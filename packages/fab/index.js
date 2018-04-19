import Fab from "./Fab.vue";
import "@material/fab/mdc-fab.scss";

export { Fab };
export function install(Vue, register) {
  register(Fab);
}