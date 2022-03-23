/*
 * File转base64
 */
export const file2Base64 = async (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      // 文件读取成功完成时触发
      resolve(e?.target?.result || "");
    };
  });
};

export default file2Base64;
