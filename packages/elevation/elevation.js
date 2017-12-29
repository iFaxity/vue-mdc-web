export default {
  props: {
    // TODO: elevation transition (mdc-elevation-transition)
    // Maybe turn this into a directive instead :/
    elevation: {
      type: [Number, String],
      validator: value => {
        if(typeof value === "string") {
          value = parseInt(value);
        }
        return value >= 0 && value <= 24;
      }
    }
  }
};