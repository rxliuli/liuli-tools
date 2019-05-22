declare enum ReadType {
    DataURL = "readAsDataURL",
    Text = "readAsText",
    BinaryString = "readAsBinaryString",
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
 * @param [option.type=readLocal.DataURL] 读取的类型，默认按照二进制 url 读取
 * @param [option.encoding='UTF-8'] 读取的编码格式，默认为 UTF-8
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