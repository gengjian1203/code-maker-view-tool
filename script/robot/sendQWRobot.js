const { execAxiosPOST } = require("../api")

/**
 * 发送企微机器人消息
 * https://developer.work.weixin.qq.com/document/path/91770
 * @param {string} webhook
 * @param {object} params
 */
const sendQWRobot = async (webhook = '', params = {}) => {
  // console.log("sendQWRobot", webhook, params);
  const res = await execAxiosPOST(webhook, JSON.stringify(params))
  console.log("sendQWRobot", res && res.data);

  return res
}

module.exports = sendQWRobot
