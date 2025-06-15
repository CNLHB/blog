import { defineConfig } from "vitepress";
import { defineTeekConfig } from "vitepress-theme-teek/config";
import { version } from "vitepress-theme-teek/es/version";
import { description, head } from "./overConfig";

const teekConfig = defineTeekConfig({
  author: { name: "爱华Fullstack", link: "https://github.com/CNLHB" },
  blogger: {
    avatar: "/mylogo.png",
    shape: "circle-rotate",
    name: " ", //爱华
    slogan: "", //多试总会有变化！
    circleBgImg: "/mylogobg.jpg",
    color: "#ffffff"
  },
  footerInfo: {
    theme: {
      name: `Theme By Teek@${version}`
    },
    copyright: {
      createYear: 2025,
      suffix: "爱华"
    }
  },
  codeBlock: {
    copiedDone: (TkMessage) => TkMessage.success("复制成功！")
  },
  post: {
    showCapture: true
  },
  articleShare: { enabled: true },
  vitePlugins: {
    sidebar: true, // 是否启用 sidebar 插件
    sidebarOption: {
      initItems: false,
      ignoreList: ["images", "image"]
    },
    catalogueOption: {
      ignoreList: [/image|images/]
    }
  },
  markdown: {
    demo: {
      githubUrl: "https://github.com/CNLHB/blog/blob/master/docs"
    }
  },
  siteAnalytics: [
    {
      provider: "baidu",
      options: {
        id: "d5ee872d9aa1ef8021f4a3921b2e9c2a"
      }
    },
    {
      provider: "google",
      options: {
        id: "G-K5GNDW3L7K"
      }
    }
  ],
  banner: {
    name: "🎉 爱华Fullstack",
    bgStyle: "partImg",
    imgSrc: ["/blog/bg1.webp", "/blog/bg2.webp", "/blog/bg3.webp"],
    description: [
      "故事由我书写，旅程由你见证，传奇由她聆听 —— 来自 Young Kbt",
      "积跬步以至千里，致敬每个爱学习的你 —— 来自 Evan Xu",
      "这一生波澜壮阔或是不惊都没问题 —— 来自 Weibw"
    ],
    descStyle: "switch"
  }
});
// https://vitepress.dev/reference/site-config
export default defineConfig({
  outDir: "../dist",
  base: "/blog/",
  srcExclude: ["**/README.md", "**/TODO.md"],
  extends: teekConfig,
  title: "爱华Fullstack",
  description: description,
  cleanUrls: false,
  lastUpdated: true,
  lang: "zh-CN",
  head: head,
  markdown: {
    // 开启行号
    lineNumbers: true,
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true
    },
    // 更改容器默认值标题
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息"
    }
  },
  sitemap: {
    hostname: "https://vp.teek.top",
    transformItems: (items) => {
      const permalinkItemBak: typeof items = [];
      // 使用永久链接生成 sitemap
      const permalinks = (globalThis as any).VITEPRESS_CONFIG.site.themeConfig.permalinks;
      items.forEach((item) => {
        const permalink = permalinks?.map[item.url];
        if (permalink) permalinkItemBak.push({ url: permalink, lastmod: item.lastmod });
      });
      return [...items, ...permalinkItemBak];
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.png",
    darkModeSwitchLabel: "主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    lastUpdatedText: "上次更新时间",
    outline: {
      level: [2, 4],
      label: "本页导航"
    },
    docFooter: {
      prev: "上一页",
      next: "下一页"
    },
    nav: [
      { text: "首页", link: "/" },
      {
        text: "导航",
        activeMatch: "/nav",
        items: [
          { text: "前端", link: "/front/", activeMatch: "/front" },
          { text: "后端", link: "/server", activeMatch: "/server" },
          { text: "算法", link: "/algorithm/", activeMatch: "/algorithm" },
          { text: "框架", link: "/frame/", activeMatch: "/frame" },
          { text: "面试", link: "/interview/", activeMatch: "/interview" },
          { text: "职业", link: "/guide/", activeMatch: "/guide" },
          { text: "杂谈", link: "/gossip/", activeMatch: "/gossip" }
        ]
      },
      {
        text: "分类",
        link: "/categories"
        // activeMatch: "/categories/"
      },
      {
        text: "Tag",
        link: "/tags"
        // , activeMatch: "/tags"
      },
      {
        text: "功能页",
        activeMatch: "/archives/",
        items: [
          { text: "归档页", link: "/archives" },
          { text: "清单页", link: "/articleOverview" }
          // { text: "登录页", link: "/login" },
          // { text: "风险链接提示页", link: "/risk-link?target=https://vp.teek.top" },
        ]
      }
      // {
      //   text: version,
      //   items: [
      //     {
      //       text: "历史版本",
      //       link: "https://github.com/CNLHB/blog/releases"
      //     },
      //     {
      //       text: "更新日志",
      //       link: "https://github.com/CNLHB/blog/blob/dev/CHANGELOG.md"
      //     }
      //   ]
      // }
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/CNLHB/blog" }],

    search: {
      provider: "local"
    },
    editLink: {
      text: "在 GitHub 上编辑此页",
      pattern: "https://github.com/CNLHB/blog/edit/master/docs/:path"
    }
  }
});
