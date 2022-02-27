import axios from "axios";

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
}

export default FetchManager.getInstance();
