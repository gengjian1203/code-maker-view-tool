/**
 * 节流装饰器：固定一段时间内只有一次有效操作
 * @param {*} gapTime
 * @returns
 */
const ThrottleSimple = (gapTime = 200) => {
  return (target, property, descriptor) => {
    let lastTime = null;
    const method = descriptor.value;

    descriptor.value = async function (...args) {
      const nowTime = new Date().getTime();
      console.log("ThrottleSimple111");
      if (!lastTime || nowTime - lastTime >= gapTime) {
        method.apply(this, args);
        lastTime = nowTime;
        console.log("ThrottleSimple2222");
      }
    };

    return descriptor;
  };
};

export default ThrottleSimple;
