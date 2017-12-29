import { default as MDCDialog } from "./dialog.vue";
import { default as MDCDialogTitle } from "./title.vue";
import "@material/dialog/mdc-dialog.scss";

export { MDCDialog, MDCDialogTitle };
export function install(Vue) {
  Vue.component(MDCDialog.name, MDCDialog);
  Vue.component(MDCDialogTitle.name, MDCDialogTitle);
}