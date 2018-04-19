import Home from "./components/Home.vue";
import Demo from "./components/Demo.vue";

const pascal = str => {
  const res = str.replace(/(-\w)/g, match => {
    return match.substr(1, 1).toUpperCase();
  });
  return res.substr(0, 1).toUpperCase() + res.substr(1);
};

export default [
  {
    path: "/",
    component: Home
  },
  {
    path: "/demo/:view",
    component: Demo,
    meta: {
      title: (to, from) => pascal(to.params.view)
    }
  }
  /*,
  {
    path: String, component: VueComponent
    meta: {
      title: [String, Function]
    }
  }*/
];