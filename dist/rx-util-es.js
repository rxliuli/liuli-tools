/**
 * 在浏览器上下载二进制资源
 * @param {Blob} blob 要下载的二进制资源
 * @param {String} filename 文件名
 */
function download (blob, filename = 'unknown') {
  // 创建隐藏的可下载链接
  const eleLink = document.createElement('a');
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

/**
 * Url 对象
 * @class UrlObject
 */
class UrlObject {
  /**
   * 构造函数
   * @param {Object} option 可选项
   * @param {String} [option.href=''] 不包含网站域名的链接
   * @param {String} [option.website=''] URL 站点
   * @param {String} [option.protocol=''] 协议
   * @param {String} [option.domain=''] 域名
   * @param {String} [option.accessPath=''] 绝对路径,不包含参数
   * @param {Object} [option.params={}] 参数列表,
   * @param {String} [option.url=''] 原 url 链接
   * @param {Number} [option.port=0] 端口号
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
  } = {}) {
    /**
     * @type {String} 不包含网站域名的链接
     */
    this.href = href;
    /**
     * @type {String} URL 站点
     */
    this.website = website;
    /**
     * @type {String} 协议
     */
    this.protocol = protocol;
    /**
     * @type {String} 域名
     */
    this.domain = domain;
    /**
     * @type {String} 绝对路径,不包含参数
     */
    this.accessPath = accessPath;
    /**
     * @type {Object} 参数列表,
     */
    this.params = params;
    /**
     * @type {String} 原 url 链接
     */
    this.url = url;
    /**
     * @type {Number} 端口号
     */
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
 * @param {String} url url 字符串，不能为空
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

/**
 * 为 js 中的 Date 对象原型添加 format 格式化方法
 * @param {Date} date 要进行格式化的日期
 * @param {String} fmt 日期的格式
 * @returns {String} 格式化得到的结果
 */
function dateFormat (date, fmt) {
  const o = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S+': date.getMilliseconds() // 毫秒
  };
  for (const k in o) {
    if (!new RegExp('(' + k + ')').test(fmt)) {
      continue
    }
    if (k === 'y+') {
      fmt = fmt.replace(RegExp.$1, ('' + o[k]).substr(4 - RegExp.$1.length));
    } else if (k === 'S+') {
      let lens = RegExp.$1.length;
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

/**
 * 默认的日期格式
 * 不加 Z 为本地日期时间
 */
const deteFormatter = 'yyyy-MM-ddThh:mm:ss.SSS';
/**
 * 编码函数
 * @param {String} k 参数的名字
 * @param {String} v 参数的值
 */
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

/**
 * 为 fetch 请求添加超时选项
 * 注：超时选项并非真正意义上的超时即取消请求，请求依旧正常执行完成，但会提前返回 reject 结果
 * @param {Promise} fetchPromise fetch 请求的 Promise
 * @param {Number} timeout 超时时间
 * @returns {Promise} 如果超时就提前返回 reject, 否则正常返回 fetch 结果
 */
function fetchTimeout (fetchPromise, timeout) {
  let abortFn = null;
  // 这是一个可以被 reject 的 Promise
  const abortPromise = new Promise(function (resolve, reject) {
    abortFn = function () {
      reject(new Error('abort promise'));
    };
  });
  // 有一个 Promise 完成就立刻结束
  const abortablePromise = Promise.race([fetchPromise, abortPromise]);
  setTimeout(function () {
    abortFn();
  }, timeout);
  return abortablePromise
}

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

/**
 * 等待指定的时间/等待指定表达式成立
 * 如果未指定等待条件则立刻执行
 * @param {Number|Function} [param] 等待时间/等待条件
 * @returns {Promise} Promise 对象
 */
const wait = param => {
  return new Promise(resolve => {
    if (typeof param === 'number') {
      setTimeout(resolve, param);
    } else if (typeof param === 'function') {
      const timer = setInterval(() => {
        if (param()) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    } else {
      resolve();
    }
  })
};

/**
 * 限制并发请求数量的 fetch 封装
 * @class FetchLimiting
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
    /**
     * @field timeout 超时毫秒数
     */
    this.timeout = timeout;
    /**
     * @field limit 最大并发数限制
     */
    this.limit = limit;
    /**
     * @field execCount 当前正在执行异步的数量
     */
    this.execCount = 0;
    /**
     * @field waitArr 等待的队列
     * @type {Array.<IArguments>}
     */
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

/**
 * 将一个 Iterator 迭代器转换为一个 Array
 * 目前 {@override Array.from} 已取代改函数
 * @param {Iterator.<Object>} iterator Iterator 迭代器
 * @return {Array.<Object>} Iterator 中每一项元素转换而得到的 Array
 */
function asIterator (iterator) {
  const arr = [];
  while (true) {
    const next = iterator.next();
    if (next.done) {
      break
    }
    arr.push(next.value);
  }
  return arr
}

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

/**
 * 日期格式化类
 * @class DateFormat
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
    /**
     * @field 日期格式的名称
     */
    this.name = name;
    /**
     * @field 日期的格式值
     */
    this.format = format;
    /**
     * @field 格式化得到的值
     */
    this.value = value;
    /**
     * @field 需要替换位置的索引
     */
    this.index = index;
  }
}

/**
 * 日期时间的正则表达式
 */
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
 * @param {String} fmt 日期字符串的格式，目前仅支持使用 y(年),M(月),d(日),h(时),m(分),s(秒),S(毫秒)
 * @returns {Date} 解析得到的 Date 对象
 */
function dateParse (dateStr, fmt) {
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

/**
 * 解析字符串为 Date 对象
 * @deprecated 已弃用，请使用可读性更好的 {@link dateParse} 代替
 * @param {String} dateStr 日期字符串
 * @param {String} fmt 日期字符串的格式
 * 目前仅支持使用 y(年),M(月),d(日),h(时),m(分),s(秒),S(毫秒)
 * @returns {Date} 解析得到的 Date 对象
 */
function strToDate (dateStr, fmt) {
  return dateParse(dateStr, fmt)
}

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

/**
 * 根据 html 字符串创建 Element 元素
 * @param {String} str html 字符串
 * @returns {Element} 创建的 Element 元素
 */
function createElByString (str) {
  const root = document.createElement('div');
  root.innerHTML = str;
  return root.querySelector('*')
}

/**
 * 获取输入框中光标所在位置
 * @param  {HTMLFormElement} el 需要获取的输入框元素
 * @returns {Number} 光标所在位置的下标
 */
function getCusorPostion (el) {
  return el.selectionStart
}

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

/**
 * 在指定位置后插入文本
 * @param {HTMLFormElement} el 需要设置的输入框元素
 * @param {String} text 要插入的值
 * @param {Number} [start] 开始位置，默认为当前光标处
 */
function insertText (el, text, start = getCusorPostion(el)) {
  const value = el.value;
  el.value = value.substr(0, start) + text + value.substr(start);
  setCusorPostion(el, start + text.length);
}

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

/**
 * 判断指定元素是否是可编辑元素
 * 注：可编辑元素并不一定能够进行编辑，例如只读的 input 元素
 * @param {Element} el 需要进行判断的元素
 * @returns {Boolean} 是否为可编辑元素
 */
function isEditable (el) {
  const inputEls = ['input', 'date', 'datetime', 'select', 'textarea'];
  return (
    // 此处需要判断是否存在属性 isContentEditable
    // @ts-ignore
    el && (el.isContentEditable || inputEls.includes(toLowerCase(el.tagName)))
  )
}

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

/**
 * 直接删除指定元素
 * @param {Element} el 需要删除的元素
 * @returns {Element} 返回被删除的元素
 */
function removeEl (el) {
  const parent = el.parentElement;
  return parent.removeChild(el)
}

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

/**
 * FormData 转换为包含所有键值数组的二维数组函数
 *
 * @param {FormData} fd 需要转换的 FormData 对象
 * @returns {Array} 转换后的数组
 * @deprecated 已被原生函数 Array.from 取代
 */
function formDataToArray (fd) {
  // @ts-ignore
  return asIterator(fd.entries())
}

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

/**
 * 函数去抖
 * 去抖 (debounce) 去抖就是对于一定时间段的连续的函数调用，只让其执行一次
 * 注: 包装后的函数如果两次操作间隔小于 delay 则不会被执行, 如果一直在操作就会一直不执行, 直到操作停止的时间大于 delay 最小间隔时间才会执行一次, 不管任何时间调用都需要停止操作等待最小延迟时间
 * 应用场景主要在那些连续的操作, 例如页面滚动监听, 包装后的函数只会执行最后一次
 * @param {Number} delay 最小延迟时间，单位为 ms
 * @param {Function} action 真正需要执行的操作
 * @return {Function} 包装后有去抖功能的函数
 */
const debounce = (delay, action) => {
  let tId;
  return function (...args) {
    if (tId) clearTimeout(tId);
    tId = setTimeout(() => {
      action.call(this, ...args);
    }, delay);
  }
};

/**
 * 返回参数本身的函数
 * @param {Object} obj 任何对象
 * @returns {Object} 传入的参数
 */
function returnItself (obj) {
  return obj
}

/**
 * 安全执行某个函数
 * @param {Function} fn 需要执行的函数
 * @param {Object} [defaultVal=undefined] 发生异常后的默认返回值，默认为 undefined
 * @param {...Object} [args] 可选的函数参数
 * @returns {Object|undefined} 函数执行的结果，或者其默认值
 */
const safeExec = (fn, defaultVal = undefined, ...args) => {
  try {
    return fn(...args)
  } catch (err) {
    return defaultVal
  }
};

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
        classMap.set(state, singleModel(clazz));
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

/**
 * 测试函数的执行时间
 * 注：如果函数返回 Promise，则该函数也会返回 Promise，否则直接返回执行时间
 * @param {Function} fn 需要测试的函数
 * @returns {Number|Promise} 执行的毫秒数
 */
const timing = fn => {
  // 使用 Proxy 实现了一下，但感觉实际上与原来的差不多（或许是吾辈的使用场景不太对？）
  const proxyFn = new Proxy(fn, {
    apply (target, thisArg, args) {
      const begin = performance.now();
      const result = Reflect.apply(target, thisArg, args);
      if (!(result instanceof Promise)) {
        return performance.now() - begin
      }
      return result.then(() => performance.now() - begin)
    }
  });
  return proxyFn()
  // const begin = performance.now()
  // const result = fn()
  // if (!(result instanceof Promise)) {
  //   return performance.now() - begin
  // }
  // return result.then(() => performance.now() - begin)
};

/**
 * 轮询等待指定资源加载完毕再执行操作
 * 使用 Promises 实现，可以使用 ES7 的 {@async}/{@await} 调用
 * @param {Function} fn 判断必须的资源是否存在的方法
 * @param {Object} option 可配置项
 * @param {Number} [option.interval=100] 轮询间隔
 * @param {Number} [option.max=10] 最大轮询次数
 * @returns Promise 对象
 */
const waitResource = (fn, { interval = 100, max = 10 } = {}) => {
  let current = 0;
  return new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      if (fn()) {
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
};

/**
 * 监视指定函数返回值的变化
 * @param {Function} fn 需要监视的函数
 * @param {Function} callback 回调函数
 * @param {Number} [interval=100] 每次检查的间隔时间，默认为 100ms
 * @returns {Function} 关闭这个监视函数
 */
const watch = (fn, callback, interval = 100) => {
  let oldVal = safeExec(fn);
  const timer = setInterval(() => {
    const newVal = safeExec(fn);
    if (oldVal !== newVal) {
      callback(newVal, oldVal);
      oldVal = newVal;
    }
  }, interval);
  return () => clearInterval(timer)
};

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

/**
 * 字符串格式化
 *
 * @param {String} str 要进行格式化的值
 * @param {Object} args 格式化参数值，替换字符串中的 {} 的值
 * @returns {String} 替换完成的字符串
 * @deprecated 已废弃，请使用 ES6 模板字符串 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings
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

/**
 * 判断是否为小数的正则表达式
 */
const regexp = new RegExp('^(-?\\d+)(.\\d+)?$');
/**
 * 判断字符串是否位小数
 * @param {String} str 需要进行判断的字符串
 * @returns {Boolean} 是否为小数
 */
function isFloat (str) {
  return regexp.test(str)
}

/**
 * 判断是否为整数的正则表达式
 */
const regexp$1 = new RegExp('^-?\\d+$');
/**
 * 判断字符串是否位整数
 * @param {String} str 需要进行判断的字符串
 * @returns {Boolean} 是否为小数
 */
function isNumber (str) {
  return regexp$1.test(str)
}

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

/**
 * 将空白字符串转换为 null
 *
 * @param {String} str 将空字符串转换为 {@code null}
 * @returns {String} 可能为 {@code null}
 */
function blankToNull (str) {
  return !str || str.trim().length === 0 ? null : str
}

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

/**
 * 排除对象中的指定字段
 * 注: 此处将获得一个浅拷贝对象
 * @param {Object} object 排除对象
 * @param {...String} fields 要排除的字段
 * @returns {Object} 排除完指定字段得到的新的对象
 */
function excludeFields (object, ...fields) {
  const set = new Set(fields);
  return Object.entries(object).reduce((res, [k, v]) => {
    if (!set.has(k)) {
      res[k] = v;
    }
    return res
  }, {})
}

/**
 * 将 map 转换为 Object 对象
 * @param {Map} map map 键值表
 * @returns {Object} 转换得到的 Object 对象
 */
function mapToObject (map) {
  const res = {};
  // @ts-ignore
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

/**
 * 获取一年内的第多少星期
 * @deprecated 不推荐使用，请使用 {@link dateEnhance} 代替
 * @returns {Number}
 */
function getYearWeek (date) {
  /*
    date1是当前日期
    date2是当年第一天
    d是当前日期是今年第多少天
    用d + 当前年的第一天的周差距的和在除以7就是本年第几周
    */
  const nowTime = date.getTime();
  const startTime = new Date(date.getFullYear(), 0, 1).getTime();
  const difTime = nowTime - startTime;
  return Math.floor(difTime / (24 * 3600 * 1000) / 7)
}

/**
 * 日期固定时间点
 * @class DateConstants
 */
class DateConstants {
  /**
   * 获取指定日期一天的开始时间
   * @param {Date} [date=new Date()] 指定的时间，默认为当前日期
   * @returns {Date} 一天的开始时间
   */
  dayStart (date = new Date()) {
    return new Date(`${dateFormat(date, 'yyyy-MM-dd')}T00:00:00.000`)
  }
  /**
   * 获取指定日期一天的结束时间
   * @param {Date} [date=new Date()] 指定的时间，默认为当前日期
   * @returns {Date} 一天的结束时间
   */
  dayEnd (date = new Date()) {
    return new Date(`${dateFormat(date, 'yyyy-MM-dd')}T23:59:59.999`)
  }
  /**
   * 获取指定日期所在年份的新年开始时间
   * @param {Date} [date=new Date()] 指定的时间，默认为当前日期
   * @returns {Date} 新年开始时间
   */
  yearStart (date = new Date()) {
    return new Date(`${date.getFullYear()}-01-01T00:00:00.000`)
  }
  /**
   * 获取指定日期所在年份的旧年结束时间
   * @param {Date} [date=new Date()] 指定的时间，默认为当前日期
   * @returns {Date} 旧年结束时间
   */
  yearEnd (date = new Date()) {
    return new Date(`${date.getFullYear()}-12-31T23:59:59.999`)
  }
}

/**
 * 导出一个日期固定时间点的对象
 * @type {DateConstants}
 */
const dateConstants = new DateConstants();

/**
 * 判断数字是否在指定区间之中
 * @param {Number} num 指定数字
 * @param {Number} min 最小值
 * @param {Number} max 最大值（不包含）
 */
function isRange (num, min, max) {
  return num >= min && num < max
}

/**
 * 日期固定时间点
 * @class DateConstants
 */
class DateConstants$1 {
  /**
   * 获取指定日期一天的开始时间
   * @param {Date} [date=new Date()] 指定的时间，默认为当前日期
   * @returns {Date} 一天的开始时间
   */
  dayStart (date = new Date()) {
    return new Date(`${dateFormat(date, 'yyyy-MM-dd')}T00:00:00.000`)
  }
  /**
   * 获取指定日期一天的结束时间
   * @param {Date} [date=new Date()] 指定的时间，默认为当前日期
   * @returns {Date} 一天的结束时间
   */
  dayEnd (date = new Date()) {
    return new Date(`${dateFormat(date, 'yyyy-MM-dd')}T23:59:59.999`)
  }
  /**
   * 获取指定日期所在年份的新年开始时间
   * @param {Date} [date=new Date()] 指定的时间，默认为当前日期
   * @returns {Date} 新年开始时间
   */
  yearStart (date = new Date()) {
    return new Date(`${date.getFullYear()}-01-01T00:00:00.000`)
  }
  /**
   * 获取指定日期所在年份的旧年结束时间
   * @param {Date} [date=new Date()] 指定的时间，默认为当前日期
   * @returns {Date} 旧年结束时间
   */
  yearEnd (date = new Date()) {
    return new Date(`${date.getFullYear()}-12-31T23:59:59.999`)
  }
}

/**
 * 导出一个日期固定时间点的对象
 * @type {DateConstants}
 */
const dateConstants$1 = new DateConstants$1();

/**
 * 一天标准的毫秒数
 */
const DAY_UNIT_TIME = 1000 * 60 * 60 * 24;
/**
 * 日期增强
 * @property {Date} date
 */
class DateEnhance {
  /**
   * 构造函数
   * @param {Date} date 要增强的日期
   */
  constructor (date) {
    /**
     * @field 要增强的日期
     */
    this.date = date;
  }
  /**
   * 获取到年份
   * @returns {Number}
   */
  year () {
    return this.date.getFullYear()
  }
  /**
   * 获取月份
   * @returns {Number}
   */
  month () {
    return this.date.getMonth()
  }
  /**
   * 获取一年内的第多少天
   * 注: 这个天数指定的在第几天而非过去了多少天，例如 2018-01-10 的结果会是 10
   * @returns {Number}
   */
  dayOfYear () {
    return Math.ceil(
      (this.date.getTime() - dateConstants$1.yearStart(this.date).getTime()) /
        DAY_UNIT_TIME
    )
  }
  /**
   * 获取一个月内的第多少天
   * 注: 这个天数指的是在第几天而非过去了多少天，例如 2018-01-10 的结果会是 10
   * @returns {Number}
   */
  dayOfMonth () {
    return this.date.getDate()
  }
  /**
   * 获取一个星期内的第多少天
   * @returns {Number}
   */
  dayOfWeek () {
    return this.date.getDay()
  }
  /**
   * 获取一年内的第多少星期
   * 注: 这个星期指定的在第几天而非过去了多少天，例如 2018-01-10 的结果会是 10
   * @returns {Number}
   */
  weekOfYear () {
    return Math.ceil(this.dayOfYear() / 7)
  }
  /**
   * 获取一个月内的第多少星期
   * @returns {Number}
   */
  weekOfMonth () {
    return Math.ceil(this.dayOfMonth() / 7)
  }
  /**
   * 获取季度
   * @returns {Number}
   */
  quarter () {
    const month = this.month();
    if (isRange(month, 0, 3)) {
      return 1
    } else if (isRange(month, 3, 6)) {
      return 2
    } else if (isRange(month, 6, 9)) {
      return 3
    } else {
      return 4
    }
  }
  /**
   * 获取小时
   * @returns {Number}
   */
  hour () {
    return this.date.getHours()
  }
  /**
   * 获取分钟
   * @returns {Number}
   */
  minute () {
    return this.date.getMinutes()
  }
  /**
   * 获取秒
   * @returns {Number}
   */
  second () {
    return this.date.getSeconds()
  }
  /**
   * 获取毫秒
   * @returns {Number}
   */
  milliSecond () {
    return this.date.getMilliseconds()
  }
}

/**
 * 获取一个增强的日期
 * @param {Date} date 要增强的日期
 * @returns {DateEnhance} 增强日期
 */
function dateEnhance (date) {
  return new DateEnhance(date)
}

/**
 * 时间日期间隔
 * @class DateBetween
 */
class DateBetween {
  /**
   * 构造函数
   * @param {Date} start 开始时间
   * @param {Date} end 结束时间
   */
  constructor (start, end) {
    /**
     * @field start 开始时间
     */
    this.start = start;
    /**
     * @field end 结束时间
     */
    this.end = end;
  }
  /**
   * 获取毫秒差值
   * @returns {Number} 毫秒差值
   */
  milliSecond () {
    return this.end.getTime() - this.start.getTime()
  }
  /**
   * 获取秒差值
   * @returns {Number} 秒差值
   */
  second () {
    return Math.floor(this.milliSecond() / 1000)
  }
  /**
   * 获取分钟差值
   * @returns {Number} 分钟差值
   */
  minute () {
    return Math.floor(this.second() / 60)
  }
  /**
   * 获取小时差值
   * @returns {Number} 小时差值
   */
  hour () {
    return Math.floor(this.minute() / 60)
  }
  /**
   * 获取天数差值
   * @returns {Number} 天数差值
   */
  day () {
    return Math.floor(this.hour() / 24)
  }
  /**
   * 获取月份差值
   * 注: 此处获取的差值是按月计算的，即 2018-12-31 => 2019-01-01 也被认为相差一个月
   * @returns {Number} 月份差值
   */
  month () {
    const year = this.year();
    const month = this.end.getMonth() - this.start.getMonth();
    return year * 12 + month
  }
  /**
   * 获取年份差值
   * 注: 此处获取的差值是按年计算的，即 2018-12-31 => 2019-01-01 也被认为相差一年
   * @returns {Number} 年份差值
   */
  year () {
    return this.end.getFullYear() - this.start.getFullYear()
  }
}

/**
 * 获取两个时间的差值
 * @param {Date} start 开始时间
 * @param {Date} end 结束时间
 * @returns {DateBetween} 差值对象
 */
function dateBetween (start, end) {
  return new DateBetween(start, end)
}

/**
 * 将指定函数包装为只调用一次
 * @param {Function} fn 需要包装的函数
 * @returns {Function} 包装后的函数
 */
const onec = fn => {
  let flag = true;
  let res;
  return function (...args) {
    if (flag === false) {
      return res
    }
    flag = false;
    return (res = fn.call(this, ...args))
  }
};

/**
 * 包装一个函数为指定参数只执行一次的函数
 * @param {Function} fn 需要包装的函数
 * @param {Function} paramConverter 参数转换的函数，参数为需要包装函数的参数
 * @returns {Function} 需要被包装的函数
 */
const onecOfSameParam = (
  fn,
  paramConverter = (...args) => JSON.stringify(args)
) => {
  const paramMap = new Map();
  return function (...args) {
    const key = paramConverter(...args);
    const old = paramMap.get(key);
    if (old !== undefined) {
      return old
    }
    const res = fn.call(this, ...args);
    if (res instanceof Promise) {
      return res.then(res => {
        paramMap.set(key, res);
        return res
      })
    }
    paramMap.set(key, res);
    return res
  }
};

/**
 * 返回合理参数本身的函数
 * 1. 如果没有参数则返回 undefined
 * 2. 如果只有一个参数则返回参数本身
 * 3. 如果有两个以上的参数则返回参数列表
 * @param {...Object} args 任何对象
 * @returns {undefined|Object|Array.<Object>} 传入的参数
 */
function returnReasonableItself (...args) {
  const len = args.length;
  if (len === 0) {
    return
  }
  if (len === 1) {
    return args[0]
  }
  return args
}

/**
 * 从数组中移除指定的元素
 * 注: 时间复杂度为 1~3On
 * @param {Array} arr 需要被过滤的数组
 * @param {Array} deleteItems 要过滤的元素数组
 * @param {Function} [kFn=returnItself] 每个元素的唯一键函数
 */
function filterItems (arr, deleteItems, kFn = returnItself) {
  // @ts-ignore
  const kSet = new Set(deleteItems.map(kFn));
  return arr.filter(v => !kSet.has(kFn(v)))
}

/**
 * 数组之间的差异结果类
 * @class ArrayDiff
 */
class ArrayDiff {
  /**
   * 构造函数
   * @param {Array} left 第一个数组独有的元素列表
   * @param {Array} right 第二个数组独有的元素列表
   * @param {Array} common 两个数组共有的元素列表
   */
  constructor (left, right, common) {
    /**
     * @field 第一个数组独有的元素列表
     */
    this.left = left;
    /**
     * @field 第二个数组独有的元素列表
     */
    this.right = right;
    /**
     * @field 两个数组共有的元素列表
     */
    this.common = common;
  }
}

/**
 * 比较两个数组的差异
 * @param {Array} thanArr 第一个数组
 * @param {Array} thatArr 第二个数组
 * @param {Function} [kFn=returnItself] 每个元素的唯一键函数
 * @returns {ArrayDiff} 比较的差异结果
 */
function arrayDiffBy (thanArr, thatArr, kFn = returnItself) {
  // @ts-ignore
  const kThanSet = new Set(thanArr.map(kFn));
  // @ts-ignore
  const kThatSet = new Set(thatArr.map(kFn));
  const left = thanArr.filter(v => !kThatSet.has(kFn(v)));
  const right = thatArr.filter(v => !kThanSet.has(kFn(v)));
  // @ts-ignore
  const kLeftSet = new Set(left.map(kFn));
  const common = thanArr.filter(v => !kLeftSet.has(kFn(v)));
  return new ArrayDiff(left, right, common)
}

/**
 * 使用 Generator 实现一个从 0 开始的自增序列
 */
function * autoIncrementGenerator () {
  for (let i = 0; ; i++) {
    /**
     * @returns {Number} 每次获取都返回循环中的当前迭代变量，然后暂停于此处
     */
    yield i;
  }
}
/**
 * 包装 {@link autoIncrementGenerator} 为只能调用一次的函数
 */
const generator = onec(autoIncrementGenerator);

/**
 * 获取自增长序列的最新值
 * @returns {Number} 最新值
 */
function autoIncrement () {
  return generator().next().value
}

/**
 * 转换基类
 */
class IConverter {
  /**
   * 将字符串解析为字符串列表
   *
   * @param {String} str 字符串
   * @return {Array.<String>} 字符串列表
   * @abstract
   */
  from (str) {
    throw new Error('子类必须重写 from 函数')
  }

  /**
   * 将字符串列表构造为字符串
   *
   * @param {Array.<String>} list 字符串列表
   * @return {String} 字符串
   * @abstract
   */
  to (list) {
    throw new Error('子类必须重写 to 函数')
  }
}

/**
 * 驼峰风格解析
 */
class CamelOrPascalFrom extends IConverter {
  /**
   * 将字符串解析为字符串列表
   *
   * @param {String} str 字符串
   * @return {Array.<String>} 字符串列表
   * @override
   */
  from (str) {
    const result = [];
    let len = str.length;
    let old = 0;
    for (let i = 0; i < len; i++) {
      const c = str.charAt(i);
      if (c >= 'A' && c <= 'Z') {
        if (i !== 0) {
          result.push(str.substring(old, i));
        }
        old = i;
      }
    }
    if (old !== str.length) {
      result.push(str.substring(old, str.length));
    }
    return result
  }
}

/**
 * 小写开头的驼峰转换器
 *
 */
class CamelConverter extends CamelOrPascalFrom {
  /**
   * 将字符串列表构造为字符串
   *
   * @param {Array.<String>} list 字符串列表
   * @return {String} 字符串
   * @override
   */
  to (list) {
    const str = list
      .map(s => s.substring(0, 1).toUpperCase() + s.substring(1))
      .join();
    return str.substring(0, 1).toLowerCase() + str.substring(1)
  }
}

/**
 * 大写开头的驼峰转换器
 */
class PascalConverter extends CamelOrPascalFrom {
  /**
   * 将字符串列表构造为字符串
   *
   * @param {Array.<String>} list 字符串列表
   * @return {String} 字符串
   * @override
   */
  to (list) {
    return list
      .map(s => s.substring(0, 1).toUpperCase() + s.substring(1))
      .join()
  }
}
/**
 * 下划线风格解析
 */
class SnakeOrScreamingSnakeFrom extends IConverter {
  /**
   * 将字符串解析为字符串列表
   *
   * @param {String} str 字符串
   * @return {Array.<String>} 字符串列表
   * @override
   */
  from (str) {
    return str.split('_')
  }
}
/**
 * 小写下划线的转换器
 */
class SnakeConverter extends SnakeOrScreamingSnakeFrom {
  /**
   * 将字符串列表构造为字符串
   *
   * @param {Array.<String>} list 字符串列表
   * @return {String} 字符串
   * @override
   */
  to (list) {
    return list.map(s => s.toLowerCase()).join('_')
  }
}
/**
 * 大写下划线的转换器
 */
class ScreamingSnakeConverter extends SnakeOrScreamingSnakeFrom {
  /**
   * 将字符串列表构造为字符串
   *
   * @param {Array.<String>} list 字符串列表
   * @return {String} 字符串
   * @override
   */
  to (list) {
    return list.map(s => s.toUpperCase()).join('_')
  }
}
/**
 * @enum {Symbol} 字符串风格常量对象
 */
const stringStyleType = {
  /**
   * 小写驼峰
   */
  Camel: Symbol(1),
  /**
   * 大写驼峰
   */
  Pascal: Symbol(2),
  /**
   * 小写下划线
   */
  Snake: Symbol(3),
  /**
   * 大写下划线
   */
  ScreamingSnake: Symbol(4)
};

/**
 * 转换器工厂
 */
class ConverterFactory {
  /**
   * 获取一个转换器实例
   *
   * @param {Symbol} styleType 转换风格，使用了 {@link stringStyleType} 定义的常量对象
   * @return {IConverter} 转换器对象
   * @throws 如果获取未定义过的转换器，则会抛出异常
   */
  static getInstance (styleType) {
    switch (styleType) {
      case stringStyleType.Camel:
        return new CamelConverter()
      case stringStyleType.Pascal:
        return new PascalConverter()
      case stringStyleType.Snake:
        return new SnakeConverter()
      case stringStyleType.ScreamingSnake:
        return new ScreamingSnakeConverter()
      default:
        throw new Error('No corresponding converter found')
    }
  }
}

/**
 * 字符串风格转换器
 * 请不要直接使用构造函数创建，而是用 {@link StringStyleUtil.getConverter} 来获得一个转换器
 * @private
 */
class StringStyleConverter {
  /**
   * 构造一个字符串任意风格转换器
   * @param {Symbol} from 转换字符串的风格
   * @param {Symbol} to 需要转换的风格
   * @private
   */
  constructor (from, to) {
    /**
     * @field 解析字符串风格的转换器
     * @type {IConverter}
     * @private
     */
    this.fromConverter = ConverterFactory.getInstance(from);
    /**
     * @field 构造字符串风格的转换器
     * @type {IConverter}
     * @private
     */
    this.toConverter = ConverterFactory.getInstance(to);
  }

  /**
   * 转换字符串的风格
   *
   * @param {String} str 要转换的字符串
   * @return {String} 转换得到的字符串
   */
  convert (str) {
    if (str === undefined || str === null || str.length === 0) {
      return str
    }
    return this.toConverter.to(this.fromConverter.from(str))
  }
}

/**
 * 包装获取字符串风格转换器
 * 此处采用了单例模式，每种转换器只会有一个
 *
 * @param {stringStyleType} from 解析风格
 * @param {stringStyleType} to 转换风格
 * @return {StringStyleConverter} 转换器的实例
 */
const _getConverter = onecOfSameParam(
  /**
   * @param {stringStyleType} from 解析风格
   * @param {stringStyleType} to 转换风格
   * @return {StringStyleConverter} 转换器的实例
   */
  (from, to) => new StringStyleConverter(from, to),
  /**
   * 根据参数生成唯一标识
   * @param {stringStyleType} from 解析风格
   * @param {stringStyleType} to 转换风格
   * @return {String} 唯一参数标识字符串
   */
  (from, to) => from.toString() + to.toString()
);

/**
 * 字符串风格转换工具类
 */
class StringStyleUtil {
  /**
   * 获取一个转换器的实例
   * 该函数获取的转换器可以任意复用，请优先使用函数
   * @param {stringStyleType} from 解析风格
   * @param {stringStyleType} to 转换风格
   * @return {StringStyleConverter} 转换器的实例
   */
  static getConverter (from, to) {
    return _getConverter(from, to)
  }
  /**
   * 直接转换字符串的风格
   * 请优先使用可以复用的 {@link StringStyleUtil.getConverter} 函数
   * @param {stringStyleType} from 解析风格
   * @param {stringStyleType} to 转换风格
   * @param {String} str 要转换的字符串
   * @return {String} 转换得到的字符串
   */
  static convert (from, to, str) {
    return StringStyleUtil.getConverter(from, to).convert(str)
  }
}

/**
 * 递归使对象不可变
 * @param {Object} obj 任何非空对象
 * @returns {Object} 新的不可变对象
 */
function deepFreeze (obj) {
  if (obj === undefined || obj === null) {
    return
  }
  // 数组和对象分别处理
  if (obj instanceof Array) {
    obj.forEach(v => {
      if (typeof v === 'object') {
        deepFreeze(v);
      }
    });
  } else if (obj instanceof Object) {
    Object.values(obj).forEach(v => {
      if (typeof v === 'object') {
        deepFreeze(v);
      }
    });
  }
  return Object.freeze(obj)
}

/**
 * 包装对象，使其成为可以任意深度调用而不会出现 undefined 调用的问题
 * 注意: 该函数不能进行递归调用（{@link JSON.stringfy}），一定会造成堆栈溢出的问题（RangeError: Maximum call stack size exceeded）
 * @param {Object} object 任意一个 Object 对象
 * @returns {Object} 包装后的对象
 */
function deepProxy (object) {
  const handler = {
    get (target, k) {
      Reflect.set(
        target,
        k,
        Reflect.has(target, k) ? Reflect.get(target, k) : {}
      );
      const v = Reflect.get(target, k);
      if (typeof v === 'object') {
        return new Proxy(v, handler)
      }
      return v
    }
  };
  return new Proxy(object, handler)
}

/**
 * 将函数包装为柯里化函数
 * 注: 该函数模仿了 Lodash 的 curry 函数
 * @param {Function} fn 需要包装的函数
 * @param  {...any} args 应用的部分参数
 * @returns {Function} 包装后的函数
 */
const curry = (fn, ...args) => {
  if (args.filter(arg => arg !== curry._).length >= fn.length) {
    return fn(...args)
  }
  return function (...otherArgs) {
    const removeIndexSet = new Set();
    let i = 0;
    const newArgs = args.map(arg => {
      if (arg !== curry._) {
        return arg
      }
      if (otherArgs[i] === undefined || otherArgs[i] === curry._) {
        return arg
      }
      removeIndexSet.add(i);
      return otherArgs[i++]
    });
    const newOtherArgs = otherArgs.filter((_v, i) => !removeIndexSet.has(i));
    return curry(fn, ...newArgs, ...newOtherArgs)
  }
};

/**
 * 柯里化的占位符，需要应用后面的参数时使用
 */
curry._ = Symbol('柯里化占位符');

/**
 * 日期格式化器
 * 包含格式化为字符串和解析字符串为日期的函数
 */
class DateFormatter {
  /**
   * 构造函数
   * @param {String} fmt 日期时间格式
   */
  constructor (fmt) {
    /**
     * @field 日期时间格式
     */
    this.fmt = fmt;
  }
  /**
   * 格式化
   * @param {Date} date 需要格式化的日期
   * @returns {String} 格式化的字符串
   */
  format (date) {
    return dateFormat(date, this.fmt)
  }
  /**
   * 解析
   * @param {String} str 字符串
   * @returns {Date} 解析得到的日期
   */
  parse (str) {
    return dateParse(str, this.fmt)
  }
  /**
   * 将日期时间字符串转换为前端指定格式的字符串
   * 主要适用场景是前端接收到后端的日期时间一般是一个字符串，然而需要自定义格式的时候还必须先创建 {@link Date} 对象才能格式化，略微繁琐，故使用该函数
   * @param {String} str 字符串
   * @param {String} [parseFmt=undefined] 解析的日期时间格式。默认直接使用 {@link new Date()} 创建
   * @returns {String} 转换后得到的字符串
   */
  strFormat (str, parseFmt) {
    const date = parseFmt ? dateParse(str, parseFmt) : new Date(str);
    return dateFormat(date, this.fmt)
  }
}

/**
 * 日期格式化器
 */
DateFormatter.dateFormatter = new DateFormatter('yyyy-MM-dd');
/**
 * 时间格式化器
 */
DateFormatter.timeFormatter = new DateFormatter('hh:mm:ss');
/**
 * 日期时间格式化器
 */
DateFormatter.dateTimeFormatter = new DateFormatter('yyyy-MM-dd hh:mm:ss');

export { DateFormatter, FetchLimiting, StateMachine, StringStyleUtil, appends, arrayDiffBy, arrayToMap, asIterator, asyncFlatMap, autoIncrement, blankToNull, blankToNullField, copyText, createElByString, curry, dateBetween, dateConstants, dateEnhance, dateFormat, dateParse, debounce, deepFreeze, deepProxy, deletes, download, downloadString, downloadUrl, emptyAllField, excludeFields, fetchTimeout, fill, filterItems, flatMap, formDataToArray, format, getCookies, getCusorPostion, getYearWeek, groupBy, insertText, isEditable, isFloat, isNumber, isRange, lastFocus, loadResource, mapToObject, objToFormData, onec, onecOfSameParam, parseUrl, randomInt, range, readLocal, removeEl, removeText, returnItself, returnReasonableItself, safeExec, setCusorPostion, sets, singleModel, spliceParams, strToArrayBuffer, strToDate, stringStyleType, throttle, timing, toLowerCase, toObject, toUpperCase, uniqueBy, wait, waitResource, watch, watchEventListener, watchObject };
//# sourceMappingURL=rx-util-es.js.map
