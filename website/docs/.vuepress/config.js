module.exports = {
  bundler: '@vuepress/vite',
  themeConfig: {
    navbar: [
      { text: '首页', link: '/' },
      {
        text: '工具',
        children: [
          {
            text: '简介',
            link: '/tools/',
          },
          {
            text: '工程工具',
            children: [
              {
                text: '@liuli-util/cli',
                link: 'https://github.com/rxliuli/liuli-tools/tree/master/apps/liuli-cli',
              },
              {
                text: 'yarn-plugin-changed',
                link: 'https://github.com/rxliuli/liuli-tools/tree/master/libs/yarn-plugin-changed',
              },
              {
                text: '@liuli-util/monorepo-changelog',
                link: 'https://github.com/rxliuli/liuli-tools/tree/master/libs/monorepo-changelog',
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
                text: '@liuli-util/shell',
                link: 'https://github.com/rxliuli/liuli-tools/tree/master/apps/shell',
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
      '/tools/i18next-dts-gen': [
        {
          text: '快速启动',
          link: '/tools/i18next-dts-gen',
        },
      ],
    },
  },
}
