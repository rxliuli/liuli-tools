import { defineConfig } from 'vitepress'

export default defineConfig({
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      title: 'liuli-tools',
      description: '一些项目级别的工具集，主要尝试优化开发者体验',
      themeConfig: {
        sidebar: [
          {
            text: '开发工具',
            link: '/dev/create-liuli',
            items: [
              { text: 'create-liuli', link: '/dev/create-liuli' },
              { text: 'vite-plugin-node', link: '/dev/vite-plugin-node' },
              { text: 'rollup-plugin-i18next-dts-gen', link: '/dev/rollup-plugin-i18next-dts-gen' },
              { text: 'vite-plugin-dist-firefox', link: '/dev/vite-plugin-dist-firefox' },
              { text: 'test', link: '/dev/test' },
            ],
          },
          {
            text: '函数库',
            link: '/lib/tree',
            items: [
              { text: 'tree', link: '/lib/tree' },
              { text: 'async', link: '/lib/async' },
              { text: 'markdown-util', link: '/lib/markdown-util' },
              { text: 'test', link: '/lib/test' },
            ],
          },
        ],
      },
    },
    en: {
      label: 'English',
      lang: 'zh-CN',
      title: 'liuli-tools',
      description: 'A collection of project-level tools, mainly trying to optimize the developer experience.',
      themeConfig: {
        sidebar: [
          {
            text: 'Development Tools',
            link: '/en/dev/create-liuli',
            items: [
              { text: 'create-liuli', link: '/en/dev/create-liuli' },
              { text: 'vite-plugin-node', link: '/en/dev/vite-plugin-node' },
              { text: 'rollup-plugin-i18next-dts-gen', link: '/en/dev/rollup-plugin-i18next-dts-gen' },
              { text: 'vite-plugin-dist-firefox', link: '/en/dev/vite-plugin-dist-firefox' },
              { text: 'test', link: '/en/dev/test' },
            ],
          },
          {
            text: 'Library',
            link: '/en/lib/tree',
            items: [
              { text: 'tree', link: '/en/lib/tree' },
              { text: 'async', link: '/en/lib/async' },
              { text: 'markdown-util', link: '/en/lib/markdown-util' },
            ],
          },
        ],
      },
    },
  },
  themeConfig: {
    logo: '/logo.png',
    nav: [
      {
        text: 'GitHub',
        link: 'https://github.com/rxliuli/liuli-tools',
      },
      {
        text: 'Npm',
        link: 'https://www.npmjs.com/org/liuli-util',
      },
    ],
    footer: {
      message: 'MIT Licensed',
      copyright: 'Copyright © 2021-present rxliuli',
    },
  },
})
