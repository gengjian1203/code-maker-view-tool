import GlobalManager from "@/services/GlobalManager";
import FetchManager from "@/services/FetchManager";

/**
 * 发送机器人消息
 * https://developer.work.weixin.qq.com/document/path/91770
 * @param {
 *  webhook: String 机器人的webhook地址
 *  data: Object 消息类型及数据
 * }
 */
export const sendRobotMsg = async (params) => {
  const { webhook, data } = params || {};
  console.log("sendRobotMsg", webhook, data);
  const res = await FetchManager.execAxiosPOST(
    `${GlobalManager.baseUrlWeiXinCloudrun}/api/sendRobotMsg`,
    params
  );
  return res?.data || {};
};

export default {
  sendRobotMsg,
};
