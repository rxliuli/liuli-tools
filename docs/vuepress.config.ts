import { defineUserConfig } from 'vuepress-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { searchPlugin } from '@vuepress/plugin-search'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'liuli-tools',
  description: '一些项目级别的工具集，主要尝试优化开发者体验',
  theme: defaultTheme({
    logo: '/logo.png',
    navbar: [
      {
        text: '工具',
        link: '/quick-start.md',
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
    sidebar: [
      {
        text: '开发工具',
        children: ['/dev/create-liuli.md', '/dev/vite-plugin-node.md', '/dev/rollup-plugin-i18next-dts-gen.md'],
      },
      {
        text: '函数库',
        children: ['/lib/tree.md', '/lib/async.md', '/lib/react-router.md'],
      },
    ],
  }),
  plugins: [searchPlugin()],
})
