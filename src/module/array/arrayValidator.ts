import { isNullOrUndefined } from '../obj/isNullOrUndefined'

/**
 * 数组校验器
 */
export class ArrayValidator {
  /**
   * 是否为空数组
   * @param array 空数组
   * @returns 是否为空数组
   */
  public static isEmpty(array: any[] | null | undefined): boolean {
    return (
      isNullOrUndefined(array) ||
      !(array instanceof Array) ||
      array.length === 0
    )
  }
}

/**
 * 导出一个默认的数组校验对象
 * @deprecated 已废弃，请直接使用类的静态函数
 */
export const arrayValidator = ArrayValidator
