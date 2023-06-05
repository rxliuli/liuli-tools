import { defineUserConfig } from 'vuepress-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { searchPlugin } from '@vuepress/plugin-search'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'liuli-tools',
  theme: defaultTheme({
    logo: '/logo.png',
    navbar: [
      {
        text: '工具',
        children: [
          {
            text: 'CLI',
            link: '/tools/',
            children: [
              {
                text: 'create-cli',
                link: 'https://github.com/rxliuli/liuli-tools/tree/master/apps/create-liuli',
              },
            ],
          },
          {
            text: '工程',
            children: [
              {
                text: 'vite-plugin-node',
                link: '/vite-plugin-node/',
              },
              {
                text: 'rollup-plugin-i18next-dts-gen',
                link: 'https://github.com/rxliuli/liuli-tools/blob/master/libs/rollup-plugin-i18next-dts-gen/README.zh-CN.md',
              },
            ],
          },
          {
            text: '函数库',
            children: [
              {
                text: 'react-router',
                link: 'https://github.com/rxliuli/liuli-tools/blob/master/libs/react-router/README.zh-CN.md',
              },
            ],
          },
        ],
      },
      {
        text: 'GitHub',
        link: 'https://github.com/rxliuli/liuli-tools',
      },
      {
        text: 'Npm',
        link: 'https://www.npmjs.com/org/liuli-util',
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
  }),
  plugins: [searchPlugin()],
})
