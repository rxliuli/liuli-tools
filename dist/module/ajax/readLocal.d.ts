/**
 * 读取文件类型
 */
declare enum ReadType {
    /**
     * 以 data url 读取
     */
    DataURL = "readAsDataURL",
    /**
     * 以文本读取
     */
    Text = "readAsText",
    /**
     * 以二进制文件读取
     */
    BinaryString = "readAsBinaryString",
    /**
     * 以 ArrayBuffer 读取
     */
    ArrayBuffer = "readAsArrayBuffer"
}
declare type ReadResult<T extends ReadType> = T extends ReadType.DataURL | ReadType.Text ? string : ArrayBuffer;
/**
 * 读取本地浏览器选择的文件
 * @param file 选择的文件
 * @param options 读取的选项
 * @returns 返回了读取到的内容（异步）
 */
export declare function _readLocal<T extends ReadType>(file: File, options?: Partial<{
    type: T;
    encoding: string;
}>): Promise<ReadResult<T> | null>;
export declare const readLocal: typeof _readLocal & {
    ReadType: typeof ReadType;
    /**
     * 以 data url 读取
     * @deprecated 已废弃，请使用枚举类 ReadType
     */
    DataURL: ReadType;
    /**
     * 以文本读取
     * @deprecated 已废弃，请使用枚举类 ReadType
     */
    Text: ReadType;
    /**
     * 以二进制文件读取
     * @deprecated 已废弃，请使用枚举类 ReadType
     */
    BinaryString: ReadType;
    /**
     * 以 ArrayBuffer 读取
     * @deprecated 已废弃，请使用枚举类 ReadType
     */
    ArrayBuffer: ReadType;
};
export {};
//# sourceMappingURL=readLocal.d.ts.map