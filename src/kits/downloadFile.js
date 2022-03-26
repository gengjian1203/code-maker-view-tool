import { base64ToBlob } from "@/kits";

/**
 * 下载文件
 * @param {*} fileName 文件名
 * @param {*} content base64格式
 */
export const downloadFile = (fileName, content) => {
  const aLink = document.createElement("a");
  const blob = base64ToBlob(content); // new Blob([content]);

  const evt = document.createEvent("HTMLEvents");
  evt.initEvent("click", true, true); // initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  aLink.dispatchEvent(
    new MouseEvent("click", { bubbles: true, cancelable: true, view: window })
  ); // 兼容火狐
};

export default downloadFile;
