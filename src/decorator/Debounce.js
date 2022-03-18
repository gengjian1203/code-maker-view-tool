/**
 * 防抖装饰器： 每次操作后会等待一个固定时间再执行操作
 * @param {*} wait
 * @returns
 */
const Debounce = (wait) => {
  return (target, property, descriptor) => {
    let timer = null;
    const method = descriptor.value;

    descriptor.value = function (...args) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        method.apply(this, args);
      }, wait);
    };

    return descriptor;
  };
};

export default Debounce;
