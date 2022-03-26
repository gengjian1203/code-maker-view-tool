/**
 * 将blob转换为file
 * @param {*} theBlob
 * @param {*} fileName
 * @returns
 */
export const blobToFile = (theBlob, fileName) => {
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
};

export default blobToFile;
