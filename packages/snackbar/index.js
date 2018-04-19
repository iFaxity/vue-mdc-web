import Snackbar from "./Snackbar.vue";
import "@material/snackbar/mdc-snackbar.scss";

export { Snackbar };
export function install(Vue, register) {
  register(Snackbar);
}