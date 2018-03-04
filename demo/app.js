import Vue from "vue";
import VueRouter from "vue-router";
import VueMDC from "../index";

import routes from "./routes";

//SUI modules
import Layout from "./components/Layout.vue";
import * as Components from "./components";
// styles
import "./styles.scss";

Vue.use(VueRouter);
Vue.use(VueMDC);
Vue.use(Components);

const Router = new VueRouter({
  mode: "history",
  routes
});

  // Title plugin
Router.afterEach((to, from) => {
  const prefix = "MDC Vue | ";
  const match = to.matched.find(record => record.meta.title);
  let title = match && match.meta && match.meta.title;

  if(title) {
    let docTitle = typeof title === "function" ? title(to, from) : title;
    if(prefix) {
      docTitle = prefix + docTitle;
    }
    document.title = docTitle;
  }
});

const vm = new Vue({
  el: "#app",
  router: Router,
  render: h => h(Layout)
});
