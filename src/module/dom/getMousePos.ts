/**
 * 获取鼠标的位置
 * @param e 触发的鼠标事件对象
 * @returns 鼠标的坐标
 */
export function getMousePos(e: MouseEvent) {
  const scrollX =
    document.documentElement.scrollLeft || document.body.scrollLeft
  const scrollY = document.documentElement.scrollTop || document.body.scrollTop
  const x = e.pageX || e.clientX + scrollX
  const y = e.pageY || e.clientY + scrollY
  return { x, y }
}
