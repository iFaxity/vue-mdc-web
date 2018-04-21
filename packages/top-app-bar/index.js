import MDCTopAppBar from "./TopAppBar.vue";
import MDCTopAppBarSection from "./TopAppBarSection";
import MDCTopAppBarActionItem from "./TopAppBarActionItem.vue";
import "@material/top-app-bar/mdc-top-app-bar.scss";

export { MDCTopAppBar, MDCTopAppBarSection, MDCTopAppBarActionItem };
export function install(Vue, register) {
  register(MDCTopAppBar, MDCTopAppBarSection, MDCTopAppBarActionItem);
}