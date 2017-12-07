//TODO: make option manager in mixins and other stuff...instead of having options in components
import * as Buttons from "./Buttons";
import * as Cards from "./Cards";
import * as Dialogs from "./Dialogs";
import * as Inputs from "./Inputs";

import * as Toolbars from "./Toolbars";
//import Ripple from "./ripple";

const DEFAULT_OPTS = {
  theme: null,
  typography: true
};

export default {
  install(Vue, opts) {
    const { body } = document;
    opts = Object.assign({}, DEFAULT_OPTS, opts);

    const register = components => {
      Object.keys(components).forEach(key => {
        const component = components[key];
        Vue.component(component.name, component);
      });
    };

    register(Buttons);
    register(Cards);
    register(Dialogs);
    register(Inputs);
    register(Toolbars);


    // Add typography on body
    if(opts.typography) {
      body.classList.add("mdc-typography");
    }
    // Apply theme on body
    if(opts.theme) {
      body.classList.add(`mdc-theme--${opts.theme}`);
    }
  }
};
