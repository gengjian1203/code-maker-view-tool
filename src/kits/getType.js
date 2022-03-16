export const getType = (data) => {
  const tpyeName = Object.prototype.toString.call(data).toLowerCase();
  return tpyeName.substring(8, tpyeName.length - 1);
};

export default getType;
