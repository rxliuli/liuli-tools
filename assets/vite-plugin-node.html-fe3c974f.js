import{_ as n,o as s,c as a,e}from"./app-8f298435.js";const t={},i=e(`<h1 id="liuli-util-vite-plugin-node" tabindex="-1"><a class="header-anchor" href="#liuli-util-vite-plugin-node" aria-hidden="true">#</a> @liuli-util/vite-plugin-node</h1><p>使用 vite 构建 nodejs app/lib 所需的一切，希望在构建 node 应用时，能够像使用 vite 构建 web 应用一样简单。</p><p>目前支持以下功能:</p><ul><li>[x] 支持根据 dependencies 自动 bundle 依赖</li><li>[x] 支持 bundle 时生成 dts 类型定义</li><li>[x] 支持填充 <code>__dirname</code> 等 cjs 特性</li><li>[x] 支持开箱即用的配置，但也支持自定义配置</li><li>[x] 支持 bundle 为 cjs 模块 -- 目前也支持，但需要修改 vite 的配置</li><li>[x] 支持多入口的构建</li><li>[x] 支持 dts 类型捆绑</li></ul><p>特别是支持在以下场景使用</p><ul><li>lib</li><li>cli</li><li>nodejs server</li><li>vscode plugin</li></ul><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2><p>安装</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">pnpm</span> i <span class="token parameter variable">-D</span> @liuli-util/vite-plugin-node
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建入口文件 <code>src/index.ts</code></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createServer <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;http&#39;</span>

<span class="token keyword">const</span> server <span class="token operator">=</span> <span class="token function">createServer</span><span class="token punctuation">(</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token string">&#39;hello world&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

server<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;server start at http://localhost:3000&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置 vite.config.ts</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vite&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> node <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@liuli-util/vite-plugin-node&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">node</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后构建</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">pnpm</span> vite build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>事实上，这个 lib 本身也使用这个插件构建！</p><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2><table><thead><tr><th>名称</th><th>类型</th><th>默认值</th><th>说明</th></tr></thead><tbody><tr><td><code>entry</code></td><td><code>string, string[]</code></td><td><code>src/index.ts</code></td><td>入口文件</td></tr><tr><td><code>formats</code></td><td><code>(&#39;es&#39;, &#39;cjs&#39;)[]</code></td><td><code>[es]</code></td><td>输出格式</td></tr><tr><td><code>shims</code></td><td><code>boolean</code></td><td><code>false</code></td><td>是否填充 <code>__dirname/require</code> 等 cjs 特性</td></tr><tr><td><code>dts</code></td><td><code>boolean, { bundle?: boolean }</code></td><td><code>false</code></td><td>是否生成 dts 类型定义</td></tr></tbody></table><h2 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量" aria-hidden="true">#</a> 环境变量</h2><p>vite 天然支持环境变量，但目前包含两类环境变量，编译时和运行时</p><ul><li>编译时环境变量 <code>i<wbr>mport.meta.env.*</code></li><li>运行时环境变量 <code>p<wbr>rocess.env.*</code></li></ul><p>编译时环境变量在项目编译时就已经被替换为静态字符串，一般适用于 web 应用。而运行时环境变量适合在项目运行时动态指定值，一般适用于 node 应用。</p>`,22),o=[i];function p(c,l){return s(),a("div",null,o)}const u=n(t,[["render",p],["__file","vite-plugin-node.html.vue"]]);export{u as default};