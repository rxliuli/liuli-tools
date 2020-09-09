import { EventEmitter } from '../event/EventEmitter'

/**
 * 扫码配置
 * @deprecated 已废弃，请使用 js-scanner-detection
 */
export interface ScannerConfig {
  /**
   * 校验
   * @param key
   */
  validate: (key: string) => boolean
  interval?: number
}

/**
 * 条形码扫描
 * @deprecated 已废弃，请使用 js-scanner-detection
 */
export class BarcodeScanner {
  constructor(private config: ScannerConfig) {}
  private lastTime?: number
  private nextTime?: number
  private code = ''
  private em = new EventEmitter<{ scan: [string] }>()

  /**
   * 添加监听
   * @param listener
   */
  on(listener: (code: string) => void) {
    this.em.add('scan', listener)
    this.init()
  }

  /**
   * 结束监听
   * @param listener
   */
  off(listener: (code: string) => void) {
    this.destroy()
    this.em.remove('scan', listener)
  }

  private interval = 0

  private listener = (e: KeyboardEvent) => {
    console.log('keydown: ', e.key)
    this.nextTime = Date.now()

    //如果是数组中的元素
    const isScanner = !(
      this.nextTime &&
      this.lastTime &&
      this.nextTime - this.lastTime > (this.config.interval || 20)
    )
    if (this.config.validate(e.key)) {
      this.nextTime = Date.now()

      // 第二次输入延迟1秒，删除之前的数据重新计算
      if (isScanner) {
        this.code = this.code + e.key
        clearTimeout(this.interval)
        this.interval = setTimeout(() => {
          this.em.emit('scan', this.code)
        }, 100)
      } else {
        this.code = e.key
      }
    }

    // 键入Enter
    if (e.key === 'Enter' && isScanner) {
      console.log('Enter: ', this.nextTime - this.lastTime!)
      this.code = this.code.replace(/\s*/g, '')
      this.em.emit('scan', this.code)
      //键入回车务必清空 code 值
      this.code = ''
      clearTimeout(this.interval)
    }
    this.lastTime = this.nextTime
  }

  private num = 0
  private init() {
    if (this.num === 0) {
      document.addEventListener('keydown', this.listener)
    }
    this.num++
  }

  private destroy() {
    this.num--
    if (this.num === 0) {
      document.removeEventListener('keydown', this.listener)
    }
  }
}
