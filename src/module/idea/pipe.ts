/**
 * 拍平嵌套执行函数
 * @param funcList 函数列表
 * @returns 返回一个函数，参数为第一个函数的参数，结果为最后一个函数的返回值
 */
export function pipe(...funcList: ((value: any) => any)[]): any {
  return (value: any) => funcList.reduce((res, func) => func(res), value)
}
