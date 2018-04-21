import TopAppBar from "./TopAppBar.vue";
import TopAppBarSection from "./TopAppBarSection";
import TopAppBarActionItem from "./TopAppBarActionItem.vue";
import "@material/top-app-bar/mdc-top-app-bar.scss";

export { TopAppBar, TopAppBarSection, TopAppBarActionItem };
export function install(Vue, register) {
  register(TopAppBar, TopAppBarSection, TopAppBarActionItem);
}