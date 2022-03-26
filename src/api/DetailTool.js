import GlobalManager from "@/services/GlobalManager";
import FetchManager from "@/services/FetchManager";

// https://lbs.baidu.com/index.php?title=webapi/guide/webservice-geocoding
const ak = "HGtCGFPlNXNqAN9PsXPvi71vrDmAAsFp"; // 百度API接口秘钥

/**
 * 地址编码转经纬度
 * @param {
 *  output: String 类型json写死
 *  ak: String API接口秘钥
 *  address: String 地址信息
 * }
 */
export const geocodingAddress = async (params) => {
  const { address = "" } = params;
  const res = await FetchManager.execJsonp(
    "https://api.map.baidu.com/geocoding/v3/",
    {
      output: "json",
      ak: ak,
      address: address,
    }
  );
  return res?.result || {};
};

/**
 * 地址逆编码转经纬度
 * @param {
 *  output: String 类型json写死
 *  ak: String API接口秘钥
 *  coordtype: String bd09ll(百度经纬度坐标)、bd09mc(百度米制坐标)、gcj02ll(国测局经纬度坐标,仅限中国)、wgs84ll(GPS经纬度)
 *  location: String 经纬度
 * }
 *
 */
export const reverseGeocodingAddress = async (params) => {
  const { location = {} } = params;
  const res = await FetchManager.execJsonp(
    "https://api.map.baidu.com/reverse_geocoding/v3/",
    {
      output: "json",
      ak: ak,
      coordtype: "gcj02ll",
      location: `${location.lat},${location.lng}`,
    }
  );
  return res?.result || {};
};

/**
 * 根据城市名字反查省份
 * @param {
 *  address: String 地址信息
 * }
 */
export const getProvinceFromCity = async (params) => {
  const res1 = await geocodingAddress(params);
  const res2 = await reverseGeocodingAddress(res1);
  return res2;
};

/** tinify压缩图片接口
 * https://tinify.cn/developers
 * https://tinify.cn/dashboard/api
 * 素材上传得到media_id，该media_id仅三天内有效 media_id只能是对应上传文件的机器人可以使用
 * @param {
 *  image: File 图片文件
 * }
 * 内容类型为multipart/form-data
 */
export const tinifyImage = async (params) => {
  console.log("tinifyImage", params);
  const res = await FetchManager.execAxiosPOST(
    `${GlobalManager.baseUrlWeiXinCloudrun}/api/post/tinifyImage`,
    params,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res?.data || {};
};

export default {
  geocodingAddress,
  reverseGeocodingAddress,
  getProvinceFromCity,
  tinifyImage,
};
