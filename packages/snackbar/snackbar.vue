<template lang="pug">
.mdc-snackbar(:class=`cssClasses` aria-live="assertive" aria-atomic="true", :aria-hidden=`!active`)
  .mdc-snackbar__text {{snack.message}}
  .mdc-snackbar__action__wrapper
    button.mdc-snackbar__action-button(type="button" @click="click") {{snack.actionText}}
</template>

<script>
const DEFAULT_DATA = {
  timeout: 2750,
  multiline: false,
  actionOnBottom: false
};
function validateData(data) {
  let error;
  if(typeof data.message !== "string") {
    error = "Message is required in a snackbar!";
  } else if(typeof data.action === "string" && typeof data.actionText !== "string") {
    error = "Action Text it required when an action is specified";
  } else if(typeof data.timeout !== "number") {
    error = "Timeout is required to be a number";
  }
  return error;
}

export default {
  name: "MdcSnackbar",
  props: {
    alignStart: Boolean,
    dissmissOnAction: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return { snacks: [], active: false, timeoutId: null };
  },
  computed: {
    snack() {
      return this.snacks[0] || {};
    },
    cssClasses() {
      const snack = this.snack || {};
      return {
        "mdc-snackbar--align-start": this.alignStart,
        "mdc-snackbar--active": this.active,
        "mdc-snackbar--multiline": snack.multiline,
        "mdc-snackbar--action-on-bottom": snack.actionOnBottom
      };
    }
  },
  methods: {
    show(data) {
      const snack = Object.assign({}, DEFAULT_DATA, data);
      const error = validateData(snack);

      if(error) {
        throw new Error(error);
      }

      this.snacks.push(snack);
      if(this.snacks.length === 1) {
        this.showSnack();
      }
    },
    showSnack() {
      const { snack } = this;
      
      this.active = true;
      this.$nextTick(() => {
        // Remove snack after a certain time
        this.timeoutId = setTimeout(this.hideSnack, snack.timeout);
      });
    },
    hideSnack(clear = true) {
      if(this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
      const hide = () => {
        // Revolve the snackbar
        this.snacks.shift();
        if(this.snacks.length > 0) {
          this.showSnack();
        }
        this.$el.removeEventListener("transitionend", hide);
      };

      this.active = false;
      this.$el.addEventListener("transitionend", hide);
    },
    click() {
      const { snack } = this;
      this.hideSnack();
      snack.action(snack);
    }
  }
};
</script>