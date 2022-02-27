// 持久化管理器
class StorageManager {
  static instance = null;

  static getInstance() {
    if (!this.instance) {
      this.instance = new StorageManager();
    }
    return this.instance;
  }

  /**
   * 存缓存
   * @param {*} key 缓存键
   * @param {*} value 缓存值
   */
  setSessionStorageSimpleSync(key, value) {
    window.sessionStorage.setItem(key, value);
  }

  /**
   * 取缓存
   * @param {*} key 缓存键
   * @returns 缓存值、如不存在或超时则返回undefined
   */
  getSessionStorageSimpleSync(key) {
    const res = window.sessionStorage.getItem(key);
    return res;
  }

  /**
   * 存缓存
   * @param {*} key 缓存键
   * @param {*} value 缓存值
   * @param {*} time 缓存时间、单位为秒、不传值则永久缓存
   */
  setSessionStorageSync(key, value, time) {
    const header = `CACHE_`; // 管理字段前缀
    const tailer = "_DEADTIME"; // 管理字段后缀
    const strKey = `${header}${key}`;
    const strTime = `${header}${key}${tailer}`;
    const seconds = parseInt(time);

    window.sessionStorage.setItem(strKey, JSON.stringify(value));
    if (seconds > 0) {
      let timestamp = new Date().getTime();
      timestamp = timestamp / 1000 + seconds;
      window.sessionStorage.setItem(strTime, String(timestamp));
    } else {
      window.sessionStorage.removeItem(strTime);
    }
  }

  /**
   * 取缓存
   * @param {*} key 缓存键
   * @returns 缓存值、如不存在或超时则返回undefined
   */
  getSessionStorageSync(key) {
    const header = `CACHE_`; // 管理字段前缀
    const tailer = "_DEADTIME"; // 管理字段后缀
    const strKey = `${header}${key}`;
    const strTime = `${header}${key}${tailer}`;
    const deadtime = parseInt(window.sessionStorage.getItem(strTime));

    if (deadtime) {
      if (deadtime < new Date().getTime()) {
        return undefined;
      }
    }
    let res = window.sessionStorage.getItem(strKey);
    try {
      res = JSON.parse(res);
    } catch (e) {
      console.error("getSessionStorageSync", res, e);
    }

    return res;
  }

  /**
   * 移除指定缓存字段
   * @param {*} key 缓存键
   */
  removeSessionStorageSync(key) {
    const header = `CACHE_`; // 管理字段前缀
    const tailer = "_DEADTIME"; // 管理字段后缀
    const strKey = `${header}${key}`;
    const strTime = `${header}${key}${tailer}`;

    window.sessionStorage.removeItem(strKey);
    window.sessionStorage.removeItem(strTime);
  }

  /**
   * 清除所有缓存
   */
  clearSessionStorageSync() {
    window.sessionStorage.clear();
  }

  /**
   * 存缓存
   * @param {*} key 缓存键
   * @param {*} value 缓存值
   * @param {*} time 缓存时间、单位为秒、不传值则永久缓存
   */
  setLocalStorageSync(key, value, time) {
    const header = `CACHE_`; // 管理字段前缀
    const tailer = "_DEADTIME"; // 管理字段后缀
    const strKey = `${header}${key}`;
    const strTime = `${header}${key}${tailer}`;
    const seconds = parseInt(time);

    window.localStorage.setItem(strKey, JSON.stringify(value));
    if (seconds > 0) {
      let timestamp = new Date().getTime();
      timestamp = timestamp / 1000 + seconds;
      window.localStorage.setItem(strTime, String(timestamp));
    } else {
      window.localStorage.removeItem(strTime);
    }
  }

  /**
   * 取缓存
   * @param {*} key 缓存键
   * @returns 缓存值、如不存在或超时则返回undefined
   */
  getLocalStorageSync(key) {
    const header = `CACHE_`; // 管理字段前缀
    const tailer = "_DEADTIME"; // 管理字段后缀
    const strKey = `${header}${key}`;
    const strTime = `${header}${key}${tailer}`;
    const deadtime = parseInt(window.localStorage.getItem(strTime));

    if (deadtime) {
      if (deadtime < new Date().getTime()) {
        return undefined;
      }
    }
    let res = window.localStorage.getItem(strKey);
    try {
      res = JSON.parse(res);
    } catch (e) {
      console.error("getLocalStorageSync", res, e);
    }

    return res;
  }

  /**
   * 移除指定缓存字段
   * @param {*} key 缓存键
   */
  removeLocalStorageSync(key) {
    const header = `CACHE_`; // 管理字段前缀
    const tailer = "_DEADTIME"; // 管理字段后缀
    const strKey = `${header}${key}`;
    const strTime = `${header}${key}${tailer}`;

    window.localStorage.removeItem(strKey);
    window.localStorage.removeItem(strTime);
  }

  /**
   * 清除所有缓存
   */
  clearLocalStorageSync() {
    window.localStorage.clear();
  }

  /**
   * 设置cookie
   * @param {*} name
   * @param {*} value
   * @param {*} iDay
   */
  setCookie(name, value, validSeconds) {
    // const oDate = new Date();
    // oDate.setDate(oDate.getDate() + iDay);
    // document.cookie=name+'='+value+';expires='+oDate;
    document.cookie = name + "=" + value + ";max-age=" + validSeconds;
  }

  /**
   * 获取cookie
   * @param {*} name
   * @returns
   */
  getCookie(name) {
    // 多个cookie值是以; 分隔的，用split把cookie分割开并赋值给数组
    const arr = document.cookie.split("; ");
    for (let i = 0; i < arr?.length; i++) {
      // 历遍数组
      // 原来割好的数组是：user=simon，再用split('=')分割成：user simon 这样可以通过arr2[0] arr2[1]来分别获取user和simon
      const arr2 = arr[i]?.split("=");
      if (arr2[0] === name) {
        // 如果数组的属性名等于传进来的name 就返回属性名对应的值
        return arr2[1];
      }
    }
    return ""; // 没找到就返回空
  }

  /**
   * 删除cookie
   * @param {*} name
   */
  removeCookie(name) {
    // -1就是告诉系统已经过期，系统就会立刻去删除cookie
    this.setCookie(name, 1, -1);
  }
}

export default StorageManager.getInstance();
