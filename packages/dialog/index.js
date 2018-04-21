import MDCDialog from "./Dialog.vue";
import "@material/dialog/mdc-dialog.scss";

export { MDCDialog };
export function install(Vue, register) {
  register(MDCDialog);
}