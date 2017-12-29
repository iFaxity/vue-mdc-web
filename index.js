import * as Button from "./packages/button";
import * as Card from "./packages/card";
import * as Checkbox from "./packages/checkbox";
import * as Dialog from "./packages/dialog";
//import * as Drawer from "./packages/drawer";
//import * as Elevation from "./packages/elevation";
//import * as Fab from "./packages/fab";
//import * as FormField from "./packages/form-field";
//import * as GridList from "./packages/grid-list";
//import * as Icon from "./packages/icon";
//import * as IconToggle from "./packages/icon-toggle";
//import * as LayoutGrid from "./packages/layout-grid";
//import * as LinearProgress from "./packages/linear-progress";
//import * as List from "./packages/list";
//import * as Menu from "./packages/menu";
//import * as Radio from "./packages/radio";
import * as Ripple from "./packages/ripple";
//import * as Select from "./packages/select";
//import * as Slider from "./packages/slider";
//import * as Snackbar from "./packages/snackbar";
//import * as Switch from "./packages/switch";
//import * as Tabs from "./packages/tabs";
//import * as Textfield from "./packages/textfield";
import * as Toolbar from "./packages/toolbar";

const DEFAULT_OPTS = {
  theme: null,
  typography: true
};

//TODO: make option manager in mixins and other stuff...instead of having options in components
export default {
  install(Vue, opts) {
    const { body } = document;
    opts = Object.assign({}, DEFAULT_OPTS, opts);
    // Add typography on body
    if (opts.typography) {
      body.classList.add("mdc-typography");
    }
    // Apply theme on body
    if (opts.theme) {
      body.classList.add(`theme--${opts.theme}`);
    }
    
    // Add all the packages as global components
    Vue.use(Button);
    Vue.use(Card);
    Vue.use(Checkbox);
    Vue.use(Dialog);
    //Vue.use(Drawer);
    //Vue.use(Elevation);
    //Vue.use(Fab);
    //Vue.use(FormField);
    //Vue.use(GridList);
    //Vue.use(Icon);
    //Vue.use(IconToggle);
    //Vue.use(LayoutGrid);
    //Vue.use(LinearProgress);
    //Vue.use(List);
    //Vue.use(Menu);
    //Vue.use(Radio);
    Vue.use(Ripple);
    //Vue.use(Select);
    //Vue.use(Slider);
    //Vue.use(Snackbar);
    //Vue.use(Switch);
    //Vue.use(Tabs);
    //Vue.use(Textfield);
    Vue.use(Toolbar);
  }
};
