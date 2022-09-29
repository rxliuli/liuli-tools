/**
 * 在之前的脚本中追加新的脚本
 * @param oldScript
 * @param newScript
 */
export function appendScript(oldScript: string | undefined, newScript: string): string {
  if (!oldScript) {
    return newScript
  }

  if (oldScript.includes(newScript)) {
    return oldScript
  }

  return oldScript + ' && ' + newScript
}
