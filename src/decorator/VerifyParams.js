import { ElMessage } from "element-plus";

/**
 * 校验参数是否有值装饰器
 * @param {*} loading
 * @returns
 */
const VerifyParams = (arrParamsName = []) => {
  return function (target, property, descriptor) {
    const oldFn = descriptor.value;
    descriptor.value = async function (...args) {
      try {
        const arrEmpty = [];
        arrParamsName.forEach((item) => {
          if (!this[item]) {
            arrEmpty.push(item);
          }
        });
        if (arrEmpty?.length === 0) {
          await oldFn.apply(this, args);
        } else {
          ElMessage.error(`${JSON.stringify(arrEmpty)}不能为空`);
        }
      } catch (error) {
        // 这里的globalError 等就是console.error 只是不会被打包摇树
        console.error(`${name}-----start-----${error}`);
        console.error(error);
        console.error(`${name}-----end-----${error}`);
      }
    };
  };
};

export default VerifyParams;
