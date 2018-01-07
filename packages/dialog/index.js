import Dialog from "./dialog.vue";
import DialogTitle from "./title.vue";
import "@material/dialog/mdc-dialog.scss";

export { Dialog, DialogTitle };
export function install(Vue) {
  Vue.component(Dialog.name, Dialog);
  Vue.component(DialogTitle.name, DialogTitle);
}