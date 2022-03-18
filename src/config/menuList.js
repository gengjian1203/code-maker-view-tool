export const arrMenuListTemp = [
  {
    name: "常用工具",
    type: "PageTool",
    icon: { "icon-wrench": true },
    list: [
      {
        id: "000000",
        title: "时间相关",
        icon: "icon-Field-time",
        desc: "时间相关转换",
        type: "DetailToolTime",
      },
      {
        id: "000001",
        title: "省市查询",
        icon: "icon-bank",
        desc: "省份城市关联查询",
        type: "DetailToolCity",
      },
    ],
  },
  {
    name: "常用CSS",
    type: "PageCss",
    icon: { "icon-formatpainter": true },
    list: [
      {
        id: "100000",
        title: "多栏展示",
        icon: "icon-project",
        desc: "多栏自适应文字省略布局样式",
        type: "DetailCss",
      },
      {
        id: "100001",
        title: "骨架屏",
        icon: "icon-interation-fill",
        desc: "骨架屏相关的效果",
        type: "DetailCss",
      },
      {
        id: "100002",
        title: "加载",
        icon: "icon-loading",
        desc: "Loading相关的效果",
        type: "DetailCss",
      },
    ],
  },
  {
    name: "常用JS",
    type: "PageJs",
    icon: { "icon-experiment": true },
    list: [
      {
        id: "200000",
        title: "路由转换",
        icon: "icon-nav-list",
        desc: "路由/传参对象相关转换",
        type: "DetailJs",
      },
      {
        id: "200001",
        title: "时间格式化",
        icon: "icon-responsetime",
        desc: "获取指定时间字符串",
        type: "DetailJs",
      },
      {
        id: "200002",
        title: "倒计时",
        icon: "icon-clock",
        desc: "浏览器中进行倒计时",
        type: "DetailJs",
      },
      {
        id: "200003",
        title: "阻止事件",
        icon: "icon-send",
        desc: "阻止冒泡时间以及默认行为",
        type: "DetailJs",
      },
      {
        id: "200004",
        title: "全选图标",
        icon: "icon-select",
        desc: "将iconfont图标库全选到购物车",
        type: "DetailJs",
      },
    ],
  },
  {
    name: "企微API",
    type: "PageQwapi",
    icon: { "icon-bulb": true },
    list: [
      {
        id: "300000",
        title: "企微机器人",
        icon: "icon-robot1",
        desc: "向企微内部群发送消息",
        type: "DetailQwRobot",
      },
    ],
  },
];

export default {
  arrMenuListTemp,
};
