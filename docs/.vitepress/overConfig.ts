export const description = [
  "欢迎来到爱华Fullstack 博客，一个基于 VitePress 的知识管理工具"
].toString();
export const head: any = [
  ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.ico" }],
  ["link", { rel: "icon", type: "image/png", href: "/favicon.ico" }],
  ["meta", { property: "og:type", content: "website" }],
  ["meta", { property: "og:locale", content: "zh-CN" }],
  ["meta", { property: "og:title", content: "爱华Fullstack" }],
  ["meta", { property: "og:site_name", content: "爱华Fullstack" }],
  ["meta", { property: "og:image", content: "" }],
  ["meta", { property: "og:url", content: "" }],
  ["meta", { property: "og:description", description }],
  ["meta", { name: "description", description }],
  ["meta", { name: "author", content: "爱华Fullstack" }],
  [
    "meta",
    {
      name: "viewport",
      content:
        "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
    }
  ],

  ["meta", { name: "keywords", description }],
  ["meta", { name: "baidu-site-verification", content: "codeva-GdK2q9MO1i" }], // 百度收录
  ["meta", { name: "msvalidate.01", content: "48CABE70F538B8D117567176ABF325AF" }], // Bing 收录验证
  [
    "script",
    {},
    `typeof LA !== 'undefined' && LA.init({ id: "3LqfP8Icg0GeEvtn", ck: "3LqfP8Icg0GeEvtn", hashMode: true })`
  ] // 51.la
];
