module.exports = {
  bundler: '@vuepress/vite',
  locales: {
    '/': {
      lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
      title: 'liuli-tools',
      description:
        'Some project-level toolsets mainly try to develop and improve efficiency. Welcome to [Discussion](https://github.com/rxliuli/liuli-tools/discussions) to exchange ideas.',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'liuli-tools',
      description:
        '一些项目级别的工具集，主要尝试研发提效，欢迎来 [讨论区](https://github.com/rxliuli/liuli-tools/discussions) 交流想法。',
    },
  },
  themeConfig: {
    locales: {
      '/': {
        navbar: [
          { text: 'Home', link: '/' },
          {
            text: 'Tools',
            children: [
              {
                text: 'Introduction',
                link: '/tools/',
              },
              {
                text: 'i18next-dts-gen',
                link: '/tools/i18next-dts-gen',
              },
            ],
          },
          { text: 'GitHub', link: 'https://github.com/rxliuli/liuli-tools' },
        ],
        sidebar: {
          '/tools/i18next-dts-gen': [
            {
              text: 'Get Started',
              link: '/tools/i18next-dts-gen',
            },
          ],
        },
      },
      '/zh/': {
        navbar: [
          { text: '首页', link: '/zh/' },
          {
            text: '工具',
            children: [
              {
                text: '简介',
                link: '/zh/tools/',
              },
              {
                text: '@liuli-util/cli',
                link: '/zh/tools/cli/',
              },
              {
                text: '@liuli-util/shell',
                link: '/zh/tools/shell/',
              },
              {
                text: 'vite-jetbrains-plugin',
                link: '/zh/tools/vite-jetbrains-plugin/',
              },
              {
                text: 'i18next-dts-gen',
                link: '/zh/tools/i18next-dts-gen',
              },
              {
                text: 'i18next-util',
                link: '/zh/tools/i18next-util',
              },
              {
                text: 'prettier-standard-config',
                link: '/zh/tools/prettier-standard-config',
              },
            ],
          },
          {
            text: 'GitHub',
            link: 'https://github.com/rxliuli/liuli-tools',
          },
        ],
        sidebar: {
          '/zh/tools/i18next-dts-gen': [
            {
              text: '快速启动',
              link: '/zh/tools/i18next-dts-gen',
            },
          ],
        },
      },
    },
  },
}
