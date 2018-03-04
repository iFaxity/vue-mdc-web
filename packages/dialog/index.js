import Dialog from "./Dialog.vue";
import "@material/dialog/mdc-dialog.scss";

export { Dialog };
export function install(Vue) {
  Vue.component(Dialog.name, Dialog);
}