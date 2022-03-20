export const arrMenuListTemp = [
  {
    id: "000",
    name: "常用工具",
    component: "PageContent",
    pageName: "PageTool",
    icon: { "icon-wrench": true },
    list: [
      {
        id: "000000",
        title: "时间相关",
        icon: "icon-Field-time",
        desc: "时间相关转换",
        component: "DetailToolTime", // 与/views/路径下的页面组件名称相匹配
        pageName: "PageTool/DetailToolTime", // 唯一的名字，用/分割，前面为所属菜单名称，后面为页面名称
      },
      {
        id: "000001",
        title: "省市查询",
        icon: "icon-bank",
        desc: "省份城市关联查询",
        component: "DetailToolCity",
        pageName: "PageTool/DetailToolCity",
      },
    ],
  },
  {
    id: "001",
    name: "常用CSS",
    component: "PageContent",
    pageName: "PageCss",
    icon: { "icon-formatpainter": true },
    list: [
      {
        id: "001000",
        title: "多栏展示",
        icon: "icon-project",
        desc: "多栏自适应文字省略布局样式",
        component: "DetailCss",
        pageName: "PageCss/DetailCssMultiColumn",
      },
      {
        id: "001001",
        title: "骨架屏",
        icon: "icon-interation-fill",
        desc: "骨架屏相关的效果",
        component: "DetailCss",
        pageName: "PageCss/DetailCssSkeleton",
      },
      {
        id: "001002",
        title: "加载",
        icon: "icon-loading",
        desc: "Loading相关的效果",
        component: "DetailCss",
        pageName: "PageCss/DetailCssLoading",
      },
    ],
  },
  {
    id: "002",
    name: "常用JS",
    component: "PageContent",
    pageName: "PageJs",
    icon: { "icon-experiment": true },
    list: [
      {
        id: "002000",
        title: "路由转换",
        icon: "icon-nav-list",
        desc: "路由/传参对象相关转换",
        component: "DetailJs",
        pageName: "PageJs/DetailJsRouter2Params",
      },
      {
        id: "002001",
        title: "时间格式化",
        icon: "icon-responsetime",
        desc: "获取指定时间字符串",
        component: "DetailJs",
        pageName: "PageJs/DetailJsFormatDate",
      },
      {
        id: "002002",
        title: "倒计时",
        icon: "icon-clock",
        desc: "浏览器中进行倒计时",
        component: "DetailJs",
        pageName: "PageJs/DetailJsCountDown",
      },
      {
        id: "002003",
        title: "阻止事件",
        icon: "icon-send",
        desc: "阻止冒泡时间以及默认行为",
        component: "DetailJs",
        pageName: "PageJs/DetailJsStopEvent",
      },
      {
        id: "002004",
        title: "全选图标",
        icon: "icon-select",
        desc: "将iconfont图标库全选到购物车",
        component: "DetailJs",
        pageName: "PageJs/DetailJsIconfontSelectAll",
      },
    ],
  },
  {
    id: "003",
    name: "企微API",
    component: "PageContent",
    pageName: "PageQwapi",
    icon: { "icon-bulb": true },
    list: [
      {
        id: "003000",
        title: "企微机器人",
        icon: "icon-robot1",
        desc: "向企微内部群发送消息",
        component: "DetailQwRobot",
        pageName: "PageQwapi/DetailQwRobot",
      },
    ],
  },
];

export default {
  arrMenuListTemp,
};
