import FetchManager from "@/services/FetchManager";

// https://lbs.baidu.com/index.php?title=webapi/guide/webservice-geocoding
const ak = "HGtCGFPlNXNqAN9PsXPvi71vrDmAAsFp"; // 百度API接口秘钥

/**
 * 地址编码转经纬度
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
 * coordtype: string bd09ll（百度经纬度坐标）、bd09mc（百度米制坐标）、gcj02ll（国测局经纬度坐标，仅限中国）、wgs84ll（ GPS经纬度）
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
 */
export const getProvinceFromCity = async (params) => {
  const res1 = await geocodingAddress(params);
  const res2 = await reverseGeocodingAddress(res1);
  return res2;
};

export default {
  geocodingAddress,
  reverseGeocodingAddress,
  getProvinceFromCity,
};
