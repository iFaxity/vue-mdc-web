<template lang="pug">
i.mdc-icon-toggle.material-icons(role="button", :aria-pressed="getPressed", :aria-label="getLabel"
   tabindex="0" @click="active = !active" v-ripple.unbounded) {{getIcon}}
</template>

<script>
export default {
  name: "MdcIconToggle",
  props: {
    icon: {
      type: Object,
      required: true
    },
    label: {
      type: Object,
      required: true
    }
  },
  data() {
    return { active: false };
  },
  computed: {
    getPressed() {
      return this.active ? "true" : "false";
    },
    getLabel() {
      return this.label[this.active ? "on" :  "off"];
    },
    getIcon() {
      return this.icon[this.active ? "on" :  "off"];
    }
  }
};
</script>