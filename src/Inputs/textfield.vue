<template lang="pug">
.mdc-text-field(:class=`cssClasses` @touchstart="click" @mousedown="click" @keydown="click")
  i.material-icons.mdc-text-field__icon(v-if=`icon && !trailingIcon`, :tabindex=`clickIcon && "0"`) {{icon}}
  input.mdc-text-field__input(ref="input"
    v-bind="$attrs", v-model="model", :disabled="disabled"
    @focus="focus" @blur="blur")
  label.mdc-text-field__label(:class=`cssLabelClasses`)
    slot
  i.material-icons.mdc-text-field__icon(v-if=`icon && trailingIcon`, :tabindex=`clickIcon && "0"`) {{icon}}
  .mdc-text-field__bottom-line(ref="line", :class=`cssLineClasses`)
</template>

<script>
export default {
  name: "MdcTextfield",
  inheritAttrs: false,
  props: {
    disabled: Boolean,
    box: Boolean,
    dense: Boolean,
    value: String,

    // Icon stuff
    icon: String,
    trailingIcon: Boolean,
    clickIcon: Boolean
  },
  data() {
    return { active: false, invalid: false };
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    cssLabelClasses() {
      return {
        "mdc-text-field__label--float-above": this.active || this.value,
        "mdc-text-field__label--shake": this.invalid
      };
    },
    cssLineClasses() {
      return {
        "mdc-text-field__bottom-line--active": this.active
      };
    },
    cssClasses() {
      return {
        "mdc-text-field--upgraded": true,
        "mdc-text-field--disabled": this.disabled,
        "mdc-text-field--focused": this.active,
        "mdc-text-field--invalid": this.invalid,
        "mdc-text-field--box": this.box,
        "mdc-text-field--dense": this.dense,
        "mdc-text-field--with-leading-icon": this.icon && !this.trailingIcon,
        "mdc-text-field--with-trailing-icon": this.icon && this.trailingIcon
      };
    }
  },
  methods: {
    click(e) {
      const { line } = this.$refs;
      const { target, type } = e;

      if(this.clickIcon && target.classList.contains("mdc-text-field__icon")) {
        if(type === "click" || e.key === "Enter" || e.keyCode === 13) {
          this.$emit("icon");
        }
      }

      // Bottom line focus
      if(line) {
        const rect = e.target.getBoundingClientRect();
        const normalized = e.clientX - rect.left;
        line.style.transformOrigin = `${normalized}px center`;
      }
    },
    focus() {
      this.active = true;
    },
    blur() {
      this.active = false;
      this.checkValidity();
    },
    checkValidity() {
      const { input } = this.$refs;

      this.invalid = input && !input.checkValidity();
      if(this.invalid) {
        this.$emit("invalid", this.value);
      }
    }
  }
};
</script>