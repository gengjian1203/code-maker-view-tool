const ci = require("miniprogram-ci");
const sendQWRobot = require("./robot/sendQWRobot")

const webhook = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=f86ead0c-3f0b-436b-9739-bba8dc51e294"

const genH5RobotParams = () => {
  const result = {
    msgtype: "template_card",
    template_card: {
      card_type: "text_notice",
      source: {
        icon_url: "https://wx.qlogo.cn/mmhead/Q3auHgzwzM7aInrfKIyZkybgeVbgsxMwJLR1Ft5vIZbrXUWPBrJHUg/0",
        desc: "code-maker-view-tool",
        desc_color: 0
      },
      main_title: {
        title: "工具页部署结果",
        desc: ""
      },
      emphasis_content: {
        title: "100",
        desc: "部署分支"
      },
      horizontal_content_list: [],
      jump_list: [
        {
          type: 1,
          keyname: '最新页面',
          value: "点击访问",
          url: "https://prod-5gkxku5cdb510bb2-1259256375.tcloudbaseapp.com/view_tool/index.html#/"
        },
      ],
      card_action: {
        type: 1,
        url: "https://prod-5gkxku5cdb510bb2-1259256375.tcloudbaseapp.com/view_tool/index.html#/"
      }
    }
  }

  return result
}

const main = async () => {
  const project = new ci.Project({
    appid: "wx821aadcd431646f9",
    type: "miniProgram",
    projectPath: "./client/dist/weapp",
    privateKeyPath: `./script/keys/private.wx821aadcd431646f9.key`,
    ignores: ["node_modules/**/*"],
  });

  // 静态网站
  console.log("静态网站上传中...");
  const result = await ci.cloud.uploadStaticStorage({
    project,
    env: "prod-5gkxku5cdb510bb2",
    path: "./view_tool",
    remotePath: "/view_tool",
  });

  console.log("静态网站完毕.", result);
  console.log(
    `部署地址：https://prod-5gkxku5cdb510bb2-1259256375.tcloudbaseapp.com/view_tool/index.html#/`
  );

  await sendQWRobot(webhook, genH5RobotParams())
};

// 主函数
main();
