import{_ as e,r as o,o as c,c as i,a as n,b as s,d as t,e as p}from"./app-bea5351f.js";const l={},u=n("h1",{id:"liuli-util-async",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#liuli-util-async","aria-hidden":"true"},"#"),s(" @liuli-util/async")],-1),r=n("p",null,"异步相关功能的函数库",-1),d=n("p",null,"主要功能",-1),k=p("<li><code>wait</code>: 等待一段时间或满足特定条件</li><li><code>AsyncArray</code>: 异步数组，支持 <code>map</code>、<code>filter</code>、<code>reduce</code> 等方法，但均支持异步回调，还同时支持链式调用</li><li><code>asyncLimiting</code>: 限制一个异步函数的并发调用数量</li><li><code>once</code>: 保证一个异步函数只会被调用一次，并且正确处理了并发的情况</li>",4),m=n("code",null,"concatMap",-1),h={href:"https://rxjs-cn.github.io/learn-rxjs-operators/operators/transformation/concatmap.html",target:"_blank",rel:"noopener noreferrer"},v=n("code",null,"exhaustMap",-1),y={href:"https://rxjs-cn.github.io/learn-rxjs-operators/operators/transformation/exhaustmap.html",target:"_blank",rel:"noopener noreferrer"},b=n("code",null,"mergeMap",-1),f={href:"https://rxjs-cn.github.io/learn-rxjs-operators/operators/transformation/mergemap.html",target:"_blank",rel:"noopener noreferrer"},g=n("code",null,"switchMap",-1),w={href:"https://rxjs-cn.github.io/learn-rxjs-operators/operators/transformation/switchmap.html",target:"_blank",rel:"noopener noreferrer"},_=n("li",null,[n("code",null,"debounce"),s(": 之前实现的函数去抖，推荐使用 lodash-es")],-1),x=n("li",null,[n("code",null,"throttle"),s(": 之前实现的函数节流，推荐使用 lodash-es")],-1),A=p(`<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">pnpm</span> i @liuli-util/async
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2><h3 id="wait" tabindex="-1"><a class="header-anchor" href="#wait" aria-hidden="true">#</a> wait</h3><p>等待一段时间</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> wait <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@liuli-util/async&#39;</span>

<span class="token keyword">await</span> <span class="token function">wait</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>等待满足条件</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> wait <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@liuli-util/async&#39;</span>

<span class="token keyword">await</span> <span class="token function">wait</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;#btn&#39;</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以使用异步函数</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> wait <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@liuli-util/async&#39;</span>

<span class="token keyword">await</span> <span class="token function">wait</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&#39;https://example.com/ping&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>ok<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="asyncarray" tabindex="-1"><a class="header-anchor" href="#asyncarray" aria-hidden="true">#</a> AsyncArray</h2><p>实现的数组方法如下，与 JavaScript 中 Array 的对应方法等价</p><ul><li><code>reduce</code></li><li><code>map</code></li><li><code>filter</code></li><li><code>flatMap</code></li><li><code>forEach</code></li></ul><p>所有方法均提供以下两种调用方式</p><h3 id="静态方法" tabindex="-1"><a class="header-anchor" href="#静态方法" aria-hidden="true">#</a> 静态方法</h3><p>使用 <code>AsyncArray.map(arr, callback)</code> 这种静态方法的方式调用，第一个参数是数组，第二个参数是异步的回调函数</p><p>下面是一个并发读取本地文件的示例</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> AsyncArray <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@liuli-util/async&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> readFile<span class="token punctuation">,</span> readdir <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;fs/promises&#39;</span>
<span class="token keyword">import</span> path <span class="token keyword">from</span> <span class="token string">&#39;path&#39;</span>

<span class="token keyword">const</span> r <span class="token operator">=</span> <span class="token keyword">await</span> AsyncArray<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token keyword">await</span> <span class="token function">readdir</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>it<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
  name<span class="token operator">:</span> it<span class="token punctuation">,</span>
  content<span class="token operator">:</span> <span class="token keyword">await</span> <span class="token function">readFile</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> it<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="链式调用" tabindex="-1"><a class="header-anchor" href="#链式调用" aria-hidden="true">#</a> 链式调用</h3><p>也支持基本的链式调用，例如</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> AsyncArray <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@liuli-util/async&#39;</span>

<span class="token keyword">const</span> r <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AsyncArray</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span>it<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> it <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span>it<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> it <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span>acc<span class="token punctuation">,</span> cur<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> acc <span class="token operator">+</span> cur<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="asynclimiting" tabindex="-1"><a class="header-anchor" href="#asynclimiting" aria-hidden="true">#</a> asyncLimiting</h2><p>限制一个异步函数的并发调用数量，例如 10 个并发调用的情况下，只希望有一个任务在执行，其他任务都阻塞住的情况。常见的场景包括限制多线程下载请求的并发数量、递归复制文件限制并发文件操作数量等。</p><p>下面是一个简单的示例</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> asyncLimiting <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@liuli-util/async&#39;</span>

<span class="token keyword">const</span> start <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> f <span class="token operator">=</span> <span class="token function">asyncLimiting</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">wait</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
<span class="token keyword">await</span> <span class="token builtin">Promise</span><span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> end <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>end <span class="token operator">-</span> start<span class="token punctuation">)</span> <span class="token comment">// 超过 1000ms</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="once" tabindex="-1"><a class="header-anchor" href="#once" aria-hidden="true">#</a> once</h2><p>保证一个异步函数只会被调用一次，主要应用于在多个地方调用同一个初始化函数的场景。例如页面加载后拉取一次数据，但是可能会在多个地方调用，这时候就可以使用 <code>once</code> 来保证只会拉取一次数据。</p><p>下面是一个简单的示例</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> f <span class="token operator">=</span> <span class="token function">once</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;init&#39;</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token number">1</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> r <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token builtin">Promise</span><span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// 只会输出一次 init</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,29);function j(M,L){const a=o("ExternalLinkIcon");return c(),i("div",null,[u,r,d,n("ul",null,[k,n("li",null,[m,s(": 等同于 rxjs 中的 "),n("a",h,[s("concatMap 操作符"),t(a)])]),n("li",null,[v,s(": 等同于 rxjs 中的 "),n("a",y,[s("exhaustMap 操作符"),t(a)])]),n("li",null,[b,s(": 等同于 rxjs 中的 "),n("a",f,[s("mergeMap 操作符"),t(a)])]),n("li",null,[g,s(": 等同于 rxjs 中的 "),n("a",w,[s("switchMap 操作符"),t(a)])]),_,x]),A])}const N=e(l,[["render",j],["__file","async.html.vue"]]);export{N as default};
