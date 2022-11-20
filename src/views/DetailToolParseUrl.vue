<template>
  <v-t-wrap-detail :title="info?.title">
    <template #body>
      <v-t-card-module title="解码信息" :btnTipList="['fold']">
        <template #body>
          <v-t-item label="预处理解码次数" type="custom">
            <template #custom>
              <div class="flex-start-h detail-tool-time-item">
                <el-input type="text" v-model="strDecodeCount" placeholder="1" clearable />
              </div>
            </template>
          </v-t-item>

          <v-t-item label="待解析信息" type="custom">
            <template #custom>
              <div class="flex-start-h detail-tool-parse-item">
                <el-input type="textarea" class="text-break" v-model="strSource"
                  placeholder="https://www.baidu.com/s?wd=%E7%A9%BF%E5%B1%B1%E7%94%B2%E5%88%B0%E5%BA%95%E8%AF%B4%E4%BA%86%E4%BB%80%E4%B9%88&rsv_spt=1&rsv_iqid=0xd04781230000554b&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_dl=tb&rsv_sug3=29&rsv_sug1=3&rsv_sug7=100&rsv_sug2=0&rsv_btype=i&prefixsug=%25E7%25A9%25BF%25E5%25B1%25B1%25E7%2594%25B2%25E5%2588%25B0%25E5%25BA%2595%25E8%25AF%25B4%25E4%25BA%2586%25E4%25BB%2580%25E4%25B9%2588&rsp=5&inputT=3433&rsv_sug4=3433"
                  clearable />
                <el-button type="primary" @click="handleBtnParseClick">解析</el-button>
              </div>
            </template>
          </v-t-item>
        </template>
      </v-t-card-module>

      <v-t-card-module v-if="arrParseResult.length > 0" title="解析结果" :btnTipList="['fold']">
        <template #body>
          <template v-for="(itemParse, indexParse) in arrParseResult" :key="index">
            <v-t-item label="路由" type="text">
              <template #text>
                {{ itemParse.label }}
              </template>
            </v-t-item>
            <template v-for="(itemPar, indexPar) in itemParse.params" :key="index">
              <v-t-item :label="`参数${indexPar}`" type="custom">
                <template #custom>
                  <div class="flex-around-h detail-tool-parse-item">
                    <el-input class="flex3 detail-tool-trial-item-block" type="text" v-model="itemPar.key"
                      placeholder="key" clearable />
                    <el-input class="flex1 detail-tool-trial-item-block" type="text" v-model="itemPar.value"
                      placeholder="value" clearable />
                  </div>
                </template>
              </v-t-item>
            </template>
          </template>
        </template>
      </v-t-card-module>
    </template>
  </v-t-wrap-detail>
</template>

<script>
import { ElMessage } from "element-plus";
import VTCardModule from "@/components/VTCardModule";
import VTItem from "@/components/VTItem";
import VTWrapDetail from "@/components/VTWrapDetail";
import { router2Params } from "@/kits";

export default {
  name: "DetailToolParseUrl",
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
      strDecodeCount: '1', // 预处理解码次数
      strSource: "https://www.baidu.com/s?wd=%E7%A9%BF%E5%B1%B1%E7%94%B2%E5%88%B0%E5%BA%95%E8%AF%B4%E4%BA%86%E4%BB%80%E4%B9%88&rsv_spt=1&rsv_iqid=0xd04781230000554b&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_dl=tb&rsv_sug3=29&rsv_sug1=3&rsv_sug7=100&rsv_sug2=0&rsv_btype=i&prefixsug=%25E7%25A9%25BF%25E5%25B1%25B1%25E7%2594%25B2%25E5%2588%25B0%25E5%25BA%2595%25E8%25AF%25B4%25E4%25BA%2586%25E4%25BB%2580%25E4%25B9%2588&rsp=5&inputT=3433&rsv_sug4=3433", // 待解析的信息
      arrParseResult: [], // 解析后的信息
    };
  },
  methods: {
    // 对字符串进行预处理解码
    decodeURIComponentCount(strSource) {
      let result = strSource
      for (let i = 0; i < +this.strDecodeCount; i++) {
        result = decodeURIComponent(result)
      }
      return result
    },
    // 点击解析按钮
    handleBtnParseClick() {
      const res = router2Params(this.decodeURIComponentCount(this.strSource))
      const { path, params, resList = [] } = res || {}
      this.arrParseResult = resList.map((itemRes, index) => {
        return {
          label: itemRes.path,
          params: Object.keys(itemRes.params).map((itemPar) => {
            return {
              key: itemPar,
              value: itemRes.params[itemPar]
            }
          })
        }
      })
      console.log('handleBtnParseClick', this.arrParseResult)
    },
  },
};
</script>

<style lang="less" scoped>
.detail-tool-parse-item {
  width: 100%;
  align-items: flex-start;
}
</style>
