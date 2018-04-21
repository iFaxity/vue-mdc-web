import MDCSnackbar from "./Snackbar.vue";
import "@material/snackbar/mdc-snackbar.scss";

export { MDCSnackbar };
export function install(Vue, register) {
  register(MDCSnackbar);
}