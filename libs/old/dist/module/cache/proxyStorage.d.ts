declare type StorageObject<T> = {
  [P in keyof T]: T[P] extends object ? Readonly<T[P]> : T[P] | null
}
/**
 * 代理 Storage 使之更简单易用
 * @param storage
 */
export declare function proxyStorage<T extends object>(
  storage: Storage,
): Storage & StorageObject<T>
export {}
//# sourceMappingURL=proxyStorage.d.ts.map
