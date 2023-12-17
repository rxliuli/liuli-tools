# @liuli-util/ui

基于 tailwindcss/radix-ui/shadcn-ui 封装更高层次的 ui 库，提供开箱即用的组件。

主要做

1. 直接提供包含样式的组件 -- radix-ui 不支持，shadcn-ui 支持但使用方式上不方便
2. 通过 npm 包安装 -- shadcn-ui 不支持
3. 支持通过 tailwind 配置修改样式 -- 也许和 tailwind-merge 有关
4. 针对封装层级过低的组件二次封装 -- 例如 radix-ui 的 Select 为了支持自定义样式，组件层级非常低，组件几乎等同于 html 结构
5. 提供一些额外的组件 -- 例如 Sidebar Menu 组件目前还不存在

目前计划支持的项目有：

- joplin-batch-web
- batch-reanme
- joplin-search-plugin
- tab-tailor
- blog
- to-the-stars

灵感

提供更低层次的 css 组件，或许是之后支持跨框架的 ui 库的一种方式。
