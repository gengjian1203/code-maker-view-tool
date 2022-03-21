import axios from "axios";
import jsonp from "jsonp";
import { routerAppendParams } from "@/kits/index";

// 封装拦截器
// Content-Type: application/json
// Content-Type: multipart/form-data
// Content-Type: application/x-www-form-urlencoded
axios.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json"; // 在拦截器中强制为简单请求。
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
class FetchManager {
  static instance = null;

  static getInstance() {
    if (!this.instance) {
      this.instance = new FetchManager();
    }
    return this.instance;
  }

  exec = async (url, params) => {
    const payload =
      params?.method?.toUpperCase() === "GET"
        ? { params: params?.data }
        : { data: params?.data };

    const res = await axios({
      url: url,
      timeout: 30000,
      ...params,
      ...payload,
    });

    console.debug("FetchManager exec", url, params, res);

    if (res && res.data) {
      return res.data;
    } else {
      return {};
    }
  };

  // Axios发起GET请求
  execAxiosGET = async (url, params) => {
    const res = await axios.get(routerAppendParams(url, params));
    console.debug("FetchManager get", res);
    return res;
  };

  // Axios发起POST请求
  execAxiosPOST = async (url, params) => {
    const res = await axios.post(url, params);
    console.debug("FetchManager post", res);
    return res;
  };

  // jsonp发起GET请求
  execJsonp = async (url, params) => {
    return new Promise((resolve) => {
      const urlReal = routerAppendParams(url, params);
      console.debug("FetchManager execJsonp", urlReal);
      jsonp(urlReal, null, (err, data) => {
        if (err) {
          console.debug("FetchManager execJsonp Fail", err);
          resolve(err);
        } else {
          console.debug("FetchManager execJsonp Success", data);
          resolve(data);
        }
      });
    });
  };
}

export default FetchManager.getInstance();
