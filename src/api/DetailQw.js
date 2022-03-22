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
    `${GlobalManager.baseUrlWeiXinCloudrun}/api/post/sendRobotMsg`,
    params
  );
  return res?.data || {};
};

/** 获取access_token
 * https://developer.work.weixin.qq.com/document/path/91039
 * @param {
 *  corpid: String 企业微信ID
 *  corpsecret: String 企业应用秘钥
 * }
 */
export const getAccessToken = async (params) => {
  console.log("getAccessToken", params);
  const res = await FetchManager.execAxiosGET(
    `${GlobalManager.baseUrlWeiXinCloudrun}/api/get/getAccessToken`,
    params
  );
  return res?.data || {};
};

/** 上传临时素材
 * https://developer.work.weixin.qq.com/document/path/90253
 * https://open.work.weixin.qq.com/wwopen/devtool/interface?doc_id=10112
 * 素材上传得到media_id，该media_id仅三天内有效 media_id在同一企业内应用之间可以共享
 * 所有文件size必须大于5个字节
 * 图片（image）：10MB，支持JPG,PNG格式
 * 语音（voice） ：2MB，播放长度不超过60s，仅支持AMR格式
 * 视频（video） ：10MB，支持MP4格式
 * 普通文件（file）：20MB
 * @param {
 *  corpid: String 企业微信ID
 *  corpsecret: String 企业应用秘钥
 *  accessToken: String 登录凭证
 *  type: String 媒体文件类型 分别有图片(image)、语音(voice)、视频(video)、普通文件(file)
 *  fileMedia: File 媒体文件，内应包含有 filename、filelength、content-type等信息
 * }
 * corpid/corpsecret 与 accessToken 二选一传入, 全部传参则取accessToken
 * 内容类型为multipart/form-data
 */
export const uploadQwMediaTmp = async (params) => {
  console.log("uploadQwMediaTmp", params);
  const res = await FetchManager.execAxiosPOST(
    `${GlobalManager.baseUrlWeiXinCloudrun}/api/post/uploadQwMediaTmp`,
    params,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res?.data || {};
};

export default {
  sendRobotMsg,
  getAccessToken,
  uploadQwMediaTmp,
};
