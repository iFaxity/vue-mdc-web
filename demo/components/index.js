import Packages from './packages';
import DemoCode from './DemoCode.vue';

export function install(Vue) {
  Vue.component(DemoCode.name, DemoCode);

  Vue.use(Packages);
}
