import * as App from "./packages/app";
import * as Button from "./packages/button";
import * as Card from "./packages/card";
import * as Checkbox from "./packages/checkbox";
import * as Chips from "./packages/chips";
import * as Dialog from "./packages/dialog";
import * as Drawer from "./packages/drawer";
import * as Fab from "./packages/fab";
import * as FormField from "./packages/form-field";
import * as GridList from "./packages/grid-list";
import * as IconToggle from "./packages/icon-toggle";
//import * as ImageList from "./packages/image-list";
import * as LayoutGrid from "./packages/layout-grid";
import * as LinearProgress from "./packages/linear-progress";
import * as List from "./packages/list";
import * as Menu from "./packages/menu";
import * as Radio from "./packages/radio";
//import * as Shape from "./packages/shape";
//import * as Select from "./packages/select";
//import * as Slider from "./packages/slider";
import * as Snackbar from "./packages/snackbar";
import * as Switch from "./packages/switch";
//import * as Tabs from "./packages/tabs";
import * as Textfield from "./packages/textfield";
import * as Toolbar from "./packages/toolbar";
import * as TopAppBar from "./packages/top-app-bar";

import "@material/typography/mdc-typography.scss"; // add typography classes

const DEFAULT_OPTS = {
  theme: "",
  typography: false
};

//TODO: make option manager in mixins and other stuff...instead of having options in components
//TODO: fix all v-model DRY with arrays strings bindings. Chips, Checkbox, Radio, Select, Switch, Textfield.
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
      body.classList.add(`mdc-theme--${opts.theme}`);
    }

    // Simple helper function for registering components
    const register = (...components) => {
      components.forEach(component => {
        const name = component.name.substr(3);
        Vue.component("Mdc" + name, component);
      });
    };
    
    // Add all the packages as global components
    Vue.use(App, register);
    Vue.use(Button, register);
    Vue.use(Card, register);
    Vue.use(Checkbox, register);
    Vue.use(Chips, register);
    Vue.use(Dialog, register);
    Vue.use(Drawer, register);
    Vue.use(Fab, register);
    Vue.use(FormField, register);
    Vue.use(GridList, register);
    Vue.use(IconToggle, register);
    //Vue.use(ImageList, register);
    Vue.use(LayoutGrid, register);
    Vue.use(LinearProgress, register);
    Vue.use(List, register);
    Vue.use(Menu, register);
    Vue.use(Radio, register);
    //Vue.use(Shape, register);
    //Vue.use(Select, register);
    //Vue.use(Slider);
    Vue.use(Snackbar, register);
    Vue.use(Switch, register);
    //Vue.use(Tabs, register);
    Vue.use(Textfield, register);
    Vue.use(Toolbar, register);
    Vue.use(TopAppBar, register);
  }
};
