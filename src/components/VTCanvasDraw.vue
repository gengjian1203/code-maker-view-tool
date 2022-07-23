<template>
  <canvas :id="canvasId" :width="canvasWidth" :height="canvasHeight" />
</template>

<script>
import { deepClone } from "@/kits";

export default {
  name: "VTCanvasDraw",
  components: {},
  props: {
    // 画布Id
    canvasId: {
      type: String,
      default: "canvasDraw",
    },
    // 画布宽度
    canvasWidth: {
      type: String,
      default: "300",
    },
    // 画布高度
    canvasHeight: {
      type: String,
      default: "150",
    },
    // 画布背景色
    canvasBGColor: {
      type: String,
      default: "#fff",
    },
    // 画布压缩比例
    canvasQuality: {
      type: String,
      default: "0.92",
    },
    // 画布导出图片类型
    canvasType: {
      type: String,
      default: "image/png",
    },
    // 画布缩放比例
    canvasScale: {
      type: Number,
      default: 1,
    },
    // 画布元素配置
    canvasConfig: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      canvas: null, // canvas标签
      ctx: null, // canvas实例
    };
  },
  watch: {
    canvasConfig: {
      handler(newValue) {
        this.$nextTick(async () => {
          // console.log("watch canvasConfig", newValue, this.ctx);
          if (this.ctx) {
            // 清空画布，以防新画布背景色是透明色无法清空
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.draw_rect({
              color: this.canvasBGColor,
              x: 0,
              y: 0,
              width: this.canvasWidth,
              height: this.canvasHeight,
            });
            for (let i = 0; i < newValue.length; i++) {
              const info = newValue[i];
              // TODO: 初始化画笔
              // console.log("watch canvasConfig", i, info);
              this[`draw_${info.type}`] &&
                (await this[`draw_${info.type}`](info));
            }

            this.$emit(
              "onCanvasDrawComplete",
              this.canvas.toDataURL(
                this.canvasType,
                parseFloat(this.canvasQuality)
              )
            );
          }
        });
      },
      immediate: true, // 为true，代表在声明这个方法之后，立即先去执行handler方法
      deep: true, // 为true，表示深度监听，这时候就能监测到a值变化
    },
  },
  methods: {
    // 转换坐标位置
    dealInfo(info = {}) {
      const infoClone = deepClone(info) || {};
      // 需要转换的键值白名单
      const arrKeyList = [
        "size",
        "x",
        "y",
        "x1",
        "y1",
        "maxWidth",
        "lineHeight",
        "lineWidth",
        "radius",
      ];
      Object.keys(infoClone).map((key) => {
        if (arrKeyList.includes(key)) {
          infoClone[key] = infoClone[key] * this.canvasScale;
        }
      });
      return infoClone;
    },
    // 创建图片标签
    async createImage(src) {
      // console.log("createImage");
      return new Promise((resolve, reject) => {
        try {
          const img = new Image();
          img.src = src;
          img.onload = (res) => {
            resolve(img);
          };
        } catch (e) {
          resolve(null);
        }
      });
    },
    // 清空画布
    cleanCanvase() {
      this.ctx.clearRect(
        0,
        0,
        this.canvasWidth * this.canvasScale,
        this.canvasHeight * this.canvasScale
      );
    },
    // 绘制普通文本类型
    draw_text(info) {
      const realInfo = this.dealInfo(info);
      const { text, textAlign, textBaseline, color, size, x, y } =
        realInfo || {};

      // console.log("draw_text", info, realInfo);
      if (this.ctx && text) {
        this.ctx.fillStyle = color;
        this.ctx.textAlign = textAlign;
        this.ctx.textBaseline = textBaseline;
        this.ctx.font = `${size}px sans-serif`;
        this.ctx.fillText(text, x, y);
        this.ctx.save();
      }
    },
    // 绘制多行文本类型
    draw_textMulti(info) {
      const realInfo = this.dealInfo(info);
      let { text, textAlign, color, size, x, y, maxWidth, lineHeight } =
        realInfo || {};

      // console.log("draw_textMulti", info, realInfo);

      let lineWidth = 0;
      let lastSubStrIndex = 0;
      let lineCount = 1;
      this.ctx.fillStyle = color;
      this.ctx.font = `${size}px sans-serif`;
      for (let i = 0, len = text.length; i < len; i++) {
        lineWidth += this.ctx.measureText(text[i]).width;
        if (lineWidth / maxWidth > lineCount) {
          this.ctx.fillText(text.substring(lastSubStrIndex, i), x, y);
          this.ctx.save();
          y += lineHeight;
          lastSubStrIndex = i;
          lineCount++;
        }
        if (i === len - 1) {
          this.ctx.fillText(text.substring(lastSubStrIndex, i + 1), x, y);
          this.ctx.save();
        }
      }
    },
    // 绘制矩形类型
    draw_rect(info) {
      const realInfo = this.dealInfo(info);
      const { color, x, y, width, height } = realInfo || {};
      // console.log("draw_rect", info, realInfo);

      this.ctx.fillStyle = color;
      this.ctx.fillRect(x, y, width, height);
      this.ctx.save();
    },
    // 绘制圆角矩形类型
    draw_rectArc(info) {
      const realInfo = this.dealInfo(info);
      const { color, lineColor, lineWidth, x, y, width, height, radius } =
        realInfo || {};
      // console.log("draw_rectArc", info, realInfo);

      this.ctx.beginPath();
      this.ctx.fillStyle = color;
      this.ctx.lineWidth = lineWidth;
      this.ctx.strokeStyle = lineColor;
      // 起始点
      this.ctx.moveTo(x, y + 2 * radius);
      // 左上角
      this.ctx.arcTo(x, y, x + radius, y, radius);
      // 右上角
      this.ctx.arcTo(x + width, y, x + width, y + radius, radius);
      // 右下角
      this.ctx.arcTo(
        x + width,
        y + height,
        x + width - radius,
        y + height,
        radius
      );
      // 左下角
      this.ctx.arcTo(x, y + height, x, y + height - radius, radius);

      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.fill();
      this.ctx.save();
    },
    // 绘制线段类型
    draw_line(info) {
      const realInfo = this.dealInfo(info);
      const { color, x, y, x1, y1 } = realInfo || {};
      // console.log("draw_line", info, realInfo);

      this.ctx.strokeStyle = color;
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x1, y1);
      this.ctx.stroke();
      this.ctx.save();
    },
    // 绘制图片类型
    async draw_image(info) {
      const realInfo = this.dealInfo(info);
      const { src = "", x = 0, y = 0, width = 0, height = 0 } = realInfo || {};
      // console.log("draw_image", info, realInfo);

      if (src) {
        const img = await this.createImage(src);
        // console.log("createImage", img);
        if (img) {
          const drawWidth = width || img.width;
          const drawHeight = height || img.height;
          src && this.ctx.drawImage(img, x, y, drawWidth, drawHeight);
          this.ctx.save();
        }
      }
    },
  },
  mounted() {
    this.canvas = document.getElementById(this.canvasId);
    this.ctx = this.canvas.getContext("2d");
    console.log("VTCanvasDraw mounted", this.canvas, this.ctx);
  },
};
</script>

<style lang="less" scoped></style>
