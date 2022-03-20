import { ElMessage } from "element-plus";

/**
 * 复制内容到剪贴板
 */
export const setClipboardData = (strText) => {
  const oInput = document.createElement("textarea");
  oInput.value = strText;
  document.body.appendChild(oInput);
  oInput.select(); // 选择对象
  const resCommandCopy = document.execCommand("Copy"); // 执行浏览器复制命令
  oInput.style.display = "none";
  oInput.blur();
  if (resCommandCopy) {
    ElMessage.success("复制成功");
    // console.log("复制成功");
    return true;
  } else {
    ElMessage.error("复制失败");
    // console.error("复制失败");
    return false;
  }
};

export default setClipboardData;
