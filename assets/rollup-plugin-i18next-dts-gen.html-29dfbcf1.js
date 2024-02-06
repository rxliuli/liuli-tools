import{_ as p,r as o,o as i,c as l,a as s,b as n,d as e,e as t}from"./app-7302efe9.js";const c={},r=s("h1",{id:"liuli-util-rollup-plugin-i18next-dts-gen",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#liuli-util-rollup-plugin-i18next-dts-gen","aria-hidden":"true"},"#"),n(" @liuli-util/rollup-plugin-i18next-dts-gen")],-1),u=s("h2",{id:"场景",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#场景","aria-hidden":"true"},"#"),n(" 场景")],-1),d={href:"https://github.com/rxliuli/liuli-tools/blob/master/libs/i18next-dts-gen/README.ZH_CN.md",target:"_blank",rel:"noopener noreferrer"},k=t(`<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">pnpm</span> i <span class="token parameter variable">-D</span> i18next @liuli-util/rollup-plugin-i18next-dts-gen
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="添加翻译文件" tabindex="-1"><a class="header-anchor" href="#添加翻译文件" aria-hidden="true">#</a> 添加翻译文件</h2><p>在 <em>src/i18n/</em> 下添加翻译的 json 文件，下面添加两个示例</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// src/i18n/en-US.json</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;hello&quot;</span><span class="token operator">:</span> <span class="token string">&quot;hello world&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;toggle&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Switch language&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// src/i18n/zh-CN.json</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;hello&quot;</span><span class="token operator">:</span> <span class="token string">&quot;你好，世界&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;toggle&quot;</span><span class="token operator">:</span> <span class="token string">&quot;切换语言&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置-vite-config-ts" tabindex="-1"><a class="header-anchor" href="#配置-vite-config-ts" aria-hidden="true">#</a> 配置 <code>vite.config.ts</code></h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vite&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> i18nextDtsGen <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@liuli-util/rollup-plugin-i18next-dts-gen&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">i18nextDtsGen</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      dirs<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;src/i18n&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="启动本地服务器" tabindex="-1"><a class="header-anchor" href="#启动本地服务器" aria-hidden="true">#</a> 启动本地服务器</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">pnpm</span> dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>你将会发现 <em>src/i18n/</em> 目录下自动生成了 <code>index.d.ts</code> 类型定义，大致如下</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name">TranslateType</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  hello<span class="token operator">:</span> <span class="token punctuation">{</span>
    value<span class="token operator">:</span> <span class="token string">&#39;hello world&#39;</span>
    params<span class="token operator">:</span> <span class="token punctuation">[</span>key<span class="token operator">:</span> <span class="token string">&#39;hello&#39;</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
  toggle<span class="token operator">:</span> <span class="token punctuation">{</span>
    value<span class="token operator">:</span> <span class="token string">&#39;Switch language&#39;</span>
    params<span class="token operator">:</span> <span class="token punctuation">[</span>key<span class="token operator">:</span> <span class="token string">&#39;toggle&#39;</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),v={href:"https://github.com/rxliuli/liuli-tools/tree/master/examples/rollup-plugin-i18next-dts-gen-example",target:"_blank",rel:"noopener noreferrer"},m=t(`<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * 根据 key 获取翻译的文本
 * <span class="token keyword">@param</span> <span class="token parameter">args</span>
 */</span>
<span class="token keyword">function</span> <span class="token generic-function"><span class="token function">t</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">K</span> <span class="token keyword">extends</span> <span class="token keyword">keyof</span> TranslateType<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">K</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;params&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">K</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;value&#39;</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
  <span class="token comment">// @ts-ignore</span>
  <span class="token keyword">return</span> i18next<span class="token punctuation">.</span><span class="token function">t</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">t</span><span class="token punctuation">(</span><span class="token string">&#39;hello&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">GenerateOptions</span> <span class="token punctuation">{</span>
  <span class="token comment">// i18n 的目录，可以指定多个，会在每一个子目录下扫描 json 文件并生成对应的 .d.ts</span>
  dirs<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function g(b,h){const a=o("ExternalLinkIcon");return i(),l("div",null,[r,u,s("p",null,[n("吾辈有一些项目需要使用 i18next 来处理国际化，但是使用 typescript 需要有类型定义，所以实现了 "),s("a",d,[n("@liuli-util/i18next-dts-gen"),e(a)]),n(" 用来自动生成 .d.ts 文件。但之后吾辈发现可以将这个过程集成到构建中，不再需要额外单独启动一个终端命令，目前支持直接集成到 rollup/vite 的构建流程中。")]),k,s("p",null,[n("然后你便可以使用这个类型做提示或校验了，下面是一个最简单的示例，更详细的结合 react 的示例请参考 "),s("a",v,[n("rollup-plugin-i18next-dts-gen-example"),e(a)]),n("。")]),m])}const f=p(c,[["render",g],["__file","rollup-plugin-i18next-dts-gen.html.vue"]]);export{f as default};