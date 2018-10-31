//region 为 js 原生对象的原型添加方法

/**
 * 获取一组日期中最大的
 * 注: 此方法默认忽略为空值的日期类型
 * @param dates 一组 Date 对象
 */
Date.max = function(dates) {
  if (!dates) {
    throw new Error('要获取最大日期的参数不能为空')
  }
  return dates
    .filter(function(date) {
      return date && date.getTime()
    })
    .sort()[0]
}
/**
 * 获取一组日期中最小的
 * 注: 此方法默认忽略为空值的日期类型
 * @param dates 一组 Date 对象
 */
Date.min = function(dates) {
  if (!dates) {
    throw new Error('要获取最小日期的参数不能为空')
  }
  const sortArr = dates
    .filter(function(date) {
      return date && date.getTime()
    })
    .sort()
  return sortArr[sortArr.length - 1]
}

/**
 * 当前时间与另一个时间的绝对差值
 * 不管两个时间对象的大小
 * @param that {Date} 另一个比较的时间
 * @return {Date} 时间差值
 */
Date.prototype.absSub = function(that) {
  return new Date(this.getTime() - that.getTime())
}

/**
 * 当前时间加上一段时间戳之后的时间
 * @param that {string} 加上的时间
 * @return {Date} 新的时间
 */
Date.prototype.add = function(that) {
  return new Date(this.getTime() + that)
}

/**
 * 当前时间是否在比较的时间之前
 * @param that {Date} 比较的时间
 * @return {boolean} 是否在比较的时间之前
 */
Date.prototype.isBefore = function(that) {
  return this.getTime() < that.getTime()
}

/**
 * 当前时间是否在比较的时间之后
 * @param that {Date} 比较的时间
 * @return {boolean} 是否在比较的时间之后
 */
Date.prototype.isAfter = function(that) {
  return this.getTime() > that.getTime()
}

/**
 * js 的数组去重方法
 * 注: 极大量的数组尽量避免使用该方法, 该方法效率很高但内存但代价是内存占用
 * @returns {*[]} 进行去重操作之后得到的新的数组 (原数组并未改变)
 */
Array.prototype.unique = function() {
  const obj = {}
  return this.filter(function(item) {
    return obj.hasOwnProperty(typeof item + item)
      ? false
      : (obj[typeof item + item] = true)
  })
}
/**
 * js 过滤掉一个或多个元素
 * 注: 此方法会迭代两次
 * @param items 要过滤掉的元素, 可以是对象 / 数组
 * @returns {*} 过滤得到的新数组
 */
Array.prototype.filterItems = function(items) {
  var oldArray = this

  function filterMultiItem(items) {
    var obj = {}
    items.forEach(function(item) {
      obj[typeof item + item] = true
    })
    return oldArray.filter(function(item) {
      return !obj[typeof item + item]
    })
  }

  return Array.isArray(items)
    ? filterMultiItem(items)
    : filterMultiItem([items])
}
/**
 * js 数组转换为一个 Object 对象
 * @param fn 转换方法
 * fn 必须接受数组中的每一个元素作为参数, 并返回一个 {key: key, value: value} 形式的对象
 * @returns {{}} 得到的 Object 对象
 */
Array.prototype.toObject = function(fn) {
  if (!fn) {
    throw new Error('Array 对象的 toObject() 方法的参数不能为空')
  }
  const obj = {}
  this.map(fn).forEach(function(item) {
    obj[item.key] = item.value
  })
  return obj
}
/**
 * 将一个 Iterator 迭代器转换为一个 Array
 * @param iterator Iterator 迭代器
 * @return Array Iterator 中每一项元素转换而得到的 Array
 */
Array.asIterator = function(iterator) {
  var arr = []
  while (true) {
    var next = iterator.next()
    if (next.done) {
      break
    } else {
      arr.push(next.value)
    }
  }
  return arr
}
/**
 * js 数组按照某个条件进行分组
 * 注：分组完成后会得到一个二维数组，并且顺序会被打乱
 * 时间复杂度为 2On
 * @param fn 分组条件函数
 */
Array.prototype.group = function(fn) {
  // 将元素按照分组条件进行分组得到一个 条件 -> 数组 的对象
  const obj = {}
  this.forEach(item => {
    const name = JSON.stringify(fn(item))
    // 如果已经有这个键了就直接追加, 否则先将之赋值为 [] 再追加元素
    ;(obj[name] || (obj[name] = [])).push(item)
  })
  // 将对象转换为数组
  return Object.keys(obj).map(key => obj[key])
}

/**
 * FormData 添加转换为包含所有键值对 Array 的方法
 * FormData.key => Array.item.key: 每一项元素中的 key 是 FormData 中包含的属性的名称
 * FormData.value => Array.item.value: 每一项元素中的 value 是 FormData 中包含的属性的值
 */
FormData.prototype.toArray = function() {
  const formData = this
  return Array.asIterator(this.keys()).map(function(key) {
    return {
      key: key,
      value: formData.get(key)
    }
  })
}
/**
 * FormData 批量添加方法
 * 注：该方法不会覆盖掉原本的属性
 * @param obj 添加的对象
 * @returns {FormData} this
 */
FormData.prototype.appends = function(obj) {
  if (!obj) {
    return this
  }
  for (const key in obj) {
    this.append(key, obj[key])
  }
  return this
}
/**
 * FormData 批量设置方法
 * 注：该方法会覆盖掉原本的属性
 * @param obj 设置的对象
 * @returns {FormData} this
 */
FormData.prototype.sets = function(obj) {
  if (!obj) {
    return this
  }
  for (const key in obj) {
    this.set(key, obj[key])
  }
  return this
}
/**
 * FormData 批量删除方法
 * @param keys {Array} 删除的 key 列表
 * @returns {FormData} this
 */
FormData.prototype.deletes = function(keys) {
  const formData = this
  if (!keys || !keys.length) {
    return this
  }
  keys.forEach(function(key) {
    formData.delete(key)
  })
  return formData
}

//endregion

$(function() {
  /**
   * 扩展 jQuery 的方法
   */
  jQuery.fn.extend({
    /**
     * 将一个 jquery 选择器对象转换成一个数组
     * @param fn 将 jquery 选择器迭代时产生的每一个 js 对象转换成想要的样子，如果没有则直接是 js 对象本身
     * @returns {Array} 转换得到的数组
     */
    mkArray: function(fn) {
      var arr = []
      this.each(function(index, item) {
        if (typeof fn === 'function') {
          arr.push(fn(item))
        } else {
          arr.push(item)
        }
      })
      return arr
    },
    /**
     * 为表单的 value 提供一个可选的默认值
     * @param defaultValue 默认值
     * @param isTrim 是否进行 trim() 操作, 默认进行 trim() 操作
     * @returns {*} 如果 val() 得到一个空值则返回默认值, 否则返回 val()
     */
    orElse: function(defaultValue, isTrim) {
      var value = this.val()
      if (!value) {
        return defaultValue
      }
      if (isTrim !== false) {
        value = value.trim()
      }
      return value ? value : defaultValue
    },
    /**
     * 扩展 jquery 的序列化方法, 将表单序列化为 js 对象方便转换为 json
     */
    serializeObject: function() {
      const obj = {}
      const arr = this.serializeArray()
      $.each(arr, function() {
        if (obj[this.name]) {
          if (!obj[this.name].push) {
            obj[this.name] = [obj[this.name]]
          }
          obj[this.name].push(this.value || '')
        } else {
          obj[this.name] = this.value || ''
        }
      })
      return obj
    }
  })
})
/**
 * 通用的公共 js 文件
 */
const global = {
  ctx: ctx,
  /**
   * 默认的日期格式化 / 解析格式
   */
  defaultDateFormatter: 'yyyy-MM-dd',
  /**
   * 判断浏览器是否是 IE
   */
  isIE: function() {
    var b = document.createElement('b')
    b.innerHTML = '<!--[if IE]><i></i><![endif]-->'
    return b.getElementsByTagName('i').length === 1
  },
  /**
   * 回到上一页
   * @returns {boolean}
   */
  goback: function() {
    history.go(-1)
    return false
  },
  /**
   * 重定向到新的页面 (当前页面打开)
   * @param url 重定向的页面 url
   */
  redirect: function(url) {
    window.location.href = ctx + '/common/redirect?pagePath=' + url
  },
  /**
   * 转发到新的页面 (当前页面打开)
   * 注: 如果是想要通过 {@code CommonController} 进阶跳转到页面则必须使用转发
   * 如果有对应的 RequestMapping 才可以使用上面的 {@code redirect()} 方法
   * @param url 转发的 url
   */
  forward: function(url) {
    window.location.href = ctx + '/common/forward?pagePath=' + url
  },
  /**
   * 判断是否为正整数
   */
  isPositiveInteger: function(i) {
    return this.isMatch('^[1-9][0-9]*$', i)
  },
  /**
   * 判断是否为手机号
   */
  isPhone: function(phone) {
    return this.isMatch('^1[3|4|5|7|8]\\d{9}$', phone)
  },
  /**
   * 判断是否匹配正则表达式
   * 如果为空则直接返回 false
   * @param pattern 正则表达式
   * @param str 要匹配的字符串
   * @returns {*|boolean} 是否匹配的到
   */
  isMatch: function(pattern, str) {
    return str && new RegExp(pattern).test(str)
  },
  /**
   * 判断字符串是否为 null 空白
   */
  isBlank: function(str) {
    return str === null || str.trim() === ''
  },
  /**
   * 正在加载中
   * @param callbackFunction 加载过程中执行的函数
   */
  loading: function(callbackFunction) {
    layer.load()
    callbackFunction()
    layer.closeAll('loading')
  },
  /**
   * 特殊字符转义
   * @param str 要进行转义字符串
   * @return 转义后的字符串
   */
  escaping: (function(regexObj) {
    return function(str) {
      for (var regexKey in regexObj) {
        str = str.replace(regexObj[regexKey], regexKey)
      }
      return str
    }
  })({
    '%25': /%/g,
    '%2B': /\+/g,
    '%20': / /g,
    '%2F': /\//g,
    '%3F': /\?/g,
    '%26': /&/g,
    '%3D': /\=/g,
    '%23': /#/g
  }),
  /**
   * 拼接 url
   * @param url 没有参数的纯净的 url
   * @param parameters 参数, 以 json 对象的方式传入
   */
  spliceUrl: function(url, parameters) {
    var keyValues = []
    if (!parameters) {
      return this.ctx + url
    }
    for (var key in parameters) {
      keyValues.push(key + '=' + this.escaping(parameters[key]))
    }
    return this.ctx + url + '?' + keyValues.join('&')
  },
  /**
   * 将 url 中的内容加载到元素上
   * 注：domSelector 必须有 src 属性用以将加载完成的资源赋值给其，加载默认是异步的
   * @param {string} url url 资源
   * @param {document} domSelector dom 选择器
   * @param {object} init 初始化参数, 实为 fetch() 的参数以及一些自定义的参数
   * 关于 fetch 具体可以参考 <https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch>
   * 自定义的参数有:
   * before: 加载之前的方法，例如可以设置一个弹窗或者遮罩告诉用户资源正在加载中
   * after: 加载完成之后的方法，例如可以设置一个加载完成的动画提醒一下用户
   * error: 发生异常时的方法，例如可以设置一个错误提示通知用户加载异常需要刷新了
   */
  loadResource: function(url, domSelector, init) {
    if (!init) {
      init = {}
    }
    if (init.before && typeof init.before === 'function') {
      init.before()
    }
    // 如果没有自定义缓存的话就设置缓存
    init.cache = init.cache || 'force-cache'
    // 如果没有自定义错误处理就设置一下错误处理
    init.error =
      init.error || (error => console.log(`request was wrong: ${error}`))
    fetch(url, init)
      // 判断返回的状态是否正常
      .then(rep => {
        if (rep.status === 200) {
          return rep
        } else {
          throw new Error(`response status error ${rep.status}`)
        }
      })
      // 转换资源
      .then(data => data.blob())
      .then(blob => {
        // 生成一个本地的 url 并赋值给 src 属性
        domSelector.src = window.URL.createObjectURL(blob)
        if (init.after && typeof init.after === 'function') {
          init.after()
        }
      })
      .catch(init.error)
  },
  /**
   * 函数去抖
   * 去抖 (debounce) 去抖就是对于一定时间段的连续的函数调用，只让其执行一次
   * 注: 包装后的函数如果两次操作间隔小于 delay 则不会被执行, 如果一直在操作就会一直不执行, 直到操作停止的时间大于 delay 最小间隔时间才会执行一次, 不管任何时间调用都需要停止操作等待最小延迟时间
   * 应用场景主要在那些连续的操作, 例如页面滚动监听, 包装后的函数只会执行最后一次
   * @param delay 最小延迟时间
   * @param action 真正需要执行的操作
   * @return {Function} 包装后有去抖功能的函数
   */
  debounce: function(delay, action) {
    let tId
    return function() {
      const context = this
      const arg = arguments
      if (tId) clearTimeout(tId)
      tId = setTimeout(function() {
        action.apply(context, arg)
      }, delay)
    }
  },
  /**
   * 函数节流
   * 节流 (throttle) 让一个函数不要执行的太频繁，减少执行过快的调用，叫节流
   * 类似于上面而又不同于上面的函数去抖, 包装后函数在上一次操作执行过去了最小间隔时间后会直接执行, 否则会忽略该次操作
   * 与上面函数去抖的明显区别在连续操作时会按照最小间隔时间循环执行操作, 而非仅执行最后一次操作
   *
   * @param delay 最小间隔时间
   * @param action 真正需要执行的操作
   * @return {Function} 包装后有节流功能的函数
   */
  throttle: function(delay, action) {
    let last = 0
    return function() {
      const curr = Date.now()
      if (curr - last > delay) {
        action.apply(this, arguments)
        last = curr
      }
    }
  }
}

/**
 * websocket 连接的工具类
 * 该工具类依赖于 sockjs-client 与 webstomp-client 两个类库
 * 使用方法：
 * 1. 设定 endpoint 属性
 * 2. 添加连接成功 / 失败的回调函数进行连接
 * 3. 订阅 / 发送消息
 * 4. 断开连接
 */
const socketUtil = {
  // 最大重连次数
  maxLen: 10,
  // 当前重连次数
  currentLen: 0,
  // 每次连接的时间间隔
  timeInterval: 3000,
  // 连接的 Socket 节点
  endpoint: undefined,
  // Socket 连接信息
  stompClient: undefined,
  socket: undefined,
  /**
   * Socket 连接的方法
   */
  connectWebSocket(successFn, errorFn) {
    this.socket = new SockJS(this.endpoint)
    this.stompClient = Stomp.over(this.socket)
    this.stompClient.connect(
      this.getHeaders(),
      successFn,
      error => {
        if (this.currentLen++ < this.maxLen) {
          console.log(
            `Socket 连接失败，将在 ${this.timeInterval / 1000}s 后重试 `
          )
          setTimeout(() => this.connectWebSocket(), 3000)
        } else {
          console.log('Socket 连接失败次数过多，将不再重试')
        }
        errorFn(error)
      }
    )
  },
  /**
   * 断开连接的方法
   */
  disconnectWebSocket() {
    if (this.stompClient) {
      this.stompClient.disconnect(function() {
        console.log('断开连接')
      }, this.getHeaders())
      this.socket.close()
    }
  },
  /**
   * 获取当前 Socket 连接的 session id
   */
  getSessionId() {
    return /\/([^\/]+)\/websocket/.exec(this.socket._transport.url)[1]
  },
  /**
   * 获取一个认证的 headers 信息
   * 该方法可以被覆盖
   * @return {{"X-Requested-With": string, Authorization: any}} 含有认证信息的 headers 对象
   */
  getHeaders() {
    return {
      'X-Requested-With': 'X-Requested-With',
      Authorization: localStorage.token
    }
  },
  /**
   * 发送简单文本类型的消息
   */
  sendText(url, body, headers = {}) {
    return this.stompClient.send(url, headers, body)
  },
  /**
   * 发送 json 类型的消息
   */
  sendJSON(url, body, headers = {}) {
    return this.stompClient.send(url, headers, JSON.stringify(body))
  },
  /**
   * 订阅简单文本类型的消息
   */
  subscribeText(url, successFn) {
    return this.stompClient.subscribe(url, res => successFn(res))
  },
  /**
   * 订阅 json 类型的消息
   */
  subscribeJSON(url, successFn) {
    return this.stompClient.subscribe(url, res =>
      successFn(JSON.parse(res.body))
    )
  },
  /**
   * 取消订阅
   * @param obj 订阅对象
   */
  unsubscribe(obj) {
    if (obj && obj.unsubscribe) {
      obj.unsubscribe()
    }
  }
}

const checkUtil = {
  /**
   * 消息的显示方法
   */
  show: function(message) {
    layer.alert(message)
    return this
  },
  build: function() {
    this.show = function(message) {
      layer.alert(message)
      return this
    }
    return this
  },
  /**
   * 检查数据
   * @param data 要检查的数据
   * @param message 错误的消息
   * @param predicate 检查的谓词, 错误条件 (函数: data => boolean)
   * @returns {checkUtil} this
   */
  check: function(data, message, predicate) {
    if (predicate(data)) {
      const errorMessage = formsUtil.orElse(message, '数据检查失败')
      this.show(errorMessage)
      throw new Error(errorMessage)
    }
    return this
  },
  /**
   * 检查是否为空
   * @param data 要检查的数据
   * @param message 错误的消息
   * @returns {checkUtil} this
   */
  null: function(data, message) {
    return this.check(data, message, function(data) {
      return data === null
    })
  },
  empty: function(data, message) {
    return this.null(data, message).check(data, message, function(data) {
      return data.length === 0
    })
  },
  blank: function(data, message) {
    return this.null(data, message).check(data, message, function(data) {
      return data.trim().length === 0
    })
  },
  lenMax: function(data, max, message) {
    return this.null(data, message).check(data, message, function(data) {
      return data.length > max
    })
  },
  lenMin: function(data, min, message) {
    return this.null(data, message).check(data, message, function(data) {
      return data.length < min
    })
  },
  lenRange: function(data, range, message) {
    return this.null(data, message).check(data, message, function(data) {
      var length = data.length
      return length < range[0] || length > range[1]
    })
  },
  eqTo: function(data, value, message) {
    return this.null(data, message).check(data, message, function(data) {
      return length < range[0] || length > range[1]
    })
  },
  int: function(data, message) {
    return this.blank(data, message).check(data, message, function(data) {
      return isNaN(parseInt(data))
    })
  },
  float: function(data, message) {
    return this.blank(data, message).check(data, message, function(data) {
      return isNaN(parseFloat(data))
    })
  },
  max: function(data, max, message) {
    return this.float(data, message).check(data, message, function(data) {
      return parseFloat(data) > max
    })
  },
  min: function(data, min, message) {
    return this.float(data, message).check(data, message, function(data) {
      return parseFloat(data) < min
    })
  },
  range: function(data, range, message) {
    return this.float(data, message).check(data, message, function(data) {
      const float = parseFloat(data)
      return float < range[0] || float > range[1]
    })
  },
  regex: function(data, regex, message) {
    return this.check(data, message, function(data) {
      return !new RegExp(regex).test(data)
    })
  }
}
