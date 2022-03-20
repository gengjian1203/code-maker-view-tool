export const content = [
  {
    title: "骨架屏布局",
    lang: "text/html",
    code: `
<div class="iconSkeleton" />
    `,
  },
  {
    title: "骨架屏样式",
    lang: "text/css",
    code: `
<style>
  .iconSkeleton {
    width: 100px;
    height: 100px;
    border-radius: 12px;
    background-color: #e0e0e0;
    animation: skeleton-blink 1.2s ease-in-out infinite;
  }
  
  @keyframes skeleton-blink {
    50% {
      opacity: 0.6;
    }
  }
</style>
    `,
  },
];
