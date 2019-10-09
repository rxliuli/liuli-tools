/**
 * FormData 构建器
 */
export class FormDataBuilder {
  public static formDataToArray(fd: FormData): Array<[string, string | Blob]> {
    return Array.from(fd as any)
  }
  public static objToFormData(
    data: Record<string, string | Blob | any>,
  ): FormData {
    return Object.entries(data).reduce((res, [k, v]) => {
      if (v instanceof Blob) {
        res.append(k, v)
      } else {
        res.append(k, v && v.toString())
      }
      return res
    }, new FormData())
  }
  private fd: FormData
  constructor(fd = new FormData()) {
    this.fd = fd
  }
  public append(name: string, value: string | Blob, fileName?: string) {
    this.fd.append(name, value, fileName)
    return this
  }
  public appends(obj: Record<string, string | Blob>) {
    Object.entries(obj).forEach(([k, v]) => this.append(k, v))
    return this
  }
  public delete(name: string) {
    this.fd.delete(name)
    return this
  }
  public deletes(...names: string[]) {
    names.forEach(this.delete)
    return this
  }
  public set(name: string, value: string | Blob, fileName?: string) {
    this.fd.set(name, value, fileName)
    return this
  }
  public sets(obj: Record<string, string | Blob>) {
    Object.entries(obj).forEach(([k, v]) => this.set(k, v))
    return this
  }
  public clear() {
    this.fd.forEach((v, k) => this.fd.delete(k))
    return this
  }
  public get() {
    return this.fd
  }
}
