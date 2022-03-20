<template>
  <div class="vt-code-wrap">
    <codemirror
      :value="code"
      :options="cmOptions"
      border
      placeholder="show me the code"
    />
  </div>
</template>

<script>
import Codemirror from "codemirror-editor-vue3";

// language
import "codemirror/mode/htmlmixed/htmlmixed.js"; // text/html
import "codemirror/mode/javascript/javascript.js"; // text/javascript
import "codemirror/mode/css/css.js"; // text/css
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
    lang: {
      type: String,
      default: "text/javascript",
    },
    code: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      cmOptions: {},
    };
  },
  watch: {
    lang: {
      handler(newValue) {
        this.cmOptions = {
          mode: newValue, // Language mode
          theme: "panda-syntax", // Theme
          lineNumbers: true, // Show line number
          smartIndent: true, // Smart indent
          indentUnit: 2, // The smart indent unit is 2 spaces in length
          foldGutter: true, // Code folding
          styleActiveLine: true, // Display the style of the selected row
        };
      },
      immediate: true, // 为true，代表在声明这个方法之后，立即先去执行handler方法
      // deep: true, // 为true，表示深度监听
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.vt-code-wrap {
  overflow: auto;
  max-height: 400px;
}
</style>
