<template lang="pug">
pre
  code(ref="code", :class="cssClasses") {{ formatCode }}
</template>

<script>
import Prism from 'prismjs';
// Include prism and its css file
import 'prismjs/themes/prism.css';

export default {
  name: 'DemoCode',
  props: {
    lang: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    }
  },
  computed: {
    cssClasses() {
      return `demo-code language-${this.lang}`;
    },
    formatCode() {
      return this.code.trim();
    }
  },
  mounted() {
    Prism.highlightElement(this.$refs.code);
  }
};
</script>