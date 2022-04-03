import GlobalManager from "@/services/GlobalManager";
import FetchManager from "@/services/FetchManager";

/** 获取小程序access_token
 * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/access-token/auth.getAccessToken.html
 * @param {
 *  appid: String 小程序ID
 *  secret: String 小程序秘钥
 * }
 */
export const getAccessTokenMini = async (params) => {
  console.log("getAccessTokenMini", params);
  const res = await FetchManager.execAxiosGET(
    `${GlobalManager.baseUrlWeiXinCloudrun}/api/get/getAccessTokenMini`,
    params
  );
  return res?.data || {};
};

/** 本接口提供基于小程序的通用印刷体 OCR 识别
 * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/ocr/ocr.printedText.html
 * @param {
 *  appid: String 小程序ID
 *  secret: String 小程序秘钥
 *  accessToken: String 登录凭证
 *  image: File 图片文件
 * }
 * 内容类型为multipart/form-data
 */
export const ocrImageCommon = async (params) => {
  console.log("ocrImageCommon", params);
  const res = await FetchManager.execAxiosPOST(
    `${GlobalManager.baseUrlWeiXinCloudrun}/api/post/ocrImageCommon`,
    params,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res?.data || {};
};

export default {
  getAccessTokenMini,
  ocrImageCommon,
};
