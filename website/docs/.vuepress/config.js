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
                text: '工程工具',
                children: [
                  {
                    text: '@liuli-util/cli',
                    link: 'https://github.com/rxliuli/liuli-tools/tree/master/apps/liuli-cli',
                  },
                  {
                    text: '@liuli-util/shell',
                    link: 'https://github.com/rxliuli/liuli-tools/tree/master/apps/shell',
                  },
                  {
                    text: 'vite-jetbrains-plugin',
                    link: 'https://github.com/rxliuli/liuli-tools/tree/master/jetbrains-plugins/vite-jetbrains-plugin',
                  },
                  {
                    text: 'i18next-dts-gen',
                    link: 'https://github.com/rxliuli/liuli-tools/tree/master/libs/i18next-dts-gen/README.ZH_CN.md',
                  },
                  {
                    text: 'rollup-plugin-worker-threads',
                    link: 'https://github.com/rxliuli/liuli-tools/tree/master/libs/rollup-plugin-worker-threads/README.ZH_CN.md',
                  },
                  {
                    text: 'yarn-plugin-changed',
                    link: 'https://github.com/rxliuli/liuli-tools/tree/master/libs/yarn-plugin-changed',
                  },
                ],
              },
              {
                text: '函数依赖库',
                children: [
                  {
                    text: '@liuli-util/i18next-util',
                    link: 'https://github.com/rxliuli/liuli-tools/tree/master/libs/i18next-util',
                  },
                ],
              },
              {
                text: '统一配置包',
                children: [
                  {
                    text: '@liuli-util/prettier-standard-config',
                    link: 'https://github.com/rxliuli/liuli-tools/tree/master/libs/prettier',
                  },
                  {
                    text: '@liuli-util/commitlint-standard-config',
                    link: 'https://github.com/rxliuli/liuli-tools/tree/master/libs/commitlint-standard-config',
                  },
                  {
                    text: '@liuli-util/eslint-config-react-ts',
                    link: 'https://github.com/rxliuli/liuli-tools/tree/master/libs/eslint-config-react-ts',
                  },
                  {
                    text: '@liuli-util/eslint-config-ts',
                    link: 'https://github.com/rxliuli/liuli-tools/tree/master/libs/eslint-config-ts',
                  },
                ],
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
