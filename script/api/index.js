const axios = require("axios")

const exec = async (url, params) => {
  const payload =
    params && params.method && params.method.toUpperCase && params.method.toUpperCase() === "GET"
      ? { params: params && params.data }
      : { data: params && params.data }

  const res = await axios({
    url: url,
    timeout: 30000,
    ...params,
    ...payload
  })
  // console.debug("api exec res", url, params, res);

  if (res && res.data) {
    return res.data
  } else {
    return {}
  }
}

/**
 * Axios发起GET请求
 * @param {*} url
 * @param {*} params
 * @param {*} config
 * @returns
 */
const execAxiosGET = async (url = "", params = {}, config = {}) => {
  let res = {}

  try {
    res = await axios.get(url, { params, ...config })
    // console.debug("api get res", res);
  } catch (e) {
    console.debug("api get err", e)
  }
  return res
}

/**
 * Axios发起POST请求
 * @param {*} url
 * @param {*} params
 * @param {*} config
 * @returns
 */
const execAxiosPOST = async (url = "", params = {}, config = {}) => {
  let res = {}

  try {
    res = await axios.post(url, params, config)
    // console.debug("api post res", res);
  } catch (e) {
    console.debug("api post err", e)
  }
  return res
}

module.exports = {
  exec,
  execAxiosGET,
  execAxiosPOST
}
