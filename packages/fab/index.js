import MDCFab from "./Fab.vue";
import "@material/fab/mdc-fab.scss";

export { MDCFab };
export function install(Vue, register) {
  register(MDCFab);
}