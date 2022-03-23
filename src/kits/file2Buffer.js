/*
 * File转Buffer二进制
 */
export const file2Buffer = async (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      // 文件读取成功完成时触发
      resolve(e?.target?.result || "");
    };
  });
};

export default file2Buffer;
