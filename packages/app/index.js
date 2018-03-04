import App from "./App.vue";
import "./app.scss";

export { App };
export function install(Vue) {
  Vue.component(App.name, App);
}