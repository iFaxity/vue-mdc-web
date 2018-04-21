import MDCLinearProgress from "./LinearProgress.vue";
import "@material/linear-progress/mdc-linear-progress.scss";

export { MDCLinearProgress };
export function install(Vue, register) {
  register(MDCLinearProgress);
}