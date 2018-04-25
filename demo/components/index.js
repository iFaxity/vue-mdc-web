import Packages from './packages';
import DemoCode from './DemoCode.vue';
import DemoTable from './DemoTable.vue';

export function install(Vue) {
  Vue.component(DemoCode.name, DemoCode);
  Vue.component(DemoTable.name, DemoTable);

  Vue.use(Packages);
}
