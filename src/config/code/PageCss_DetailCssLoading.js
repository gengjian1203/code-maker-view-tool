export const content = [
  {
    title: "loading布局",
    lang: "text/html",
    code: `
<div class="iconLoading" />
    `,
  },
  {
    title: "loading样式",
    lang: "text/css",
    code: `
<style>
  .iconLoading {
    width: 100px;
    height: 100px;
    border: 6px solid #eee;
    border-left-color: #fff;
    border-radius: 50%;
    animation: loading 1s infinite linear;
  }
  
  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
    `,
  },
];
