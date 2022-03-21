<template>
  <v-t-wrap-detail :title="info?.title">
    <template #body>
      <!-- 查询单一位置 -->
      <v-t-card-module title="查询单一位置" :btnTipList="['fold']">
        <template #body>
          <v-t-item label="位置名称" type="custom">
            <template #custom>
              <div class="flex-start-h width-fill">
                <el-input
                  class="city-one-value"
                  type="text"
                  v-model="strCityOneAddressValue"
                  placeholder="南京"
                  clearable
                  @change="handleCityOneBtnClick"
                />
                <el-button
                  type="primary"
                  :loading="isCityOneBtnLoading"
                  @click="handleCityOneBtnClick"
                  >查询</el-button
                >
              </div>
            </template>
          </v-t-item>
          <v-t-item label="经纬度" type="text">
            <template #text>
              {{ strCityOneLocation }}
            </template>
          </v-t-item>
          <v-t-item label="地址信息" type="text">
            <template #text>
              {{ strCityOneFormattedAddress }}
            </template>
          </v-t-item>
          <v-t-item label="商圈信息" type="text">
            <template #text>
              {{ strCityOneBusiness }}
            </template>
          </v-t-item>
        </template>
      </v-t-card-module>
      <!-- 查询多条位置 -->
      <v-t-card-module title="反查多条位置" :btnTipList="['fold']">
        <template #body>
          <v-t-item label="位置名称" type="custom">
            <template #custom>
              <div class="flex-start-h width-fill">
                <el-input
                  class="city-multi-value"
                  type="text"
                  v-model="strCityMultiAddressValue"
                  placeholder="['南京','三亚','马鞍山','台南','镇江']"
                  clearable
                  @change="handleCityMultiBtnClick"
                />
                <el-button
                  type="primary"
                  :loading="isCityMultiBtnLoading"
                  @click="handleCityMultiBtnClick"
                  >查询</el-button
                >
              </div>
            </template>
          </v-t-item>
          <v-t-item label="省份去重" type="text">
            <template #text>
              {{ strCityMultiProvince }}
            </template>
          </v-t-item>
          <v-t-item label="反查详情" type="text">
            <template #text>
              {{ strCityMultiDetail }}
            </template>
          </v-t-item>
        </template>
      </v-t-card-module>
    </template>
  </v-t-wrap-detail>
</template>

<script>
import { ElMessage } from "element-plus";
import Api from "@/api";
import VTCardModule from "@/components/VTCardModule";
import VTItem from "@/components/VTItem";
import VTWrapDetail from "@/components/VTWrapDetail";
import AutoStatusLoading from "@/decorator/AutoStatusLoading";

export default {
  name: "DetailToolCity",
  components: {
    VTCardModule,
    VTItem,
    VTWrapDetail,
  },
  props: {
    info: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      // 查询单一位置
      isCityOneBtnLoading: false,
      strCityOneAddressValue: "南京", // 待查询位置信息
      strCityOneLocation: "", // 经纬度
      strCityOneFormattedAddress: "", // 地址信息
      strCityOneBusiness: "", // 商圈信息
      // 查询多条位置
      isCityMultiBtnLoading: false,
      strCityMultiAddressValue: "['南京','三亚','马鞍山','台南','镇江']", // 待查询位置信息
      strCityMultiProvince: "", // 省份去重结果
      strCityMultiDetail: "", // 反查详情结果
    };
  },
  methods: {
    // 点击单一位置查询
    @AutoStatusLoading("isCityOneBtnLoading")
    async handleCityOneBtnClick() {
      const res = await Api.DetailToolCity.getProvinceFromCity({
        address: this.strCityOneAddressValue,
      });
      console.log("handleCityOneBtnClick", res);
      const { business, formatted_address, location } = res || {};
      const { lat, lng } = location || {};
      this.strCityOneLocation = `lat:${lat}, lng:${lng}`;
      this.strCityOneFormattedAddress = formatted_address; // 地址信息
      this.strCityOneBusiness = business; // 商圈信息
    },
    // 点击多条位置查询
    @AutoStatusLoading("isCityMultiBtnLoading")
    async handleCityMultiBtnClick() {
      if (!this.strCityMultiAddressValue) {
        return;
      }
      let arrCityList = [];
      let arrResList = [];
      let arrProvinceList = [];
      try {
        const strCityListTmp = this.strCityMultiAddressValue
          .replace(/'/g, '"') // 单引号转为双引号
          .replace(/ /g, "") // 去掉无意义空格
          .replace(/,]/g, "]"); // 去掉数组最后一个逗号
        arrCityList = JSON.parse(strCityListTmp);
        if (!Array.isArray(arrCityList)) {
          ElMessage.error("【反查多条位置】内容非法");
          return;
        }
      } catch (e) {
        ElMessage.error("【反查多条位置】内容非法");
        return;
      }
      for (let item of arrCityList) {
        const res = await Api.DetailToolCity.getProvinceFromCity({
          address: item,
        });
        const { addressComponent } = res;
        arrResList.push({
          city: item,
          province: addressComponent.province,
          formattedDetail: `${item} - ${addressComponent.province}`,
        });
      }
      arrResList = arrResList.sort((itemA, itemB) => {
        return itemA.province.localeCompare(itemB.province);
      });
      // 省份去重整理
      arrProvinceList = Array.from(
        new Set(
          arrResList.map((item) => {
            return item.province;
          })
        )
      );
      this.strCityMultiProvince = JSON.stringify(arrProvinceList);
      // 反查详情整理
      this.strCityMultiDetail = arrResList
        .map((item) => {
          return item.formattedDetail;
        })
        .join("\n");
    },
  },
};
</script>

<style lang="less" scoped>
.city-one-value {
  margin-right: var(--margin-base);
}

.city-multi-value {
  margin-right: var(--margin-base);
}
</style>
