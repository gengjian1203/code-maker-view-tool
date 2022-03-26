import { base64ToBlob, blobToFile } from "@/kits";

/**
 * base64转File
 * @returns
 */
export const base64ToFile = (base64Data, imgName = new Date().getTime()) => {
  // 调用
  const blob = base64ToBlob(base64Data);
  const file = blobToFile(blob, imgName);

  return file;
};

export default base64ToFile;
