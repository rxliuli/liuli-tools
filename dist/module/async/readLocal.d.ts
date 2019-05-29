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
interface IReadLocalInit {
    type: ReadType;
    encoding: string;
}
/**
 * 读取本地浏览器选择的文件
 * @param file 选择的文件
 * @param option 可选项参数
 * @param option.type 读取的类型，默认按照二进制 url 读取
 * @param option.encoding 读取的编码格式，默认为 UTF-8
 * @returns 返回了读取到的内容（异步）
 */
export declare function readLocal(file: File, { type, encoding, }?: Partial<IReadLocalInit>): Promise<string | ArrayBuffer | null>;
export declare namespace readLocal {
    var DataURL: ReadType;
    var Text: ReadType;
    var BinaryString: ReadType;
    var ArrayBuffer: ReadType;
}
export {};
//# sourceMappingURL=readLocal.d.ts.map