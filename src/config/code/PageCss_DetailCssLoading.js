export const content = [
  {
    title: "loading1布局",
    lang: "text/html",
    code: `
<div class="iconLoading1">
</div>
    `,
  },
  {
    title: "loading1样式",
    lang: "text/css",
    code: `
<style>
  .iconLoading1 {
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
  {
    title: "loading2布局",
    lang: "text/html",
    code: `
<div class="loadEffect2">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
    `,
  },
  {
    title: "loading2样式",
    lang: "text/css",
    code: `
<style>
  .loadEffect2 {
    width: 100px;
    height: 100px;
    position: relative;
    margin: 0 auto;
    margin-top:100px;
  }
  .loadEffect2 span {
    display: inline-block;
    width: 30px;
    height: 10px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background: #000;
    position: absolute;
    -webkit-animation: load2 1.04s ease infinite;
  }
  @-webkit-keyframes load2 {
    0%{
        opacity: 1;
    }
    100%{
        opacity: 0.2;
    }
  }
  .loadEffect2 span:nth-child(1) {
    left: 0;
    top: 50%;
    margin-top:-5px;
    -webkit-animation-delay:0.13s;
  }
  .loadEffect2 span:nth-child(2) {
    left: 10px;
    top: 20px;
    -webkit-transform: rotate(45deg);
    -webkit-animation-delay:0.26s;
  }
  .loadEffect2 span:nth-child(3) {
    left: 50%;
    top: 10px;
    margin-left: -15px;
    -webkit-transform: rotate(90deg);
    -webkit-animation-delay:0.39s;
  }
  .loadEffect2 span:nth-child(4) {
    top: 20px;
    right:10px;
    -webkit-transform: rotate(135deg);
    -webkit-animation-delay:0.52s;
  }
  .loadEffect2 span:nth-child(5) {
    right: 0;
    top: 50%;
    margin-top:-5px;
    -webkit-transform: rotate(180deg);
    -webkit-animation-delay:0.65s;
  }
  .loadEffect2 span:nth-child(6) {
    right: 10px;
    bottom:20px;
    -webkit-transform: rotate(225deg);
    -webkit-animation-delay:0.78s;
  }
  .loadEffect2 span:nth-child(7) {
    bottom: 10px;
    left: 50%;
    margin-left: -15px;
    -webkit-transform: rotate(270deg);
    -webkit-animation-delay:0.91s;
  }
  .loadEffect2 span:nth-child(8) {
    bottom: 20px;
    left: 10px;
    -webkit-transform: rotate(315deg);
    -webkit-animation-delay:1.04s;
  }
</style>
    `,
  },
  {
    title: "loading3布局",
    lang: "text/html",
    code: `
<div class="loading3">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
    `,
  },
  {
    title: "loading3样式",
    lang: "text/css",
    code: `
<style>
  .loading3 {
    width: 80px;
    height: 40px;
    margin: 0 auto;
    margin-top:100px;
  }
  .loading3 span {
    display: inline-block;
    width: 8px;
    height: 100%;
    border-radius: 4px;
    background: lightgreen;
    -webkit-animation: load3 1.04s ease infinite;
  }
  @-webkit-keyframes load3 {
    0%,100%{
        height: 40px;
        background: lightgreen;
    }
    50%{
        height: 60px;
        margin-top: -20px;
        background: lightblue;
    }
  }
  .loading3 span:nth-child(2) {
    -webkit-animation-delay:0.13s;
  }
  .loading3 span:nth-child(3) {
    -webkit-animation-delay:0.26s;
  }
  .loading3 span:nth-child(4) {
    -webkit-animation-delay:0.39s;
  }
  .loading3 span:nth-child(5) {
    -webkit-animation-delay:0.52s;
  }
</style>
    `,
  },
];
