export const content = [
  {
    title: "获取指定时间字符串",
    lang: "text/javascript",
    code: `
/**
 * 获取指定时间字符串
 * @param date Date();
 * @return
 */
let getStringDate = (date = new Date()) => {
  const YYYY = String(date.getFullYear());
  const MM = String(date.getMonth() + 1).padStart(2, "0");
  const DD = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  const timeString = \`\${YYYY}-\${MM}-\${DD} \${hh}:\${mm}:\${ss}\`;
  const monthString = \`\${YYYY}-\${MM}\`;
  const dayString = \`\${YYYY}-\${MM}-\${DD}\`;

  return {
    date,
    YYYY,
    MM,
    DD,
    hh,
    mm,
    ss,
    timeString: timeString,
    monthString: monthString,
    todayString: dayString,
  };
};
    `,
  },
  {
    title: "获取指定时间字符串 使用示例",
    lang: "text/javascript",
    code: `
getStringDate()
    `,
  },
];
