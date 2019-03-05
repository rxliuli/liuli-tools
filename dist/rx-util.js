(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global['rx-util'] = factory());
}(this, function () { 'use strict';

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

  /**
   * 在浏览器上下载文本内容
   * @param {String} str 字符串内容
   * @param {String} {filename} 下载文件名，没有则默认为链接中的文件名
   */
  async function downloadString (str, filename = 'unknown.txt') {
    const blob = new Blob(download, {
      type: 'text/plain'
    });
    download(blob, filename);
  }

  /**
   * 根据 url 下载二进制资源
   * @param {RequestInfo} url 下载请求信息
   * @param {String} {filename} 下载文件名，没有则默认为链接中的文件名
   */
  async function downloadUrl (url, filename = url.substr(url.lastIndexOf('/'))) {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      download(blob, filename);
    } catch (error) {
      return console.log('下载出错了 ', error)
    }
  }

  /**
   * 获取 cookie 键值映射对象
   * @returns {Object} cookie 键值映射对象
   */
  function getCookies () {
    return document.cookie
      .split(';')
      .map(str => str.split('='))
      .map(arr => {
        arr[0] = arr[0].trim();
        arr[1] = arr[1].trim();
        return arr
      })
      .filter(arr => arr[0] && arr[1])
      .reduce((res, arr) => {
        res[arr[0]] = arr[1];
        return res
      }, {})
  }

  /**
   * 将 url 中的内容加载到元素上
   * 注：domSelector 必须有 src 属性用以将加载完成的资源赋值给其，加载默认是异步的
   * @param {RequestInfo} url url 资源
   * @param {Element} domSelector dom 选择器
   * @param {Object} {init} 初始化参数, 实为 fetch() 的参数以及一些自定义的参数，默认 {}
   * 关于 fetch 具体可以参考 <https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch>
   */
  async function loadResource (url, domSelector, init = {}) {
    const res = await fetch(url, init);
    const blob = await res.blob();
    // 生成一个本地的 url 并赋值给 src 属性
    domSelector.src = window.URL.createObjectURL(blob);
  }

  /**
   * Url 对象
   */
  const RxUrl = {
    createNew (rxUrl) {
      const res = {
        href: '', // 不包含网站域名的链接
        website: '', // URL 站点
        protocol: '', // 协议
        domain: '', // 域名
        accessPath: '', // 绝对路径,不包含参数
        params: {}, // 参数列表,
        url: '', // 原 url 链接
        port: 0 // 端口号
      };
      Object.assign(res, rxUrl);
      return res
    }
  };

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
   * @param {String} url url 字符串
   * @returns {RxUrl} json 对象
   */
  function parseUrl (url) {
    if (!url) {
      throw new Error('url 不能为空')
    }

    const regexp = new RegExp('^((\\w+)://([\\w\\.]*)(:(\\d+))?)(.*)');
    const temps = regexp.exec(url);
    const res = RxUrl.createNew({
      url: url,
      website: temps[1],
      protocol: temps[2],
      domain: temps[3],
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
    if (!res.port) {
      res.port = protocol2Port[res.protocol] || '';
    }
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
   * @param {{String}} init 一些初始选项，目前只有 type 一项
   * @returns {Promise} 返回了读取到的内容（异步）
   */
  const readLocal = (() => {
    const result = (file, { type = 'readAsDataURL' } = {}) =>
      new Promise((resolve, reject) => {
        if (!file) {
          reject(new Error('file not exists'));
        }
        const fr = new FileReader();
        fr.onload = event => {
          resolve(event.target.result);
        };
        fr.onerror = error => {
          reject(error);
        };
        fr[type](file);
      });
    result.DataURL = 'readAsDataURL';
    result.Text = 'readAsText';
    result.BinaryString = 'readAsBinaryString';
    result.ArrayBuffer = 'readAsArrayBuffer';
    return result
  })();

  /**
   * 拼接参数字符串
   * @param {Object} params 参数对象
   * @returns {String} 拼接后的字符串
   */
  function spliceParams (params) {
    if (!params) {
      throw new Error(`参数对象不能为空：${params}`)
    }
    var res = '';
    for (const k in params) {
      if (params.hasOwnProperty(k)) {
        const v = params[k];
        res += `${encodeURIComponent(k)}=${encodeURIComponent(v)}&`;
      }
    }
    return res
  }

  /**
   * 为 fetch 请求添加超时选项
   * 注：超时选项并非真正意义上的超时即取消请求，请求依旧正常执行完成，但会提前返回 reject 结果
   * @param {Promise} fetchPromise fetch 请求的 Promise
   * @param {Number} timeout 超时时间
   * @returns {Promise} 如果超时就提前返回 reject, 否则正常返回 fetch 结果
   */
  function promiseTimeout (fetchPromise, timeout) {
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

  /**
   * 将一个 Iterator 迭代器转换为一个 Array
   * @param {Iterator} iterator Iterator 迭代器
   * @return {Array} Iterator 中每一项元素转换而得到的 Array
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

  /**
   * 将数组异步压平一层
   * @param {Array} arr 数组
   * @param {Function} fn 映射方法，将一个元素映射为一个数组
   * @returns {Array} 压平一层的数组
   */
  async function asyncFlatMap (arr, fn) {
    var res = [];
    for (const i in arr) {
      res.push(...(await fn(arr[i])));
    }
    return res
  }

  /**
   * 自行实现 flatMap，将数组压平一层
   * @param {Array} arr 数组
   * @param {Function} fn 映射方法，将一个元素映射为一个数组
   * @returns {Array} 压平一层的数组
   */
  function flatMap (arr, fn) {
    return arr.reduce((res, item) => res.concat(fn(item)), [])
  }

  /**
   * js 数组按照某个条件进行分组
   * @param {Array} arr 要进行分组的数组
   * @param {Function} {fn} 元素分组的方法，默认使用 {@link JSON.stringify()}
   * @returns {Array} 新的数组
   */
  function groupBy (arr, fn = item => JSON.stringify(item)) {
    // 将元素按照分组条件进行分组得到一个 条件 -> 数组 的对象
    const obj = {};
    arr.forEach(item => {
      const name = fn(item)
      // 如果已经有这个键了就直接追加, 否则先将之赋值为 [] 再追加元素
      ;(obj[name] || (obj[name] = [])).push(item);
    });
    // 将对象转换为数组
    return Object.keys(obj).map(key => obj[key])
  }

  /**
   * 创建一个等差数列数组
   * @param {Number} start 开始（包含）
   * @param {Number} end 结束（不包含）
   * @param {Number} [sep] 步长，默认为 1
   * @returns {Array} 等差数列数组
   */
  function range (start, end, sep = 1) {
    var arr = [];
    for (let i = start; i < end; i += sep) {
      arr.push(i);
    }
    return arr
  }

  /**
   * 将数组转化为一个 Object 对象
   * @param {Array} arr 需要进行转换的数组
   * @param {Function} kFn 生成对象属性名的函数
   * @param {Function} {vFn} 生成对象属性值的函数，默认为数组中的迭代元素
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
   * @param {Array} arr 要进行去重的数组
   * @param {Function} {fn} 唯一标识元素的方法，默认使用 {@link JSON.stringify()}
   * @returns {Array} 进行去重操作之后得到的新的数组 (原数组并未改变)
   */
  function uniqueBy (arr, fn = item => JSON.stringify(item)) {
    const obj = {};
    return arr.filter(item =>
      obj.hasOwnProperty(fn(item)) ? false : (obj[fn(item)] = true)
    )
  }

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
      if (new RegExp('(' + k + ')').test(fmt)) {
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
            RegExp.$1.length === 1
              ? o[k]
              : ('00' + o[k]).substr(('' + o[k]).length)
          );
        }
      }
    }
    return fmt
  }

  /**
   * 填充字符串到指定长度
   * @param {String} item 填充的字符串
   * @param {Number} len 填充的长度
   * @returns {String} 填充完成的字符串
   */
  function fill (item, len) {
    var res = '';
    for (let i = 0; i < len; i++) {
      res += item;
    }
    return res
  }

  /**
   * 解析字符串为 Date 对象
   * @param dateStr 日期字符串
   * @param fmt 日期字符串的格式
   * 目前仅支持使用 y(年),M(月),d(日),h(时),m(分),s(秒),S(毫秒)
   * @returns {Date} 解析得到的 Date 对象
   */
  function strToDate (dateStr, fmt) {
    const now = new Date();
    /**
     * 日期格式化对象
     * @param {String} name 日期格式的名称
     * @param {String} format 日期的格式值
     * @param {String} value 格式化得到的值
     * @param {Number} index 需要替换位置的索引
     * @constructor
     */
    class DateFormat {
      constructor (name, format, value, index) {
        this.name = name;
        this.format = format;
        this.value = value;
        this.index = index;
      }
    }

    // 日期时间的正则表达式
    const dateFormats = {
      year: 'y{2}|y{4}',
      month: 'M{1,2}',
      day: 'd{1,2}',
      hour: 'h{1,2}',
      minute: 'm{1,2}',
      second: 's{1,2}',
      milliSecond: 'S{1,3}'
    };
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
    if (!new RegExp(fmt).test(dateStr)) {
      return null
    }
    // 进行一次排序, 依次对字符串进行截取
    dateUnits
      .sort(function (a, b) {
        return a.index - b.index
      })
      .map(format => {
        const matchDateUnit = new RegExp(format).exec(dateStr);
        if (matchDateUnit !== null && matchDateUnit.length > 0) {
          dateStr = dateStr.replace(matchDateUnit[0], '');
          format.value = matchDateUnit[0];
        }
        return format
      });
    for (var i = 0, length = dateUnits.length; i < length; i++) {
      const format = dateUnits[i].format;
      if (format == null) {
        continue
      }
      const matchDateUnit = new RegExp(format).exec(dateStr);
      if (matchDateUnit !== null && matchDateUnit.length > 0) {
        dateStr = dateStr.replace(matchDateUnit[0], '');
        dateUnits[i].value = matchDateUnit[0];
      }
    }
    // 将截取完成的信息封装成对象并格式化标准的日期字符串
    const obj = toObject(dateUnits, item => item.name, item => item.value);
    if (obj.year.length === 2) {
      obj.year = now
        .getFullYear()
        .toString()
        .substr(0, 2)
        .concat(obj.year);
    }
    const date = `${obj.year}-${obj.month}-${obj.day}T${obj.hour}:${obj.minute}:${
    obj.second
  }.${obj.milliSecond}Z`;
    try {
      return new Date(date)
    } catch (e) {
      return null
    }
  }

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

  /**
   * 获取输入框中光标所在位置
   * @param  {Element} el 需要获取的输入框元素
   * @returns {Number} 光标所在位置的下标
   */
  function getCusorPostion (el) {
    return el.selectionStart
  }

  /**
   * 设置输入框中选中的文本/光标所在位置
   * @param {Element} el 需要设置的输入框元素
   * @param {Number} start 光标所在位置的下标
   * @param {Number} {end} 结束位置，默认为输入框结束
   */
  function setCusorPostion (el, start, end = start) {
    el.focus();
    el.setSelectionRange(start, end);
  }

  /**
   * 在指定位置后插入文本
   * @param {Element} el 需要设置的输入框元素
   * @param {String} value 要插入的值
   * @param {Number} {start} 开始位置，默认为当前光标处
   */
  function insertText (el, text, start = getCusorPostion(el)) {
    var value = el.value;
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
    var inputEls = ['input', 'date', 'datetime', 'select', 'textarea'];
    return (
      el && (el.isContentEditable || inputEls.includes(toLowerCase(el.tagName)))
    )
  }

  /**
   * 获取到最后一个获得焦点的元素
   * @returns {Element} 最后一个获取到焦点的元素
   */
  var lastFocus = (lastFocusEl => {
    document.addEventListener(
      'focus',
      event => {
        lastFocusEl = event.target;
      },
      true
    );
    document.addEventListener(
      'blur',
      event => {
        lastFocusEl = null;
      },
      true
    );
    return () => lastFocusEl
  })(null);

  /**
   * 直接删除指定元素
   * @param {Element} el 需要删除的元素
   */
  function removeEl (el) {
    const parent = el.parentElement;
    parent.removeChild(el);
  }

  /**
   * 在指定范围内删除文本
   * @param {Element} el 需要设置的输入框元素
   * @param {Number} {start} 开始位置，默认为当前选中开始位置
   * @param {Number} {end} 结束位置，默认为当前选中结束位置
   */
  function removeText (el, start = el.selectionStart, end = el.selectionEnd) {
    // 删除之前必须要 [记住] 当前光标的位置
    var index = getCusorPostion(el);
    var value = el.value;
    el.value = value.substr(0, start) + value.substr(end, value.length);
    setCusorPostion(el, index);
  }

  /**
   * 监听 event 的添加，必须及早添加
   */
  function initWatch () {
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
     * @param {Boolean} {useCapture} 是否需要捕获事件冒泡，默认为 false
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
      document.removeEventListenerByType = EventTarget.prototype.removeEventListenerByType = removeEventListenerByType;
    })();
  }

  /**
   * FormData 批量添加方法
   * 注：该方法不会覆盖掉原本的属性
   * @param {Object} obj 键值对对象
   * @returns {FormData} 添加完成后的 FormData 对象
   */
  function appends (obj) {
    for (const key in obj) {
      this.append(key, obj[key]);
    }
    return this
  }

  /**
   * FormData 批量删除方法
   * @param keys {Array} 删除的 key 列表
   * @returns {FormData} this
   */
  function deletes (formData, keys) {
    keys.forEach(key => formData.delete(key));
    return formData
  }

  /**
   * FormData 批量设置方法
   * 注：该方法会覆盖掉原本的属性
   * @param {Object} obj 键值对对象
   * @returns {FormData} 设置完成后的 FormData 对象
   */
  function sets (obj) {
    for (const key in obj) {
      this.set(key, obj[key]);
    }
    return this
  }

  /**
   * FormData 添加转换为包含所有键值对 Array 的方法
   * FormData.key => Array.item.key: 每一项元素中的 key 是 FormData 中包含的属性的名称
   * FormData.value => Array.item.value: 每一项元素中的 value 是 FormData 中包含的属性的值
   * @param {FormData} formData 需要转换的 FormData 对象
   * @returns {Array} 转换后的数组
   */
  function toArray (formData) {
    return Array.asIterator(formData.keys())
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
  function debounce (delay, action) {
    let tId;
    return function () {
      const context = this;
      const arg = arguments;
      if (tId) clearTimeout(tId);
      tId = setTimeout(function () {
        action.apply(context, arg);
      }, delay);
    }
  }

  /**
   * 返回对象参数本身
   * @param {Object} 任何对象
   * @returns {Object} 传入的参数
   */
  function returnItself (item) {
    return item
  }

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
   * @param {Function} 需要测试的函数
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

  /**
   * 等待指定的时间/等待指定表达式成立
   * @param {Number|Function} param 等待时间/等待条件
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

  /**
   * 轮询等待指定资源加载完毕再执行操作
   * 使用 Promises 实现，可以使用 ES7 的 {@async}/{@await} 调用
   * @param {Function} resourceFn 判断必须的资源是否存在的方法
   * @param {Object} options 选项
   * @returns Promise 对象
   */
  function waitResource (resourceFn, options) {
    var optionsRes = Object.assign(
      {
        interval: 1000,
        max: 10
      },
      options
    );
    var current = 0;
    return new Promise((resolve, reject) => {
      var timer = setInterval(() => {
        if (resourceFn()) {
          clearInterval(timer);
          resolve();
        }
        current++;
        if (current >= optionsRes.max) {
          clearInterval(timer);
          reject(new Error('等待超时'));
        }
      }, optionsRes.interval);
    })
  }

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

  const rx = {
    download,
    downloadString,
    downloadUrl,
    getCookies,
    loadResource,
    parseUrl,
    readLocal,
    spliceParams,
    fetchTimeout: promiseTimeout,
    // FetchLimiting,
    asIterator,
    asyncFlatMap,
    flatMap,
    groupBy,
    range,
    toObject,
    uniqueBy,
    dateFormat,
    strToDate,
    createElByString,
    getCusorPostion,
    insertText,
    isEditable,
    lastFocus,
    removeEl,
    removeText,
    setCusorPostion,
    watchEventListener: initWatch,
    appends,
    deletes,
    sets,
    toArray,
    debounce,
    returnItself,
    throttle,
    timing,
    wait,
    waitResource,
    fill,
    format,
    toLowerCase,
    toUpperCase
  };

  return rx;

}));
//# sourceMappingURL=rx-util.js.map
