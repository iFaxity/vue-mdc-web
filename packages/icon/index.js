import { default as Icon } from "./icon.vue";
export { Icon };

import "@material/icon/styles.scss";
export default {
  install(Vue) {
    Vue.component(Icon.name, Icon);
  }
};