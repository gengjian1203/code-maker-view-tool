export const content = [
  {
    title: "开启倒计时",
    lang: "text/javascript",
    code: `
let time = 0
let showTime = (target, YYYY, MM, DD, hh, mm, ss) => {
  const d2 = new Date(YYYY, MM - 1, DD, hh, mm, ss);
  const d0 = new Date();
  let ts = d2 - d0;
  if (ts > 0) {
    const d = Math.floor(ts / 86400000)
    ts = ts % 8640000
    const h = Math.floor(ts / 3600000);
    const m = Math.floor((ts / 60000) % 60);
    const s = Math.floor((ts / 1000) % 60);
    console.log(\`距离\${target}，还剩\${d}天\${h}小时\${m}分\${s}秒\`);
  }
}
time = setInterval(() => {showTime('过年', 2022, 2, 1, 00, 00, 00)}, 1000)
    `,
  },
  {
    title: "结束倒计时",
    lang: "text/javascript",
    code: `
clearInterval(time)
    `,
  },
];
