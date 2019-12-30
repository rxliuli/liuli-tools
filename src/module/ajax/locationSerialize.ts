function parseSerializeParam() {
  const url = new URL(location.href)
  const serializeParam = url.searchParams.get(locationSerialize.ParamName)
  try {
    return JSON.parse(decodeURIComponent(serializeParam || '{}'))
  } catch (e) {
    return {}
  }
}

/**
 * 初始化一个可以自动将修改序列化到 URL 上并在第一次自动从 URL 上取值的函数
 * @param obj
 */
export function locationSerialize<T extends object>(obj: T): any {
  const serializeParam = parseSerializeParam()
  Object.assign(obj, serializeParam)

  return new Proxy(obj, {
    set(
      target: object,
      p: string | number | symbol,
      value: any,
      receiver: any,
    ): boolean {
      Reflect.set(target, p, value, receiver)
      const url = new URL(location.href)
      url.searchParams.set(
        locationSerialize.ParamName,
        encodeURIComponent(
          JSON.stringify({ ...parseSerializeParam(), ...obj }),
        ),
      )
      history.replaceState(null, '', url.href)
      return true
    },
  })
}

/**
 * 配置序列化到 URL 上的名字
 */
locationSerialize.ParamName = 'serializeParam'
