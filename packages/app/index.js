import MDCApp from "./App.vue";
import "./mdc-app.scss";

export { MDCApp };
export function install(Vue, register) {
  register(MDCApp);
}