// 将base64转换为blob
const dataURLtoBlob = (dataurl) => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};
// 将blob转换为file
const blobToFile = (theBlob, fileName) => {
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
};

/**
 * base64转File
 * @returns
 */
export const base642File = (base64Data, imgName = new Date().getTime()) => {
  // 调用
  const blob = dataURLtoBlob(base64Data);
  const file = blobToFile(blob, imgName);

  return file;
};

export default base642File;
