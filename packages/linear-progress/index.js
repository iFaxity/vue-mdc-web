import LinearProgress from "./LinearProgress.vue";
import "@material/linear-progress/mdc-linear-progress.scss";

export { LinearProgress };
export function install(Vue, register) {
  register(LinearProgress);
}