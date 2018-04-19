import TopAppBar from "./TopAppBar.vue";
import "@material/top-app-bar/mdc-top-app-bar.scss";

export { TopAppBar };
export function install(Vue, register) {
  register(TopAppBar)
}