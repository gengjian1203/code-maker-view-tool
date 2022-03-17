<template>
  <codemirror
    :value="code"
    :options="cmOptions"
    border
    placeholder="show me the code"
  />
</template>

<script>
import Codemirror from "codemirror-editor-vue3";

// language
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/css/css.js";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/clike/clike.js";
import "codemirror/mode/markdown/markdown.js";
import "codemirror/mode/python/python.js";
import "codemirror/mode/r/r.js";
import "codemirror/mode/shell/shell.js";
import "codemirror/mode/sql/sql.js";
import "codemirror/mode/swift/swift.js";
import "codemirror/mode/vue/vue.js";

// theme
import "codemirror/theme/panda-syntax.css";

export default {
  name: "VTCardCode",
  components: {
    Codemirror,
  },
  props: {
    code: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      cmOptions: {
        mode: "text/javascript", // Language mode
        theme: "panda-syntax", // Theme
        lineNumbers: true, // Show line number
        smartIndent: true, // Smart indent
        indentUnit: 2, // The smart indent unit is 2 spaces in length
        foldGutter: true, // Code folding
        styleActiveLine: true, // Display the style of the selected row
      },
    };
  },
  watch: {},
  methods: {},
};
</script>

<style lang="less" scoped></style>
