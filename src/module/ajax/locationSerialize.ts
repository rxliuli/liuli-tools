enum ModeType {
  History,
  Hash,
}

interface BaseSerializable {
  /**
   * 解析 URL 上的参数
   */
  parse(): any
  /**
   * 序列化参数到 URL 上
   * @param obj
   */ serialize(obj: object): void
}

class HistorySerializable implements BaseSerializable {
  parse(): any {
    const url = new URL(location.href)
    const serializeParam = url.searchParams.get(locationSerialize.ParamName)
    try {
      return JSON.parse(decodeURIComponent(serializeParam || '{}'))
    } catch (e) {
      return {}
    }
  }

  serialize(obj: object): void {
    const url = new URL(location.href)
    url.searchParams.set(
      locationSerialize.ParamName,
      encodeURIComponent(JSON.stringify({ ...this.parse(), ...obj })),
    )
    history.replaceState(null, '', url.href)
  }
}

class HashSerializable implements BaseSerializable {
  parse(): any {}

  serialize(obj: object): void {}
}

export class LocationSerialize {
  public static ModeType = ModeType
  /**
   * 配置序列化到 URL 上的名字
   */
  public ParamName = 'serializeParam'
  public mode =
    history.replaceState !== undefined ? ModeType.History : ModeType.Hash
  private serializable: BaseSerializable =
    this.mode === LocationSerialize.ModeType.History
      ? new HistorySerializable()
      : new HashSerializable()

  /**
   * 初始化一个可以自动将修改序列化到 URL 上并在第一次自动从 URL 上取值的函数
   * @param obj
   */
  public queryUrlInit<T extends object>(obj: T): any {
    const serializable = this.serializable
    const param = serializable.parse()
    Object.assign(obj, param)
    return new Proxy(obj, {
      set(target, p, value, receiver): boolean {
        Reflect.set(target, p, value, receiver)
        serializable.serialize(obj)
        return true
      },
    })
  }
}

export const locationSerialize = new LocationSerialize()
export const queryUrlInit = locationSerialize.queryUrlInit.bind(
  locationSerialize,
)
