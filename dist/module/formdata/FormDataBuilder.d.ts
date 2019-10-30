/**
 * FormData 构建器
 */
export declare class FormDataBuilder {
    static formDataToArray(fd: FormData): Array<[string, string | Blob]>;
    static objToFormData(data: Record<string, string | Blob | any>): FormData;
    private fd;
    constructor(fd?: FormData);
    append(name: string, value: string | Blob, fileName?: string): this;
    appends(obj: Record<string, string | Blob>): this;
    delete(name: string): this;
    deletes(...names: string[]): this;
    set(name: string, value: string | Blob, fileName?: string): this;
    sets(obj: Record<string, string | Blob>): this;
    clear(): this;
    get(): FormData;
}
//# sourceMappingURL=FormDataBuilder.d.ts.map