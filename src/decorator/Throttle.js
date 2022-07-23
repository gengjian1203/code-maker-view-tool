let lastTime = null;
let lastMethodTime = null;

/**
 * 处理业务逻辑
 * @returns
 */
const dealFun = async (that, args, gapTime) => {
  // console.log('CheckLogin args', gapTime)
  if (lastMethodTime) {
    clearTimeout(lastMethodTime);
    lastMethodTime = null;
  }
  // 处理业务逻辑
  const nowTime = new Date().getTime();
  if (!lastTime || nowTime - lastTime >= gapTime) {
    that.apply(this, args);
    lastTime = nowTime;
  } else {
    lastMethodTime = setTimeout(() => {
      if (lastMethodTime) {
        lastMethodTime = null;
      }
      that.apply(this, args);
    }, gapTime);
  }
  return false;
};

/**
 * 节流装饰器：固定一段时间内只有一次有效操作，第一次立即执行，且保证最后一次也会执行
 * @param {*} gapTime
 * @returns
 */
const Throttle =
  (gapTime = 200) =>
  (...args) => {
    const descriptor = args[2];
    // 兼容箭头函数
    if (descriptor.initializer) {
      const replaceInitializer = function () {
        // 此处传入了指向类实例的this
        const fn = descriptor.initializer.call(this);
        return async (...retArgs) => {
          return dealFun(fn, retArgs, gapTime);
        };
      };
      return {
        enumerable: true,
        configurable: true,
        writable: true,
        initializer: replaceInitializer,
      };
    }

    const oldValue = descriptor.value;
    descriptor.value = dealFun(oldValue, args, gapTime);
    return descriptor;
  };

export default Throttle;
