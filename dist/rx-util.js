(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.rx = {}));
}(this, function (exports) { 'use strict';

  // @ts-check
  /**
   * 在浏览器上下载二进制资源
   * @param {Blob} blob 要下载的二进制资源
   * @param {String} filename 文件名
   */
  function download (blob, filename = 'unknown') {
    // 创建隐藏的可下载链接
    var eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    // 为 link 赋值
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
  }

  // @ts-check

  /**
   * 在浏览器上下载文本内容
   * @param {String} str 字符串内容
   * @param {String} [filename='unknown.txt'] 下载文件名，没有则默认为链接中的文件名
   */
  async function downloadString (str, filename = 'unknown.txt') {
    const blob = new Blob([str], {
      type: 'text/plain'
    });
    download(blob, filename);
  }

  // @ts-check

  /**
   * 根据 url 下载二进制资源
   * @param {String} url 下载请求信息
   * @param {String} [filename] 下载文件名，没有则默认为链接中的文件名
   */
  async function downloadUrl (
    url,
    filename = url.substr(url.lastIndexOf('/'))
  ) {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      download(blob, filename);
    } catch (error) {
      return console.log('下载出错了 ', error)
    }
  }

  // @ts-check
  /**
   * 获取 cookie 键值映射 Map
   * @returns {Map.<String,String>} cookie 键值映射 Map
   */
  function getCookies () {
    return document.cookie
      .split(';')
      .map(str => str.split('='))
      .map(arr => [arr[0].trim(), arr[1].trim()])
      .reduce((res, [k, v]) => res.set(k, v), new Map())
  }

  // @ts-check
  /**
   * 将 url 中的内容加载到元素上
   * 注：domSelector 必须有 src 属性用以将加载完成的资源赋值给其，加载默认是异步的
   * @param {RequestInfo} url url 资源
   * @param {HTMLImageElement | HTMLAudioElement | HTMLVideoElement | HTMLTrackElement | HTMLScriptElement} dom dom 元素
   * @param {RequestInit} [init] 初始化参数, 实为 fetch() 的参数以及一些自定义的参数，默认 {}
   * 关于 fetch 具体可以参考 <https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch>
   */
  async function loadResource (url, dom, init = {}) {
    const res = await fetch(url, init);
    const blob = await res.blob();
    // 生成一个本地的 url 并赋值给 src 属性
    dom.src = window.URL.createObjectURL(blob);
  }

  // @ts-check
  /**
   * Url 对象
   */
  class UrlObject {
    /**
     * 构造函数
     * {String} href 不包含网站域名的链接
     * {String} website URL 站点
     * {String} protocol 协议
     * {String} domain 域名
     * {String} accessPath 绝对路径,不包含参数
     * {Object} params 参数列表,
     * {String} url 原 url 链接
     * {Number} port 端口号
     */
    constructor ({
      href = '',
      website = '',
      protocol = '',
      domain = '',
      accessPath = '',
      params = {},
      url = '',
      port = 0
    }) {
      this.href = href;
      this.website = website;
      this.protocol = protocol;
      this.domain = domain;
      this.accessPath = accessPath;
      this.params = params;
      this.url = url;
      this.port = port;
    }
  }

  /**
   * 协议与默认端口映射表
   */
  const protocol2Port = {
    http: 80,
    https: 443,
    ssh: 22,
    ftp: 21
  };

  /**
   * 解析 url 字符串
   * @param {!String} url url 字符串
   * @returns {UrlObject} url 对象
   */
  function parseUrl (url) {
    if (!url) {
      throw new Error('url 不能为空')
    }

    const regexp = new RegExp('^((\\w+)://([\\w\\.]*)(:(\\d+))?)(.*)');
    const temps = regexp.exec(url);
    const res = new UrlObject({
      url: url,
      website: temps[1],
      protocol: temps[2],
      domain: temps[3],
      // @ts-ignore
      port: temps[5],
      href: temps[6]
    });
    let temp = url.substr(res.website.length);
    const markIndex = temp.indexOf('?');
    if (markIndex === -1) {
      res.accessPath = temp;
      return res
    }
    res.accessPath = temp.substr(0, markIndex);
    if (res.accessPath.endsWith('/')) {
      res.accessPath = res.accessPath.substring(0, res.accessPath.length - 1);
    }
    res.port = res.port || protocol2Port[res.protocol] || '';
    // 解析参数列表
    res.params = temp
      .substr(markIndex + 1)
      .split('&')
      .map(str => str.split('='))
      .filter(arr => arr[0] !== '')
      .reduce((params, arr) => {
        const k = decodeURIComponent(arr[0]);
        const v = decodeURIComponent(arr.length === 1 ? '' : arr[1]);
        // 如果已经存在了就认为是数组参数
        const vs = params[k];
        if (vs !== undefined) {
          if (!Array.isArray(vs)) {
            params[k] = [vs];
          }
          params[k].push(v);
        } else {
          params[k] = v;
        }
        return params
      }, {});
    return res
  }

  // @ts-check
  /**
   * 读取本地浏览器选择的文件
   * @param {File} file 选择的文件
   * @param {Object} option 可选项参数
   * @param { readLocal.DataURL | readLocal.Text | readLocal.BinaryString | readLocal.ArrayBuffer } [option.type=readLocal.DataURL] 读取的类型，默认按照二进制 url 读取
   * @param {String} [option.encoding='UTF-8'] 读取的编码格式，默认为 UTF-8
   * @returns {Promise} 返回了读取到的内容（异步）
   */
  function readLocal (
    file,
    { type = readLocal.DataURL, encoding = 'UTF-8' } = {}
  ) {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('file not exists'));
      }
      const fr = new FileReader();
      fr.onload = event => {
        // @ts-ignore
        resolve(event.target.result);
      };
      fr.onerror = error => {
        reject(error);
      };
      fr[type](file, encoding);
    })
  }
  readLocal.DataURL = 'readAsDataURL';
  readLocal.Text = 'readAsText';
  readLocal.BinaryString = 'readAsBinaryString';
  readLocal.ArrayBuffer = 'readAsArrayBuffer';

  // @ts-check

  /**
   * 为 js 中的 Date 对象原型添加 format 格式化方法
   * @param {Date} date 要进行格式化的日期
   * @param {String} fmt 日期的格式
   * @returns {String} 格式化得到的结果
   */
  function dateFormat (date, fmt) {
    var o = {
      'y+': date.getFullYear(),
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S+': date.getMilliseconds() // 毫秒
    };
    for (var k in o) {
      if (!new RegExp('(' + k + ')').test(fmt)) {
        continue
      }
      if (k === 'y+') {
        fmt = fmt.replace(RegExp.$1, ('' + o[k]).substr(4 - RegExp.$1.length));
      } else if (k === 'S+') {
        var lens = RegExp.$1.length;
        lens = lens === 1 ? 3 : lens;
        fmt = fmt.replace(
          RegExp.$1,
          ('00' + o[k]).substr(('' + o[k]).length - 1, lens)
        );
      } else {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
        );
      }
    }
    return fmt
  }

  // @ts-check

  const deteFormatter = 'yyyy-MM-ddThh:mm:ss.SSSZ';
  const encode = (k, v) => encodeURIComponent(k) + '=' + encodeURIComponent(v);

  /**
   * 拼接参数字符串
   * @param {Object} params 参数对象
   * @returns {String} 拼接后的字符串
   */
  function spliceParams (params = {}) {
    if (!(params instanceof Object)) {
      throw new Error(`The parameter type must be Object: ${params}`)
    }
    return Array.from(Object.entries(params)).reduce((res, [k, v]) => {
      if (v === undefined || v === null) {
        return res
      } else if (v instanceof Date) {
        res += encode(k, dateFormat(v, deteFormatter));
      } else if (v instanceof Array) {
        res += v
          .map(item =>
            encode(
              k,
              item instanceof Date ? dateFormat(item, deteFormatter) : item
            )
          )
          .join('&');
      } else {
        res += encode(k, v);
      }
      return (res += '&')
    }, '')
  }

  // @ts-check
  /**
   * 为 fetch 请求添加超时选项
   * 注：超时选项并非真正意义上的超时即取消请求，请求依旧正常执行完成，但会提前返回 reject 结果
   * @param {Promise} fetchPromise fetch 请求的 Promise
   * @param {Number} timeout 超时时间
   * @returns {Promise} 如果超时就提前返回 reject, 否则正常返回 fetch 结果
   */
  function fetchTimeout (fetchPromise, timeout) {
    var abortFn = null;
    // 这是一个可以被 reject 的 Promise
    var abortPromise = new Promise(function (resolve, reject) {
      abortFn = function () {
        reject(new Error('abort promise'));
      };
    });
    // 有一个 Promise 完成就立刻结束
    var abortablePromise = Promise.race([fetchPromise, abortPromise]);
    setTimeout(function () {
      abortFn();
    }, timeout);
    return abortablePromise
  }

  // @ts-check
  /**
   * 将字符串转为字符流
   *
   * @param {String} str 字符串
   * @returns {ArrayBuffer} 字符流对象
   */
  function strToArrayBuffer (str) {
    const buf = new ArrayBuffer(str.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== str.length; ++i) {
      view[i] = str.charCodeAt(i) & 0xff;
    }
    return buf
  }

  // @ts-check
  /**
   * 等待指定的时间/等待指定表达式成立
   * 如果未指定等待条件则立刻执行
   * @param {Number|Function} [param] 等待时间/等待条件
   * @returns {Promise} Promise 对象
   */
  function wait (param) {
    return new Promise(resolve => {
      if (typeof param === 'number') {
        setTimeout(resolve, param);
      } else if (typeof param === 'function') {
        var timer = setInterval(() => {
          if (param()) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      } else {
        resolve();
      }
    })
  }

  // @ts-check

  /**
   * 限制并发请求数量的 fetch 封装
   * @class FetchLimiting
   * @property timeout 超时毫秒数
   * @property limit 最大并发数限制
   * @property execCount 当前正在执行请求的数量
   * @property waitArr 等待的队列
   * @example
   * const fetchLimiting = new FetchLimiting()
   * fetchLimiting._fetch('/')
   *   .then(res => res.json())
   *   .then(json => console.log(json))
   */
  class FetchLimiting {
    /**
     * 构造函数
     * @param {Object} [option] 可选配置项
     * @param {Number} [option.timeout=10000] 超时毫秒数
     * @param {Number} [option.limit=10] 最大并发数限制
     */
    constructor ({ timeout = 10000, limit = 10 }) {
      this.timeout = timeout;
      this.limit = limit;
      this.execCount = 0;
      this.waitArr = [];
    }

    /**
     * 执行一个请求
     * 如果到达最大并发限制时就进行等待
     * @param {RequestInfo} url 请求 url 信息
     * @param {RequestInit} [init=undefined] 请求的其他可选项，默认为 undefined
     * @returns {Promise} 如果超时就提前返回 reject, 否则正常返回 fetch 结果
     */
    async fetch (url, init) {
      const _innerFetch = async () => {
        console.log(
          `执行 execCount: ${this.execCount}, waitArr length: ${
          this.waitArr.length
        }, index: ${JSON.stringify(this.waitArr[0])}`
        );
        this.execCount++;
        const args = this.waitArr.shift();
        try {
          // 这里的 args 实际上就是 arguments 对象，即上面的 url 和 init
          // @ts-ignore
          return await fetchTimeout(fetch(...args), this.timeout)
        } finally {
          this.execCount--;
        }
      };
      this.waitArr.push(arguments);
      await wait(() => this.execCount < this.limit);
      // 尝试启动等待队列
      return _innerFetch()
    }
  }

  // @ts-check

  /**
   * 将一个 Iterator 迭代器转换为一个 Array
   * 目前 {@override Array.from} 已取代改函数
   * @param {Iterator.<Object>} iterator Iterator 迭代器
   * @return {Array.<Object>} Iterator 中每一项元素转换而得到的 Array
   */
  function asIterator (iterator) {
    var arr = [];
    while (true) {
      var next = iterator.next();
      if (next.done) {
        break
      }
      arr.push(next.value);
    }
    return arr
  }

  // @ts-check

  /**
   * 将数组异步压平一层
   * @param {Array.<Object>} arr 数组
   * @param {Function} fn 映射函数，将一个元素映射为一个数组
   * @returns {Promise.<Array.<Object>>} 压平一层的数组
   */
  async function asyncFlatMap (arr, fn) {
    let res = [];
    for (const i in arr) {
      res = res.concat(await fn(arr[i]));
    }
    return res
  }

  // @ts-check

  /**
   * 自行实现 flatMap，将数组压平一层
   * @param {Array.<Object>} arr 数组
   // @ts-ignore
   * @param {function(item:Object):Array.<Object>} fn 映射方法，将一个元素映射为一个数组
   * @returns {Array.<Object>} 压平一层的数组
   */
  function flatMap (arr, fn) {
    // @ts-ignore
    return arr.reduce((res, item) => res.concat(fn(item)), [])
  }

  // @ts-check

  /**
   * js 数组按照某个条件进行分组
   *
   * @param {Array<Object>} arr 要进行分组的数组
   * @param {Function} fn 元素分组的方法
   * @returns {Map<Object,Object>} 对象 -> 数组映射对象
   */
  function groupBy (arr, fn) {
    // 将元素按照分组条件进行分组得到一个 条件 -> 数组 的对象
    return arr.reduce((res, item) => {
      const name = fn(item);
      // 如果已经有这个键了就直接追加, 否则先将之赋值为 [] 再追加元素
      if (!res.has(name)) {
        res.set(name, []);
      }
      res.get(name).push(item);
      return res
    }, new Map())
  }

  // @ts-check

  /**
   * 创建一个等差数列数组
   * @param {Number} start 开始（包含）
   * @param {Number} end 结束（不包含）
   * @param {Number} [sep] 步长，默认为 1
   * @returns {Array.<Number>} 等差数列数组
   */
  function range (start, end, sep = 1) {
    const arr = [];
    for (let i = start; i < end; i += sep) {
      arr.push(i);
    }
    return arr
  }

  // @ts-check

  /**
   * 将数组转化为一个 Object 对象
   * @deprecated 已废弃，请使用更好的 @override arrayToMap 替代
   * @param {Array.<Object>} arr 需要进行转换的数组
   * @param {Function} kFn 生成对象属性名的函数
   * @param {Function} [vFn] 生成对象属性值的函数，默认为数组中的迭代元素
   * @returns {Object} 转化得到的对象
   */
  function toObject (arr, kFn, vFn = item => item) {
    return arr.reduce((res, item) => {
      if (!res.hasOwnProperty(kFn(item))) {
        res[kFn(item)] = vFn(item);
      }
      return res
    }, {})
  }

  // @ts-check
  /**
   * js 的数组去重方法
   * @param {Array.<Object>} arr 要进行去重的数组
   * @param {Function} [fn=item => JSON.stringify(item)] 唯一标识元素的方法，默认使用 {@link JSON.stringify()}
   * @returns {Array.<Object>} 进行去重操作之后得到的新的数组 (原数组并未改变)
   */
  function uniqueBy (arr, fn = item => JSON.stringify(item)) {
    const obj = {};
    return arr.filter(item =>
      obj.hasOwnProperty(fn(item)) ? false : (obj[fn(item)] = true)
    )
  }

  // @ts-check

  /**
   * 将数组映射为 Map
   * @param {Array.<Object>} array 数组
   * @param {function} kFn 产生 Map 元素唯一标识的函数
   * @param {Function} [vFn] 产生 Map 值的函数，默认为返回数组的元素
   * @returns {Map.<Object,Object>} 映射产生的 map 集合
   */
  function arrayToMap (array, kFn, vFn = v => v) {
    return array.reduce((res, item) => {
      res.set(kFn(item), vFn(item));
      return res
    }, new Map())
  }

  // @ts-check
  /**
   * 填充字符串到指定长度
   * @param {String} item 填充的字符串
   * @param {Number} len 填充的长度
   * @returns {String} 填充完成的字符串
   */
  function fill (item, len) {
    if (len <= 0) {
      return ''
    }
    return item + fill(item, len - 1)
  }

  // @ts-check

  /**
   * 日期格式化类
   */
  class DateFormat {
    /**
     * 构造函数
     * @param {String} name 日期格式的名称
     * @param {String} format 日期的格式值
     * @param {String} value 格式化得到的值
     * @param {Number} index 需要替换位置的索引
     */
    constructor (name, format, value, index) {
      this.name = name;
      this.format = format;
      this.value = value;
      this.index = index;
    }
  }

  // 日期时间的正则表达式
  const dateFormats = {
    year: 'y{4}|y{2}',
    month: 'M{1,2}',
    day: 'd{1,2}',
    hour: 'h{1,2}',
    minute: 'm{1,2}',
    second: 's{1,2}',
    milliSecond: 'S{1,3}'
  };

  /**
   * 解析字符串为 Date 对象
   * @param {String} dateStr 日期字符串
   * @param {String} fmt 日期字符串的格式
   * 目前仅支持使用 y(年),M(月),d(日),h(时),m(分),s(秒),S(毫秒)
   * @returns {Date} 解析得到的 Date 对象
   */
  function strToDate (dateStr, fmt) {
    const now = new Date();
    // 如果没有格式化某项的话则设置为默认时间
    const defaultDateValues = {
      year: now.getFullYear().toString(),
      month: '01',
      day: '01',
      hour: '00',
      minute: '00',
      second: '00',
      milliSecond: '000'
    };
    // 保存对传入的日期字符串进行格式化的全部信息数组列表
    const dateUnits = [];
    for (const fmtName in dateFormats) {
      const regExp = new RegExp(dateFormats[fmtName]);
      if (regExp.test(fmt)) {
        const matchStr = regExp.exec(fmt)[0];
        const regexStr = fill('`', matchStr.length);
        const index = fmt.indexOf(matchStr);
        fmt = fmt.replace(matchStr, regexStr);
        dateUnits.push(
          new DateFormat(fmtName, fill('\\d', matchStr.length), null, index)
        );
      } else {
        dateUnits.push(
          new DateFormat(fmtName, null, defaultDateValues[fmtName], -1)
        );
      }
    }
    // 进行验证是否真的是符合传入格式的字符串
    fmt = fmt.replace(new RegExp('`', 'g'), '\\d');
    if (!new RegExp(`^${fmt}$`).test(dateStr)) {
      return null
    }
    // 进行一次排序, 依次对字符串进行截取
    dateUnits
      // 过滤掉没有得到格式化的对象
      .filter(({ format }) => format)
      // 按照字符串中日期片段的索引进行排序
      .sort(function (a, b) {
        return a.index - b.index
      })
      // 获取到匹配的日期片段的值
      .map(format => {
        const matchDateUnit = new RegExp(format.format).exec(dateStr);
        if (matchDateUnit !== null && matchDateUnit.length > 0) {
          dateStr = dateStr.replace(matchDateUnit[0], '');
          format.value = matchDateUnit[0];
        }
        return format
      })
      // 覆写到 dateStr 上面
      .forEach(({ format }, i) => {
        const matchDateUnit = new RegExp(format).exec(dateStr);
        if (matchDateUnit !== null && matchDateUnit.length > 0) {
          dateStr = dateStr.replace(matchDateUnit[0], '');
          dateUnits[i].value = matchDateUnit[0];
        }
      });
    // 将截取完成的信息封装成对象并格式化标准的日期字符串
    const map = arrayToMap(dateUnits, item => item.name, item => item.value);
    if (map.get('year').length === 2) {
      map.set(
        'year',
        defaultDateValues.year.substr(0, 2).concat(map.get('year'))
      );
    }
    // 注意：此处使用的是本地时间而非 UTC 时间
    const date = `${map.get('year')}-${map.get('month')}-${map.get(
    'day'
  )}T${map.get('hour')}:${map.get('minute')}:${map.get('second')}.${map.get(
    'milliSecond'
  )}`;
    return new Date(date)
  }

  // @ts-check
  /**
   * 复制一段文本内容
   * @param {String} text 要进行复制的文本
   * @returns {Boolean} 是否复制成功
   */
  function copyText (text) {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.setAttribute('value', text);
    input.select();
    const res = document.execCommand('copy');
    document.body.removeChild(input);
    return res
  }

  // @ts-check
  /**
   * 根据 html 字符串创建 Element 元素
   * @param {String} str html 字符串
   * @returns {Element} 创建的 Element 元素
   */
  function createElByString (str) {
    var root = document.createElement('div');
    root.innerHTML = str;
    return root.querySelector('*')
  }

  // @ts-check
  /**
   * 获取输入框中光标所在位置
   * @param  {HTMLFormElement} el 需要获取的输入框元素
   * @returns {Number} 光标所在位置的下标
   */
  function getCusorPostion (el) {
    return el.selectionStart
  }

  // @ts-check
  /**
   * 设置输入框中选中的文本/光标所在位置
   * @param {HTMLFormElement} el 需要设置的输入框元素
   * @param {Number} start 光标所在位置的下标
   * @param {Number} [end=start] 结束位置，默认为输入框结束
   */
  function setCusorPostion (el, start, end = start) {
    el.focus();
    el.setSelectionRange(start, end);
  }

  // @ts-check

  /**
   * 在指定位置后插入文本
   * @param {HTMLFormElement} el 需要设置的输入框元素
   * @param {String} text 要插入的值
   * @param {Number} [start] 开始位置，默认为当前光标处
   */
  function insertText (el, text, start = getCusorPostion(el)) {
    var value = el.value;
    el.value = value.substr(0, start) + text + value.substr(start);
    setCusorPostion(el, start + text.length);
  }

  // @ts-check
  /**
   * 字符串安全的转换为小写
   * @param {String} str 字符串
   * @returns {String} 转换后得到的全小写字符串
   */
  function toLowerCase (str) {
    if (!str || typeof str !== 'string') {
      return str
    }
    return str.toLowerCase()
  }

  // @ts-check
  /**
   * 判断指定元素是否是可编辑元素
   * 注：可编辑元素并不一定能够进行编辑，例如只读的 input 元素
   * @param {Element} el 需要进行判断的元素
   * @returns {Boolean} 是否为可编辑元素
   */
  function isEditable (el) {
    var inputEls = ['input', 'date', 'datetime', 'select', 'textarea'];
    return (
      // 此处需要判断是否存在属性 isContentEditable
      // @ts-ignore
      el && (el.isContentEditable || inputEls.includes(toLowerCase(el.tagName)))
    )
  }

  // @ts-check

  let lastFocusEl;

  document.addEventListener(
    'focus',
    event => {
      lastFocusEl = event.target;
    },
    true
  );
  document.addEventListener(
    'blur',
    () => {
      lastFocusEl = null;
    },
    true
  );
  /**
   * 获取到最后一个获得焦点的元素
   * @returns {Element} 最后一个获取到焦点的元素
   */
  function lastFocus () {
    return lastFocusEl
  }

  // @ts-check
  /**
   * 直接删除指定元素
   * @param {Element} el 需要删除的元素
   * @returns {Element} 返回被删除的元素
   */
  function removeEl (el) {
    const parent = el.parentElement;
    return parent.removeChild(el)
  }

  // @ts-check

  /**
   * 在指定范围内删除文本
   * @param {HTMLFormElement} el 需要设置的输入框元素
   * @param {Number} [start] 开始位置，默认为当前选中开始位置
   * @param {Number} [end] 结束位置，默认为当前选中结束位置
   */
  function removeText (
    el,
    start = el.selectionStart,
    end = el.selectionEnd
  ) {
    // 删除之前必须要 [记住] 当前光标的位置
    const index = getCusorPostion(el);
    const value = el.value;
    el.value = value.substr(0, start) + value.substr(end, value.length);
    setCusorPostion(el, index);
  }

  // @ts-check
  /**
   * 监听 event 的添加
   * 注：必须及早添加
   */
  function watchEventListener () {
    /**
     * 监听所有的 addEventListener, removeEventListener 事件
     */
    const documentAddEventListener = document.addEventListener;
    const eventTargetAddEventListener = EventTarget.prototype.addEventListener;
    const documentRemoveEventListener = document.removeEventListener;
    const eventTargetRemoveEventListener =
      EventTarget.prototype.removeEventListener;
    const events = [];

    /**
     * 用来保存监听到的事件信息
     */
    class Event {
      constructor (el, type, listener, useCapture) {
        this.el = el;
        this.type = type;
        this.listener = listener;
        this.useCapture = useCapture;
      }
    }

    /**
     * 自定义的添加事件监听函数
     * @param {String} type 事件类型
     * @param {EventListener} listener 事件监听函数
     * @param {Boolean} [useCapture=true] 是否需要捕获事件冒泡，默认为 false
     */
    function addEventListener (type, listener, useCapture = false) {
      const _this = this;
      const $addEventListener =
        _this === document
          ? documentAddEventListener
          : eventTargetAddEventListener;
      events.push(new Event(_this, type, listener, useCapture));
      $addEventListener.apply(this, arguments);
    }

    /**
     * 自定义的根据类型删除事件函数
     * 该方法会删除这个类型下面全部的监听函数，不管数量
     * @param {String} type 事件类型
     */
    // @ts-ignore
    function removeEventListenerByType (type) {
      const _this = this;
      const $removeEventListener =
        _this === document
          ? documentRemoveEventListener
          : eventTargetRemoveEventListener;
      const removeIndexArr = events
        .map((e, i) => (e.el === _this || e.type === arguments[0] ? i : -1))
        .filter(i => i !== -1);
      removeIndexArr.forEach(i => {
        const e = events[i];
        $removeEventListener.apply(e.el, [e.type, e.listener, e.useCapture]);
      });
      removeIndexArr.sort((a, b) => b - a).forEach(i => events.splice(i, 1));
    }
  (function initWatchDOM () {
      document.addEventListener = EventTarget.prototype.addEventListener = addEventListener;
      // 此处是为了新增函数 removeEventListenerByType
      // @ts-ignore
      document.removeEventListenerByType = EventTarget.prototype.removeEventListenerByType = removeEventListenerByType;
    })();
  }

  // @ts-check

  /**
   * FormData 批量添加方法
   * 注：该方法不会覆盖掉原本的属性
   * @param {FormData} fd FormData 对象
   * @param {Object} obj 键值对对象
   * @returns {FormData} 添加完成后的 FormData 对象
   */
  function appends (fd, obj) {
    for (const key in obj) {
      fd.append(key, obj[key]);
    }
    return fd
  }

  // @ts-check

  /**
   * FormData 批量删除方法
   * @param {FormData} fd FormData 对象
   * @param {Array} keys  删除的 key 列表
   * @returns {FormData} 返回删除后的 FormData 对象
   */
  function deletes (fd, keys) {
    keys.forEach(key => fd.delete(key));
    return fd
  }

  // @ts-check
  /**
   * FormData 批量设置方法
   * 注：该方法会覆盖掉原本的属性
   * @param {FormData} fd 表单对象
   * @param {Object} obj 键值对对象
   * @returns {FormData} 设置完成后的 FormData 对象
   */
  function sets (fd, obj) {
    for (const k in obj) {
      fd.set(k, obj[k]);
    }
    return fd
  }

  // @ts-check

  /**
   * FormData 添加转换为包含所有键值数组的二维数组函数
   * @deprecated 已被原生函数 Array.from 取代
   * @param {FormData} fd 需要转换的 FormData 对象
   * @returns {Array} 转换后的数组
   */
  function formDataToArray (fd) {
    return asIterator(fd.entries())
  }

  // @ts-check

  /**
   * 将参数对象转换为 FormData，只转换一层
   * @param data 参数对象
   * @return {FormData} 转换后的表单对象
   */
  function objToFormData (data) {
    const fd = new FormData();
    if (data) {
      for (const k in data) {
        if (data.hasOwnProperty(k)) {
          const v = data[k];
          fd.append(k, v);
        }
      }
    }
    return fd
  }

  // @ts-check
  /**
   * 函数去抖
   * 去抖 (debounce) 去抖就是对于一定时间段的连续的函数调用，只让其执行一次
   * 注: 包装后的函数如果两次操作间隔小于 delay 则不会被执行, 如果一直在操作就会一直不执行, 直到操作停止的时间大于 delay 最小间隔时间才会执行一次, 不管任何时间调用都需要停止操作等待最小延迟时间
   * 应用场景主要在那些连续的操作, 例如页面滚动监听, 包装后的函数只会执行最后一次
   * @param {Number} delay 最小延迟时间，单位为 ms
   * @param {Function} action 真正需要执行的操作
   * @return {Function} 包装后有去抖功能的函数
   */
  function debounce (delay, action) {
    let tId;
    return function (...args) {
      const context = this;
      if (tId) clearTimeout(tId);
      tId = setTimeout(function () {
        action.call(context, ...args);
      }, delay);
    }
  }

  // @ts-check
  /**
   * 返回参数本身的函数
   * @param {Object} obj 任何对象
   * @returns {Object} 传入的参数
   */
  function returnItself (obj) {
    return obj
  }

  // @ts-check
  /**
   * 安全执行某个函数
   * @param {Function} fn 需要执行的函数
   * @param {Object} [defaultVal=undefined] 发生异常后的默认返回值，默认为 undefined
   */
  function safeExec (fn, defaultVal = undefined) {
    try {
      return fn()
    } catch (err) {
      return defaultVal
    }
  }

  // @ts-check
  /**
   * 通用的单例模式
   * @param {Object} clazz 需要包装为单例的类型
   * @returns {Object} 包装后的单例模式类，使用 {@code new} 创建将只在第一次有效
   */
  function singleModel (clazz) {
    let instance;
    return class SingleClass extends clazz {
      /**
       * @param {...Object} args
       */
      constructor (...args) {
        if (instance) {
          return instance
        }
        super(...args);
        instance = this;
      }
    }
  }

  // @ts-check
  /**
   * 状态机
   * 用于避免使用 if-else 的一种方式
   */
  class StateMachine {
    /**
     * 获取到一个状态工厂
     */
    static getFactory () {
      const classMap = new Map();
      /**
       * 状态注册器
       * 更好的有限状态机，分离子类与构建的关系，无论子类如何增删该都不影响基类及工厂类
       */
      return new class Builder {
        /**
         * 注册一个 class，创建子类时调用，用于记录每一个 [状态 => 子类] 对应
         * @param {Number|String} state 作为键的状态
         * @param {Object} clazz 对应的子类型
         * @returns {Object} 返回 clazz 本身
         */
        register (state, clazz) {
          classMap.set(state, clazz);
          return clazz
        }

        // noinspection JSMethodCanBeStatic
        /**
         * 获取一个标签子类对象
         * @param {Number|String} state 状态索引
         * @returns {Object} 子类对象
         */
        getInstance (state) {
          const Class = classMap.get(state);
          if (!Class) {
            return null
          }
          // 构造函数的参数
          return new Class(...Array.from(arguments).slice(1))
        }
      }()
    }
  }

  // @ts-check
  /**
   * 函数节流
   * 节流 (throttle) 让一个函数不要执行的太频繁，减少执行过快的调用，叫节流
   * 类似于上面而又不同于上面的函数去抖, 包装后函数在上一次操作执行过去了最小间隔时间后会直接执行, 否则会忽略该次操作
   * 与上面函数去抖的明显区别在连续操作时会按照最小间隔时间循环执行操作, 而非仅执行最后一次操作
   *
   * @param {Number} delay 最小间隔时间，单位为 ms
   * @param {Function} action 真正需要执行的操作
   * @return {Function} 包装后有节流功能的函数
   */
  function throttle (delay, action) {
    let last = 0;
    return function () {
      const curr = Date.now();
      if (curr - last > delay) {
        action.apply(this, arguments);
        last = curr;
      }
    }
  }

  // @ts-check
  /**
   * 测试函数的执行时间
   * 注：如果函数返回 Promise，则该函数也会返回 Promise，否则直接返回执行时间
   * @param {Function} fn 需要测试的函数
   * @returns {Number|Promise} 执行的毫秒数
   */
  function timing (fn) {
    var begin = performance.now();
    var result = fn();
    if (!(result instanceof Promise)) {
      return performance.now() - begin
    }
    return result.then(() => performance.now() - begin)
  }

  // @ts-check
  /**
   * 轮询等待指定资源加载完毕再执行操作
   * 使用 Promises 实现，可以使用 ES7 的 {@async}/{@await} 调用
   * @param {Function} resourceFn 判断必须的资源是否存在的方法
   * @param {Object} option 可配置项
   * @param {Number} [option.interval=100] 轮询间隔
   * @param {Number} [option.max=10] 最大轮询次数
   * @returns Promise 对象
   */
  function waitResource (resourceFn, { interval = 100, max = 10 } = {}) {
    var current = 0;
    return new Promise((resolve, reject) => {
      var timer = setInterval(() => {
        if (resourceFn()) {
          clearInterval(timer);
          resolve();
        }
        current++;
        if (current >= max) {
          clearInterval(timer);
          reject(new Error('等待超时'));
        }
      }, interval);
    })
  }

  // @ts-check

  /**
   * 监视指定函数返回值的变化
   * @param {Function} fn 需要监视的函数
   * @param {Function} callback 回调函数
   * @param {Number} [interval=100] 每次检查的间隔时间，默认为 100ms
   * @returns {Function} 关闭这个监视函数
   */
  function watch (fn, callback, interval = 100) {
    let oldVal = safeExec(fn);
    const timer = setInterval(() => {
      const newVal = safeExec(fn);
      if (oldVal !== newVal) {
        callback(newVal, oldVal);
      }
      oldVal = newVal;
    }, interval);
    return () => clearInterval(timer)
  }

  // @ts-check
  /**
   * 定义监听对象时的回调函数 doc
   * @callback WatchObjectCallback
   * @param {Object} target 代理的对象变化后的值
   * @param {String} k 变化的属性名
   * @param {Object} v 变化的属性值
   */

  /**
   * 深度监听指定对象属性的变化
   * 注：指定对象不能是原始类型，即不可变类型，而且对象本身的引用不能改变，最好使用 const 进行声明
   * @param {Object} object 需要监视的对象
   * @param {WatchObjectCallback} callback 当代理对象发生改变时的回调函数，回调函数有三个参数，分别是
   * @returns {Object} 返回源对象的一个代理
   */
  function watchObject (object, callback) {
    const handler = {
      get (target, property, receiver) {
        try {
          return new Proxy(target[property], handler)
        } catch (err) {
          return Reflect.get(target, property, receiver)
        }
      },
      set (target, key, value, receiver) {
        callback(target, key, value);
        return Reflect.set(target, key, value, receiver)
      }
    };
    return new Proxy(object, handler)
  }

  // @ts-check
  /**
   * 字符串格式化
   *
   * @param {String} str 要进行格式化的值
   * @param {Object} args 格式化参数值，替换字符串中的 {} 的值
   * @returns {String} 替换完成的字符串
   */
  function format (str, args) {
    if (!args) {
      return str
    }
    return Object.keys(args).reduce(
      (res, k) => res.replace(new RegExp(`{${k}}`, 'g'), args[k]),
      str
    )
  }

  // @ts-check
  const regexp = new RegExp('^(-?\\d+)(.\\d+)?$');
  /**
   * 判断字符串是否位小数
   * @param {String} str 需要进行判断的字符串
   * @returns {Boolean} 是否为小数
   */
  function isFloat (str) {
    return regexp.test(str)
  }

  // @ts-check
  const regexp$1 = new RegExp('^-?\\d+$');
  /**
   * 判断字符串是否位整数
   * @param {String} str 需要进行判断的字符串
   * @returns {Boolean} 是否为小数
   */
  function isNumber (str) {
    return regexp$1.test(str)
  }

  // @ts-check
  /**
   * 字符串安全的转换为大写
   * @param {String} str 字符串
   * @returns {String} 转换后得到的全大写字符串
   */
  function toUpperCase (str) {
    if (!str || typeof str !== 'string') {
      return str
    }
    return str.toUpperCase()
  }

  // @ts-check
  /**
   * 将空白字符串转换为 null
   *
   * @param {String} str 将空字符串转换为 {@code null}
   * @returns {String} 可能为 {@code null}
   */
  function blankToNull (str) {
    return !str || str.trim().length === 0 ? null : str
  }

  // @ts-check

  /**
   * 置空对象所有空白的属性
   *
   * @param {Object} obj 对象
   * @returns {Object} 将所有的空白属性全部转换为 null 的新对象
   */
  function blankToNullField (obj) {
    const res = {};
    for (const k in obj) {
      const v = obj[k];
      res[k] = typeof v === 'string' ? blankToNull(v) : v;
    }
    return res
  }

  // @ts-check
  /**
   * 将对象的所有属性置空
   * @param {Object} obj 需要置空属性的对象
   * @returns {Object} 返回一个新的对象
   */
  function emptyAllField (obj) {
    const res = {};
    for (const k in obj) {
      res[k] = null;
    }
    return res
  }

  // @ts-check
  /**
   * 排除对象中的指定字段
   * 注: 此处将获得一个浅拷贝对象
   * @param {Object} object 排除对象
   * @param {Set.<String>} filedSet 要排除的字段
   * @returns {Object} 排除完指定字段得到的新的对象
   */
  function excludeFields (object, filedSet = new Set()) {
    return Object.entries(object).reduce((res, [k, v]) => {
      if (!filedSet.has(k)) {
        res[k] = v;
      }
      return res
    }, {})
  }

  // @ts-check
  /**
   * 将 map 转换为 Object 对象
   * @param {Map} map map 键值表
   * @returns {Object} 转换得到的 Object 对象
   */
  function mapToObject (map) {
    const res = {};
    for (let [k, v] of map) {
      res[k] = v;
    }
    return res
  }

  /**
   * 生成一个随机的数字
   * 如果没有参数，则会抛出异常
   * @param {Number} args 参数列表，如果只有一个参数，则认为是最大值，最小值为 0。否则认为第一个是最小值，第二个是最大值，忽略剩余的参数
   * @returns {Number} 生成的随机整数
   */
  function randomInt (...args) {
    let min;
    let max;
    if (args.length === 0) {
      throw new Error('非法参数，必须指定最大值')
    } else if (args.length === 1) {
      min = 0;
      max = args[0];
    } else if (args.length > 1) {
      min = args[0];
      max = args[1];
    }
    return min + Math.floor(Math.random() * (max - min))
  }

  // @ts-check

  function getYearWeek (date) {
    /*
      date1是当前日期
      date2是当年第一天
      d是当前日期是今年第多少天
      用d + 当前年的第一天的周差距的和在除以7就是本年第几周
      */
    const nowTime = date.getTime();
    const startTime = new Date(date.getFullYear(), 0, 1).getTime();
    var difTime = nowTime - startTime;
    return Math.floor(difTime / (24 * 3600 * 1000) / 7)
  }

  exports.FetchLimiting = FetchLimiting;
  exports.StateMachine = StateMachine;
  exports.appends = appends;
  exports.arrayToMap = arrayToMap;
  exports.asIterator = asIterator;
  exports.asyncFlatMap = asyncFlatMap;
  exports.blankToNull = blankToNull;
  exports.blankToNullField = blankToNullField;
  exports.copyText = copyText;
  exports.createElByString = createElByString;
  exports.dateFormat = dateFormat;
  exports.debounce = debounce;
  exports.deletes = deletes;
  exports.download = download;
  exports.downloadString = downloadString;
  exports.downloadUrl = downloadUrl;
  exports.emptyAllField = emptyAllField;
  exports.excludeFields = excludeFields;
  exports.fetchTimeout = fetchTimeout;
  exports.fill = fill;
  exports.flatMap = flatMap;
  exports.formDataToArray = formDataToArray;
  exports.format = format;
  exports.getCookies = getCookies;
  exports.getCusorPostion = getCusorPostion;
  exports.getYearWeek = getYearWeek;
  exports.groupBy = groupBy;
  exports.insertText = insertText;
  exports.isEditable = isEditable;
  exports.isFloat = isFloat;
  exports.isNumber = isNumber;
  exports.lastFocus = lastFocus;
  exports.loadResource = loadResource;
  exports.mapToObject = mapToObject;
  exports.objToFormData = objToFormData;
  exports.parseUrl = parseUrl;
  exports.randomInt = randomInt;
  exports.range = range;
  exports.readLocal = readLocal;
  exports.removeEl = removeEl;
  exports.removeText = removeText;
  exports.returnItself = returnItself;
  exports.safeExec = safeExec;
  exports.setCusorPostion = setCusorPostion;
  exports.sets = sets;
  exports.singleModel = singleModel;
  exports.spliceParams = spliceParams;
  exports.strToArrayBuffer = strToArrayBuffer;
  exports.strToDate = strToDate;
  exports.throttle = throttle;
  exports.timing = timing;
  exports.toLowerCase = toLowerCase;
  exports.toObject = toObject;
  exports.toUpperCase = toUpperCase;
  exports.uniqueBy = uniqueBy;
  exports.wait = wait;
  exports.waitResource = waitResource;
  exports.watch = watch;
  exports.watchEventListener = watchEventListener;
  exports.watchObject = watchObject;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=rx-util.js.map
