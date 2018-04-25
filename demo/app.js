import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMDC from '../index';

import routes from './routes';
import Layout from './components/Layout.vue';
import * as Components from './components';
// styles
import './styles.scss';

Vue.use(VueRouter);
Vue.use(VueMDC);
Vue.use(Components);

const Router = new VueRouter({
  mode: 'history',
  routes
});

// TODO: Move plugins to seperate file?
// Define event bus as $state. No need for vuex
const AppState = new Vue();
Object.defineProperty(Vue.prototype, '$state', {
  value: AppState,
  wiritable: false
});

// Title plugin
function titlePlugin(to, from) {
  const prefix = 'MDC Vue | ';
  const match = to.matched.find(record => record.meta.title);
  let title = match && match.meta && match.meta.title;
  
  if(title) {
    title = typeof title === 'function' ? title(to, from) : title;
    AppState.$emit('demoRouted', title);

    title = prefix + title;
  } else {
    title = 'Vue MDC Web';
    AppState.$emit('demoRouted', title);
  }
  document.title = title;
}
Router.afterEach(titlePlugin);

const vm = new Vue({
  el: '#app',
  router: Router,
  render: h => h(Layout)
});

// Force run to change title on page load
titlePlugin(Router.currentRoute);