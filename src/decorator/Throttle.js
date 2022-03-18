const waitTime = async (gapTime) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, gapTime);
  });
};

let _isDoLastMethod = false;
/**
 * 节流装饰器：固定一段时间内只有一次有效操作，且保证最后一次也会执行
 * @param {*} gapTime
 * @returns
 */
const Throttle = (gapTime = 200) => {
  return (target, property, descriptor) => {
    let lastTime = null;
    const method = descriptor.value;

    descriptor.value = async function (...args) {
      const nowTime = new Date().getTime();
      _isDoLastMethod = false;
      if (!lastTime || nowTime - lastTime >= gapTime) {
        method.apply(this, args);
        lastTime = nowTime;
      } else {
        _isDoLastMethod = true;
        await waitTime(gapTime + 200);
        if (_isDoLastMethod) {
          method.apply(this, args);
        }
      }
    };

    return descriptor;
  };
};

export default Throttle;
