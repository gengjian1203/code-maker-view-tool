export const content = [
  {
    title: "iconfont批量全选的脚本",
    lang: "text/javascript",
    code: `
  let span = document.querySelectorAll('.icon-cover');
  for (let i = 0, len = span.length; i < len; i++) {
    console.log(span[i].querySelector('span').click());
  }
    `,
  },
];
