export const content = [
  {
    title: "节流(Throttle)装饰器",
    lang: "text/javascript",
    code: `
/**
 * 节流装饰器：固定一段时间内只有一次有效操作，第一次立即执行，且保证最后一次也会执行
 * 使用方法示例如下：
 * @Throttle(2000)
 * handleTestClick(e) {}
 * @Throttle(2000)
 * handleTestClick: (e) => {}
 * @Throttle(2000)
 * const handleTestClick = (e) => {}
 */

let endTime = 0;
let timerLastMethod = null;

/**
 * 处理业务逻辑
 * @returns
 */
const dealFun = (that, args, gapTime) => {
  // function dealFun(that, args, gapTime) {
  console.log("dealFun", endTime, timerLastMethod);
  // return function () {

  if (timerLastMethod) {
    clearTimeout(timerLastMethod);
    timerLastMethod = null;
  }
  // 处理业务逻辑
  const nowTime = new Date().getTime();
  if (nowTime - endTime >= gapTime) {
    that.apply(this, args);
    endTime = nowTime;
  } else {
    timerLastMethod = setTimeout(() => {
      if (timerLastMethod) {
        timerLastMethod = null;
      }
      that.apply(this, args);
    }, gapTime);
  }
  return () => {
    console.log("dealFun1", endTime, timerLastMethod);
  };
  // };
};

/**
 * @param {*} gapTime
 * @returns
 */
const Throttle = (gapTime = 200) => {
  return (target, property, descriptor) => {
    // 兼容箭头函数
    if (descriptor.initializer) {
      const replaceInitializer = function () {
        // 此处传入了指向类实例的this
        const fn = descriptor.initializer.call(this);
        return (...retArgs) => {
          return dealFun(fn, retArgs, gapTime);
        };
      };
      return {
        enumerable: true,
        configurable: true,
        writable: true,
        initializer: replaceInitializer,
      };
    } else {
      const oldValue = descriptor.value;
      descriptor.value = function (...args) {
        return dealFun(oldValue, args, gapTime);
      };
    }
  };
};

export default Throttle;
    `,
  },
];
